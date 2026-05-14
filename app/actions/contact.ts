'use server';

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY || 're_mock_key');

export async function submitContactForm(formData: FormData) {
  try {
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const subject = formData.get('subject') as string;
    const message = formData.get('message') as string;

    if (!name || !email || !message) {
      return { error: 'Missing required fields' };
    }

    // In a real production environment, you must provide your RESEND_API_KEY
    if (!process.env.RESEND_API_KEY) {
      console.log('--- MOCK EMAIL SENT ---');
      console.log(`From: ${name} <${email}>`);
      console.log(`Subject: ${subject || 'New Contact Request'}`);
      console.log(`Message:\n${message}`);
      console.log('-----------------------');
      
      // Simulate real network delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      return { success: true };
    }

    const data = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>', // Should be a verified domain in production
      to: 'info@djouadimounji.com', // Where you want to receive the email
      subject: `New Inquiry: ${subject || 'Website Contact Form'}`,
      replyTo: email,
      html: `
        <h2>New Contact Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject || 'Not provided'}</p>
        <hr />
        <p><strong>Message:</strong></p>
        <p style="white-space: pre-wrap;">${message}</p>
      `,
    });

    if (data.error) {
      return { error: data.error.message };
    }

    return { success: true };
  } catch (err: any) {
    return { error: 'Failed to submit form. Please try again later.' };
  }
}
