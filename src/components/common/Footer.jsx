import {
  Instagram,
  Twitter,
  Github,
  Mail,
} from "lucide-react";

const Footer = () => {
  return (
    <footer
      className="
        mt-16 border-t
        border-orange-100 dark:border-gray-800
        bg-white dark:bg-gray-950
        transition-colors duration-300
      "
    >
      <div className="max-w-7xl mx-auto px-6 py-12">

        {/* Top Section */}
        <div className="
          grid grid-cols-1
          sm:grid-cols-2
          md:grid-cols-3
          gap-10
          text-center md:text-left
        ">

          {/* Brand */}
          <div className="space-y-4 flex flex-col items-center md:items-start">
            <h3 className="text-2xl font-bold text-orange-500">
              GroceryGo
            </h3>

            <p className="
              text-sm
              text-gray-500 dark:text-gray-400
              max-w-xs
            ">
              Smart grocery planning, pantry tracking, and budget
              management — all in one powerful platform.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-700 dark:text-gray-200 text-base">
              Quick Links
            </h4>

            <div className="
              flex flex-col gap-2
              text-sm
              text-gray-500 dark:text-gray-400
            ">
              <a
                href="/dashboard"
                className="hover:text-orange-500 transition-colors duration-200"
              >
                Dashboard
              </a>
              <a
                href="/pantry"
                className="hover:text-orange-500 transition-colors duration-200"
              >
                Pantry
              </a>
              <a
                href="/history"
                className="hover:text-orange-500 transition-colors duration-200"
              >
                History
              </a>
              <a
                href="/settings"
                className="hover:text-orange-500 transition-colors duration-200"
              >
                Settings
              </a>
            </div>
          </div>

          {/* Social */}
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-700 dark:text-gray-200 text-base">
              Connect With Us
            </h4>

            <div className="
              flex justify-center md:justify-start
              gap-4
            ">
              {[Instagram, Twitter, Github, Mail].map((Icon, index) => (
                <a
                  key={index}
                  href={Icon === Mail ? "mailto:support@grocerygo.com" : "#"}
                  className="
                    p-2.5
                    rounded-full
                    bg-orange-100 dark:bg-orange-900/30
                    hover:bg-orange-200 dark:hover:bg-orange-800/40
                    transition duration-300
                    hover:scale-110
                    shadow-sm
                  "
                >
                  <Icon
                    size={18}
                    className="text-orange-500 dark:text-orange-400"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-orange-100 dark:border-gray-800 my-10"></div>

        {/* Bottom Section */}
        <div className="
          flex flex-col sm:flex-row
          justify-between items-center
          gap-4
          text-center sm:text-left
        ">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()}{" "}
            <span className="font-semibold text-orange-500">
              GroceryGo
            </span>
            . All rights reserved.
          </p>

          <p className="
            text-xs
            text-gray-400 dark:text-gray-500
            max-w-xs sm:max-w-none
          ">
            Smart grocery planning • Pantry management • Budget tracking
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;