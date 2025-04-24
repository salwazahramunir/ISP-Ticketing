"use client"

import { CustomerForm } from "@/components/forms/customer-form"

export default function NewCustomerPage() {
  // In a real application, this would be handled by a server action
  const handleSubmit = (data: any) => {
    console.log("Form submitted:", data)
    // Redirect to customers list after submission
    // router.push("/dashboard/customers")
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Create New Customer</h2>
      </div>
      <CustomerForm onSubmit={handleSubmit} />
    </div>
  )
}
