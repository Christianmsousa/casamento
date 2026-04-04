# Casamento - Wedding Planning

A simple wedding planning application with invite management.

## Features

- **Public Area**: Invite pages for guests
- **Planning Area**: Guest management, checklists, and settings
- **Data Storage**: JSON files for simple data management
- **Markdown Checklists**: Editable checklists in markdown format

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3003](http://localhost:3003) with your browser.

## Structure

- `/invite` - Public invite page
- `/planning` - Private planning dashboard
- `/planning/guests` - Guest management
- `/planning/checklist` - Checklists (markdown)
- `/planning/settings` - Settings

## Data

Data is stored in JSON files in the `data/` directory:
- `guests.json` - Guest list
- `settings.json` - Wedding settings

