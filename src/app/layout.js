import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./providers"; // yaha providers wrap karenge

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ✅ Metadata config
export const metadata = {
  title: "Portfolio Builder | Rehan Raza",
  description: "A professional portfolio builder app to create, customize, and share your digital portfolio with ease.",
  applicationName: "Portfolio Builder",
  authors: [{ name: "Rehan Raza Siraj Anwar", url: "https://github.com/as1coder" }],
  keywords: ["portfolio", "portfolio builder", "resume", "developer", "projects", "Next.js"],
  creator: "Rehan Raza",
  publisher: "Rehan Raza",
  metadataBase: new URL("https://your-portfolio-domain.com"), // apna domain yaha dalna

  // Favicon & icons
  icons: {
    icon: "/favicon.ico", // ✅ public folder me favicon.ico daal dena
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  // OpenGraph (for SEO + link previews)
  openGraph: {
    title: "Portfolio Builder | Rehan Raza",
    description: "Create and share your portfolio with this modern builder app.",
    url: "https://your-portfolio-domain.com",
    siteName: "Portfolio Builder",
    images: [
      {
        url: "/og-image.png", // ✅ ek preview image daal de public folder me
        width: 1200,
        height: 630,
        alt: "Portfolio Builder Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  // Twitter card (for link share)
  twitter: {
    card: "summary_large_image",
    title: "Portfolio Builder | Rehan Raza",
    description: "A modern portfolio builder app made with Next.js.",
    creator: "@yourtwitter", // agar twitter handle hai to daalna
    images: ["/og-image.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
