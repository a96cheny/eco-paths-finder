import { useState } from "react";
import { Plus, Edit, Trash2, Save, X, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface Hotel {
  id: string;
  tripAdvisorId: string;
  name: string;
  certification: "Gold" | "Silver" | "Verified Green";
  description: string;
}

const initialHotels: Hotel[] = [
  {
    id: "1",
    tripAdvisorId: "TA001",
    name: "EcoLodge Mountain Retreat",
    certification: "Gold",
    description: "Luxury eco-lodge powered entirely by renewable energy, featuring locally sourced organic dining and carbon-neutral operations.",
  },
  {
    id: "2", 
    tripAdvisorId: "TA002",
    name: "Green Haven Resort",
    certification: "Silver",
    description: "Sustainable resort with rainwater harvesting, organic gardens, and comprehensive recycling programs.",
  },
  {
    id: "3",
    tripAdvisorId: "TA003", 
    name: "Nature's Rest Inn",
    certification: "Verified Green",
    description: "Charming inn committed to environmental stewardship with solar heating and local farm partnerships.",
  },
];

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

export default function AdminDashboard() {
  const [hotels, setHotels] = useState<Hotel[]>(initialHotels);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newHotel, setNewHotel] = useState<{
    tripAdvisorId: string;
    name: string;
    certification: "Gold" | "Silver" | "Verified Green";
    description: string;
  }>({
    tripAdvisorId: "",
    name: "",
    certification: "Verified Green",
    description: "",
  });

  const handleEdit = (id: string) => {
    setEditingId(id);
  };

  const handleSave = (id: string, updatedData: Partial<Hotel>) => {
    setHotels(hotels.map(hotel => 
      hotel.id === id ? { ...hotel, ...updatedData } : hotel
    ));
    setEditingId(null);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this hotel?")) {
      setHotels(hotels.filter(hotel => hotel.id !== id));
    }
  };

  const handleAddHotel = () => {
    if (newHotel.tripAdvisorId && newHotel.name && newHotel.description) {
      const hotel: Hotel = {
        id: Date.now().toString(),
        ...newHotel,
      };
      setHotels([...hotels, hotel]);
      setNewHotel({
        tripAdvisorId: "",
        name: "",
        certification: "Verified Green",
        description: "",
      });
      setShowAddModal(false);
    }
  };

  return (
    <div className="min-h-screen nature-gradient py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <Card className="shadow-eco-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-3xl font-bold">Hotel Management</CardTitle>
                <p className="text-muted-foreground mt-2">
                  Manage eco-certified hotels and their certification levels
                </p>
              </div>
              <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
                <DialogTrigger asChild>
                  <Button className="eco-gradient text-white">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Hotel
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Add New Hotel</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="tripAdvisorId">TripAdvisor ID</Label>
                      <Input
                        id="tripAdvisorId"
                        value={newHotel.tripAdvisorId}
                        onChange={(e) => setNewHotel({...newHotel, tripAdvisorId: e.target.value})}
                        placeholder="TA004"
                      />
                    </div>
                    <div>
                      <Label htmlFor="name">Hotel Name</Label>
                      <Input
                        id="name"
                        value={newHotel.name}
                        onChange={(e) => setNewHotel({...newHotel, name: e.target.value})}
                        placeholder="Hotel Name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="certification">Certification Level</Label>
                      <Select
                        value={newHotel.certification}
                        onValueChange={(value: "Gold" | "Silver" | "Verified Green") => 
                          setNewHotel({...newHotel, certification: value})
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Gold">Gold</SelectItem>
                          <SelectItem value="Silver">Silver</SelectItem>
                          <SelectItem value="Verified Green">Verified Green</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={newHotel.description}
                        onChange={(e) => setNewHotel({...newHotel, description: e.target.value})}
                        placeholder="Hotel description..."
                        rows={3}
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={handleAddHotel} className="flex-1">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Add Hotel
                      </Button>
                      <Button variant="outline" onClick={() => setShowAddModal(false)} className="flex-1">
                        Cancel
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>TripAdvisor ID</TableHead>
                  <TableHead>Hotel Name</TableHead>
                  <TableHead>Certification</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {hotels.map((hotel) => (
                  <TableRow key={hotel.id}>
                    <TableCell className="font-mono">{hotel.tripAdvisorId}</TableCell>
                    <TableCell>
                      {editingId === hotel.id ? (
                        <Input
                          defaultValue={hotel.name}
                          onBlur={(e) => handleSave(hotel.id, { name: e.target.value })}
                          className="min-w-0"
                        />
                      ) : (
                        <span className="font-medium">{hotel.name}</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {editingId === hotel.id ? (
                        <Select
                          defaultValue={hotel.certification}
                          onValueChange={(value: "Gold" | "Silver" | "Verified Green") => 
                            handleSave(hotel.id, { certification: value })
                          }
                        >
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Gold">Gold</SelectItem>
                            <SelectItem value="Silver">Silver</SelectItem>
                            <SelectItem value="Verified Green">Verified Green</SelectItem>
                          </SelectContent>
                        </Select>
                      ) : (
                        <Badge className={`${getCertificationClass(hotel.certification)} px-2 py-1`}>
                          {hotel.certification}
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="max-w-md">
                      {editingId === hotel.id ? (
                        <Textarea
                          defaultValue={hotel.description}
                          onBlur={(e) => handleSave(hotel.id, { description: e.target.value })}
                          rows={2}
                          className="min-w-0"
                        />
                      ) : (
                        <p className="line-clamp-2 text-sm">{hotel.description}</p>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex gap-2 justify-end">
                        {editingId === hotel.id ? (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setEditingId(null)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        ) : (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(hotel.id)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        )}
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDelete(hotel.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}