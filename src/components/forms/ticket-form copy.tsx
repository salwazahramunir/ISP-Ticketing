"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Customer } from "@/db/schema/customer_collection";
import { User } from "@/db/schema/user_collection";
import { TicketInput, TicketSchema } from "@/db/schema/ticket_collection";
import { CustomerCombobox } from "../tickets/customer-combobox";
import { AssignToCombobox } from "../tickets/assign-to-combobox";
import { cn } from "@/lib/utils";

type FormValues = TicketInput;

interface TicketFormProps {
  initialData?: Partial<FormValues>;
  onSubmit: (data: FormValues) => void;
  isEditMode?: boolean;
  customers?: Customer[];
  users: User[];
}

export function TicketForm({
  initialData,
  onSubmit,
  isEditMode = false,
  customers,
  users,
}: TicketFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(TicketSchema),
    defaultValues: {
      customerId: initialData?.customerId || "",
      ticketCategory: initialData?.ticketCategory || "",
      assignToId: initialData?.assignToId || "",
      escalationRequired: initialData?.escalationRequired || false,
      subject: initialData?.subject || "",
      description: initialData?.description || "",
      sla: initialData?.sla || "24 hours",
      status: initialData?.status || "Open",
    },
  });

  async function handleSubmit(values: FormValues) {
    setIsLoading(true);

    // Simulate API call
    await onSubmit(values);

    setIsLoading(false);
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>
          {isEditMode ? "Edit Ticket" : "Create New Ticket"}
        </CardTitle>
        <CardDescription>
          {isEditMode
            ? "Update ticket details and status."
            : "Create a new support ticket for a customer."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <CustomerCombobox
                isEditMode={isEditMode}
                control={form.control}
                customers={customers}
              />

              <FormField
                control={form.control}
                name="ticketCategory"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {[
                          "Technical",
                          "Billing",
                          "Installation",
                          "General",
                        ].map((dt) => (
                          <SelectItem key={dt} value={dt}>
                            {dt}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Priority</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {["Low", "Medium", "High"].map((dt) => (
                          <SelectItem key={dt} value={dt}>
                            {dt}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}
              <AssignToCombobox control={form.control} users={users} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="sla"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>SLA</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select SLA" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="4 hours">4 hours</SelectItem>
                        <SelectItem value="8 hours">8 hours</SelectItem>
                        <SelectItem value="24 hours">24 hours</SelectItem>
                        <SelectItem value="48 hours">48 hours</SelectItem>
                        <SelectItem value="72 hours">72 hours</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Service Level Agreement response time
                    </FormDescription>
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
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={!isEditMode}
                    >
                      <FormControl
                        className={cn(
                          "flex w-full items-center justify-between rounded-md border px-3 py-2 text-left text-sm",
                          !isEditMode
                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                            : ""
                        )}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {[
                          "Open",
                          "In Progress",
                          "Escalated",
                          "Done",
                          "Closed",
                        ].map((dt) => (
                          <SelectItem key={dt} value={dt}>
                            {dt}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="escalationRequired"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Escalation Required</FormLabel>
                    <FormDescription>
                      Check this box if this ticket requires escalation to other
                      role
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subject</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Brief description of the issue"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Detailed description of the issue..."
                      className="resize-none min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* {isEditMode && (
              <FormField
                control={form.control}
                name="note"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Add Log Entry</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Add a new note to the ticket log..."
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      This will be added as a new entry in the ticket log
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )} */}

            <CardFooter className="flex justify-between px-0">
              <Button variant="outline" type="button" asChild>
                <Link href={"/dashboard/tickets"}>Cancel</Link>
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {isEditMode ? "Updating..." : "Creating..."}
                  </>
                ) : (
                  <>{isEditMode ? "Update Ticket" : "Create Ticket"}</>
                )}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
