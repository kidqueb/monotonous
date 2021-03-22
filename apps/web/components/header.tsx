import React from "react";
import Link from "next/link";

export const Header = () => {
  return (
    <header className="flex items-center container py-10">
      <p>
        <Link href="/">
          <a>Monotonous</a>
        </Link>
      </p>

      <nav className="ml-auto space-x-3">
        <Link href="/signup">
          <a>Sign Up</a>
        </Link>
        <Link href="/login">
          <a>Login</a>
        </Link>
      </nav>
    </header>
  );
};
