
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {

  };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
      <link rel="icon" href="/logo.png" type="image/png"/>
        <title>Qutbi Tutorials</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <Navbar/>
        
       <div className="min-h-[90vh]">
        {children}
       </div>
        <Footer/>
        </body>
    </html>
  );
}
