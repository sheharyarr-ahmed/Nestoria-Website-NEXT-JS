import Logo from "./_Components/Logo";
import Navigation from "./_Components/Navigation";
import "@/app/_styles/globals.css";
import Header from "./_Components/Header";

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
        className="bg-primary-950 text-primary-100 antialiased min-h-screen min-h-screen flex flex-col relative"
      >
        <Header />
        <div className="flex-1 px-8 py-12 grid">
          <main className="max-w-7xl mx-auto w-full">{children}</main>
        </div>
      </body>
    </html>
  );
}
