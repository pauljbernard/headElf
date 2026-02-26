---
layout: default
title: "API Reference"
description: "Complete API documentation with examples, authentication, rate limits, and SDK information for system integration."
permalink: /api-reference/
---

Comprehensive API documentation for integrating with HeadElf's C-Suite Executive Intelligence System.

## Base Information

- **Base URL**: `https://api.headelf.io/v2`
- **Authentication**: Bearer Token (JWT)
- **Content Type**: `application/json`
- **API Version**: `2.0`

## Authentication

### Obtaining Access Token

```http
POST /auth/token
Content-Type: application/json

{
  "organizationId": "your-org-id",
  "credentials": {
    "type": "api_key",
    "apiKey": "your-api-key"
  },
  "scope": ["executive:read", "executive:write", "extensions:read"]
}
```

**Response:**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "tokenType": "Bearer",
  "expiresIn": 86400,
  "scope": ["executive:read", "executive:write", "extensions:read"]
}
```

### Using the Access Token

Include the access token in all API requests:

```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Executive Intelligence API

### Process Executive Query

Analyze business scenarios with comprehensive C-suite intelligence.

```http
POST /executive/query
```

**Request Body:**
```json
{
  "type": "MA_EVALUATION",
  "content": "Evaluate acquisition of fintech startup: $750M valuation, 250 employees, regulatory considerations across US and EU markets.",
  "context": {
    "organizationId": "org_12345",
    "businessContext": {
      "industry": "FINANCIAL_SERVICES",
      "businessModel": "B2B_SAAS",
      "marketPosition": "MARKET_LEADER",
      "growthStage": "SCALE_UP"
    },
    "authorityLevel": 4,
    "urgency": "HIGH"
  },
  "options": {
    "enableExtensions": true,
    "requireAllModules": true,
    "timeoutSeconds": 30
  }
}
```

**Response:**
```json
{
  "id": "exec_query_789xyz",
  "status": "completed",
  "processingTime": 8.7,
  "confidence": 0.92,

  "ctoAnalysis": {
    "technologyAssessment": {
      "compatibilityScore": 0.85,
      "integrationComplexity": "MEDIUM",
      "technicalRisks": ["data_migration", "system_integration"],
      "recommendation": "PROCEED_WITH_CONDITIONS"
    },
    "innovationOpportunities": [
      {
        "area": "ai_ml_capabilities",
        "impact": "HIGH",
        "timeline": "6-12 months",
        "investment": "$15M-20M"
      }
    ],
    "implementationRoadmap": {
      "phases": [
        {
          "name": "Due Diligence",
          "duration": "6 weeks",
          "activities": ["tech_audit", "security_review", "integration_planning"]
        }
      ]
    }
  },

  "cfoAnalysis": {
    "financialAssessment": {
      "valuation": {
        "current": "$750M",
        "fairValue": "$680M-720M",
        "premiumJustification": "strategic_synergies"
      },
      "dealStructure": {
        "recommended": "70% cash, 30% stock",
        "financing": "debt_financing_preferred",
        "synergies": "$45M annual run-rate by Year 2"
      }
    },
    "riskAssessment": {
      "financial": ["integration_costs", "revenue_retention"],
      "riskRating": "MEDIUM_HIGH"
    }
  },

  "cisoAnalysis": {
    "securityPosture": {
      "currentState": "STRONG",
      "complianceGaps": ["gdpr_documentation", "sox_controls"],
      "integrationRisks": ["identity_management", "data_governance"]
    },
    "regulatoryCompliance": {
      "frameworks": [
        {
          "name": "SOX",
          "status": "PARTIAL_COMPLIANCE",
          "gapAnalysis": ["financial_controls", "it_general_controls"]
        }
      ]
    }
  },

  "cioAnalysis": {
    "systemsIntegration": {
      "complexity": "MEDIUM",
      "timeline": "12-18 months",
      "keyMilestones": ["api_integration", "data_consolidation"]
    },
    "digitalTransformation": {
      "opportunities": ["customer_portal_enhancement", "analytics_platform"]
    }
  },

  "cooAnalysis": {
    "operationalIntegration": {
      "culturalAlignment": "HIGH",
      "processComplexity": "MEDIUM",
      "talentRetention": "85% expected"
    }
  },

  "coordinatedRecommendations": [
    {
      "priority": "HIGH",
      "category": "DEAL_STRUCTURE",
      "recommendation": "Proceed with acquisition at negotiated valuation of $720M with earnout provisions",
      "rationale": "Strong strategic fit with manageable integration risks",
      "timeline": "Close within 6 months"
    }
  ],

  "extensionsApplied": [
    "financial-services-regulatory-v2.1",
    "ma-integration-framework-v1.8"
  ],

  "timestamp": "2024-01-15T10:30:45Z"
}
```

### Query Processing Status

Check the status of a long-running executive query.

```http
GET /executive/query/{queryId}/status
```

**Response:**
```json
{
  "id": "exec_query_789xyz",
  "status": "processing",
  "progress": {
    "overall": 65,
    "modules": {
      "cto": "completed",
      "cfo": "processing",
      "ciso": "queued",
      "cio": "queued",
      "coo": "queued"
    }
  },
  "estimatedCompletion": "2024-01-15T10:35:00Z"
}
```

### Get Analysis History

Retrieve previous executive analyses for an organization.

```http
GET /executive/history?organizationId=org_12345&limit=10&offset=0
```

**Query Parameters:**
- `organizationId` (required): Organization identifier
- `limit` (optional): Number of results to return (default: 10, max: 100)
- `offset` (optional): Number of results to skip (default: 0)
- `type` (optional): Filter by query type
- `dateFrom` (optional): Start date (ISO 8601)
- `dateTo` (optional): End date (ISO 8601)

**Response:**
```json
{
  "data": [
    {
      "id": "exec_query_789xyz",
      "type": "MA_EVALUATION",
      "status": "completed",
      "confidence": 0.92,
      "createdAt": "2024-01-15T10:30:45Z",
      "summary": "M&A evaluation of fintech startup with positive recommendation"
    }
  ],
  "pagination": {
    "total": 45,
    "limit": 10,
    "offset": 0,
    "hasMore": true
  }
}
```

## C-Suite Modules API

### Get Available Modules

List all available C-suite intelligence modules.

```http
GET /modules
```

**Response:**
```json
{
  "modules": [
    {
      "role": "CTO",
      "name": "Chief Technology Officer Intelligence",
      "version": "2.1.0",
      "capabilities": [
        "technology_assessment",
        "innovation_analysis",
        "venture_capital_evaluation",
        "ma_technology_integration"
      ],
      "status": "active",
      "lastUpdated": "2024-01-10T00:00:00Z"
    },
    {
      "role": "CFO",
      "name": "Chief Financial Officer Intelligence",
      "version": "2.0.5",
      "capabilities": [
        "financial_analysis",
        "capital_markets",
        "ma_financial_evaluation",
        "esg_integration"
      ],
      "status": "active",
      "lastUpdated": "2024-01-12T00:00:00Z"
    }
  ]
}
```

### Get Module Details

Get detailed information about a specific C-suite module.

```http
GET /modules/{role}
```

**Response:**
```json
{
  "role": "CTO",
  "name": "Chief Technology Officer Intelligence",
  "version": "2.1.0",
  "description": "Comprehensive technology leadership intelligence including innovation, architecture, and strategic technology decisions",

  "capabilities": [
    {
      "name": "technology_assessment",
      "description": "Evaluate technology stacks, architecture, and infrastructure decisions",
      "inputTypes": ["TECHNOLOGY_AUDIT", "ARCHITECTURE_REVIEW", "STACK_EVALUATION"],
      "outputTypes": ["ASSESSMENT_REPORT", "RECOMMENDATIONS", "ROADMAP"]
    }
  ],

  "authorityLevels": [1, 2, 3, 4, 5],
  "supportedIndustries": ["TECHNOLOGY", "FINANCIAL_SERVICES", "HEALTHCARE"],

  "metrics": {
    "accuracy": 0.94,
    "responseTime": 4.2,
    "utilization": 0.78
  },

  "lastUpdated": "2024-01-10T00:00:00Z"
}
```

## Extensions API

### List Available Extensions

Get available industry and enterprise context extensions.

```http
GET /extensions?type=industry&category=FINANCIAL_SERVICES
```

**Query Parameters:**
- `type` (optional): `industry` or `enterprise`
- `category` (optional): Filter by industry or enterprise type
- `status` (optional): Filter by status (`available`, `installed`, `deprecated`)

**Response:**
```json
{
  "extensions": [
    {
      "id": "financial-services-regulatory-v2.1",
      "name": "Financial Services Regulatory Framework",
      "type": "industry",
      "category": "FINANCIAL_SERVICES",
      "version": "2.1.0",
      "description": "Comprehensive regulatory compliance for financial services including Basel III, Dodd-Frank, MiFID II",

      "capabilities": [
        "regulatory_compliance",
        "risk_assessment",
        "capital_adequacy",
        "stress_testing"
      ],

      "supportedRegions": ["US", "EU", "UK", "APAC"],
      "regulatoryFrameworks": [
        "Basel III", "Dodd-Frank", "MiFID II", "PCI DSS"
      ],

      "installation": {
        "status": "available",
        "requirements": ["minimum_org_size_500", "financial_services_license"],
        "installTime": "15 minutes"
      },

      "ratings": {
        "overall": 4.8,
        "accuracy": 4.9,
        "usability": 4.7,
        "performance": 4.8,
        "reviews": 127
      },

      "pricing": {
        "model": "usage_based",
        "freeQueries": 100,
        "paidTier": "$0.50 per query"
      }
    }
  ]
}
```

### Install Extension

Install an industry or enterprise context extension.

```http
POST /extensions/install
```

**Request Body:**
```json
{
  "extensionId": "financial-services-regulatory-v2.1",
  "version": "2.1.0",
  "configuration": {
    "regions": ["US", "EU"],
    "frameworks": ["Basel III", "Dodd-Frank", "MiFID II"],
    "notificationEmail": "admin@company.com"
  }
}
```

**Response:**
```json
{
  "installationId": "install_abc123",
  "status": "installing",
  "progress": 25,
  "estimatedCompletion": "2024-01-15T10:45:00Z",
  "steps": [
    {
      "name": "validation",
      "status": "completed",
      "completedAt": "2024-01-15T10:30:00Z"
    },
    {
      "name": "dependency_resolution",
      "status": "processing",
      "startedAt": "2024-01-15T10:32:00Z"
    }
  ]
}
```

### Extension Configuration

Update configuration for an installed extension.

```http
PUT /extensions/{extensionId}/config
```

**Request Body:**
```json
{
  "configuration": {
    "regions": ["US", "EU", "UK"],
    "frameworks": ["Basel III", "Dodd-Frank", "MiFID II", "PRA"],
    "alertThresholds": {
      "complianceRisk": "MEDIUM",
      "regulatoryChange": true
    }
  }
}
```

## Context Management API

### Update Executive Context

Update the executive context for your organization.

```http
PUT /context
```

**Request Body:**
```json
{
  "organizationId": "org_12345",
  "businessContext": {
    "industry": "FINANCIAL_SERVICES",
    "businessModel": "B2B_SAAS",
    "marketPosition": "MARKET_LEADER",
    "competitiveContext": {
      "primaryCompetitors": ["competitor_a", "competitor_b"],
      "differentiators": ["ai_capabilities", "regulatory_compliance"]
    },
    "growthStage": "SCALE_UP",
    "geographicScope": ["US", "EU", "APAC"]
  },

  "organizationalContext": {
    "size": "MEDIUM_ENTERPRISE",
    "structure": "MATRIX",
    "culture": "INNOVATION_FOCUSED",
    "maturity": "OPTIMIZING",
    "changeCapacity": "HIGH"
  },

  "strategicContext": {
    "objectives": [
      {
        "type": "GROWTH",
        "target": "40% revenue growth",
        "timeline": "2024"
      }
    ],
    "initiatives": ["digital_transformation", "market_expansion"],
    "constraints": ["regulatory_compliance", "talent_acquisition"]
  }
}
```

**Response:**
```json
{
  "contextId": "ctx_789xyz",
  "status": "updated",
  "validatedAt": "2024-01-15T10:30:45Z",
  "validationResults": {
    "businessContext": "valid",
    "organizationalContext": "valid",
    "strategicContext": "valid"
  }
}
```

### Get Current Context

Retrieve the current executive context for your organization.

```http
GET /context/{organizationId}
```

**Response:**
```json
{
  "contextId": "ctx_789xyz",
  "organizationId": "org_12345",
  "businessContext": {
    "industry": "FINANCIAL_SERVICES",
    "businessModel": "B2B_SAAS",
    "marketPosition": "MARKET_LEADER"
  },
  "lastUpdated": "2024-01-15T10:30:45Z",
  "version": "1.2.3"
}
```

## Performance and Monitoring API

### Get Performance Metrics

Retrieve performance metrics for executive intelligence operations.

```http
GET /metrics/performance?organizationId=org_12345&timeRange=7d
```

**Query Parameters:**
- `organizationId` (required): Organization identifier
- `timeRange` (optional): Time range (`1h`, `24h`, `7d`, `30d`)
- `metricTypes` (optional): Comma-separated list of metric types

**Response:**
```json
{
  "timeRange": "7d",
  "organizationId": "org_12345",

  "metrics": {
    "queryCount": 145,
    "avgResponseTime": 6.2,
    "successRate": 0.987,
    "confidenceScore": 0.91
  },

  "breakdown": {
    "byType": {
      "MA_EVALUATION": { "count": 23, "avgResponseTime": 12.1 },
      "STRATEGIC_PLANNING": { "count": 45, "avgResponseTime": 8.3 },
      "FINANCIAL_ANALYSIS": { "count": 77, "avgResponseTime": 4.1 }
    },

    "byModule": {
      "CTO": { "utilization": 0.78, "accuracy": 0.94 },
      "CFO": { "utilization": 0.85, "accuracy": 0.96 },
      "CISO": { "utilization": 0.71, "accuracy": 0.93 }
    }
  },

  "trends": [
    {
      "date": "2024-01-14",
      "queries": 21,
      "avgResponseTime": 5.8,
      "successRate": 0.95
    }
  ]
}
```

### Health Check

Check the health status of HeadElf services.

```http
GET /health
```

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2024-01-15T10:30:45Z",
  "version": "2.0.0",

  "services": {
    "executiveIntelligence": "healthy",
    "csuiteModules": "healthy",
    "extensions": "healthy",
    "database": "healthy",
    "cache": "healthy"
  },

  "metrics": {
    "uptime": 2592000,
    "activeConnections": 47,
    "memoryUsage": 0.68,
    "cpuUsage": 0.23
  }
}
```

## Webhooks

### Configure Webhooks

Set up webhooks to receive notifications about executive intelligence events.

```http
POST /webhooks
```

**Request Body:**
```json
{
  "url": "https://your-app.com/webhooks/headelf",
  "events": [
    "query.completed",
    "extension.installed",
    "context.updated"
  ],
  "secret": "webhook_secret_key"
}
```

### Webhook Events

#### Query Completed

```json
{
  "event": "query.completed",
  "timestamp": "2024-01-15T10:30:45Z",
  "data": {
    "queryId": "exec_query_789xyz",
    "organizationId": "org_12345",
    "type": "MA_EVALUATION",
    "status": "completed",
    "confidence": 0.92,
    "processingTime": 8.7
  }
}
```

## Error Handling

### Error Response Format

```json
{
  "error": {
    "code": "INVALID_REQUEST",
    "message": "The request body contains invalid parameters",
    "details": [
      {
        "field": "context.authorityLevel",
        "message": "Authority level must be between 1 and 5"
      }
    ],
    "requestId": "req_123abc",
    "timestamp": "2024-01-15T10:30:45Z"
  }
}
```

### Common Error Codes

| Code | HTTP Status | Description |
|------|-------------|-------------|
| `INVALID_REQUEST` | 400 | Request format or parameters are invalid |
| `UNAUTHORIZED` | 401 | Authentication token is missing or invalid |
| `FORBIDDEN` | 403 | Insufficient permissions for the requested operation |
| `NOT_FOUND` | 404 | Requested resource does not exist |
| `RATE_LIMITED` | 429 | API rate limit exceeded |
| `INTERNAL_ERROR` | 500 | Internal server error |
| `SERVICE_UNAVAILABLE` | 503 | Service temporarily unavailable |

## Rate Limits

### Standard Limits

- **Executive Queries**: 100 per hour per organization
- **Context Updates**: 10 per hour per organization
- **Extension Operations**: 5 per hour per organization
- **General API**: 1000 requests per hour per organization

### Rate Limit Headers

```http
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 87
X-RateLimit-Reset: 1642680000
X-RateLimit-Window: 3600
```

## SDKs and Libraries

### Official SDKs

- **Node.js**: `npm install @headelf/node-sdk`
- **Python**: `pip install headelf-python`
- **Java**: Maven/Gradle coordinates available
- **Go**: `go get github.com/headelf/go-sdk`

### Node.js SDK Example

```javascript
const { HeadElfClient } = require('@headelf/node-sdk')

const client = new HeadElfClient({
  apiKey: 'your-api-key',
  organizationId: 'org_12345'
})

async function analyzeMAScenario() {
  const response = await client.executive.query({
    type: 'MA_EVALUATION',
    content: 'Evaluate acquisition of fintech startup...',
    context: {
      businessContext: {
        industry: 'FINANCIAL_SERVICES'
      },
      authorityLevel: 4
    }
  })

  console.log('CTO Analysis:', response.ctoAnalysis)
  console.log('CFO Analysis:', response.cfoAnalysis)
  console.log('Recommendations:', response.coordinatedRecommendations)
}
```

---

**API Support**

For API support and questions:

- **Documentation**: [API Documentation](https://docs.headelf.io/api)
- **GitHub Issues**: [Report API Issues](https://github.com/pauljbernard/headElf/issues)
- **Community**: [GitHub Discussions](https://github.com/pauljbernard/headElf/discussions)

This API reference provides comprehensive coverage of HeadElf's executive intelligence capabilities, enabling seamless integration with your existing business systems and workflows.