import { Link } from "react-router-dom";

import footerBg from "../assets/images/eventsImages/7bd6d90153a3b6c152303792c3b444c1ab9cf992.png";
import logo from "../assets/images/eventsImages/Frame 21.svg";
import whatsappIcon from "../assets/images/eventsImages/whatsapp.svg";

interface FooterProps {
  onAboutClick?: () => void;
}

const Footer = ({ onAboutClick }: FooterProps) => {
  return (
    <footer className="relative overflow-hidden border-t border-[#2A2A2A] mt-24 ">
      <div
        className="absolute inset-0 bg-cover bg-center pointer-events-none"
        style={{ backgroundImage: `url(${footerBg})` }}
      />

      <div className="absolute inset-0 bg-black/70 pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-2 lg:px-10 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_0.8fr_auto] gap-x-10 gap-y-10 lg:gap-x-16 mb-12">

          {/* Logo / Contact */}
          <div className="flex flex-col items-center sm:items-start">
            <Link to="/" className="inline-block">
              <img
                src={logo}
                alt="Tix Arena"
                className="mb-5"
              />
            </Link>

            <a
              href="mailto:hello@logopsum.com"
              className="font-manrope text-[12px] text-[#DCC7BC] font-medium hover:text-white transition-colors"
            >
              hello@logopsum.com
            </a>

            <a
              href="tel:+18919891191"
              className="font-manrope text-[#DCC7BC] font-bold text-[20px] mt-1 hover:text-white transition-colors"
            >
              +1 891 989-11-91
            </a>

            <a
              href="https://wa.me/18919891191"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 mt-3 w-fit"
            >
              <img
                src={whatsappIcon}
                alt="WhatsApp"
                className="w-4 h-4 shrink-0"
              />

              <span className="font-manrope text-[12px] text-[#DCC7BC] font-medium hover:text-white transition-colors">
                WhatsApp
              </span>
            </a>
          </div>

          {/* Main Links */}
          <div>
            <div className="space-y-3 font-manrope text-[#DCC7BC] items-center flex flex-col">
              <Link
                to="/"
                className="block text-sm hover:text-white transition-colors"
              >
                Home
              </Link>

              <Link
                to="/explore"
                className="block text-sm hover:text-white transition-colors"
              >
                Explore
              </Link>

              <Link
                to="/contact"
                className="block text-sm hover:text-white transition-colors"
              >
                Contacts
              </Link>

              <button
                type="button"
                onClick={onAboutClick}
                className="relative z-20 block text-sm text-left text-[#DCC7BC] hover:text-white transition-colors cursor-pointer"
              >
                About
              </button>
            </div>
          </div>

          {/* Other Links */}
          <div>
            <div className="space-y-3 font-manrope text-[#DCC7BC]">
              <Link
                to="/faq"
                className="block text-sm hover:text-white transition-colors"
              >
                FAQ
              </Link>

              <Link
                to="/delivery"
                className="block text-sm hover:text-white transition-colors"
              >
                Delivery
              </Link>

              <Link
                to="/help-center"
                className="block text-sm hover:text-white transition-colors"
              >
                Help Center
              </Link>
            </div>
          </div>

          {/* Calculate Cost */}
          <div className="lg:justify-self-end">
            <button
              type="button"
              className="border border-[#995DFF] text-white text-sm px-6 py-3 rounded-xl hover:bg-white/10 transition-colors whitespace-nowrap"
            >
              Calculate the cost
            </button>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 border-t border-[#2A2A2A] pt-6">
          <p className="font-manrope text-gray-400 text-sm">
            © 2026 — Copyright
          </p>

          <Link
            to="/privacy"
            className="font-manrope text-gray-400 text-sm hover:text-white transition-colors"
          >
            Privacy
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;