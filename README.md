# Ceylon Breeze Resorts — Web Designing Module Project

A fully responsive multi-page resort website built for the NSBM Web Designing coursework brief using only:

- HTML5
- CSS3
- Bootstrap 5
- Vanilla JavaScript

This project presents an imaginary Sri Lankan eco-luxury resort brand, **Ceylon Breeze Resorts**, with complete page flow, custom UI components, and interactive frontend features.

---

## Live Project Scope

The site includes **8 pages**:

1. `index.html` — Home
2. `about.html` — About Us (with mandatory NSBM attribution link)
3. `properties.html` — Our Properties
4. `rooms.html` — Rooms and Rates
5. `experiences.html` — Experiences and Packages
6. `gallery.html` — Gallery (custom lightbox + filters)
7. `contact.html` — Contact Us (with mandatory NSBM attribution link)
8. `booking.html` — Booking Request

---

## Features

- Responsive layout (mobile / tablet / desktop)
- Shared navbar and footer across all pages
- Home hero, testimonials carousel, newsletter form validation
- Property sections with room deep links (`rooms.html#sigiriya`, etc.)
- Room tabs with URL hash activation
- Experiences filter (All / Sigiriya / Mirissa / Ella)
- Gallery filter and **custom hand-written lightbox**
- Contact form validation with inline messages
- Booking form logic:
  - check-in date minimum
  - check-out date rules
  - dynamic room type by property
  - success state with generated booking reference

---

## Project Structure

```text
.
├── index.html
├── about.html
├── properties.html
├── rooms.html
├── experiences.html
├── gallery.html
├── contact.html
├── booking.html
├── css/
│   └── style.css
├── js/
│   └── main.js
├── images/
│   └── *.jpg
└── deploy-notes.txt
```

---

## Academic Compliance Highlights

- Built as an original coursework implementation (no templates)
- Uses Bootstrap grid + custom CSS
- Uses JavaScript interactivity (forms, tabs, filters, lightbox)
- Includes visible NSBM links on both required pages:
  - `about.html`
  - `contact.html`

---

## Author

AGHD Jayathissa

Developed for the Web Designing Module Project (Repeat) at NSBM Green University Town.

