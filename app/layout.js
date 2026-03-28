import Logo from "./_Components/Logo";
import Navigation from "./_Components/Navigation";

import { Josefin_Sans } from "next/font/google";
const josefin = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
});

import "@/app/_styles/globals.css";

export const metadata = {
  title: {
    template: "%s / Nestoria",
    default: "Welcome / Nestoria",
  },
  description:
    "Discover a luxurious escape in the Italian Dolomites, where stunning mountain landscapes meet elegant comfort, fine hospitality, and a truly relaxing experience.",
};

export default function RootLayout({ children }) {
  return (
    <html>
      <body
        className={`${josefin.className} bg-primary-950 text-primary-100 min-h-screen`}
      >
        <header>
          <Logo />
          <Navigation />
        </header>
        <main>{children}</main>
        <footer>copyright by the Sheharyar</footer>
      </body>
    </html>
  );
}
