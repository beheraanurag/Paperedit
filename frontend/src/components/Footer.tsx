import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-gray-50">
      <div className="container px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">PaperEdit</h3>
            <p className="text-slate-600 mb-6 max-w-md">
              Your trusted partner for research publication and academic support. 
              We help researchers, PhD scholars, and academic professionals elevate their work.
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">Get Started</Button>
              <Button variant="outline" size="sm">Contact Us</Button>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li><Link to="/services" className="text-slate-600 hover:text-slate-900">Research Paper Editing</Link></li>
              <li><Link to="/services" className="text-slate-600 hover:text-slate-900">Graphical Abstracts</Link></li>
              <li><Link to="/services" className="text-slate-600 hover:text-slate-900">Journal Submission</Link></li>
              <li><Link to="/services" className="text-slate-600 hover:text-slate-900">AI & Plagiarism Check</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-slate-600 hover:text-slate-900">About Us</Link></li>
              <li><Link to="/blog" className="text-slate-600 hover:text-slate-900">Blog</Link></li>
              <li><Link to="/faq" className="text-slate-600 hover:text-slate-900">FAQ</Link></li>
              <li><Link to="/contact" className="text-slate-600 hover:text-slate-900">Contact</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-200 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-600 text-sm">
            © {currentYear} PaperEdit. All rights reserved.
          </p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link to="/privacy" className="text-slate-600 hover:text-slate-900 text-sm">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-slate-600 hover:text-slate-900 text-sm">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;