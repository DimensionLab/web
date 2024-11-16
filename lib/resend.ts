import { Resend } from 'resend';
 import config from '@/config';

 if (!process.env.RESEND_API_KEY && process.env.NODE_ENV === "development") {
   console.group("⚠️ RESEND_API_KEY missing from .env");
   console.error("It's not mandatory but it's required to send emails.");
   console.error("If you don't need it, remove the code from /libs/resend.js");
   console.groupEnd();
 }

 const resend = new Resend(process.env.RESEND_API_KEY);

 export const sendEmail = async ({ to, subject, html, replyTo }: { to: string, subject: string, html: string, replyTo: FormDataEntryValue }) => {
   // `html` must be provided
   if (!html) {
     throw new Error('One of `text` or `html` must be provided');
   }

   await resend.emails.send({
     from: config.resend.fromAdmin,
     to: to,
     subject: subject,
     html,
     ...(replyTo ? { reply_to: replyTo } : {}),
   });
 };