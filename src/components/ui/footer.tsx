import { Link } from "react-router-dom";

export function Footer() {
  const travelLinks = [
    { label: "Eco Hotels", href: "/" },
    { label: "Green Destinations", href: "/destinations" },
    { label: "Sustainable Tours", href: "/tours" },
    { label: "Carbon Neutral Travel", href: "/carbon-neutral" },
  ];

  const supportLinks = [
    { label: "Help Center", href: "/help" },
    { label: "Contact Us", href: "/contact" },
    { label: "Book with Confidence", href: "/booking-policy" },
    { label: "Travel Insurance", href: "/insurance" },
  ];

  const companyLinks = [
    { label: "About EcoTravel", href: "/about" },
    { label: "Careers", href: "/careers" },
    { label: "Press", href: "/press" },
    { label: "Privacy Policy", href: "/privacy" },
  ];

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex flex-col space-y-4">
              <div>
                <h3 className="text-xl font-bold">EcoTravel</h3>
                <p className="text-sm text-primary-foreground/80">by National Geographic</p>
              </div>
              <p className="text-sm text-primary-foreground/90 leading-relaxed">
                Sustainable travel for a better planet. Discover eco-certified accommodations 
                that protect our world's most beautiful destinations.
              </p>
            </div>
          </div>

          {/* Travel Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Travel</h4>
            <ul className="space-y-3">
              {travelLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-eco"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-3">
              {supportLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-eco"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Company</h4>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-eco"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider and Copyright */}
        <div className="border-t border-primary-foreground/20 mt-8 pt-8">
          <p className="text-sm text-primary-foreground/70 text-center">
            © 2024 EcoTravel by National Geographic. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}