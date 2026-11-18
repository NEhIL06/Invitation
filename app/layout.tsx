import type { Metadata } from "next";
import "./experience.css";

export const metadata: Metadata = {
  title: "Siddharth & Shrinkhla | Wedding Invitation",
  description:
    "With love and blessings, Siddharth Chandrakar and Shrinkhla Chandrakar invite you to celebrate their wedding.",
  openGraph: {
    title: "Siddharth & Shrinkhla | Wedding Invitation",
    description: "Together with our families, we invite you to celebrate with us.",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
