'use client';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Calendar, CalendarClock, ClipboardList, Package } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function Dashboard({ leads, orders }) {

  const totalLeads = leads.length;
  const leadsByStage = leads.reduce((acc, lead) => {
    acc[lead.stage] = (acc[lead.stage] || 0) + 1;
    return acc;
  }, {});

  const overdueFollowups = leads.filter(lead => 
    new Date(lead.followUpDate) < new Date() && lead.stage !== 'Won' && lead.stage !== 'Lost'
  );

  const ordersByStatus = orders.reduce((acc, order) => {
    acc[order.status] = (acc[order.status] || 0) + 1;
    return acc;
  }, {});

  const upcomingFollowups = leads.filter(lead => 
    new Date(lead.followUpDate) > new Date() && 
    new Date(lead.followUpDate) < new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  );

  return (
    <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
      {/* Total Leads Card */}
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
          <ClipboardList className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalLeads}</div>
          <div className="flex flex-wrap gap-1 mt-2">
            {Object.entries(leadsByStage).map(([stage, count]) => (
              <Badge key={stage} variant="outline" className="text-xs">
                {stage}: {count}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* cards */}
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium">Follow-ups</CardTitle>
          <CalendarClock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{overdueFollowups.length}</div>
          <div className="text-xs text-muted-foreground mt-2">
            {overdueFollowups.length > 0 ? (
              <div className="space-y-1">
                <p className="font-medium">Overdue:</p>
                {overdueFollowups.slice(0, 2).map(lead => (
                  <div key={lead._id} className="flex justify-between items-center">
                    <span className="truncate">{lead.name}</span>
                    <Badge variant="destructive" className="text-xs">
                      {new Date(lead.followUpDate).toLocaleDateString()}
                    </Badge>
                  </div>
                ))}
                {overdueFollowups.length > 2 && (
                  <p className="text-xs">+{overdueFollowups.length - 2} more</p>
                )}
              </div>
            ) : (
              <p className="text-green-600">All caught up!</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* orders Card */}
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium">Orders</CardTitle>
          <Package className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{orders.length}</div>
          <div className="flex flex-wrap gap-1 mt-2">
            {Object.entries(ordersByStatus).map(([status, count]) => (
              <Badge key={status} variant="outline" className="text-xs">
                {status}: {count}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* upcoming Card */}
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium">Upcoming</CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{upcomingFollowups.length}</div>
          <div className="text-xs text-muted-foreground mt-2">
            {upcomingFollowups.length > 0 ? (
              <div className="space-y-1">
                <p className="font-medium">This week:</p>
                {upcomingFollowups.slice(0, 2).map(lead => (
                  <div key={lead._id} className="flex justify-between items-center">
                    <span className="truncate">{lead.name}</span>
                    <Badge variant="secondary" className="text-xs">
                      {new Date(lead.followUpDate).toLocaleDateString()}
                    </Badge>
                  </div>
                ))}
                {upcomingFollowups.length > 2 && (
                  <p className="text-xs">+{upcomingFollowups.length - 2} more</p>
                )}
              </div>
            ) : (
              <p>No upcoming follow-ups</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}