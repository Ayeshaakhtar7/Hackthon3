
import Footer from "./Components/Footer/Footer";
import "./globals.css";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        {children}
        <Footer/>
      </body>
    </html>
  );
}
