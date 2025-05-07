import { TicketProvider } from "@/context/ticket-context";
import TicketsContentPage from "@/components/tickets/tickets-content-page";
import { ProfileProvider } from "@/context/profile-context";

export default function TicketsPage() {
  return (
    <TicketProvider>
      <TicketsContentPage />
    </TicketProvider>
  );
}
