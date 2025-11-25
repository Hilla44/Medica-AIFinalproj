import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@4.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface VerificationEmailRequest {
  email: string;
  fullName: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, fullName }: VerificationEmailRequest = await req.json();

    console.log("Sending verification email to:", email);

    const emailResponse = await resend.emails.send({
      from: "Medica AI <onboarding@resend.dev>",
      to: [email],
      subject: "Welcome to Medica AI - Email Verified",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%); padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
              .header h1 { color: white; margin: 0; font-size: 28px; }
              .content { background: #ffffff; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px; }
              .button { display: inline-block; background: linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%); color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
              .footer { text-align: center; margin-top: 30px; color: #6b7280; font-size: 14px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>🧠 Welcome to Medica AI</h1>
              </div>
              <div class="content">
                <h2>Hello ${fullName}!</h2>
                <p>Thank you for joining Medica AI - your AI-powered clinical support tool for early brain tumor detection and real-time health monitoring.</p>
                
                <p><strong>Your account has been verified and is ready to use.</strong></p>
                
                <p>With Medica AI, you can:</p>
                <ul>
                  <li>Upload and analyze brain MRI scans with AI assistance</li>
                  <li>Monitor patient vital signs in real-time</li>
                  <li>Access advanced risk stratification tools</li>
                  <li>Receive smart alerts for critical findings</li>
                </ul>
                
                <p>Get started by logging into your dashboard and uploading your first MRI scan.</p>
                
                <p style="margin-top: 30px;">Best regards,<br><strong>The Medica AI Team</strong></p>
              </div>
              <div class="footer">
                <p>This is an automated message from Medica AI Clinical Support System</p>
                <p>If you didn't create this account, please ignore this email.</p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error sending verification email:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
