"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Search, RefreshCw, Clock, AlertCircle } from "lucide-react";
// import { tickets as initialTickets } from "@/components/tickets/data";
import { toast } from "@/hooks/use-toast";
import { useTicketContext } from "@/context/ticket-context";
import { Log, Ticket } from "@/db/schema/ticket_collection";
import { useProfileContext } from "@/context/profile-context";
import { updateStatusTicket } from "@/action";

export default function NocDashboardPage() {
  const { tickets: initialTickets, fetchTickets } = useTicketContext();
  const { profile } = useProfileContext();

  // let lastLog = initialTickets[0].logs[initialTickets[0].logs.length - 1];
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  // Filter tickets based on search query
  const filteredTickets = tickets.filter(
    (ticket) =>
      ticket.code?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.customerData.firstName
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
  );

  // Handle ticket status change
  const handleStatusChange = async (ticketId: string, newStatus: string) => {
    setIsLoading(true);
    console.log(newStatus, "status");

    let path = `/tickets/${ticketId}`;

    if (newStatus === "Escalated") {
      path += `/escalate`;
    }

    console.log(path, "<<<<");

    await updateStatusTicket({ status: newStatus }, path);

    setIsLoading(false);
    // setTickets(
    //   tickets.map((ticket) => {
    //     if (ticket._id.toString() === ticketId) {
    //       const updatedTicket = {
    //         ...ticket,
    //         status: newStatus,
    //         assignTo: "NOC Team",
    //       };
    //       // Show toast notification
    //       toast({
    //         title: `Ticket ${ticketId} status updated`,
    //         description: `Status changed to ${newStatus}`,
    //       });
    //       return updatedTicket;
    //     }
    //     return ticket;
    //   })
    // );
  };

  // Simulate refresh
  const handleRefresh = async () => {
    setRefreshing(true);

    await fetchTickets();

    toast({
      title: "Tickets refreshed",
      description: "Latest ticket data has been loaded",
    });
    setRefreshing(false);
  };

  // Get status badge variant
  const getStatusBadge = (status: string) => {
    // jika status di logs object index terakhir berisi "" maka status open (belum dikerjakan)
    switch (status) {
      case "Escalated":
        return <Badge variant="default">Open</Badge>;
      case "In Progress":
        return <Badge variant="secondary">In Progress</Badge>;
    }
  };

  // Get SLA status
  const getSlaStatus = (ticket: any) => {
    const lastLog = ticket.logs[ticket.logs.length - 1];

    if (!ticket?.logs?.length || !lastLog.sla) {
      return (
        <Badge variant="outline" className="flex items-center gap-1">
          <Clock className="h-3 w-3" /> No SLA Data
        </Badge>
      );
    }

    const lastLogDate = new Date(lastLog.date);
    const now = new Date();

    const diffMinutes = (now.getTime() - lastLogDate.getTime()) / (1000 * 60);

    if (diffMinutes > parseInt(ticket.sla)) {
      return (
        <Badge variant="destructive" className="flex items-center gap-1">
          <AlertCircle className="h-3 w-3" /> SLA Breach
        </Badge>
      );
    } else {
      return (
        <Badge variant="outline" className="flex items-center gap-1">
          <Clock className="h-3 w-3" /> In SLA
        </Badge>
      );
    }
  };

  // render button
  const renderStatusButton = (ticket: Ticket, lastLog: Log | undefined) => {
    if (lastLog?.status === "Escalated") {
      return (
        <Button
          size="sm"
          onClick={() =>
            handleStatusChange(ticket._id.toString(), "In Progress")
          }
        >
          Start Working
        </Button>
      );
    }

    if (lastLog?.status === "In Progress") {
      const elapsedTime =
        new Date().getTime() - new Date(lastLog.date).getTime();
      let minutes = lastLog.sla?.split(" ")[0];
      const slaInMs = Number(minutes) * 60 * 1000;

      if (elapsedTime > slaInMs) {
        return (
          <Button
            size="sm"
            variant="destructive"
            onClick={() =>
              handleStatusChange(ticket._id.toString(), "Escalated")
            }
          >
            Escalate
          </Button>
        );
      } else {
        return (
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleStatusChange(ticket._id.toString(), "Done")}
          >
            Mark Resolved
          </Button>
        );
      }
    }

    return null;
  };

  useEffect(() => {
    if (initialTickets.length) {
      const filterTicket = initialTickets.filter(
        (ticket) => ticket.assignTo === profile?.role // hardcode dulu
      );

      setTickets(filterTicket);
    }
  }, [initialTickets]);

  return (
    <div className="flex flex-col gap-4">
      <p>
        Nama: {profile?.username} ({profile?.role})
      </p>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            Incoming Tickets
          </h2>
          <p className="text-muted-foreground">
            View and manage incoming network tickets
          </p>
        </div>
        <Button onClick={handleRefresh} variant="outline" className="gap-2">
          {refreshing ? (
            <RefreshCw className="h-4 w-4 animate-spin" />
          ) : (
            <RefreshCw className="h-4 w-4" />
          )}
          Refresh
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search tickets..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Tickets</TabsTrigger>
          <TabsTrigger value="open">Open</TabsTrigger>
          <TabsTrigger value="in-progress">In Progress</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {tickets.length === 0 ? (
            <div className="text-center py-10 border rounded-lg">
              <p className="text-muted-foreground">
                No tickets found matching your criteria
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {tickets.map((ticket) => {
                const lastLog = ticket.logs?.[ticket.logs.length - 1]; // ambil log terakhir per ticket

                return (
                  <Card
                    key={ticket._id.toString()}
                    className={
                      lastLog?.status === "Escalated"
                        ? "border-l-4 border-l-blue-500"
                        : ""
                    }
                  >
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{ticket.code}</CardTitle>
                        <div className="flex gap-2">
                          {lastLog
                            ? getStatusBadge(lastLog.status as string)
                            : null}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div>
                          <p className="font-medium">{ticket.subject}</p>
                          <p className="text-sm text-muted-foreground truncate">
                            {ticket.description}
                          </p>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>
                            Customer:{" "}
                            <span className="font-medium">
                              {ticket.customerData?.firstName}
                            </span>
                          </span>
                          {getSlaStatus(ticket)}
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>
                            Category:{" "}
                            <span className="font-medium capitalize">
                              {ticket.ticketCategory}
                            </span>
                          </span>
                          <span>
                            Created:{" "}
                            <span className="font-medium">
                              {new Date(ticket.createdAt).toLocaleDateString()}
                            </span>
                          </span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between pt-0">
                      <Button variant="outline" size="sm" asChild>
                        <a href={`/dashboard/tickets/${ticket._id}`}>
                          View Details
                        </a>
                      </Button>
                      {renderStatusButton(ticket, lastLog)}
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
          )}
        </TabsContent>

        <TabsContent value="open" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tickets
              .filter((ticket) => {
                const lastLog = ticket.logs?.[ticket.logs.length - 1];
                return lastLog?.status === "Escalated"; // filter berdasarkan status masing-masing ticket "Escalated" (Open)
              })
              .map((ticket) => {
                const lastLog = ticket.logs?.[ticket.logs.length - 1]; // ambil lagi buat dipakai di card

                return (
                  <Card
                    key={ticket._id.toString()}
                    className="border-l-4 border-l-blue-500"
                  >
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{ticket.code}</CardTitle>
                        <div className="flex gap-2">
                          {lastLog && getStatusBadge(lastLog.status as string)}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div>
                          <p className="font-medium">{ticket.subject}</p>
                          <p className="text-sm text-muted-foreground truncate">
                            {ticket.description}
                          </p>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>
                            Customer:{" "}
                            <span className="font-medium">
                              {ticket.customerData?.firstName}
                            </span>
                          </span>
                          {getSlaStatus(ticket)}
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>
                            Category:{" "}
                            <span className="font-medium capitalize">
                              {ticket.ticketCategory}
                            </span>
                          </span>
                          <span>
                            Created:{" "}
                            <span className="font-medium">
                              {new Date(ticket.createdAt).toLocaleDateString()}
                            </span>
                          </span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between pt-0">
                      <Button variant="outline" size="sm" asChild>
                        <a href={`/dashboard/tickets/${ticket._id}`}>
                          View Details
                        </a>
                      </Button>
                      <Button
                        size="sm"
                        onClick={() =>
                          handleStatusChange(
                            ticket._id.toString(),
                            "In Progress"
                          )
                        }
                      >
                        Start Working
                      </Button>
                    </CardFooter>
                  </Card>
                );
              })}
          </div>
        </TabsContent>

        <TabsContent value="in-progress" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTickets
              .map((ticket) => {
                // Ambil log terakhir dari setiap ticket
                const lastLog = ticket.logs?.[ticket.logs.length - 1];

                // Pastikan lastLog ada dan statusnya adalah "In Progress"
                if (lastLog?.status === "In Progress") {
                  return (
                    <Card key={ticket._id.toString()}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg">
                            {ticket.code}
                          </CardTitle>
                          <div className="flex gap-2">
                            {getStatusBadge(lastLog.status as string)}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div>
                            <p className="font-medium">{ticket.subject}</p>
                            <p className="text-sm text-muted-foreground truncate">
                              {ticket.description}
                            </p>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>
                              Customer:{" "}
                              <span className="font-medium">
                                {ticket.customerData.firstName}
                              </span>
                            </span>
                            {getSlaStatus(ticket)}
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>
                              Assigned:{" "}
                              <span className="font-medium">
                                {lastLog.assignTo}
                              </span>
                            </span>
                            <span>
                              Created:{" "}
                              <span className="font-medium">
                                {new Date(
                                  ticket.createdAt
                                ).toLocaleDateString()}
                              </span>
                            </span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between pt-0">
                        <Button variant="outline" size="sm" asChild>
                          <a href={`/dashboard/tickets/${ticket._id}`}>
                            View Details
                          </a>
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            handleStatusChange(
                              ticket._id.toString(),
                              "Resolved"
                            )
                          }
                        >
                          Mark Resolved
                        </Button>
                      </CardFooter>
                    </Card>
                  );
                }
                return null; // Kembalikan null jika statusnya bukan "In Progress"
              })
              .filter(Boolean)}{" "}
            {/* Pastikan null tidak dirender */}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
