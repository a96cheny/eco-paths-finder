import { SearchForm } from "./search-form";
import heroImage from "@/assets/hero-eco-travel.jpg";

interface HeroSectionProps {
  onSearch: (searchData: any) => void;
}

export function HeroSection({ onSearch }: HeroSectionProps) {
  return (
    <section 
      id="search"
      className="relative min-h-screen flex items-center justify-center px-4"
    >
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 w-full max-w-6xl text-center">
        <div className="mb-12">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Where would you like to travel?
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8">
            Eco-certified hotels only
          </p>
        </div>
        
        {/* Search Form */}
        <div className="max-w-4xl mx-auto">
          <SearchForm onSearch={onSearch} />
        </div>
      </div>
    </section>
  );
}