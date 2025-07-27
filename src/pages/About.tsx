import { Leaf, Globe, Heart, Shield, Award, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const features = [
  {
    icon: Shield,
    title: "Verified Green",
    description: "Hotels meet basic environmental standards including energy efficiency and waste reduction programs."
  },
  {
    icon: Award,
    title: "Planet Positive",
    description: "Properties that go beyond sustainability to actively contribute to environmental restoration and conservation."
  },
  {
    icon: Heart,
    title: "Meaningful Travel",
    description: "Connect with local communities and cultures while supporting responsible tourism practices."
  }
];

const values = [
  {
    icon: Leaf,
    title: "Environmental Stewardship",
    description: "We partner only with hotels that demonstrate genuine commitment to reducing their environmental footprint through renewable energy, water conservation, and waste reduction."
  },
  {
    icon: Globe,
    title: "Global Impact",
    description: "Every booking through EcoTravel contributes to global sustainability initiatives and supports local communities in tourist destinations worldwide."
  },
  {
    icon: Users,
    title: "Community First",
    description: "We prioritize hotels that engage with and benefit local communities, creating authentic travel experiences while supporting economic development."
  }
];

export default function About() {
  return (
    <div className="min-h-screen nature-gradient">
      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-foreground mb-6">
            Why Eco Travel?
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Partner with National Geographic to discover accommodations that care for our planet while delivering exceptional travel experiences.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
            Our Certification Standards
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="shadow-eco-card hover:shadow-eco-modal transition-eco">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <feature.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4 bg-card">
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-eco-card">
            <CardContent className="p-12">
              <h2 className="text-3xl font-bold text-center mb-8 text-foreground">
                Our Sustainability Mission
              </h2>
              <div className="prose prose-lg max-w-none text-muted-foreground">
                <p className="text-center mb-8 text-lg">
                  EcoTravel by National Geographic is more than a booking platform—we're a movement toward responsible tourism that protects the places we love to visit.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                  {values.map((value, index) => (
                    <div key={index} className="text-center">
                      <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-success/10 flex items-center justify-center">
                        <value.icon className="h-6 w-6 text-success" />
                      </div>
                      <h3 className="text-lg font-semibold mb-3 text-foreground">
                        {value.title}
                      </h3>
                      <p className="text-sm leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-foreground">
            Ready to Travel Responsibly?
          </h2>
          <p className="text-muted-foreground mb-8">
            Join thousands of conscious travelers who choose eco-certified accommodations for their adventures.
          </p>
          <Link to="/">
            <Button className="eco-gradient text-white px-8 py-3 text-lg hover:opacity-90 transition-eco">
              Start Your Eco Journey
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t bg-card">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <Link to="/" className="text-muted-foreground hover:text-primary transition-eco">
              Search
            </Link>
            <Link to="/about" className="text-muted-foreground hover:text-primary transition-eco">
              About
            </Link>
            <a href="#" className="text-muted-foreground hover:text-primary transition-eco">
              FAQ
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-eco">
              Contact
            </a>
          </div>
          <div className="text-center mt-8 pt-8 border-t">
            <p className="text-muted-foreground text-sm">
              © 2024 EcoTravel by National Geographic. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}