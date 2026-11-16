import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { admin, twoFactor } from "better-auth/plugins";
import { Resend } from "resend";
import prisma from "@/lib/prisma";

const resend = new Resend(process.env.RESEND_API_KEY);

export const auth = betterAuth({
  appName: "Hiran Portfolio",
  database: prismaAdapter(prisma, { provider: "postgresql" }),
  emailAndPassword: {
    enabled: true,
    disableSignUp: true,
    minPasswordLength: 12,
  },
  session: { expiresIn: 60 * 60 * 24 * 7 },
  plugins: [
    admin(),
    twoFactor({
      issuer: "Hiran Portfolio",
      otpOptions: {
        async sendOTP({ user, otp }) {
          const { error } = await resend.emails.send({
            from: "Portfolio Admin <onboarding@resend.dev>",
            to: user.email,
            subject: "Your admin verification code",
            text: `Your verification code is ${otp}. It expires in a few minutes. If you didn't try to sign in, change your password.`,
            html: `<p>Your verification code is</p><p style="font-size:28px;font-weight:700;letter-spacing:6px">${otp}</p><p>It expires in a few minutes. If you didn't try to sign in, change your password.</p>`,
          });
          if (error) throw new Error("Could not send the verification email");
        },
      },
    }),
    nextCookies(), // keep this last
  ],
});