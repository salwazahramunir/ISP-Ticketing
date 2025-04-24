import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { DataTable } from "@/components/services/data-table"
import { columns } from "@/components/services/columns"
import { services } from "@/components/services/data"

export default function ServicesPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Services</h2>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Service
        </Button>
      </div>
      <div>
        <DataTable columns={columns} data={services} />
      </div>
    </div>
  )
}
