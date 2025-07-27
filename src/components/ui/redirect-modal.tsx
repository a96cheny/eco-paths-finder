import { useEffect, useState } from "react";
import { X, ExternalLink, CheckCircle } from "lucide-react";
import { Button } from "./button";
import { Badge } from "./badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./dialog";

interface RedirectModalProps {
  isOpen: boolean;
  onClose: () => void;
  hotel: {
    name: string;
    certification: string;
    price: number;
  } | null;
}

const getCertificationClass = (certification: string) => {
  switch (certification) {
    case "Gold":
      return "certification-gold";
    case "Silver":
      return "certification-silver";
    default:
      return "certification-green";
  }
};

export function RedirectModal({ isOpen, onClose, hotel }: RedirectModalProps) {
  const [countdown, setCountdown] = useState(3);
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    if (isOpen && hotel) {
      setCountdown(3);
      setIsRedirecting(false);
      
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            setIsRedirecting(true);
            clearInterval(timer);
            // Simulate redirect to TripAdvisor
            setTimeout(() => {
              onClose();
              window.open(`https://www.tripadvisor.com/Hotels-g187791-${hotel.name.replace(/\s+/g, '_')}-Hotels.html`, '_blank');
            }, 500);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isOpen, hotel, onClose]);

  if (!hotel) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md shadow-eco-modal">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Redirecting to TripAdvisor</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              disabled={isRedirecting}
            >
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-2">{hotel.name}</h3>
            <div className="flex items-center justify-center gap-4 mb-4">
              <Badge className={`${getCertificationClass(hotel.certification)} px-3 py-1`}>
                <CheckCircle className="h-3 w-3 mr-1" />
                {hotel.certification}
              </Badge>
              <div className="text-2xl font-bold text-primary">
                ${hotel.price}
                <span className="text-sm text-muted-foreground font-normal">/night</span>
              </div>
            </div>
          </div>

          <div className="text-center space-y-4">
            {!isRedirecting ? (
              <>
                <p className="text-muted-foreground">
                  You'll be redirected to TripAdvisor to complete your booking in:
                </p>
                <div className="text-4xl font-bold text-primary">
                  {countdown}
                </div>
                <div className="flex justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              </>
            ) : (
              <>
                <p className="text-muted-foreground">
                  Redirecting you to TripAdvisor...
                </p>
                <div className="flex items-center justify-center gap-2 text-success">
                  <CheckCircle className="h-5 w-5" />
                  <span>Opening TripAdvisor</span>
                  <ExternalLink className="h-4 w-4" />
                </div>
                <div className="flex justify-center">
                  <div className="animate-pulse rounded-full h-8 w-8 bg-success"></div>
                </div>
              </>
            )}
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={onClose}
              disabled={isRedirecting}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                window.open(`https://www.tripadvisor.com/Hotels-g187791-${hotel.name.replace(/\s+/g, '_')}-Hotels.html`, '_blank');
                onClose();
              }}
              className="flex-1 eco-gradient text-white"
              disabled={isRedirecting}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Go Now
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}