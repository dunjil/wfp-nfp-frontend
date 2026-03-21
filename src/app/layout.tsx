import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getGlobalSettings } from "@/lib/api";

export const metadata: Metadata = {
  title: {
    template: "%s | National Fortification Alliance",
    default: "National Fortification Alliance – Nourishing Nigeria",
  },
  description:
    "The National Fortification Alliance (NFA) coordinates food fortification programs in Nigeria to eliminate micronutrient malnutrition. Supported by WFP Nigeria and NAFDAC.",
  keywords: ["food fortification", "Nigeria", "WFP", "NAFDAC", "nutrition", "NFA"],
  openGraph: {
    type: "website",
    locale: "en_NG",
    siteName: "National Fortification Alliance",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getGlobalSettings();

  return (
    <html lang="en">
      <body>
        <Header siteName={settings?.site_name || "National Fortification Alliance"} />
        <main>{children}</main>
        <Footer settings={settings} />
      </body>
    </html>
  );
}
