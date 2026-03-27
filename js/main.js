/**
 * Ceylon Breeze Resorts — main.js (PRD Section 9 + interactive pages)
 */
document.addEventListener("DOMContentLoaded", function () {
  initNavbar();
  initRoomsHashTabs();
  initExperienceFilters();
  initGalleryFiltersAndLightbox();
  initNewsletter();
  initContactForm();
  initBookingForm();
  initScrollReveal();
});

/* Navbar PRD 9.1 */
function initNavbar() {
  const nav = document.getElementById("mainNav");
  if (!nav) return;

  const isHomePage =
    window.location.pathname.endsWith("index.html") ||
    window.location.pathname.endsWith("/") ||
    window.location.pathname === "";

  if (!isHomePage) {
    nav.classList.add("solid");
  } else {
    window.addEventListener("scroll", function () {
      if (window.scrollY > 80) {
        nav.classList.add("scrolled");
      } else {
        nav.classList.remove("scrolled");
      }
    });
  }
}

/* Rooms tab from URL hash PRD 7.4.2 */
function initRoomsHashTabs() {
  const hash = window.location.hash;
  if (!hash || typeof bootstrap === "undefined") return;

  const tabEl = document.querySelector(`[data-bs-target="${hash}-tab-pane"]`);
  if (tabEl) {
    const tab = new bootstrap.Tab(tabEl);
    tab.show();
  }
}

/* Experiences filter PRD 7.5.2 */
function initExperienceFilters() {
  const filterBtns = document.querySelectorAll(".experience-filter-btn");
  if (!filterBtns.length) return;

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      filterBtns.forEach((b) => b.classList.remove("active"));
      this.classList.add("active");
      const filter = this.dataset.filter;
      document.querySelectorAll(".experience-card").forEach((card) => {
        if (filter === "All" || card.dataset.location === filter) {
          card.classList.remove("d-none");
        } else {
          card.classList.add("d-none");
        }
      });
    });
  });
}

/* Gallery: dual filter + lightbox PRD 7.6 */
let galleryImages = [];
let currentGalleryIndex = 0;
let galleryFilterMode = "all";

function initGalleryFiltersAndLightbox() {
  const filterBtns = document.querySelectorAll(".gallery-filter-btn");
  if (filterBtns.length) {
    filterBtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        filterBtns.forEach((b) => b.classList.remove("active"));
        this.classList.add("active");
        const filter = this.dataset.filter;
        const type = this.dataset.filterType || "";

        document.querySelectorAll(".gallery-item").forEach((col) => {
          const loc = col.dataset.location;
          const cat = col.dataset.category;
          let show = true;

          if (filter === "All") {
            show = true;
          } else if (type === "location") {
            show = loc === filter;
          } else if (type === "category") {
            show = cat === filter;
          }
          col.classList.toggle("d-none", !show);
        });
      });
    });
  }

  initLightbox();
}

function initLightbox() {
  const lightbox = document.getElementById("lightbox");
  if (!lightbox) return;

  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");

  const images = document.querySelectorAll(".gallery-img");
  galleryImages = Array.from(images);

  images.forEach((img, i) => {
    img.addEventListener("click", () => openLightbox(i));
  });

  const closeBtn = document.getElementById("lightbox-close");
  const prevBtn = document.getElementById("lightbox-prev");
  const nextBtn = document.getElementById("lightbox-next");

  if (closeBtn) closeBtn.addEventListener("click", closeLightbox);
  if (prevBtn) prevBtn.addEventListener("click", () => navigateLightbox(-1));
  if (nextBtn) nextBtn.addEventListener("click", () => navigateLightbox(1));

  lightbox.addEventListener("click", function (e) {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("is-open")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") navigateLightbox(-1);
    if (e.key === "ArrowRight") navigateLightbox(1);
  });
}

function openLightbox(index) {
  currentGalleryIndex = index;
  const img = galleryImages[index];
  if (!img) return;

  const lb = document.getElementById("lightbox");
  const lbImg = document.getElementById("lightbox-img");
  const cap = document.getElementById("lightbox-caption");
  if (!lb || !lbImg) return;

  lbImg.src = img.src;
  lbImg.alt = img.alt;
  if (cap) cap.textContent = img.dataset.caption || "";
  lb.classList.add("is-open");
  lb.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  const lb = document.getElementById("lightbox");
  if (lb) {
    lb.classList.remove("is-open");
    lb.setAttribute("aria-hidden", "true");
  }
  document.body.style.overflow = "";
}

function navigateLightbox(direction) {
  const visible = galleryImages.filter(
    (img) => img.closest(".gallery-item") && !img.closest(".gallery-item").classList.contains("d-none")
  );
  if (!visible.length) return;

  const currentVisible = visible.findIndex((img) => img === galleryImages[currentGalleryIndex]);
  const idx = currentVisible >= 0 ? currentVisible : 0;
  const newIdx = (idx + direction + visible.length) % visible.length;
  const targetImg = visible[newIdx];
  currentGalleryIndex = galleryImages.indexOf(targetImg);
  openLightbox(currentGalleryIndex);
}

/* Newsletter PRD 7.1.7 */
function initNewsletter() {
  const form = document.getElementById("newsletterForm");
  if (!form) return;

  const emailInput = document.getElementById("newsletterEmail");
  const successDiv = document.getElementById("newsletterSuccess");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const email = emailInput.value.trim();
    if (emailRegex.test(email)) {
      emailInput.classList.remove("is-invalid");
      form.classList.add("d-none");
      if (successDiv) successDiv.classList.remove("d-none");
    } else {
      emailInput.classList.add("is-invalid");
      let fb = emailInput.nextElementSibling;
      if (!fb || !fb.classList.contains("invalid-feedback")) {
        fb = document.createElement("div");
        fb.className = "invalid-feedback d-block";
        emailInput.parentNode.appendChild(fb);
      }
      fb.textContent = "Please enter a valid email address.";
    }
  });
}

/* Contact form PRD 7.7.2 */
function initContactForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    let valid = true;

    const name = document.getElementById("contactName");
    if (name.value.trim().length < 3) {
      showError(name, "Please enter your full name (min 3 characters).");
      valid = false;
    } else clearError(name);

    const email = document.getElementById("contactEmail");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value.trim())) {
      showError(email, "Please enter a valid email address.");
      valid = false;
    } else clearError(email);

    const phone = document.getElementById("contactPhone");
    if (!/^\d{10,}$/.test(phone.value.replace(/\D/g, ""))) {
      showError(phone, "Please enter a valid phone number (10+ digits).");
      valid = false;
    } else clearError(phone);

    const msg = document.getElementById("contactMessage");
    if (msg.value.trim().length < 20) {
      showError(msg, "Message must be at least 20 characters.");
      valid = false;
    } else clearError(msg);

    const subject = document.getElementById("contactSubject");
    const property = document.getElementById("contactProperty");
    if (subject) {
      if (!subject.value) {
        showError(subject, "Please select a subject.");
        valid = false;
      } else clearError(subject);
    }
    if (property) {
      if (!property.value) {
        showError(property, "Please select a property.");
        valid = false;
      } else clearError(property);
    }

    if (valid) {
      document.getElementById("contactForm").style.display = "none";
      const fs = document.getElementById("formSuccess");
      fs.innerHTML = `
      <div class="alert alert-success p-4">
        <h5><i class="bi bi-check-circle-fill me-2"></i>Message Sent!</h5>
        <p>Thank you, <strong>${escapeHtml(name.value)}</strong>! Your message has been received.<br>
        We'll reply to <strong>${escapeHtml(email.value)}</strong> within 24 hours.</p>
      </div>`;
      fs.style.display = "block";
    }
  });
}

function showError(input, message) {
  input.classList.add("is-invalid");
  input.classList.remove("is-valid");
  let feedback = input.nextElementSibling;
  if (!feedback || !feedback.classList.contains("invalid-feedback")) {
    feedback = document.createElement("div");
    feedback.className = "invalid-feedback";
    input.parentNode.insertBefore(feedback, input.nextSibling);
  }
  feedback.textContent = message;
}

function clearError(input) {
  input.classList.remove("is-invalid");
  input.classList.add("is-valid");
}

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

/* Booking form PRD 7.8 */
function initBookingForm() {
  const checkIn = document.getElementById("checkIn");
  const checkOut = document.getElementById("checkOut");
  const propertySelect = document.getElementById("property");
  const form = document.getElementById("bookingForm");

  if (checkIn) {
    checkIn.min = new Date().toISOString().split("T")[0];
    checkIn.addEventListener("change", function () {
      if (!this.value) return;
      const nextDay = new Date(this.value);
      nextDay.setDate(nextDay.getDate() + 1);
      if (checkOut) checkOut.min = nextDay.toISOString().split("T")[0];
    });
  }
  if (checkOut && checkIn) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    checkOut.min = tomorrow.toISOString().split("T")[0];
  }

  if (propertySelect) {
    propertySelect.addEventListener("change", function () {
      const roomTypes = {
        Sigiriya: ["Deluxe Room", "Superior Suite", "Eco Villa"],
        Mirissa: ["Ocean Room", "Beach Suite", "Honeymoon Villa"],
        Ella: ["Valley View Room", "Tea Planter Suite", "Ridge Villa"],
      };
      const select = document.getElementById("roomType");
      if (!select) return;
      select.innerHTML = '<option value="">Select a room type</option>';
      (roomTypes[this.value] || []).forEach((room) => {
        select.innerHTML += `<option value="${room}">${room}</option>`;
      });
    });
  }

  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    let valid = true;
    const fields = [
      { id: "firstName", min: 2, msg: "Enter your first name." },
      { id: "lastName", min: 2, msg: "Enter your last name." },
      { id: "email", type: "email" },
      { id: "phone", type: "phone" },
      { id: "nationality", min: 2, msg: "Enter your nationality." },
    ];

    fields.forEach((f) => {
      const el = document.getElementById(f.id);
      if (!el) return;
      if (f.type === "email") {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!re.test(el.value.trim())) {
          showFieldError(el, "Valid email required.");
          valid = false;
        } else clearFieldError(el);
      } else if (f.type === "phone") {
        if (el.value.replace(/\D/g, "").length < 10) {
          showFieldError(el, "Valid phone required (10+ digits).");
          valid = false;
        } else clearFieldError(el);
      } else if (el.value.trim().length < (f.min || 1)) {
        showFieldError(el, f.msg);
        valid = false;
      } else clearFieldError(el);
    });

    const prop = document.getElementById("property");
    const rt = document.getElementById("roomType");
    if (prop && !prop.value) {
      showFieldError(prop, "Select a property.");
      valid = false;
    } else if (prop) clearFieldError(prop);
    if (rt && !rt.value) {
      showFieldError(rt, "Select a room type.");
      valid = false;
    } else if (rt) clearFieldError(rt);

    const adults = document.getElementById("adults");
    const children = document.getElementById("children");
    const numRooms = document.getElementById("numRooms");
    if (adults && (adults.value < 1 || adults.value > 10)) {
      showFieldError(adults, "Adults must be 1–10.");
      valid = false;
    } else if (adults) clearFieldError(adults);
    if (children && (children.value < 0 || children.value > 10)) {
      showFieldError(children, "Children must be 0–10.");
      valid = false;
    } else if (children) clearFieldError(children);
    if (numRooms && (numRooms.value < 1 || numRooms.value > 5)) {
      showFieldError(numRooms, "Rooms must be 1–5.");
      valid = false;
    } else if (numRooms) clearFieldError(numRooms);

    const cin = document.getElementById("checkIn");
    const cout = document.getElementById("checkOut");
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (cin && cin.value) {
      const checkInDate = new Date(cin.value);
      checkInDate.setHours(0, 0, 0, 0);
      if (checkInDate < today) {
        showFieldError(cin, "Check-in cannot be in the past.");
        valid = false;
      } else clearFieldError(cin);
    } else if (cin) {
      showFieldError(cin, "Select check-in date.");
      valid = false;
    }

    if (cin && cout && cin.value && cout.value) {
      const dIn = new Date(cin.value);
      const dOut = new Date(cout.value);
      if (dOut <= dIn) {
        showFieldError(cout, "Check-out must be after check-in.");
        valid = false;
      } else clearFieldError(cout);
    } else if (cout && !cout.value) {
      showFieldError(cout, "Select check-out date.");
      valid = false;
    }

    if (valid) {
      const ref = Math.floor(100000 + Math.random() * 900000);
      const firstName = document.getElementById("firstName").value;
      const propertyVal = document.getElementById("property").value;
      const emailVal = document.getElementById("email").value;

      document.getElementById("bookingForm").style.display = "none";
      const success = document.getElementById("bookingSuccess");
      success.innerHTML = `
      <div class="alert alert-success p-5 text-center">
        <i class="bi bi-check-circle-fill display-4 text-success"></i>
        <h4 class="mt-3">Booking Request Received!</h4>
        <p>Thank you, <strong>${escapeHtml(firstName)}</strong>. Your request for 
        <strong>${escapeHtml(propertyVal)}</strong> has been submitted.</p>
        <p>Confirmation will be sent to <strong>${escapeHtml(emailVal)}</strong> within 24 hours.</p>
        <p class="text-muted">Reference: <strong>CBR-${ref}</strong></p>
      </div>`;
      success.style.display = "block";
    }
  });
}

function showFieldError(el, msg) {
  el.classList.add("is-invalid");
  let fb = el.nextElementSibling;
  if (!fb || !fb.classList.contains("invalid-feedback")) {
    fb = document.createElement("div");
    fb.className = "invalid-feedback d-block";
    el.parentNode.appendChild(fb);
  }
  fb.textContent = msg;
}

function clearFieldError(el) {
  el.classList.remove("is-invalid");
}

/* Scroll reveal (F-11 scroll effects) */
function initScrollReveal() {
  const els = document.querySelectorAll(".reveal-on-scroll");
  if (!els.length) return;

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("is-visible");
      });
    },
    { threshold: 0.12 }
  );
  els.forEach((el) => io.observe(el));
}
