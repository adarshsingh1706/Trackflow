import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Configure transporter (using Gmail as example)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export async function POST(request) {
  try {
    const { to, leadName, company } = await request.json();

    const mailOptions = {
      from: `"TrackFlow CRM" <${process.env.EMAIL_USER}>`,
      to,
      subject: 'Congratulations on Winning the Lead!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">Congratulations!</h2>
          <p>We're pleased to inform you that your lead <strong>${leadName}</strong> from <strong>${company}</strong> has been successfully marked as <span style="color: #16a34a;">Won</span> in TrackFlow CRM.</p>
          
          <p>This is a significant milestone in your sales pipeline. Here's what you can do next:</p>
          <ul>
            <li>Review the lead details in your dashboard</li>
            <li>Create an order for this client</li>
            <li>Schedule a follow-up meeting</li>
          </ul>
          
          <p style="margin-top: 20px;">Best regards,<br/>
          The TrackFlow Team</p>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; font-size: 12px; color: #6b7280;">
            <p>This is an automated message. Please do not reply directly to this email.</p>
          </div>
        </div>
      `,
    };
console.log('EMAIL_USER:', process.env.EMAIL_USER ? 'Loaded ✅' : 'Missing ❌');
  console.log('EMAIL_PASSWORD:', process.env.EMAIL_PASSWORD ? 'Loaded ✅' : 'Missing ❌');
  console.log('MONGODB_URI:', process.env.MONGODB_URI ? 'Loaded ✅' : 'Missing ❌');

    await transporter.sendMail(mailOptions);
    return NextResponse.json({ success: true });

  } catch (error) {
    
    console.error('Email sending error:', error.message, error);

    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}