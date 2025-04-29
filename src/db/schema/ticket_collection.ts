import { WithId } from "mongodb";
import { z } from "zod";

export const LogSchema = z.object({
  date: z.date(), // tanggal log dibuat
  handleByUserId: z.string(), // id user login yang handle
  handleByUsername: z.string(), // username user yang login
  handleByUserRole: z.string(), // role user yang login
  // approveByUserId: z.string().optional(), // id user yang di approve
  // approveByUsername: z.string().optional(), // username user yang di approve
  // approveByUserRole: z.string().optional(), // role user yang di assign
  assignTo: z.string().optional(), // diisi otomatis oleh system (role yang di assign)
  note: z.string(), // catatan apa yang sudah dilakukan
  status: z.string().optional(), // log status
  sla: z.string().optional(),
  // status: z.enum(["Open", "In Progress", "Escalated", "Done", "Closed"]), // log status
});

export const TicketSchema = z
  .object({
    code: z.string().optional(),
    customerId: z.string().min(1, { message: "Customer is required" }),
    ticketCategory: z.string().min(1, {
      message: "Category is required.",
    }),
    subject: z.string().min(1, { message: "Subject is required" }),
    description: z.string().min(1, { message: "Description is required" }),
    escalationRequired: z.boolean(), // belum dipake
    assignTo: z.string().optional(), // diisi otomatis oleh system (role yang di assign)
    status: z.string().optional(), // diisi otomatis oleh system
    logs: z.array(LogSchema).optional(),
    isDeleted: z.boolean().optional(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
    deletedAt: z.date().nullable().optional(),
    // assignToId: z.string().min(1, {
    //   message: "Assignee is required.",
    // }),
    // ticketCategory: z.enum(["Technical", "Billing", "Installation", "General"]),
    // priority: z.enum(["Low", "Medium", "High"]),
    // sla: z.enum([
    //   "1 hours",
    //   "2 hours",
    //   "4 hours",
    //   "8 hours",
    //   "24 hours",
    //   "48 hours",
    //   "72 hours",
    // ]),
  })
  .transform((data) => ({
    ...data,
    isDeleted: data.isDeleted ?? false,
    createdAt: data.createdAt ?? new Date(),
    updatedAt: data.updatedAt ?? new Date(),
    deletedAt: data.deletedAt ?? null,
  }));

export type TicketInput = z.input<typeof TicketSchema>; // input: data sebelum transform
export type TicketOutput = z.infer<typeof TicketSchema>; // output: hasil setelah transform
export type Log = z.infer<typeof LogSchema>;

type Customer = {
  firstName: string;
  lastName: string;
};

export type Ticket = WithId<TicketOutput> & {
  customerData: Customer;
};
