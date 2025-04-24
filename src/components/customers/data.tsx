export type Customer = {
  id: string
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  idType: "passport" | "national_id" | "driver_license"
  idNumber: string
  streetAddress: string
  city: string
  province: string
  postalCode: string
  country: string
  serviceId: string
  serviceName: string
  installationDate: string
  contractLength: number
  status: "active" | "inactive" | "pending"
}

export const customers: Customer[] = [
  {
    id: "CUST-001",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phoneNumber: "+1234567890",
    idType: "national_id",
    idNumber: "ID12345678",
    streetAddress: "123 Main St",
    city: "Anytown",
    province: "State",
    postalCode: "12345",
    country: "USA",
    serviceId: "SRV-001",
    serviceName: "Fiber 100Mbps",
    installationDate: "2023-01-15",
    contractLength: 12,
    status: "active",
  },
  {
    id: "CUST-002",
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@example.com",
    phoneNumber: "+1987654321",
    idType: "passport",
    idNumber: "P87654321",
    streetAddress: "456 Oak Ave",
    city: "Somewhere",
    province: "Province",
    postalCode: "54321",
    country: "Canada",
    serviceId: "SRV-002",
    serviceName: "Fiber 500Mbps",
    installationDate: "2023-02-20",
    contractLength: 24,
    status: "active",
  },
  {
    id: "CUST-003",
    firstName: "Robert",
    lastName: "Johnson",
    email: "robert.johnson@example.com",
    phoneNumber: "+1122334455",
    idType: "driver_license",
    idNumber: "DL9876543",
    streetAddress: "789 Pine Rd",
    city: "Elsewhere",
    province: "Region",
    postalCode: "67890",
    country: "USA",
    serviceId: "SRV-003",
    serviceName: "Fiber 1Gbps",
    installationDate: "2023-03-10",
    contractLength: 36,
    status: "active",
  },
  {
    id: "CUST-004",
    firstName: "Emily",
    lastName: "Davis",
    email: "emily.davis@example.com",
    phoneNumber: "+1555666777",
    idType: "national_id",
    idNumber: "ID87654321",
    streetAddress: "101 Elm St",
    city: "Nowhere",
    province: "District",
    postalCode: "10101",
    country: "USA",
    serviceId: "SRV-001",
    serviceName: "Fiber 100Mbps",
    installationDate: "2023-04-05",
    contractLength: 12,
    status: "inactive",
  },
  {
    id: "CUST-005",
    firstName: "Michael",
    lastName: "Wilson",
    email: "michael.wilson@example.com",
    phoneNumber: "+1777888999",
    idType: "passport",
    idNumber: "P12345678",
    streetAddress: "202 Maple Ave",
    city: "Someplace",
    province: "Territory",
    postalCode: "20202",
    country: "Canada",
    serviceId: "SRV-002",
    serviceName: "Fiber 500Mbps",
    installationDate: "2023-05-15",
    contractLength: 24,
    status: "pending",
  },
]
