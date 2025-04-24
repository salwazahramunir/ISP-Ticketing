"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Loader2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

const formSchema = z.object({
  serviceName: z.string().min(3, {
    message: "Service name must be at least 3 characters.",
  }),
  monthlyPrice: z.coerce.number().min(0, {
    message: "Monthly price must be a positive number.",
  }),
  setupFee: z.coerce.number().min(0, {
    message: "Setup fee must be a positive number.",
  }),
  slug: z
    .string()
    .min(3, {
      message: "Slug must be at least 3 characters.",
    })
    .regex(/^[a-z0-9-]+$/, {
      message: "Slug can only contain lowercase letters, numbers, and hyphens.",
    }),
  planDescription: z.string().min(10, {
    message: "Plan description must be at least 10 characters.",
  }),
  status: z.enum(["active", "inactive", "deprecated"]),
})

type FormValues = z.infer<typeof formSchema>

interface ServiceFormProps {
  initialData?: Partial<FormValues>
  onSubmit: (data: FormValues) => void
  isEditMode?: boolean
}

export function ServiceForm({ initialData, onSubmit, isEditMode = false }: ServiceFormProps) {
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      serviceName: initialData?.serviceName || "",
      monthlyPrice: initialData?.monthlyPrice || 0,
      setupFee: initialData?.setupFee || 0,
      slug: initialData?.slug || "",
      planDescription: initialData?.planDescription || "",
      status: initialData?.status || "active",
    },
  })

  function handleSubmit(values: FormValues) {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      onSubmit(values)
      setIsLoading(false)
    }, 1000)
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>{isEditMode ? "Edit Service" : "Create New Service"}</CardTitle>
        <CardDescription>
          {isEditMode ? "Update service plan details and pricing." : "Add a new service plan to the system."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="serviceName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Service Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Fiber 100Mbps" {...field} />
                  </FormControl>
                  <FormDescription>The name of the service plan as shown to customers.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="monthlyPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Monthly Price ($)</FormLabel>
                    <FormControl>
                      <Input type="number" min={0} step={0.01} {...field} />
                    </FormControl>
                    <FormDescription>Monthly subscription fee</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="setupFee"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Setup Fee ($)</FormLabel>
                    <FormControl>
                      <Input type="number" min={0} step={0.01} {...field} />
                    </FormControl>
                    <FormDescription>One-time installation fee</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Slug</FormLabel>
                  <FormControl>
                    <Input placeholder="fiber-100mbps" {...field} />
                  </FormControl>
                  <FormDescription>URL-friendly identifier (lowercase, no spaces, use hyphens)</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="planDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Plan Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="High-speed fiber internet with 100Mbps download and 20Mbps upload speeds."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Detailed description of the service plan features</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="deprecated">Deprecated</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>Current availability status of this service plan</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <CardFooter className="flex justify-between px-0">
              <Button variant="outline" type="button">
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {isEditMode ? "Updating..." : "Creating..."}
                  </>
                ) : (
                  <>{isEditMode ? "Update Service" : "Create Service"}</>
                )}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
