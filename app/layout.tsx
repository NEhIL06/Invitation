import type { Metadata } from "next";
import { brideName, coupleNames, groomName } from "@/lib/invitation";
import "./experience.css";

export const metadata: Metadata = {
  title: `${coupleNames} | Wedding Invitation`,
  description:
    `With love and blessings, ${brideName} Chandrakar and ${groomName} Chandrakar invite you to celebrate their wedding.`,
  openGraph: {
    title: `${coupleNames} | Wedding Invitation`,
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
