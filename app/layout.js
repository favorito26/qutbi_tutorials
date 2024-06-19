import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {

  };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
      <link rel="icon" href="/logo.png"/>
        <title>Qutbi Tutorials</title>
      </head>
      <body className={inter.className}>
        <Navbar/>
        
       <div className="min-h-[90vh]">
        {children}
       </div>
        <Footer/>
        </body>
    </html>
  );
}
