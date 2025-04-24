export type LogEntry = {
  date: string
  handleBy: string
  role: string
  note: string
  status: string
}

export type Ticket = {
  id: string
  customerId: string
  customerName: string
  ticketCategory: "technical" | "billing" | "installation" | "general"
  priority: "low" | "medium" | "high" | "critical"
  assignTo: string
  escalationRequired: boolean
  subject: string
  description: string
  sla: string
  status: "open" | "in-progress" | "resolved" | "closed"
  createdAt: string
  log: LogEntry[]
}

export const tickets: Ticket[] = [
  {
    id: "TKT-001",
    customerId: "CUST-001",
    customerName: "John Doe",
    ticketCategory: "technical",
    priority: "high",
    assignTo: "Support Team 1",
    escalationRequired: false,
    subject: "Internet connection issues",
    description: "Customer is experiencing intermittent connection drops throughout the day.",
    sla: "24 hours",
    status: "open",
    createdAt: "2023-10-15",
    log: [
      {
        date: "2023-10-15",
        handleBy: "System",
        role: "system",
        note: "Ticket created",
        status: "open",
      },
      {
        date: "2023-10-15",
        handleBy: "John Smith",
        role: "support",
        note: "Initial assessment: Possible line interference. Scheduled remote diagnostics.",
        status: "open",
      },
    ],
  },
  {
    id: "TKT-002",
    customerId: "CUST-002",
    customerName: "Jane Smith",
    ticketCategory: "billing",
    priority: "medium",
    assignTo: "Billing Department",
    escalationRequired: false,
    subject: "Billing inquiry",
    description: "Customer has questions about charges on their latest bill.",
    sla: "48 hours",
    status: "in-progress",
    createdAt: "2023-10-14",
    log: [
      {
        date: "2023-10-14",
        handleBy: "System",
        role: "system",
        note: "Ticket created",
        status: "open",
      },
      {
        date: "2023-10-14",
        handleBy: "Emily Davis",
        role: "support",
        note: "Reviewed billing history. Found discrepancy in service charges.",
        status: "in-progress",
      },
    ],
  },
  {
    id: "TKT-003",
    customerId: "CUST-003",
    customerName: "Robert Johnson",
    ticketCategory: "installation",
    priority: "low",
    assignTo: "Installation Team",
    escalationRequired: false,
    subject: "Service upgrade request",
    description: "Customer wants to upgrade from 100Mbps to 500Mbps plan.",
    sla: "72 hours",
    status: "open",
    createdAt: "2023-10-13",
    log: [
      {
        date: "2023-10-13",
        handleBy: "System",
        role: "system",
        note: "Ticket created",
        status: "open",
      },
    ],
  },
  {
    id: "TKT-004",
    customerId: "CUST-004",
    customerName: "Emily Davis",
    ticketCategory: "technical",
    priority: "medium",
    assignTo: "Support Team 2",
    escalationRequired: false,
    subject: "Router configuration",
    description: "Customer needs help setting up their new router.",
    sla: "48 hours",
    status: "resolved",
    createdAt: "2023-10-12",
    log: [
      {
        date: "2023-10-12",
        handleBy: "System",
        role: "system",
        note: "Ticket created",
        status: "open",
      },
      {
        date: "2023-10-12",
        handleBy: "Robert Wilson",
        role: "support",
        note: "Guided customer through router setup via phone.",
        status: "in-progress",
      },
      {
        date: "2023-10-13",
        handleBy: "Robert Wilson",
        role: "support",
        note: "Customer confirmed router is working properly.",
        status: "resolved",
      },
    ],
  },
  {
    id: "TKT-005",
    customerId: "CUST-005",
    customerName: "Michael Wilson",
    ticketCategory: "technical",
    priority: "critical",
    assignTo: "Network Operations",
    escalationRequired: true,
    subject: "Network outage report",
    description: "Customer reports complete service outage in their area.",
    sla: "4 hours",
    status: "closed",
    createdAt: "2023-10-10",
    log: [
      {
        date: "2023-10-10",
        handleBy: "System",
        role: "system",
        note: "Ticket created",
        status: "open",
      },
      {
        date: "2023-10-10",
        handleBy: "Network Team",
        role: "support",
        note: "Identified area-wide outage due to fiber cut.",
        status: "in-progress",
      },
      {
        date: "2023-10-10",
        handleBy: "Field Team",
        role: "technician",
        note: "Dispatched repair crew to location.",
        status: "in-progress",
      },
      {
        date: "2023-10-11",
        handleBy: "Field Team",
        role: "technician",
        note: "Fiber repaired and service restored.",
        status: "resolved",
      },
      {
        date: "2023-10-11",
        handleBy: "Jane Doe",
        role: "support",
        note: "Customer confirmed service is working. Ticket closed.",
        status: "closed",
      },
    ],
  },
]
