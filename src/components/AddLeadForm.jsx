// "use client";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Calendar } from "@/components/ui/calendar";
// import {
//   DropdownMenu,
//   DropdownMenuTrigger,
//   DropdownMenuContent,
//   DropdownMenuItem,
// } from "@/components/ui/dropdown-menu";
// import { useState } from "react";
// import { toast } from "@/hooks/use-toast";
// import { format } from "date-fns"
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
// import { CalendarIcon } from "lucide-react"
// import { cn } from "@/lib/utils"


// const stages = [
//   "New",
//   "Contacted",
//   "Qualified",
//   "Proposal Sent",
//   "Won",
//   "Lost",
// ];

// //callback fn to run after a lead is successfully added
// export default function AddLeadForm({ onSuccess }) {
//   const [formData, setFormData] = useState({
//     name: "",
//     contact: "",
//     company: "",
//     productInterest: "",
//     stage: "New",
//     followUpDate: new Date(),
//   });

//   //to validate email and phone number
//   const validateEmail = (email) => {
//     return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
//   };

//   const validatePhone = (phone) => {
//     return /^\+?[\d\s-]{10,}$/.test(phone);
//   };

//   const [errors, setErrors] = useState({
//     contact: "",
//     // Add other fields as needed
//   });
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const newErrors = {};
//     if (!formData.contact) {
//       newErrors.contact = "Contact is required";
//     } else if (
//       !validateEmail(formData.contact) &&
//       !validatePhone(formData.contact)
//     ) {
//       newErrors.contact = "Enter a valid email or phone number";
//     }

//     if (Object.keys(newErrors).length > 0) {
//       setErrors(newErrors);
//       return;
//     }

//     try {
//       const response = await fetch("/api/leads", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           ...formData,
//           followUpDate: formData.followUpDate.toISOString(),
//         }),
//       });
//         const responseClone = response.clone();


//       if (!response.ok) {
//         throw new Error("Failed to add lead");
//       }
       
// const newLead = await response.json(); 
     
//       // Show success toast
//       toast({
//         title: "Success!",
//         description: "Lead added successfully",
        
//       });

//       // Reset form
//       setFormData({
//         name: "",
//         contact: "",
//         company: "",
//         productInterest: "",
//         stage: "New",
//         followUpDate: new Date(),
//       });

//       // Call success callback if provided
//       if (onSuccess)  onSuccess(responseClone);
//     } catch (error) {
//       toast({
//         title: "Error",
//         description: error.message,
//         variant: "destructive",
//       });
//     }
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="space-y-4 p-4 bg-white rounded-lg shadow"
//     >
//       <Input
//         placeholder="Name"
//         value={formData.name}
//         onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//         required
//       />
//       <Input
//         placeholder="Contact (email/phone) *"
//         value={formData.contact}
//         required
//         onChange={(e) => {
//           setFormData({ ...formData, contact: e.target.value });
//           setErrors({ ...errors, contact: "" });
//         }}
//         className={errors.contact ? "border-red-500" : ""}
//       />
//       {errors.contact && (
//         <p className="text-sm text-red-500 mt-1">{errors.contact}</p>
//       )}

//       <Input
//         placeholder="Company"
//         value={formData.company}
//         onChange={(e) => setFormData({ ...formData, company: e.target.value })}
//       />
//       <Input
//         placeholder="Product Interest"
//         value={formData.productInterest}
//         onChange={(e) =>
//           setFormData({ ...formData, productInterest: e.target.value })
//         }
//       />
//       <div className="flex items-center gap-2">
//         <span>Stage:</span>
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <Button variant="outline">{formData.stage}</Button>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent>
//             {stages.map((stage) => (
//               <DropdownMenuItem
//                 key={stage}
//                 onClick={() => setFormData({ ...formData, stage })}
//               >
//                 {stage}
//               </DropdownMenuItem>
//             ))}
//           </DropdownMenuContent>
//         </DropdownMenu>
//       </div>
//       {/* <div>
//         <span>Follow-up Date: </span>
//         <Calendar
//           mode="single"
//           selected={formData.followUpDate}
//           onSelect={(date) => setFormData({ ...formData, followUpDate: date })}
//         />
//       </div> */}


// <div className="grid gap-2">
//       <span className="text-sm font-medium">Follow-up Date</span>
      
//       <Popover>
//         <PopoverTrigger asChild>
//           <Button
//             variant={"outline"}
//             className={cn(
//               "w-[240px] justify-start text-left font-normal",
//               !formData.followUpDate && "text-muted-foreground"
//             )}
//           >
//             <CalendarIcon className="mr-2 h-4 w-4" />
//             {formData.followUpDate ? (
//               format(formData.followUpDate, "PPP")
//             ) : (
//               <span>Pick a date</span>
//             )}
//           </Button>
//         </PopoverTrigger>
//         <PopoverContent className="w-auto p-0">
//           <Calendar
//             mode="single"
//             selected={formData.followUpDate}
//             onSelect={(date) =>
//               setFormData({ ...formData, followUpDate: date })
//             }
//             initialFocus
//           />
//         </PopoverContent>
//       </Popover>
//     </div>


//       <Button type="submit">Add Lead</Button>
//     </form>
//   );
// }


"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, ChevronDown, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
const stages = [
  { value: "New", color: "bg-blue-100 text-blue-800" },
  { value: "Contacted", color: "bg-purple-100 text-purple-800" },
  { value: "Qualified", color: "bg-green-100 text-green-800" },
  { value: "Proposal Sent", color: "bg-yellow-100 text-yellow-800" },
  { value: "Won", color: "bg-emerald-100 text-emerald-800" },
  { value: "Lost", color: "bg-red-100 text-red-800" },
];

export default function AddLeadForm({ onSuccess }) {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    company: "",
    productInterest: "",
    stage: "New",
    followUpDate: new Date(),
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({ contact: "" });

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhone = (phone) => /^\+?[\d\s-]{10,}$/.test(phone);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const newErrors = {};
    if (!formData.contact) {
      newErrors.contact = "Contact is required";
    } else if (!validateEmail(formData.contact) && !validatePhone(formData.contact)) {
      newErrors.contact = "Enter a valid email or phone number";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          followUpDate: formData.followUpDate.toISOString(),
        }),
      });

      if (!response.ok) throw new Error("Failed to add lead");

      const newLead = await response.json();

      toast({
        title: "Success!",
        description: "Lead added successfully",
        action: (
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigator.clipboard.writeText(newLead.id)}
          >
            Copy ID
          </Button>
        ),
      });

      setFormData({
        name: "",
        contact: "",
        company: "",
        productInterest: "",
        stage: "New",
        followUpDate: new Date(),
      });

      if (onSuccess) onSuccess(newLead);
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentStage = stages.find(s => s.value === formData.stage);

  return (
    <Card className="border-0 shadow-none">
      <CardHeader>
        <CardTitle className="text-xl">Create New Lead</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              placeholder="John Doe"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contact">Contact <span className="text-red-500">*</span></Label>
            <Input
              id="contact"
              placeholder="email@example.com or +1234567890"
              value={formData.contact}
              onChange={(e) => {
                setFormData({ ...formData, contact: e.target.value });
                setErrors({ ...errors, contact: "" });
              }}
              className={errors.contact ? "border-red-500" : ""}
              required
            />
            {errors.contact && (
              <p className="text-sm text-red-500">{errors.contact}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="company">Company</Label>
            <Input
              id="company"
              placeholder="Acme Inc."
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="productInterest">Product Interest</Label>
            <Input
              id="productInterest"
              placeholder="e.g. CRM Software"
              value={formData.productInterest}
              onChange={(e) => setFormData({ ...formData, productInterest: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label>Stage</Label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`h-2 w-2 rounded-full ${currentStage?.color}`} />
                    {formData.stage}
                  </div>
                  <ChevronDown className="h-4 w-4 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                {stages.map((stage) => (
                  <DropdownMenuItem
                    key={stage.value}
                    onClick={() => setFormData({ ...formData, stage: stage.value })}
                  >
                    <span className={`h-2 w-2 rounded-full mr-2 ${stage.color}`} />
                    {stage.value}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="space-y-2">
            <Label>Follow-up Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
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
                  onSelect={(date) => setFormData({ ...formData, followUpDate: date })}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Adding...
              </>
            ) : (
              "Add Lead"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}