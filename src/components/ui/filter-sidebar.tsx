import { useState } from "react";
import { X, Filter, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "./button";
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { Checkbox } from "./checkbox";
import { Label } from "./label";
import { Slider } from "./slider";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./collapsible";

interface FilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onFiltersChange: (filters: any) => void;
}

const certificationOptions = [
  { value: "Gold", label: "Gold Certified" },
  { value: "Silver", label: "Silver Certified" },
  { value: "Verified Green", label: "Verified Green" },
];

const amenityOptions = [
  "EV Charging",
  "Solar Powered",
  "Water Conservation",
  "Organic Food",
  "Bike Rentals",
  "Recycling Program",
  "Green Building",
  "Local Sourcing",
];

export function FilterSidebar({ isOpen, onClose, onFiltersChange }: FilterSidebarProps) {
  const [certifications, setCertifications] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [amenities, setAmenities] = useState<string[]>([]);
  const [certOpen, setCertOpen] = useState(true);
  const [priceOpen, setPriceOpen] = useState(true);
  const [amenityOpen, setAmenityOpen] = useState(true);

  const handleCertificationChange = (cert: string, checked: boolean) => {
    const updated = checked
      ? [...certifications, cert]
      : certifications.filter((c) => c !== cert);
    setCertifications(updated);
    updateFilters({ certifications: updated, priceRange, amenities });
  };

  const handleAmenityChange = (amenity: string, checked: boolean) => {
    const updated = checked
      ? [...amenities, amenity]
      : amenities.filter((a) => a !== amenity);
    setAmenities(updated);
    updateFilters({ certifications, priceRange, amenities: updated });
  };

  const updateFilters = (filters: any) => {
    onFiltersChange(filters);
  };

  const clearAllFilters = () => {
    setCertifications([]);
    setPriceRange([0, 500]);
    setAmenities([]);
    updateFilters({ certifications: [], priceRange: [0, 500], amenities: [] });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 md:relative md:inset-auto">
      {/* Mobile overlay */}
      <div 
        className="fixed inset-0 bg-background/80 backdrop-blur-sm md:hidden" 
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <Card className="relative z-10 h-full w-80 md:w-full shadow-eco-modal md:shadow-eco-card">
        <CardHeader className="border-b">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filters
            </CardTitle>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={clearAllFilters}
              >
                Clear All
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="md:hidden"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-0 overflow-y-auto">
          {/* Certification Level */}
          <Collapsible open={certOpen} onOpenChange={setCertOpen}>
            <CollapsibleTrigger className="flex items-center justify-between w-full p-4 hover:bg-muted/50 transition-eco">
              <span className="font-medium">Certification Level</span>
              {certOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </CollapsibleTrigger>
            <CollapsibleContent className="px-4 pb-4">
              <div className="space-y-3">
                {certificationOptions.map((option) => (
                  <div key={option.value} className="flex items-center space-x-2">
                    <Checkbox
                      id={option.value}
                      checked={certifications.includes(option.value)}
                      onCheckedChange={(checked) =>
                        handleCertificationChange(option.value, checked as boolean)
                      }
                    />
                    <Label htmlFor={option.value} className="text-sm">
                      {option.label}
                    </Label>
                  </div>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Price Range */}
          <Collapsible open={priceOpen} onOpenChange={setPriceOpen}>
            <CollapsibleTrigger className="flex items-center justify-between w-full p-4 hover:bg-muted/50 transition-eco border-t">
              <span className="font-medium">Price Range</span>
              {priceOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </CollapsibleTrigger>
            <CollapsibleContent className="px-4 pb-4">
              <div className="space-y-4">
                <Slider
                  value={priceRange}
                  onValueChange={(value) => {
                    setPriceRange(value);
                    updateFilters({ certifications, priceRange: value, amenities });
                  }}
                  max={500}
                  step={25}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}+</span>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Green Amenities */}
          <Collapsible open={amenityOpen} onOpenChange={setAmenityOpen}>
            <CollapsibleTrigger className="flex items-center justify-between w-full p-4 hover:bg-muted/50 transition-eco border-t">
              <span className="font-medium">Green Amenities</span>
              {amenityOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </CollapsibleTrigger>
            <CollapsibleContent className="px-4 pb-4">
              <div className="space-y-3">
                {amenityOptions.map((amenity) => (
                  <div key={amenity} className="flex items-center space-x-2">
                    <Checkbox
                      id={amenity}
                      checked={amenities.includes(amenity)}
                      onCheckedChange={(checked) =>
                        handleAmenityChange(amenity, checked as boolean)
                      }
                    />
                    <Label htmlFor={amenity} className="text-sm">
                      {amenity}
                    </Label>
                  </div>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>
        </CardContent>
      </Card>
    </div>
  );
}