"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

const stages = [
  "New",
  "Contacted",
  "Qualified",
  "Proposal Sent",
  "Won",
  "Lost",
];

//callback fn to run after a lead is successfully added
export default function AddLeadForm({ onSuccess }) {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    company: "",
    productInterest: "",
    stage: "New",
    followUpDate: new Date(),
  });

  //to validate email and phone number
  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePhone = (phone) => {
    return /^\+?[\d\s-]{10,}$/.test(phone);
  };

  const [errors, setErrors] = useState({
  contact: '',
  // Add other fields as needed
});
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
  if (!formData.contact) {
    newErrors.contact = 'Contact is required';
  } else if (
    !validateEmail(formData.contact) && 
    !validatePhone(formData.contact)
  ) {
    newErrors.contact = 'Enter a valid email or phone number';
  }

  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    return;
  }



    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          followUpDate: formData.followUpDate.toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add lead");
      }

      // Show success toast
      toast({
        title: "Success!",
        description: "Lead added successfully",
      });

      // Reset form
      setFormData({
        name: "",
        contact: "",
        company: "",
        productInterest: "",
        stage: "New",
        followUpDate: new Date(),
      });

      // Call success callback if provided
      if (onSuccess) onSuccess();
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-4 bg-white rounded-lg shadow"
    >
      <Input
        placeholder="Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
      />
      <Input
        placeholder="Contact (email/phone) *"
        value={formData.contact}
        required
        onChange={(e) => {
          setFormData({ ...formData, contact: e.target.value });
          setErrors({ ...errors, contact: "" });
        }}
        className={errors.contact ? "border-red-500" : ""}
      />
      {errors.contact && (
        <p className="text-sm text-red-500 mt-1">{errors.contact}</p>
      )}


      <Input
        placeholder="Company"
        value={formData.company}
        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
      />
      <Input
        placeholder="Product Interest"
        value={formData.productInterest}
        onChange={(e) =>
          setFormData({ ...formData, productInterest: e.target.value })
        }
      />
      <div className="flex items-center gap-2">
        <span>Stage:</span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">{formData.stage}</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {stages.map((stage) => (
              <DropdownMenuItem
                key={stage}
                onClick={() => setFormData({ ...formData, stage })}
              >
                {stage}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div>
        <span>Follow-up Date: </span>
        <Calendar
          mode="single"
          selected={formData.followUpDate}
          onSelect={(date) => setFormData({ ...formData, followUpDate: date })}
        />
      </div>
      <Button type="submit">Add Lead</Button>
    </form>
  );
}
