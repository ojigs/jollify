const Footer = () => {
  return (
    <>
      <footer className="flex flex-col items-between justify-center gap-4 md:flex-row md:items-center md:justify-between min-h-[80px] p-4 bg-secondary-100 text-white">
        <p>© 2023 Jollify. All rights reserved.</p>
        <nav className="flex space-x-4">
          <a href="/about" className="hover:text-primary">
            About
          </a>
          <a href="/contact" className="hover:text-primary">
            Contact
          </a>
          <a href="/privacy" className="hover:text-primary">
            Privacy
          </a>
        </nav>
      </footer>
    </>
  );
};

export default Footer;
