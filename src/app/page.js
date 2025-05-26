'use client';
import { useEffect, useState } from 'react';
import AddLeadForm from '@/components/AddLeadForm';
import LeadKanban from '@/components/LeadKanban';
import OrderList from '@/components/OrderList';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/hooks/use-toast';
import Dashboard from '@/components/Dashboard';

export default function Home() {
  const [leads, setLeads] = useState([]);
  const [orders, setOrders] = useState([]);

  // Fetching all data
  const fetchData = async (newLead =null) => {
    try {
      const [leadsRes, ordersRes] = await Promise.all([
        fetch('/api/leads'),
        fetch('/api/orders')
      ]);

      let leadsData = await leadsRes.json();
    
    // If new lead provided, ensure it's included
    if (newLead) {
      if (!leadsData.some(l => l.id === newLead.id)) {
        leadsData = [newLead, ...leadsData];
      }
    }
    
    setLeads(leadsData);
   setOrders(await ordersRes.json());

      // setLeads(await leadsRes.json());
      // setOrders(await ordersRes.json());
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  // Creating order from won lead
  const createOrder = async (leadId) => {
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ leadId })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to create order');
      }

      toast({ title: 'Order created successfully!' });
      fetchData();
    } catch (error) {
      toast({
        title: 'Order Creation Failed',
        description: error.message,
        variant: 'destructive'
      });
      console.error('Order creation error:', error);
    }
  };

  // Update order status, dispatchDate, trackingInfo etc.
  const updateOrderStatus = async (orderId, updates) => {
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });

      if (!res.ok) {
        throw new Error('Failed to update order');
      }

      fetchData();
    } catch (error) {
      toast({
        title: 'Update Failed',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  useEffect(() => { fetchData(); }, []);

  return (
    <main className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6 ">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 ">
         <div>
  <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight">
    Welcome to <span className="text-blue-600">TrackFlow CRM</span>
  </h1>
  <p className="mt-1 text-base md:text-lg text-slate-500">
    Effortlessly manage your leads,<br/> follow-ups and orders in one place.
  </p>
</div>

          <Dashboard leads={leads} orders={orders} />
        </div>

        <Tabs defaultValue="leads" className="bg-white rounded-lg shadow">
          <TabsList className="w-full justify-start rounded-t-lg rounded-b-none space-x-0 border-b">
            <TabsTrigger 
              value="leads" 
              className="data-[state=active]:bg-slate-100 rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
            >
              Leads ({leads.length})
            </TabsTrigger>
            <TabsTrigger 
              value="orders"
              className="data-[state=active]:bg-slate-100 rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
            >
              Orders ({orders.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="leads" className="p-0">
            <div className="space-y-4 p-6">
              <div className="space-y-2">
                <h2 className="text-xl font-semibold">Add New Lead</h2>
                <AddLeadForm onSuccess={fetchData} />
              </div>
              
              <div className="space-y-2">
                
                <LeadKanban leads={leads} onCreateOrder={createOrder} key={leads.length} />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="orders" className="p-6">
            <OrderList orders={orders} updateOrderStatus={updateOrderStatus} />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}



