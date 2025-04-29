"use client";
import * as Menubar from "@radix-ui/react-menubar";
import { Ticket } from "lucide-react";
import clsx from "clsx";
import { useEffect } from "react";
import { useTicketContext } from "@/context/ticket-context";

export function FilterBar() {
  const tabs = ["Tickets", "In Progress", "Escalated", "Done", "Closed"];

  const { tickets, setTickets, allTickets, activeTab, setActiveTab } =
    useTicketContext();

  useEffect(() => {
    if (activeTab === "Tickets") {
      // Tampilkan semua tickets
      setTickets(allTickets);
    } else {
      // Filter berdasarkan status
      const filtered = allTickets.filter((ticket) => {
        let lastStatus = ticket.logs?.[ticket.logs.length - 1]?.status;
        return lastStatus === activeTab;
      });
      setTickets(filtered);
    }
  }, [activeTab, allTickets]);

  return (
    <Menubar.Root className="inline-flex gap-2 p-1 mb-4">
      {tabs.map((tab) => (
        <Menubar.Menu key={tab}>
          <Menubar.Trigger
            onClick={() => setActiveTab(tab)}
            className={clsx(
              "flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-sm",
              activeTab === tab
                ? "bg-green-800 text-white"
                : "bg-green-100 text-green-900 hover:bg-green-200"
            )}
          >
            {tab === "Tickets" && <Ticket size={18} />}
            {tab}
          </Menubar.Trigger>
        </Menubar.Menu>
      ))}
    </Menubar.Root>
  );
}
