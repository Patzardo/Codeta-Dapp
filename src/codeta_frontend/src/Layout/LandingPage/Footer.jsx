export default function Footer() {
  return (
    <footer
      className="bg-gradient-to-r from-indigo-900 via-purple-900 to-gray-900"
      aria-labelledby="footer-heading"
    >
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-7xl px-6 py-12 lg:py-16 sm:px-8 lg:px-12">
        <div className="flex flex-col items-center lg:flex-row lg:justify-between">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-4">
            <img
              src="images/LandingPage/mainLogo.png"
              alt="Codeta"
              width={150}
              className="rounded-lg "
            />
          </div>

          {/* Links Section */}
          <div className="mt-8 flex flex-wrap justify-center space-x-8 lg:mt-0">
            <a
              href="/aboutus"
              className="text-sm text-gray-300 hover:text-gray-100 transition-colors duration-200"
            >
              About Us
            </a>            
            <a
              href="#"
              className="text-sm text-gray-300 hover:text-gray-100 transition-colors duration-200"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-sm text-gray-300 hover:text-gray-100 transition-colors duration-200"
            >
              Terms of Service
            </a>
          </div>
        </div>

        {/* Contact Information */}
        <div className="mt-8 text-center text-gray-300">
          <h3 className="text-lg font-semibold">Contact Us</h3>
          <p className="text-sm mt-2">support@Codeta.com</p>
          <p className="text-sm">+1 (555) 013-4663</p>
        </div>

        {/* Social Media Icons */}
        <div className="mt-8 flex justify-center space-x-6">
          {[
            {
              platform: "facebook",
              url: "#",
              icon: "M18 2h-3a4 4 0 00-4 4v3H8v4h3v8h4v-8h3l1-4h-4V6a1 1 0 011-1h3z",
            },
            {
              platform: "twitter",
              url: "#",
              icon: "M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z",
            },
            {
              platform: "linkedin",
              url: "#",
              icon: "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6z M2 9h4v12H2z M4 3a2 2 0 110 4 2 2 0 010-4z",
            },
            {
              platform: "instagram",
              url: "#",
              icon: "M12 2.2A9.8 9.8 0 002.2 12 9.8 9.8 0 0012 21.8 9.8 9.8 0 0021.8 12 9.8 9.8 0 0012 2.2zm0 17.3A7.5 7.5 0 114.5 12 7.5 7.5 0 0112 19.5zm4.5-10.8a1.1 1.1 0 100-2.3 1.1 1.1 0 000 2.3zm-4.5 1.2a4.3 4.3 0 100 8.5 4.3 4.3 0 000-8.5zm0 7a2.7 2.7 0 112.7-2.7 2.7 2.7 0 01-2.7 2.7z",
            },
          ].map(({ platform, url, icon }) => (
            <a
              key={platform}
              href={url}
              className="text-gray-300 hover:text-gray-100 transition-colors duration-200"
            >
              <svg
                className="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d={icon} />
              </svg>
            </a>
          ))}
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t border-gray-700 pt-6 text-center">
          <p className="text-xs text-gray-400">
            &copy; {new Date().getFullYear()} Codeta, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
