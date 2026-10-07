import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Launch Doctors",
  description: "Strategic BioPharma Launch Consultancy",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* Plain Google Fonts link for Lora (the site's heading AND body
            font), rendered here (React 19 hoists it into <head>, given a
            precedence) rather than as a sibling of <body> — <html> can
            only contain <head>/<body> as direct children.
            This IS the App Router's site-wide root layout — the eslint
            rule below predates the App Router and still names the Pages
            Router's _document.js, so it flags this as a "single page" font. */}
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap"
          precedence="default"
        />
        {/* Safari (desktop and iOS) only activates :hover/:active styles on
            tap/click once at least one touch listener exists somewhere in
            the document — otherwise a tap never shows the pressed state at
            all. This is the standard no-op listener that unlocks it. */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.addEventListener('touchstart', function(){}, {passive:true});",
          }}
        />
        {children}
      </body>
    </html>
  );
}
