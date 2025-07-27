import { Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen nature-gradient flex items-center justify-center px-4">
      <Card className="max-w-md w-full shadow-eco-modal">
        <CardContent className="p-12 text-center">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
            <Home className="h-12 w-12 text-muted-foreground" />
          </div>
          
          <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-foreground mb-4">
            Oops! Page Not Found
          </h2>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            The page you're looking for seems to have wandered off the beaten path. 
            Let's get you back to discovering amazing eco-friendly destinations.
          </p>
          
          <div className="space-y-3">
            <Link to="/" className="block">
              <Button className="w-full eco-gradient text-white hover:opacity-90 transition-eco">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Return to Home
              </Button>
            </Link>
            <Link to="/about" className="block">
              <Button variant="outline" className="w-full">
                Learn About EcoTravel
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}