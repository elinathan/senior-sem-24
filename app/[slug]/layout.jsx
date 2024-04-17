import Link from "next/link";

export default function Layout({ children }) {
  return (
    <div className="mt-16">
      <nav className="fixed left-4 top-4 md:left-8">
        <Link className="font-bold no-underline" href={"/"}>
          WHERE WE’RE WERE WEAR
        </Link>
      </nav>
      {children}
    </div>
  );
}
