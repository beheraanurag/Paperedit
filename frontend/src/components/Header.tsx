import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';

const Header: React.FC = () => {
  return (
    <header className="border-b">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2 font-semibold">
            <span className="text-xl">PaperEdit</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link to="/" className="transition-colors hover:text-foreground/80">
              Home
            </Link>
            <Link
              to="/services"
              className="text-foreground/60 transition-colors hover:text-foreground/80"
            >
              Services
            </Link>
            <Link
              to="/blog"
              className="text-foreground/60 transition-colors hover:text-foreground/80"
            >
              Blog
            </Link>
            <Link
              to="/faq"
              className="text-foreground/60 transition-colors hover:text-foreground/80"
            >
              FAQ
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/login">Login</Link>
          </Button>
          <Button size="sm" asChild>
            <Link to="/register">Register</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;