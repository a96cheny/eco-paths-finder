import { CheckCircle, Leaf, Heart } from "lucide-react";

export function WhyEcoTravel() {
  const features = [
    {
      icon: CheckCircle,
      title: "Verified Green",
      description: "Every hotel is independently certified for environmental standards and sustainability practices, ensuring your stay makes a positive impact."
    },
    {
      icon: Leaf,
      title: "Planet Positive",
      description: "Choose accommodations that actively contribute to conservation efforts, renewable energy usage, and local ecosystem protection."
    },
    {
      icon: Heart,
      title: "Meaningful Travel",
      description: "Connect with local communities, support fair trade practices, and create memorable experiences that benefit both you and your destination."
    }
  ];

  return (
    <section className="py-16 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Why Eco Travel?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Travel responsibly with accommodations that care for our planet and communities
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-success/10 text-success rounded-full mb-6 group-hover:bg-success/20 transition-eco">
                <feature.icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}