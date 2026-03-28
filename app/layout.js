import Logo from "./_Components/Logo";
import Navigation from "./_Components/Navigation";

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
