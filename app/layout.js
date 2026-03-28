import Logo from "./_Components/Logo";
import Navigation from "./_Components/Navigation";

import "@/app/_styles/globals.css";

export const metadata = {
  title: "Nestoria",
};

export default function RootLayout({ children }) {
  return (
    <html>
      <body className="bg-primary-950 text-primary-100 min-h-screen">
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
