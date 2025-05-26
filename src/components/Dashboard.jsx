'use client';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Calendar, CalendarClock, ClipboardList, Package } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function Dashboard({ leads, orders }) {
  const router = useRouter();
  const totalLeads = leads.length;
  const wonLeads = leads.filter(lead => lead.stage === 'Won').length;
  const conversionRate = totalLeads > 0 ? Math.round((wonLeads / totalLeads) * 100) : 0;

  const leadsByStage = leads.reduce((acc, lead) => {
    acc[lead.stage] = (acc[lead.stage] || 0) + 1;
    return acc;
  }, {});

  const overdueFollowups = leads.filter(lead => 
    new Date(lead.followUpDate) < new Date() && 
    lead.stage !== 'Won' && 
    lead.stage !== 'Lost'
  );

  const ordersByStatus = orders.reduce((acc, order) => {
    acc[order.status] = (acc[order.status] || 0) + 1;
    return acc;
  }, {});

  const upcomingFollowups = leads.filter(lead => 
    new Date(lead.followUpDate) > new Date() && 
    new Date(lead.followUpDate) < new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  );

  const stageColors = {
    'New': 'bg-blue-100 text-blue-800',
    'Contacted': 'bg-purple-100 text-purple-800',
    'Qualified': 'bg-green-100 text-green-800',
    'Proposal Sent': 'bg-yellow-100 text-yellow-800',
    'Won': 'bg-emerald-100 text-emerald-800',
    'Lost': 'bg-red-100 text-red-800',
    
  };

  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 bg-black p-4 rounded-md">
      {/* Total Leads Card with Progress */}
      <Card className="hover:shadow-md transition-shadow border-0 shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Sales Pipeline</CardTitle>
          <ClipboardList className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalLeads}</div>
          <div className="mt-3 space-y-2">
            <div className="flex justify-between text-sm">
              <span>Conversion Rate</span>
              <span>{conversionRate}%</span>
            </div>
            <Progress value={conversionRate} className="h-2" />
          </div>
          <div className="flex flex-wrap gap-1 mt-3">
            {Object.entries(leadsByStage).map(([stage, count]) => (
              <TooltipProvider key={stage}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${stageColors[stage] || 'bg-gray-100'}`}
                    >
                      {stage}: {count}
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{Math.round((count/totalLeads)*100)}% of total leads</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Follow-ups Card with Action */}
      <Card className="hover:shadow-md transition-shadow border-0 shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Follow-ups</CardTitle>
          <CalendarClock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold">{overdueFollowups.length}</span>
            <span className="text-sm text-muted-foreground">
              {overdueFollowups.length > 0 ? 'Overdue' : 'On track'}
            </span>
          </div>
          <div className="mt-3 space-y-2">
            {overdueFollowups.length > 0 ? (
              <>
                {overdueFollowups.slice(0, 3).map(lead => (
                  <div 
                    key={lead._id} 
                    className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-md cursor-pointer"
                    onClick={() => router.push(`/leads/${lead._id}`)}
                  >
                    <span className="text-sm font-medium truncate max-w-[120px]">{lead.name}</span>
                    <Badge variant="destructive" className="text-xs">
                      {new Date(lead.followUpDate).toLocaleDateString()}
                    </Badge>
                  </div>
                ))}
                {overdueFollowups.length > 3 && (
                  <Button variant="ghost" size="sm" className="w-full text-xs">
                    +{overdueFollowups.length - 3} more
                  </Button>
                )}
              </>
            ) : (
              <div className="text-center py-4">
                <p className="text-green-600 text-sm">All follow-ups complete!</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="hover:shadow-md transition-shadow border-0 shadow-sm min-w-[290px]">
  <CardHeader className="flex flex-row items-center justify-between pb-2">
    <CardTitle className="text-sm font-medium">Orders</CardTitle>
    <Package className="h-4 w-4 text-muted-foreground" />
  </CardHeader>
  <CardContent>
    <div className="text-2xl font-bold">{orders.length}</div>
    
    {/* Add a touch more space between items */}
    <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2">
      {Object.entries(ordersByStatus).map(([status, count]) => (
        <div key={status} className="flex items-center gap-2">
          <span
            className={`h-2 w-2 rounded-full ${
              status === 'Order Received'
                ? 'bg-green-500'
                : status === 'Pending'
                ? 'bg-yellow-500'
                : 'bg-blue-500'
            }`}
          />
          <span className="text-sm whitespace-nowrap">{status}</span>
          <span className="text-sm font-medium ml-auto">{count}</span>
        </div>
      ))}
    </div>
  </CardContent>
</Card>



      

      {/* Upcoming Card with Calendar View */}
       <Card className="hover:shadow-md transition-shadow border-0 shadow-sm lg:col-span-4">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Upcoming Follow-ups ({upcomingFollowups.length})</CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          {upcomingFollowups.length > 0 ? (
            <div className="flex space-x-4 pb-2 overflow-x-auto">
              {upcomingFollowups
                .sort((a, b) => new Date(a.followUpDate) - new Date(b.followUpDate))
                .map(lead => (
                  <div 
                    key={lead._id}
                    className="flex-shrink-0 w-48 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                    onClick={() => router.push(`/leads/${lead._id}`)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-medium truncate">{lead.name}</p>
                        <p className="text-xs text-muted-foreground truncate">{lead.company}</p>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {new Date(lead.followUpDate).toLocaleDateString()}
                      </Badge>
                    </div>
                    <Badge className={`mt-2 text-xs ${stageColors[lead.stage]}`}>
                      {lead.stage}
                    </Badge>
                  </div>
                ))}
            </div>
          ) : (
            <div className="text-center py-4">
              <p className="text-sm text-muted-foreground">No upcoming follow-ups</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}