import { useSelector } from "react-redux";

const Footer = () => {
  const selectedTheme = useSelector((state) => state.theme);

  return (
    <>
      <footer className="flex flex-col items-between justify-center gap-4 md:flex-row md:items-center md:justify-between min-h-[80px] p-4 bg-secondary-100 text-gray-200 text-sm md:text-base">
        <nav className="flex space-x-4">
          <a
            href="https://ojigs.netlify.app"
            className={`hover:text-${selectedTheme}-50`}
          >
            About
          </a>
          <a
            href="https://ojigs.netlify.app#contact"
            className={`hover:text-${selectedTheme}-50`}
          >
            Contact
          </a>
          <span className={`hover:text-${selectedTheme}-50`}>Privacy</span>
        </nav>
        <p className="text-gray-400">© 2023 Jollify. All rights reserved.</p>
      </footer>
    </>
  );
};

export default Footer;
