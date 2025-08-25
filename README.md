# Noesis

Noesis is an advanced AI-powered search platform inspired by DeepSeek, designed to provide fast, intelligent, and context-aware results. Built with **Next.js** and leveraging the **DeepSeek API**, Noesis enables developers and users to perform semantic searches with ease and efficiency.

---

## Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- **Semantic Search:** Understands the context of queries rather than relying on exact keyword matches.
- **AI-Driven Recommendations:** Provides smarter suggestions and related content.
- **Next.js Powered:** Fast, server-side rendered, and optimized for SEO.
- **Responsive Design:** Works seamlessly on both desktop and mobile devices.
- **Extensible:** Easily integrate additional AI models or APIs.

---

## Tech Stack

- **Frontend:** Next.js, React, Tailwind CSS
- **Backend:** Node.js, DeepSeek API
- **Deployment:** Vercel / any preferred cloud hosting
- **Version Control:** Git & GitHub

---

## Installation

1. Clone the repository:

```bash
git clone https://github.com/ICLIPTER/noesis.git
cd noesis
npm install
npm run dev
```
Visit http://localhost:3000 to see Noesis in action.

---

## Usage

<ul>
  <li>Enter a search query in the search bar.</li>
  <li>Noesis sends the query to the DeepSeek API.</li>
  <li>The API returns semantic search results with AI-powered relevance.</li>
  <li>Explore results and use filters to refine searches.</li>
</ul>

---

## Enviorment Variables
Create a .env.local file in the root directory:

DEESEEK_API_KEY=your_deepseek_api_key_here
NEXT_PUBLIC_BASE_URL=http://localhost:3000

Make sure to replace your_deepseek_api_key_here with your actual DeepSeek API key.

---

## Contributing
We welcome contributions! Please follow these steps:

Fork the repository.

Create a feature branch: git checkout -b feature/YourFeature

Commit your changes: git commit -m 'Add YourFeature'

Push to the branch: git push origin feature/YourFeature

Open a pull request.

---

Made with ❤️ using Next.js and the DeepSeek API.



