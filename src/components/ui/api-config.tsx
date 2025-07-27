import { useState } from "react";
import { Settings, Eye, EyeOff } from "lucide-react";
import { Button } from "./button";
import { Input } from "./input";
import { Label } from "./label";
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { Alert, AlertDescription } from "./alert";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./sheet";

interface ApiConfigProps {
  onConfigSave: (config: ApiConfig) => void;
}

interface ApiConfig {
  tripadvisorApiKey: string;
  geocodingApiKey: string;
  geocodingProvider: 'mapbox' | 'api-ninjas';
}

export function ApiConfig({ onConfigSave }: ApiConfigProps) {
  const [config, setConfig] = useState<ApiConfig>({
    tripadvisorApiKey: localStorage.getItem('tripadvisor_api_key') || '',
    geocodingApiKey: localStorage.getItem('geocoding_api_key') || '',
    geocodingProvider: (localStorage.getItem('geocoding_provider') as 'mapbox' | 'api-ninjas') || 'mapbox'
  });
  const [showKeys, setShowKeys] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleSave = () => {
    // Save to localStorage (temporary solution)
    localStorage.setItem('tripadvisor_api_key', config.tripadvisorApiKey);
    localStorage.setItem('geocoding_api_key', config.geocodingApiKey);
    localStorage.setItem('geocoding_provider', config.geocodingProvider);
    
    onConfigSave(config);
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="fixed top-20 right-4 z-40">
          <Settings className="h-4 w-4 mr-2" />
          API Config
        </Button>
      </SheetTrigger>
      
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle>API Configuration</SheetTitle>
        </SheetHeader>
        
        <div className="space-y-6 mt-6">
          <Alert>
            <AlertDescription className="text-sm">
              <strong>Note:</strong> For production, use Supabase to store API keys securely. 
              This is a temporary frontend-only solution.
            </AlertDescription>
          </Alert>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">TripAdvisor API</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="tripadvisor-key">API Key</Label>
                <div className="relative">
                  <Input
                    id="tripadvisor-key"
                    type={showKeys ? "text" : "password"}
                    value={config.tripadvisorApiKey}
                    onChange={(e) => setConfig(prev => ({ 
                      ...prev, 
                      tripadvisorApiKey: e.target.value 
                    }))}
                    placeholder="Enter TripAdvisor API key"
                    className="pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => setShowKeys(!showKeys)}
                  >
                    {showKeys ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Geocoding API</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="provider">Provider</Label>
                <select
                  id="provider"
                  value={config.geocodingProvider}
                  onChange={(e) => setConfig(prev => ({ 
                    ...prev, 
                    geocodingProvider: e.target.value as 'mapbox' | 'api-ninjas'
                  }))}
                  className="w-full px-3 py-2 border border-input rounded-md bg-background"
                >
                  <option value="mapbox">Mapbox</option>
                  <option value="api-ninjas">API Ninjas</option>
                </select>
              </div>

              <div>
                <Label htmlFor="geocoding-key">API Key</Label>
                <div className="relative">
                  <Input
                    id="geocoding-key"
                    type={showKeys ? "text" : "password"}
                    value={config.geocodingApiKey}
                    onChange={(e) => setConfig(prev => ({ 
                      ...prev, 
                      geocodingApiKey: e.target.value 
                    }))}
                    placeholder={`Enter ${config.geocodingProvider === 'mapbox' ? 'Mapbox' : 'API Ninjas'} API key`}
                    className="pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => setShowKeys(!showKeys)}
                  >
                    {showKeys ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-3">
            <Button onClick={handleSave} className="flex-1">
              Save Configuration
            </Button>
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
          </div>

          <div className="text-xs text-muted-foreground space-y-2">
            <p><strong>TripAdvisor API:</strong> Get your key from TripAdvisor Partner Program</p>
            <p><strong>Mapbox:</strong> Get your public token from mapbox.com</p>
            <p><strong>API Ninjas:</strong> Get your key from api.api-ninjas.com</p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}