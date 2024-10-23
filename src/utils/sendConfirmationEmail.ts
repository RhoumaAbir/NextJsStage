import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendConfirmationEmail = async (to: string, confirmationToken: string) => {
  const confirmationUrl = `${process.env.NEXT_PUBLIC_URL}/api/confirm-email?token=${confirmationToken}`;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: 'Please confirm your email address',
    html: `
      <h1>Email Confirmation</h1>
      <p>Please confirm your email by clicking the link below:</p>
      <a href="${confirmationUrl}">Confirm Email</a>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Confirmation email sent to', to);
  } catch (error) {
    console.error('Error sending confirmation email:', error);
  }
};
