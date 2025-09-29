import "./globals.css";

import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import classNames from "classnames";
import Header from "@/components/header";

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mercado Livre",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <link rel="icon" href="/favicon.svg" />
      <body className={classNames(openSans.variable)}>
        <Header />

        {children}
      </body>
    </html>
  );
}
