"use client"

import { ServiceForm } from "@/components/forms/service-form"

export default function NewServicePage() {
  // In a real application, this would be handled by a server action
  const handleSubmit = (data: any) => {
    console.log("Form submitted:", data)
    // Redirect to services list after submission
    // router.push("/dashboard/services")
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Create New Service</h2>
      </div>
      <ServiceForm onSubmit={handleSubmit} />
    </div>
  )
}
