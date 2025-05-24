'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { useState } from 'react';
import { toast } from '@/hooks/use-toast';

const stages = ['New', 'Contacted', 'Qualified', 'Proposal Sent', 'Won', 'Lost'];

//callback fn to run after a lead is successfully added
export default function AddLeadForm({ onSuccess }) {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    company: '',
    productInterest: '',
    stage: 'New',
    followUpDate: new Date()
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          followUpDate: formData.followUpDate.toISOString()
        })
      });

      if (!response.ok) {
        throw new Error('Failed to add lead');
      }

      // Show success toast
      toast({
        title: 'Success!',
        description: 'Lead added successfully',
      });

      // Reset form
      setFormData({
        name: '',
        contact: '',
        company: '',
        productInterest: '',
        stage: 'New',
        followUpDate: new Date()
      });

      // Call success callback if provided
      if (onSuccess) onSuccess();

    } catch (error) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive'
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white rounded-lg shadow">
      <Input 
        placeholder="Name" 
        value={formData.name} 
        onChange={(e) => setFormData({...formData, name: e.target.value})}
        required
      />
      <Input 
        placeholder="Contact (email/phone)" 
        value={formData.contact} 
        onChange={(e) => setFormData({...formData, contact: e.target.value})}
        required
      />
      <Input 
        placeholder="Company" 
        value={formData.company} 
        onChange={(e) => setFormData({...formData, company: e.target.value})}
      />
      <Input 
        placeholder="Product Interest" 
        value={formData.productInterest} 
        onChange={(e) => setFormData({...formData, productInterest: e.target.value})}
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
                onClick={() => setFormData({...formData, stage})}
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
          onSelect={(date) => setFormData({...formData, followUpDate: date})}
        />
      </div>
      <Button type="submit">Add Lead</Button>
    </form>
  );
}

