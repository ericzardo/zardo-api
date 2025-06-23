# Zardo API

Zardo API is the central API for internal services and automations related to zardo.dev.
This project is designed to grow and support multiple endpoints and tools used by the agency.

---

## Current Endpoint

### /scrape

Scrapes project listings from freelancing platforms.  
Currently supports:

- workana (https://www.workana.com/)

**Example request:**

```GET /scrape?platform=workana&search=react```

**Query Parameters:**

- platform (string, required): Platform to scrape (e.g., "workana")
- search (string, required): Keyword to search projects for

**Response example:**

```json
{
  "projects": [
    {
      "title": "React Developer Needed",
      "link": "https://www.workana.com/job/...",
      "date": "2025-06-23 14:30",
      "proposals": "12",
      "description": "We are looking for a React developer...",
      "budget": "$ 500,00"
    }
  ]
}
```

## Installation

Run the following commands:
```bash
git clone https://github.com/ericzardo/zardo-api.git
cd zardo-api
npm install
npm run dev
```
The API will run at: http://localhost:3000

## License
This project is licensed under the [MIT License](LICENSE).