"use client";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FolderOpen } from "lucide-react";

const stages = [
  "New",
  "Contacted",
  "Qualified",
  "Proposal Sent",
  "Won",
  "Lost",
];

export default function LeadKanban({ leads: initialLeads, onCreateOrder }) {
  const { toast } = useToast();
  const [leads, setLeads] = useState(initialLeads);

  const handleDragStart = (e, leadId) => {
    e.dataTransfer.setData("leadId", leadId);
    e.currentTarget.classList.add("opacity-50", "ring-2", "ring-primary");
  };

  const handleDragEnd = (e) => {
    e.currentTarget.classList.remove("opacity-50", "ring-2", "ring-primary");
  };

  const handleDrop = async (e, newStage) => {
    e.preventDefault();
    const leadId = e.dataTransfer.getData("leadId");
    //optimistic ui update
    try {
      setLeads((prev) =>
        prev.map((lead) =>
          lead._id === leadId ? { ...lead, stage: newStage } : lead
        )
      );

      const res = await fetch(`/api/leads/${leadId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stage: newStage }),
      });

      if (!res.ok) throw new Error("Update failed");
      if (newStage === "Won") await onCreateOrder(leadId);
      if (newStage === "Won") {
        const wonLead = leads.find(lead => lead._id === leadId);
        
        if (wonLead?.contact && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(wonLead.contact)) {
          try {
            await fetch('/api/send-email', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                to: wonLead.contact,
                leadName: wonLead.name,
                company: wonLead.company
              }),
            });
            toast({
              title: 'Email Sent',
              description: 'Congratulations email sent to the client',
            });
          } catch (emailError) {
            
            console.error('Email sending error:', error.message, error);

            toast({
              title: 'Email Failed',
              description: 'Could not send congratulations email',
              variant: 'destructive',
            });
          }
        }

      }

      toast({ title: `Moved to ${newStage}` });
    } catch (error) {
      setLeads(initialLeads);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl md:text-2xl font-semibold tracking-tight text-slate-800">
  Sales Pipeline Overview
</CardTitle>

        </CardHeader>
        <CardContent>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {stages.map((stage) => (
              <div
                key={stage}
                className="min-w-[280px] flex-shrink-0"
                onDrop={(e) => handleDrop(e, stage)}
                onDragOver={(e) => e.preventDefault()}
              >
                <div className="bg-muted/50 rounded-lg p-3">
                  <h3 className="font-semibold text-lg mb-3 sticky top-0 bg-background p-2 rounded">
                    {stage} ({leads.filter((l) => l.stage === stage).length})
                  </h3>
                  <div className="space-y-2">
                    {/* {leads
                      .filter((lead) => lead.stage === stage)
                      .map((lead) => (
                        <div
                          key={lead._id}
                          className="bg-background p-3 rounded-lg border cursor-grab hover:shadow transition-shadow"
                          draggable
                          onDragStart={(e) => handleDragStart(e, lead._id)}
                          onDragEnd={handleDragEnd}
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium">{lead.name}</p>
                              <p className="text-sm text-muted-foreground">{lead.company}</p>
                              {lead.productInterest && (
                                <span className="inline-block mt-1 px-2 py-0.5 text-xs bg-secondary text-secondary-foreground rounded">
                                  {lead.productInterest}
                                </span>
                              )}
                            </div>
                            {lead.stage === 'Won' && (
                              <Button 
                                size="sm"
                                onClick={() => onCreateOrder(lead._id)}
                                className="ml-2"
                              >
                                Create Order
                              </Button>
                            )}
                          </div>
                        </div>
                      ))} */}

                      {/*folder open icon in kanbab*/}

                    {leads.filter((lead) => lead.stage === stage).length > 0 ? (
                      leads
                        .filter((lead) => lead.stage === stage)
                        .map((lead) => (
                          <div
                            key={lead._id}
                            className="bg-background p-3 rounded-lg border cursor-grab hover:shadow transition-shadow"
                            draggable
                            onDragStart={(e) => handleDragStart(e, lead._id)}
                            onDragEnd={handleDragEnd}
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <p className="font-medium">{lead.name}</p>
                                <p className="text-sm text-muted-foreground">
                                  {lead.company}
                                </p>
                                {lead.productInterest && (
                                  <span className="inline-block mt-1 px-2 py-0.5 text-xs bg-secondary text-secondary-foreground rounded">
                                    {lead.productInterest}
                                  </span>
                                )}
                              </div>
                              {lead.stage === "Won" && (
                                <Button
                                  size="sm"
                                  onClick={() => onCreateOrder(lead._id)}
                                  className="ml-2"
                                >
                                  Create Order
                                </Button>
                              )}
                            </div>
                          </div>
                        ))
                    ) : (
                      <div className="text-center p-6">
                        <FolderOpen className="mx-auto h-10 w-10 mb-3 text-muted-foreground opacity-60" />
                        <p className="text-muted-foreground">
                          No {stage.toLowerCase()} leads
                        </p>
                        {stage === "New" && (
                          <p className="text-sm text-muted-foreground mt-1">
                            Add lead(s) to get started
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}


