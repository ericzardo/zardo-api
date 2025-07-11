# Zardo API

Zardo API is a versatile backend service designed for the digital agency’s ecosystem. It offers multiple functionalities including data scraping, keyword management, scheduled scraping tasks, and more — all accessible through clean, RESTful endpoints.
---
## 🚀 Overview

Zardo API acts as a centralized backend platform providing:
  - Freelancer platform scraping: Automatically fetch freelance job postings from platforms such as Workana.
  - Keyword management: Define keywords to tailor search and automation workflows.
  = Scheduled jobs: Use cron-based scheduling to automate recurring scraping tasks.
  - Extensible service-oriented architecture: Easily add more features and platform integrations.

Built with Fastify and TypeScript, optimized for performance and scalability.
---
### 📦 Installation
```bash
git clone https://github.com/your-username/zardo-api.git
cd zardo-api
npm install
```
▶️ Running the API locally
```bash
npm run dev

# API will start on:
# http://localhost:9999
```
---
## 📚 Core API Endpoints
### Freelancer Scraping Module
 - Endpoint prefix: /scrape/freelancer

`GET /scrape/freelancer`

**Scrape freelance job listings based on platform and keyword.**
  - Query Parameters:
    - Parameter	Type	Required	Description
    - platform	string	Yes	Platform name, e.g. workana
    - search	string	Optional	Search keyword, e.g. automation

`POST /scrape/freelancer/keywords`

Add a keyword to the watchlist.
```json
{
  "keyword": "automation"
}
```
`GET /scrape/freelancer/keywords`

List all monitored keywords.

`DELETE /scrape/freelancer/keywords/:keyword`

Remove a keyword from monitoring.

`GET /scrape/freelancer/cron`

Get configured scheduled scraping jobs.

`POST /scrape/freelancer/cron`

Add a new cron job to schedule scraping.
```json
{
  "platform": "workana",
  "interval": "0 */6 * * *"
}
```

`PUT /scrape/freelancer/cron`

Update existing scheduled jobs.
---
## 🧰 Technologies

- Fastify — web framework
- TypeScript — typed JavaScript
- Puppeteer (with stealth plugins) — headless browser automation
- Day.js — date parsing & manipulation

## License

This project is licensed under the [MIT License](LICENSE).