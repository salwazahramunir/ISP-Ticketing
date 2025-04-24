"use client"

import { TicketForm } from "@/components/forms/ticket-form"

export default function NewTicketPage() {
  // In a real application, this would be handled by a server action
  const handleSubmit = (data: any) => {
    console.log("Form submitted:", data)
    // Redirect to tickets list after submission
    // router.push("/dashboard/tickets")
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Create New Ticket</h2>
      </div>
      <TicketForm onSubmit={handleSubmit} />
    </div>
  )
}
