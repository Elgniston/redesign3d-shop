"use client";

import { CustomizationData } from "@/types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CustomizationFormProps {
    data: CustomizationData;
    onChange: (data: CustomizationData) => void;
}

export function CustomizationForm({ data, onChange }: CustomizationFormProps) {
    const handleChange = (key: keyof CustomizationData, value: string) => {
        onChange({ ...data, [key]: value });
    };

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                        id="name"
                        value={data.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        placeholder="John Doe"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                        id="title"
                        value={data.title}
                        onChange={(e) => handleChange("title", e.target.value)}
                        placeholder="CEO & Founder"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                    <Label htmlFor="phone">Phone (Optional)</Label>
                    <Input
                        id="phone"
                        value={data.phone || ""}
                        onChange={(e) => handleChange("phone", e.target.value)}
                        placeholder="+1 (555) 000-0000"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="email">Email (Optional)</Label>
                    <Input
                        id="email"
                        value={data.email || ""}
                        onChange={(e) => handleChange("email", e.target.value)}
                        placeholder="john@example.com"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                    <Label htmlFor="font">Font</Label>
                    <Select value={data.font} onValueChange={(val) => handleChange("font", val)}>
                        <SelectTrigger id="font">
                            <SelectValue placeholder="Select font" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Inter">Inter</SelectItem>
                            <SelectItem value="Roboto">Roboto</SelectItem>
                            <SelectItem value="Outfit">Outfit</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="color">Color</Label>
                    <Select value={data.color} onValueChange={(val) => handleChange("color", val)}>
                        <SelectTrigger id="color">
                            <SelectValue placeholder="Select color" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Black">Matte Black</SelectItem>
                            <SelectItem value="Blue">Royal Blue</SelectItem>
                            <SelectItem value="Red">Crimson Red</SelectItem>
                            <SelectItem value="Green">Forest Green</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </div>
    );
}
