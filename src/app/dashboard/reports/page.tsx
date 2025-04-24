import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TicketStatusChart } from "@/components/reports/ticket-status-chart"
import { TicketCategoryChart } from "@/components/reports/ticket-category-chart"
import { TicketPriorityChart } from "@/components/reports/ticket-priority-chart"
import { TicketResolutionTimeChart } from "@/components/reports/ticket-resolution-time-chart"

export default function ReportsPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Reports</h2>
      </div>
      <Tabs defaultValue="tickets" className="space-y-4">
        <TabsList>
          <TabsTrigger value="tickets">Tickets</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
        </TabsList>
        <TabsContent value="tickets" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Ticket Status Distribution</CardTitle>
                <CardDescription>Current distribution of tickets by status</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <TicketStatusChart />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Ticket Category Distribution</CardTitle>
                <CardDescription>Distribution of tickets by category</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <TicketCategoryChart />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Ticket Priority Distribution</CardTitle>
                <CardDescription>Distribution of tickets by priority level</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <TicketPriorityChart />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Average Resolution Time</CardTitle>
                <CardDescription>Average time to resolve tickets by category</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <TicketResolutionTimeChart />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="customers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Customer Reports</CardTitle>
              <CardDescription>Detailed customer analytics and reports</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <div className="h-[300px] flex items-center justify-center border rounded-md">
                <p className="text-muted-foreground">Customer reports will be available soon</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="services" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Service Reports</CardTitle>
              <CardDescription>Detailed service analytics and reports</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <div className="h-[300px] flex items-center justify-center border rounded-md">
                <p className="text-muted-foreground">Service reports will be available soon</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
