// 'use client';
// import { useEffect, useState } from 'react';
// import AddLeadForm from '@/components/AddLeadForm';
// import LeadKanban from '@/components/LeadKanban';
// import OrderList from '@/components/OrderList';
// import { Button } from '@/components/ui/button';
// import { Card } from '@/components/ui/card';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// import { toast } from '@/hooks/use-toast';

// export default function Home() {
//   const [leads, setLeads] = useState([]);
//   const [orders, setOrders] = useState([]);

//   // Fetch all data
//   const fetchData = async () => {
//     try {
//       const [leadsRes, ordersRes] = await Promise.all([
//         fetch('/api/leads'),
//         fetch('/api/orders')
//       ]);
//       setLeads(await leadsRes.json());
//       setOrders(await ordersRes.json());
//     } catch (error) {
//       console.error('Fetch error:', error);
//     }
//   };

//   // creating order from won lead
//   const createOrder = async (leadId) => {
//   try {
//     const res = await fetch('/api/orders', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ leadId })
//     });

//     const data = await res.json();
    
//     if (!res.ok) {
//       throw new Error(data.error || 'Failed to create order');
//     }

//     toast({ title: 'Order created successfully!' });
//     fetchData();
//   } catch (error) {
//     toast({
//       title: 'Order Creation Failed',
//       description: error.message,
//       variant: 'destructive'
//     });
//     console.error('Order creation error:', error);
//   }
// };

//   // Update order status
//   const updateOrderStatus = async (orderId, newStatus) => {
//     await fetch(`/api/orders/${orderId}`, {
//       method: 'PATCH',
//       body: JSON.stringify({ status: newStatus })
//     });
//     fetchData();
//   };

//   useEffect(() => { fetchData(); }, []);

//   return (
//     <main className="min-h-screen bg-slate-50 p-8">
//       <div className="max-w-7xl mx-auto">
//         <h1 className="text-3xl font-bold text-slate-800 mb-6">TrackFlow CRM</h1>
        
//         <Tabs defaultValue="leads" className="space-y-6">
//           <TabsList>
//             <TabsTrigger value="leads">Leads ({leads.length})</TabsTrigger>
//             <TabsTrigger value="orders">Orders ({orders.length})</TabsTrigger>
//           </TabsList>

//           <TabsContent value="leads">
//             <Card className="p-6 mb-6">
//               <h2 className="text-xl font-semibold mb-4">Add New Lead</h2>
//               <AddLeadForm onSuccess={fetchData} />
//             </Card>
//             <Card className="p-6">
//               <h2 className="text-xl font-semibold mb-4">Sales Pipeline</h2>
//               <LeadKanban leads={leads} onCreateOrder={createOrder} />
//             </Card>
//           </TabsContent>

//           <TabsContent value="orders">
//             <Card className="p-6">
//               <h2 className="text-xl font-semibold mb-4">Order Management</h2>
//               <OrderList orders={orders} updateOrderStatus={updateOrderStatus} />
//             </Card>
//           </TabsContent>
//         </Tabs>
//       </div>
//     </main>
//   );
// }

'use client';
import { useEffect, useState } from 'react';
import AddLeadForm from '@/components/AddLeadForm';
import LeadKanban from '@/components/LeadKanban';
import OrderList from '@/components/OrderList';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/hooks/use-toast';

export default function Home() {
  const [leads, setLeads] = useState([]);
  const [orders, setOrders] = useState([]);

  // Fetch all data
  const fetchData = async () => {
    try {
      const [leadsRes, ordersRes] = await Promise.all([
        fetch('/api/leads'),
        fetch('/api/orders')
      ]);
      setLeads(await leadsRes.json());
      setOrders(await ordersRes.json());
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
    <main className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-800 mb-6">TrackFlow CRM</h1>

        <Tabs defaultValue="leads" className="space-y-6">
          <TabsList>
            <TabsTrigger value="leads">Leads ({leads.length})</TabsTrigger>
            <TabsTrigger value="orders">Orders ({orders.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="leads">
            <Card className="p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Add New Lead</h2>
              <AddLeadForm onSuccess={fetchData} />
            </Card>
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Sales Pipeline</h2>
              <LeadKanban leads={leads} onCreateOrder={createOrder} />
            </Card>
          </TabsContent>

          <TabsContent value="orders">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Order Management</h2>
              <OrderList orders={orders} updateOrderStatus={updateOrderStatus} />
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
