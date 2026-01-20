# Linkly - Ultra Minimalist URL Shortener

Linkly is a zero-overhead URL shortener built with Next.js 14, TailwindCSS, and local JSON storage.

## Features

- **Link Shortening**: Generate clean, 6-character short IDs for any URL.
- **Instant Redirection**: Fast server-side redirects.
- **Local Persistence**: No database required, uses `data/links.json`.
- **Premium UI**: Clean, modern interface with dark mode and animations.

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Initialize the data directory:
   ```bash
   mkdir -p data
   echo "[]" > data/links.json
   ```

### Running the App

1. Start the development server:
   ```bash
   npm run dev
   ```
2. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Testing

Run the test suite:

```bash
npm test
```

## Built With

- **Framework**: Next.js 14 (App Router)
- **Styling**: TailwindCSS
- **Icons**: Lucide React
- **Testing**: Jest + React Testing Library
