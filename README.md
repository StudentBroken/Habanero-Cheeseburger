# Habanero Cheeseburger Project Hub

A modern, static portfolio application designed to showcase personal hardware and software projects. Built with Next.js, this project hub provides an elegant and responsive interface for displaying project details, media, and downloadable assets.

## Features

- **Project Showcases**: Distinct pages and layouts for different types of projects, including both hardware and software.
- **Dynamic Media Carousel**: Built-in support for an interactive image and video carousel to highlight project features.
- **Asset Downloads**: A robust mechanism for users to download project-specific files, such as 3D printing STLs or software APKs directly from the project pages.
- **Responsive Design**: Designed to work flawlessly across desktop, tablet, and mobile platforms.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **Styling**: Vanilla CSS with customized design tokens and custom typography
- **Deployment**: Configured for static export (`next build` output to `out` directory)

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Adding a New Project

The project is structured to make adding new entries intuitive. You can add new content within the standard Next.js `app` router structure or by following the specific data structure defined in the `src/content/` directory.

## License

This project is open-source and available under the terms of the MIT License.
