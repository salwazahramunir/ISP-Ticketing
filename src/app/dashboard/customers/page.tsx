import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { DataTable } from "@/components/customers/data-table"
import { columns } from "@/components/customers/columns"
import { customers } from "@/components/customers/data"

export default function CustomersPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Customers</h2>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Customer
        </Button>
      </div>
      <div>
        <DataTable columns={columns} data={customers} />
      </div>
    </div>
  )
}
