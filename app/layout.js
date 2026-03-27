import Logo from "./Components/Logo";
import Navigation from "./Components/Navigation";

export const metadata = {
  title: "Nestoria",
};

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
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
