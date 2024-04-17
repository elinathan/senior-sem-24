import "./globals.css";
import OGImage from "../public/og-image.png";

export const metadata = {
  title: {
    template: "%s | WHERE WE'RE WERE WEAR",
    default: "WHERE WE'RE WERE WEAR",
  },
  description: "University of Pennsylvania Design Senior Seminar 2024",
  openGraph: {
    images: [
      {
        url: OGImage.src,
        width: OGImage.width,
        height: OGImage.height,
        alt: "WHERE WE'RE WERE WEAR",
      },
    ],
  },
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
