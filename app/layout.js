import "./globals.css";
import Cursor from "@/components/Cursor";

export const metadata = {
  title: "Senior Seminar 2024",
  description: "University of Pennsylvania Design",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://use.typekit.net/mqa7fao.css"
        ></link>
      </head>
      <body>
        {" "}
        {/* <Cursor /> */}
        {children}
      </body>
    </html>
  );
}
