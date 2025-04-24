import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { DataTable } from "@/components/tickets/data-table"
import { columns } from "@/components/tickets/columns"
import { tickets } from "@/components/tickets/data"

export default function TicketsPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Tickets</h2>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Create Ticket
        </Button>
      </div>
      <div>
        <DataTable columns={columns} data={tickets} />
      </div>
    </div>
  )
}
