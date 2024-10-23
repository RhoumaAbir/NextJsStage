import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prismaClient'; 
import bcrypt from 'bcrypt';
import { sendConfirmationEmail } from '@/lib/email';
import { v4 as uuidv4 } from 'uuid';

export default async function signup(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, password, name, firstName, address } = req.body;

  if (!email || !password || !name || !firstName || !address) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const confirmationToken = uuidv4();
    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        firstName,
        address,
        confirmationToken,
        emailVerified: false,
      },
    });
    console.log(`Sending confirmation email to: ${email}`);
    await sendConfirmationEmail(email, confirmationToken);

    res.status(201).json({ message: 'User created, please check your email for confirmation.' });
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ error: error instanceof Error ? error.message : 'Something went wrong during signup.' });
  }
}
