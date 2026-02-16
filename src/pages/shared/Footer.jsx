import React from "react";
import logo from "../../assets/jobs-logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    services: [
      { name: "Job Search", href: "#", icon: "🔍" },
      { name: "Resume Builder", href: "#", icon: "📝" },
      { name: "Career Advice", href: "#", icon: "💡" },
      { name: "Company Reviews", href: "#", icon: "⭐" },
      { name: "Salary Insights", href: "#", icon: "💰" },
    ],
    company: [
      { name: "About Us", href: "/about", icon: "🏢" },
      { name: "Contact Us", href: "/contact", icon: "📞" },
      { name: "Careers", href: "/careers", icon: "🚀" },
      { name: "Blog", href: "/blog", icon: "📰" },
      { name: "Press Kit", href: "/press", icon: "📋" },
    ],
    legal: [
      { name: "Terms of Service", href: "/terms", icon: "📜" },
      { name: "Privacy Policy", href: "/privacy", icon: "🔒" },
      { name: "Cookie Policy", href: "/cookies", icon: "🍪" },
      { name: "Accessibility", href: "/accessibility", icon: "♿" },
      { name: "Security", href: "/security", icon: "🛡️" },
    ],
    resources: [
      { name: "Help Center", href: "/help", icon: "❓" },
      { name: "FAQs", href: "/faqs", icon: "📌" },
      { name: "Community", href: "/community", icon: "👥" },
      { name: "Partners", href: "/partners", icon: "🤝" },
      { name: "Developers", href: "/developers", icon: "💻" },
    ],
  };

  const socialLinks = [
    { name: "Facebook", icon: "📘", href: "#", color: "hover:text-blue-600" },
    { name: "Twitter", icon: "🐦", href: "#", color: "hover:text-blue-400" },
    { name: "LinkedIn", icon: "🔗", href: "#", color: "hover:text-blue-700" },
    { name: "Instagram", icon: "📷", href: "#", color: "hover:text-pink-600" },
    { name: "YouTube", icon: "▶️", href: "#", color: "hover:text-red-600" },
  ];

  return (
    <footer className="bg-linear-to-br from-gray-900 to-gray-800 text-gray-300">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-12 mt-12 md:py-16">
        {/* Top Section with Logo and Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pb-8 border-b border-gray-700">
          <div className="flex items-start gap-4">
            <div className="bg-white p-3 rounded-xl shadow-lg">
              <img
                className="w-16 h-16 object-contain"
                src={logo}
                alt="CareerConnect Logo"
              />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">
                CareerConnect
              </h3>
              <p className="text-gray-400 max-w-md">
                Bridging talent with opportunity since {currentYear - 33}. Join
                millions of job seekers and employers who trust us for their
                career journey.
              </p>
              <div className="flex gap-4 mt-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className={`text-2xl text-gray-400 ${social.color} transition-transform hover:scale-110`}
                    aria-label={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="lg:justify-self-end">
            <h4 className="text-lg font-semibold text-white mb-3">
              Stay Updated
            </h4>
            <p className="text-gray-400 mb-3">
              Get the latest jobs and career tips delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400 flex-1"
              />
              <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Links Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 py-12">
          {/* Services */}
          <div>
            <h5 className="text-white font-semibold text-lg mb-4 flex items-center gap-2">
              <span className="w-8 h-1 bg-blue-500 rounded-full"></span>
              Services
            </h5>
            <ul className="space-y-3">
              {footerLinks.services.map((item, index) => (
                <li key={index}>
                  <a
                    href={item.href}
                    className="text-gray-400 hover:text-blue-400 transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span className="group-hover:translate-x-1 transition-transform duration-200">
                      {item.name}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h5 className="text-white font-semibold text-lg mb-4 flex items-center gap-2">
              <span className="w-8 h-1 bg-blue-500 rounded-full"></span>
              Company
            </h5>
            <ul className="space-y-3">
              {footerLinks.company.map((item, index) => (
                <li key={index}>
                  <a
                    href={item.href}
                    className="text-gray-400 hover:text-blue-400 transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span className="group-hover:translate-x-1 transition-transform duration-200">
                      {item.name}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h5 className="text-white font-semibold text-lg mb-4 flex items-center gap-2">
              <span className="w-8 h-1 bg-blue-500 rounded-full"></span>
              Resources
            </h5>
            <ul className="space-y-3">
              {footerLinks.resources.map((item, index) => (
                <li key={index}>
                  <a
                    href={item.href}
                    className="text-gray-400 hover:text-blue-400 transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span className="group-hover:translate-x-1 transition-transform duration-200">
                      {item.name}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h5 className="text-white font-semibold text-lg mb-4 flex items-center gap-2">
              <span className="w-8 h-1 bg-blue-500 rounded-full"></span>
              Legal
            </h5>
            <ul className="space-y-3">
              {footerLinks.legal.map((item, index) => (
                <li key={index}>
                  <a
                    href={item.href}
                    className="text-gray-400 hover:text-blue-400 transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span className="group-hover:translate-x-1 transition-transform duration-200">
                      {item.name}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section with Copyright and Badges */}
        <div className="pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm text-center md:text-left">
              © {currentYear} CareerConnect. All rights reserved.
              <span className="block md:inline md:ml-2">
                Made with ❤️ for job seekers worldwide.
              </span>
            </p>

            {/* Trust Badges */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <span className="text-green-400">✓</span>
                <span>Secure</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <span className="text-green-400">✓</span>
                <span>Privacy Protected</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <span className="text-green-400">✓</span>
                <span>100% Verified</span>
              </div>
            </div>
          </div>

          {/* App Store Badges */}
          <div className="flex justify-center md:justify-start gap-4 mt-6">
            <a href="#" className="hover:opacity-80 transition-opacity">
              <img
                src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                alt="Download on App Store"
                className="h-10"
              />
            </a>
            <a href="#" className="hover:opacity-80 transition-opacity">
              <img
                src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
                alt="Get it on Google Play"
                className="h-10"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
