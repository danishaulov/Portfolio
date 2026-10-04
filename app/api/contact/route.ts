import { Resend } from "resend";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export async function POST(req: Request) {
  try {
    const raw = await req.text();
    if (raw.length > 12000)
      return NextResponse.json(
        { error: "Message is too long." },
        { status: 413 },
      );
    let input;
    try {
      input = JSON.parse(raw);
    } catch {
      return NextResponse.json(
        { error: "Invalid message format." },
        { status: 400 },
      );
    }
    if (!input || typeof input !== "object" || Array.isArray(input))
      return NextResponse.json(
        { error: "Invalid message format." },
        { status: 400 },
      );
    if (input.website)
      return NextResponse.json(
        { error: "Please leave the website field empty." },
        { status: 400 },
      );
    if (
      ![input.name, input.email, input.message].every(
        (v) => typeof v === "string" && v.trim(),
      )
    )
      return NextResponse.json(
        { error: "Name, email and message are required." },
        { status: 400 },
      );
    const name = input.name.trim(),
      email = input.email.trim(),
      message = input.message.trim();
    if (name.length > 100 || email.length > 254 || message.length > 5000)
      return NextResponse.json(
        { error: "Please shorten your name or message." },
        { status: 400 },
      );
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 },
      );
    if (!process.env.RESEND_API_KEY)
      return NextResponse.json(
        {
          error:
            "The form is temporarily unavailable. Please email danielshaulov4@gmail.com directly.",
        },
        { status: 503 },
      );
    const { error } = await new Resend(process.env.RESEND_API_KEY).emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: "danielshaulov4@gmail.com",
      replyTo: email,
      subject: `New message from ${name.replace(/[\r\n]/g, " ")}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    });
    if (error)
      return NextResponse.json(
        {
          error:
            "Your message could not be sent. Please try again or email me directly.",
        },
        { status: 502 },
      );
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      {
        error:
          "Your message could not be sent. Please try again or email me directly.",
      },
      { status: 500 },
    );
  }
}
