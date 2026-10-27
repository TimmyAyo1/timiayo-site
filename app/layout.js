// layout.js = the frame every page sits inside (like a machine's chassis).
// Anything here (fonts, <html>, <body>) is shared by every page on the site.
import { Manrope, IBM_Plex_Mono, Caveat } from "next/font/google";
import "./globals.css";

// next/font downloads the fonts at build time and serves them from your own
// site, so visitors never wait on Google and the text doesn't jump on load.
const manrope = Manrope({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-sans" });
const plexMono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-mono" });
const caveat = Caveat({ subsets: ["latin"], weight: ["500"], variable: "--font-hand" });

// metadata = the page's label: browser tab title and the text Google shows.
export const metadata = {
  title: "Timilehin Ajala",
  description: "Mechanical engineer and web developer in Soest, Germany. Engineer by training, builder by habit.",
};

export default function RootLayout({ children }) {
  // {children} is the slot where the current page gets inserted.
  return (
    <html lang="en" className={`${manrope.variable} ${plexMono.variable} ${caveat.variable}`}>
      <body>{children}</body>
    </html>
  );
}
