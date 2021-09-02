export default {
  type: "object",
  properties: {
    name: { type: "string" },
    agency: {
      type: ["object", "null"],
      properties: {
        cnpj: { type: "string" },
        companyName: { type: "string" }
      },
      required: [
        "cnpj",
        "companyName"
      ],
    },
    company: {
      type: 'object',
      properties: {
        cnpj: { type: "string" },
        companyName: { type: "string" }
      },
      required: [
        "cnpj",
        "companyName"
      ],
    },
    startDate: { type: "string" },
    endDate: { type: "string" },
    impact: { type: "number" },
    investment: { type: "number" },
    total: { type: "number" },
    locations: { type: "array", items: {
      type: "object",
      properties: {
        broadcaster: {
          type: "object",
          properties: {
            name: { type: "string" },
            square: { type: "string" },
            region: { type: "string" },
            state: { type: "string" }
          },
          required: [
            "name",
            "square",
            "region",
            "state"
          ]
        },
        name: { type: "string" },
        region: { type: "string" },
        state: { type: "string" }
      },
      required: [
        "broadcaster",
        "name",
        "region",
        "state"
      ]
    }},
    products: { type: "array", items: {
      type: "object",
      properties: {
        name: { type: "string" },
        period: { type: "string" },
        time: { type: "string" },
        iconURL: { type: "string" },
        coverUrl: { type: "string" },
        classification: { type: "string" },
        category: { type: "string" },
        exhibition: { type: "array", items: {type: "string"}},
        impact: { type: "integer" },
        totalImpact: { type: "integer" },
        total: { type: "number" },
        formats: { type: "array", items: {
          type: "object",
          properties: {
            amount: { type: "integer" },
            duration: { type: "integer" },
            name: { type: "string" },
            platform: { type: "string", enum: ["digital","tv"]},
            unitPrice: { type: "number" }
          },
          required: [
            "amount",
            "duration",
            "name",
            "platform",
            "unitPrice"
          ]
        }}
      },
      required: [
        "name",
        "period",
        "time",
        "iconURL",
        "coverUrl",
        "classification",
        "category",
        "exhibition",
        "impact",
        "totalImpact",
        "total",
        "formats"
      ]
    }}
  },
  required: [
    "name",
    "agency",
    "company",
    "startDate",
    "endDate",
    "impact",
    "investment",
    "total",
    "locations",
    "products"
  ]
} as const;
