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
import { format } from "date-fns"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"


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
    contact: "",
    // Add other fields as needed
  });
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.contact) {
      newErrors.contact = "Contact is required";
    } else if (
      !validateEmail(formData.contact) &&
      !validatePhone(formData.contact)
    ) {
      newErrors.contact = "Enter a valid email or phone number";
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
        const responseClone = response.clone();


      if (!response.ok) {
        throw new Error("Failed to add lead");
      }
       
const newLead = await response.json(); 
     
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
      if (onSuccess)  onSuccess(responseClone);
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
      {/* <div>
        <span>Follow-up Date: </span>
        <Calendar
          mode="single"
          selected={formData.followUpDate}
          onSelect={(date) => setFormData({ ...formData, followUpDate: date })}
        />
      </div> */}


<div className="grid gap-2">
      <span className="text-sm font-medium">Follow-up Date</span>
      
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-[240px] justify-start text-left font-normal",
              !formData.followUpDate && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {formData.followUpDate ? (
              format(formData.followUpDate, "PPP")
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={formData.followUpDate}
            onSelect={(date) =>
              setFormData({ ...formData, followUpDate: date })
            }
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>


      <Button type="submit">Add Lead</Button>
    </form>
  );
}
