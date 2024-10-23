import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prismaClient';

export default async function confirmEmail(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ error: 'Token is required' });
  }

  try {
    const user = await prisma.user.findUnique({ where: { confirmationToken: token } });

    if (!user) {
      return res.status(400).json({ error: 'Invalid token' });
    }

    await prisma.user.update({
      where: { id: user.id },
      data: { emailVerified: true, confirmationToken: null },
    });

    res.status(200).json({ message: 'Email successfully confirmed' });
  } catch (error) {
    console.error('Error during email confirmation:', error);
    res.status(500).json({ error: 'Something went wrong during confirmation' });
  }
}
