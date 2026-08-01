const menuContent = document.getElementById("menuContent");
const categoryNav = document.getElementById("categoryNav");
const searchInput = document.getElementById("searchInput");
const yearEl = document.getElementById("year");
const FALLBACK_IMAGE = "assets/hero/hero-banner.webp";
const FEATURED_CATEGORY_ID = "chefs-recommendations";

let sectionObserver = null;

const state = {
  categories: [],
  items: [],
  filteredItems: [],
  activeCategoryId: null,
};

yearEl.textContent = new Date().getFullYear();

init();

async function init() {
  try {
    const response = await fetch("data/menu.json", { cache: "no-store" });
    if (!response.ok) {
      throw new Error("Unable to load menu data.");
    }

    const data = await response.json();
    state.categories = Array.isArray(data.categories) ? data.categories : [];
    state.items = Array.isArray(data.items) ? data.items : [];
    state.filteredItems = [...state.items];

    renderCategoryNav();
    renderMenu();
    bindEvents();
    observeSections();
  } catch (error) {
    menuContent.innerHTML =
      '<p class="error-text">Menu is unavailable right now. Please try again later.</p>';
    console.error(error);
  }
}

function bindEvents() {
  searchInput.addEventListener("input", (event) => {
    const query = event.target.value.trim().toLowerCase();
    state.filteredItems = state.items.filter((item) => {
      const searchText = [item.name, item.subtitle, item.description]
        .join(" ")
        .toLowerCase();
      return searchText.includes(query);
    });

    renderCategoryNav();
    renderMenu();
    observeSections();
  });

  categoryNav.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-target]");
    if (!button) {
      return;
    }

    const targetId = button.getAttribute("data-target");
    const targetSection = document.getElementById(targetId);
    if (!targetSection) {
      return;
    }

    document
      .querySelectorAll(".category-btn")
      .forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    const navHeight = categoryNav.getBoundingClientRect().height;
    const targetTop =
      targetSection.getBoundingClientRect().top +
      window.scrollY -
      navHeight -
      18;

    window.scrollTo({ top: Math.max(targetTop, 0), behavior: "smooth" });

    setTimeout(() => {
      updateActiveButton(targetId);
    }, 450);
  });
}

function renderCategoryNav() {
  const categories = getVisibleCategories();

  if (!categories.length) {
    categoryNav.innerHTML = "";
    return;
  }

  const buttonsMarkup = categories
    .map(
      (category, index) => `
        <button
          type="button"
          class="category-btn ${
            category.id === FEATURED_CATEGORY_ID ? "featured-nav-btn" : ""
          } ${index === 0 ? "active" : ""}"
          data-target="section-${category.id}"
        >
          ${category.name}
        </button>
      `,
    )
    .join("");

  categoryNav.innerHTML = buttonsMarkup;
}

function renderMenu() {
  const categories = getVisibleCategories();

  if (!categories.length) {
    menuContent.innerHTML =
      '<p class="no-results">No categories available.</p>';
    return;
  }

  const sections = categories
    .map((category) => {
      const items = state.filteredItems.filter(
        (item) => item.categoryId === category.id,
      );

      const cards = items.length
        ? items.map(renderCard).join("")
        : '<p class="empty-category">No matching products in this category.</p>';

      const sectionClasses =
        category.id === FEATURED_CATEGORY_ID
          ? "category-section featured-section"
          : "category-section";

      return `
        <section class="${sectionClasses}" id="section-${category.id}">
          <h2 class="category-title">${category.name}</h2>
          <div class="cards-grid">${cards}</div>
        </section>
      `;
    })
    .join("");

  const hasResults = state.filteredItems.length > 0;

  menuContent.innerHTML = hasResults
    ? sections
    : '<p class="no-results">No products found. Try another search term.</p>';

  attachImageFallbacks();
}

function renderCard(item) {
  const safeName = escapeHtml(item.name);
  const safeSubtitle = item.subtitle ? escapeHtml(item.subtitle) : "";
  const safeDescription = item.description ? escapeHtml(item.description) : "";
  const safeImage = item.image ? escapeHtml(item.image) : FALLBACK_IMAGE;
  const subtitle = safeSubtitle
    ? `<p class="card-subtitle">${safeSubtitle}</p>`
    : "";
  const description = safeDescription
    ? `<p class="card-desc">${safeDescription}</p>`
    : "";

  return `
    <article class="menu-card">
      <img
        class="card-media"
        src="${safeImage}"
        alt="${safeName}"
        loading="lazy"
        decoding="async"
      />
      <div class="card-body">
        <div class="card-top">
          <div>
            <h3 class="card-name">${safeName}</h3>
            ${subtitle}
          </div>
          <span class="price-tag">${item.price} ₪</span>
        </div>
        ${description}
      </div>
    </article>
  `;
}

function observeSections() {
  if (sectionObserver) {
    sectionObserver.disconnect();
  }

  const sections = document.querySelectorAll(".category-section");

  sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          updateActiveButton(entry.target.id);
        }
      });
    },
    { threshold: 0.18 },
  );

  sections.forEach((section) => sectionObserver.observe(section));
}

function updateActiveButton(sectionId) {
  const buttons = document.querySelectorAll(".category-btn");
  buttons.forEach((button) => {
    const isActive = button.getAttribute("data-target") === sectionId;
    button.classList.toggle("active", isActive);
  });
}

function getVisibleCategories() {
  const hasSearchQuery = searchInput.value.trim().length > 0;
  if (!hasSearchQuery) {
    return state.categories;
  }

  return state.categories.filter((category) =>
    state.filteredItems.some((item) => item.categoryId === category.id),
  );
}

function attachImageFallbacks() {
  document.querySelectorAll(".card-media").forEach((img) => {
    img.addEventListener(
      "error",
      () => {
        img.src = FALLBACK_IMAGE;
      },
      { once: true },
    );
  });
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
