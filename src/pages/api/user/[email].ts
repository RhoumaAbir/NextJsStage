import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prismaClient';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { email } = req.query; 

  if (!email || typeof email !== 'string') {
    return res.status(400).json({ error: 'Invalid email input' });
  }

  if (req.method === 'PUT') {
    const { name, firstName, birthDate, address, phoneNumber } = req.body;

    try {
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (!existingUser) {
        return res.status(404).json({ error: 'Utilisateur non trouvé' });
      }

      const updatedUser = await prisma.user.update({
        where: { email },
        data: {
          name,
          firstName,
          birthDate: birthDate ? new Date(birthDate) : null,
          address,
          phoneNumber,
        },
      });
      return res.status(200).json(updatedUser); 
    } catch (error: unknown) {
      console.error('Erreur lors de la mise à jour de l\'utilisateur :', error);
      return res.status(500).json({ error: 'Erreur lors de la mise à jour de l\'utilisateur' });
    }    
  } else {
    res.setHeader('Allow', ['PUT']);
    return res.status(405).end(`Méthode ${req.method} non autorisée`);
  }
}
