// app/api/contact/route.ts
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { google } from "googleapis";

// Pull credentials from your environment variables
const CLIENT_ID = process.env.GMAIL_CLIENT_ID;
const CLIENT_SECRET = process.env.GMAIL_CLIENT_SECRET;
const REDIRECT_URI = "https://developers.google.com/oauthplayground";
const REFRESH_TOKEN = process.env.GMAIL_REFRESH_TOKEN;
const MY_EMAIL = process.env.MY_EMAIL_ADDRESS; // Your receiving/sending email

const OAuth2 = google.auth.OAuth2;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, subject, message } = body;

    // Basic Validation
    if (!email || !subject || !message) {
      return NextResponse.json(
        { error: "PAYLOAD_INCOMPLETE" },
        { status: 400 },
      );
    }

    // Initialize OAuth2 Client
    const oauth2Client = new OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
    oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

    // Generate active access token
    const accessToken = await new Promise((resolve, reject) => {
      oauth2Client.getAccessToken((err, token) => {
        if (err) {
          console.error("OAuth Token Generation Failed:", err);
          reject("Failed to create access token");
        }
        resolve(token);
      });
    });

    // Configure Nodemailer Transport with OAuth2
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: MY_EMAIL,
        accessToken: accessToken as string,
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
      },
    });

    // Format the email
    const mailOptions = {
      from: `System Node <${MY_EMAIL}>`, // Sends FROM your account
      to: MY_EMAIL, // Sends TO your account
      subject: `[SYSTEM_INQUIRY] ${subject}`,
      text: `Incoming transmission from: ${email}\n\nPayload:\n${message}`,
      html: `
        <div style="font-family: monospace; background: #070707; color: #39ff14; padding: 20px;">
          <h2 style="border-bottom: 1px solid #333; padding-bottom: 10px;">INCOMING_TRANSMISSION</h2>
          <p><strong>REPLY_TO:</strong> ${email}</p>
          <p><strong>ROUTING_TAG:</strong> ${subject}</p>
          <div style="margin-top: 20px; border-left: 2px solid #39ff14; padding-left: 15px; color: #a3ccaa;">
            ${message.replace(/\n/g, "<br>")}
          </div>
        </div>
      `,
    };

    // Execute transmission
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { status: "TRANSMISSION_SUCCESS" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Transmission Error:", error);
    return NextResponse.json({ error: "TRANSMISSION_FAILED" }, { status: 500 });
  }
}
