import "@/styles/main.scss";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from "./Providers";
import NextTopLoader from "nextjs-toploader";
import { SITE_NAME } from "@/lib/constants";
import PopupState from "@/components/PopupState";
import Navbar from "@/app/navbar/Navbar";
import Footer from "./Footer";

const inter = Inter({ subsets: ["latin"] });

// TODO: improve metadata
export const metadata: Metadata = {
  title: {
    template: `%s | ${SITE_NAME}`,
    default: `${SITE_NAME} | Save your money transaction history.`,
  },
  description: `${SITE_NAME} is a free and open source money saving app. You can record the money you spent, earned and borrowed and even more. It's free and open source.`,
  keywords: [
    "money",
    "save money",
    "record money",
    "money history",
    "money transaction",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <NextTopLoader color="cyan" height={4} showSpinner={false} />
          <PopupState />
          <Navbar />

          <main>{children}</main>

          <Footer />
        </Providers>
      </body>
    </html>
  );
}
