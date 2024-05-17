import type { Metadata } from "next";
import "./globals.css";
import NextUIProv from "./NextUIProv";
import { AuthProvider } from "@/context/auth.context";
import { Inter, Wallpoet } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
const wallpoet = Wallpoet({
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "¡Trello!",
  description: "Proyecto para mostrar en mis curriculum",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <html lang="en">
        <body className={inter.className || wallpoet.className}>
          <NextUIProv>{children}</NextUIProv>
        </body>
      </html>
    </AuthProvider>
  );
}
