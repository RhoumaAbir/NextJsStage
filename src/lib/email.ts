import nodemailer from 'nodemailer';

export async function sendConfirmationEmail(to: string, token: string) {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT as string, 10),
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: 'Confirmation de votre compte',
    text: `Veuillez cliquer sur ce lien pour confirmer votre compte : http://localhost:3000/auth/confirm-email?token=${token}`,
  };
  try {
    await transporter.sendMail(mailOptions);
    console.log('Email de confirmation envoyé');
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email :', error);
    throw new Error('Impossible d\'envoyer l\'email de confirmation');
  }
}
