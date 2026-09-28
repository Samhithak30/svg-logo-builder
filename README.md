# SVG Studio: Design & Convert

A lightweight, browser-based tool for creating and exporting SVG elements and wrapping raster images in SVG containers — no build step, no dependencies to install.

## Features

### Dynamic SVG Element Creator
- Generate SVG shapes: **Circle**, **Rectangle**, **Triangle**
- Customise width, height, fill color, stroke color, stroke width
- Add text with configurable font size and text color
- Live preview updates in real time
- Download the generated element as an `.svg` file

### Image to SVG Wrapper
- Upload any raster image (JPG, PNG, GIF, WebP)
- Embed it inside an SVG container at a chosen width/height
- Download the wrapped result as an `.svg` file
- Note: this wraps the image — it does **not** trace or vectorise it

## Getting Started

Open `index.html` directly in any modern browser — no server required.

```bash
# Clone the repo
git clone https://github.com/Samhithak30/svg-logo-builder.git
cd svg-logo-builder

# Open in browser (macOS example)
open index.html
```

## Project Structure

```
svg-logo-builder/
├── index.html       # App shell and markup
├── style.css        # Styles (SAP Fiori-inspired design)
├── script.js        # SVG generation and download logic
├── manifest.yml     # Cloud Foundry deployment config
├── SAP_logo.png     # Header logo
└── Team SIX logo.png
```

## Deployment

The app is configured for Cloud Foundry using the `staticfile_buildpack`.

```bash
cf push
```

The `manifest.yml` sets 256 MB memory and deploys the app as `svg-logo-builder-1`.

## Tech Stack

- Plain HTML / CSS / JavaScript (no framework)
- [IBM Plex Sans](https://fonts.google.com/specimen/IBM+Plex+Sans) & [Poppins](https://fonts.google.com/specimen/Poppins) via Google Fonts
- [Font Awesome 6](https://fontawesome.com/) for icons

---

© With LOVE ❤️ Demo Build Team
