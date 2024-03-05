import "./globals.css";

export const metadata = {
  title: "Senior Seminar 2024",
  description: "University of Pennsylvania Design",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
