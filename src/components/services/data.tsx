export type Service = {
  id: string
  serviceName: string
  monthlyPrice: number
  setupFee: number
  slug: string
  planDescription: string
  status: "active" | "inactive" | "deprecated"
  createdAt: string
}

export const services: Service[] = [
  {
    id: "SRV-001",
    serviceName: "Fiber 100Mbps",
    monthlyPrice: 49.99,
    setupFee: 99.99,
    slug: "fiber-100mbps",
    planDescription: "High-speed fiber internet with 100Mbps download and 20Mbps upload speeds.",
    status: "active",
    createdAt: "2023-01-01",
  },
  {
    id: "SRV-002",
    serviceName: "Fiber 500Mbps",
    monthlyPrice: 79.99,
    setupFee: 99.99,
    slug: "fiber-500mbps",
    planDescription: "Premium fiber internet with 500Mbps download and 50Mbps upload speeds.",
    status: "active",
    createdAt: "2023-01-01",
  },
  {
    id: "SRV-003",
    serviceName: "Fiber 1Gbps",
    monthlyPrice: 99.99,
    setupFee: 99.99,
    slug: "fiber-1gbps",
    planDescription: "Ultra-fast fiber internet with 1Gbps download and 100Mbps upload speeds.",
    status: "active",
    createdAt: "2023-01-01",
  },
  {
    id: "SRV-004",
    serviceName: "Business Fiber 2Gbps",
    monthlyPrice: 199.99,
    setupFee: 149.99,
    slug: "business-fiber-2gbps",
    planDescription: "Enterprise-grade fiber internet with 2Gbps download and 500Mbps upload speeds.",
    status: "active",
    createdAt: "2023-02-15",
  },
  {
    id: "SRV-005",
    serviceName: "DSL 50Mbps",
    monthlyPrice: 29.99,
    setupFee: 49.99,
    slug: "dsl-50mbps",
    planDescription: "Basic DSL internet with 50Mbps download and 10Mbps upload speeds.",
    status: "deprecated",
    createdAt: "2022-06-01",
  },
]
