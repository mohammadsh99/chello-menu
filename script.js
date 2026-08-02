const menuContent = document.getElementById("menuContent");
const categoryNav = document.getElementById("categoryNav");
const searchInput = document.getElementById("searchInput");
const yearEl = document.getElementById("year");
const sloganEl = document.querySelector(".slogan");
const searchLabel = document.querySelector(".search-wrap span");
const heroImage = document.querySelector(".hero img");
const footerLabelEls = document.querySelectorAll(".footer-grid p strong");
const footerCopyright = document.querySelector(".copyright");
const langButtons = document.querySelectorAll(".lang-btn");
const FALLBACK_IMAGE = "assets/hero/hero-banner.webp";
const FEATURED_CATEGORY_ID = "chefs-recommendations";
const LANGUAGE_STORAGE_KEY = "chello-menu-language";
const DEFAULT_LANGUAGE = "en";
const SUPPORTED_LANGUAGES = ["en", "ar"];

const UI_TEXT = {
  en: {
    title: "CHELLO CHOCOLATE | Menu",
    slogan: "Taste Happiness In Every Bite",
    searchLabel: "Search Products",
    searchPlaceholder: "Type to search...",
    loading: "Loading menu...",
    noCategories: "No categories available.",
    noMatching: "No matching products in this category.",
    noResults: "No products found. Try another search term.",
    phone: "Phone:",
    whatsapp: "WhatsApp:",
    instagram: "Instagram:",
    address: "Address:",
    chatNow: "Chat Now",
    copyright: "All rights reserved.",
    heroAlt: "CHELLO CHOCOLATE signature desserts and drinks",
  },
  ar: {
    title: "CHELLO CHOCOLATE | القائمة",
    slogan: "استمتع بالسعادة في كل لقمة",
    searchLabel: "ابحث عن المنتجات",
    searchPlaceholder: "اكتب للبحث...",
    loading: "جارٍ تحميل القائمة...",
    noCategories: "لا توجد أقسام متاحة.",
    noMatching: "لا توجد منتجات مطابقة في هذا القسم.",
    noResults: "لم يتم العثور على منتجات. جرّب عبارة بحث أخرى.",
    phone: "الهاتف:",
    whatsapp: "واتساب:",
    instagram: "إنستغرام:",
    address: "العنوان:",
    chatNow: "تواصل الآن",
    copyright: "جميع الحقوق محفوظة.",
    heroAlt: "حلويات ومشروبات CHELLO CHOCOLATE",
  },
};

const CATEGORY_TRANSLATIONS = {
  ar: {
    "chefs-recommendations": "⭐ توصيات الشيف",
    "signature-desserts": "حلويات مميزة",
    "belgian-waffles": "الوافل البلجيكي",
    pancakes: "البان كيك",
    crepes: "الكريب",
    "chocolate-skewers": "فشافيش",
    "ice-cream": "آيس كريم",
    "fresh-juices": "العصائر الطازجة",
    refreshers: "المرطبات",
    "soft-drinks": "المشروبات الغازية",
  },
};

const ITEM_TRANSLATIONS = {
  ar: {
    "rec-fruit-cocktail": {
      name: "كوكتيل الفواكه (فخفخينة)",
      subtitle: "الأكثر مبيعًا",
      description: "طبقات فواكه طازجة مقدمة بأسلوبنا المميز.",
    },
    "rec-waffle": {
      name: "وافل بلجيكي",
      subtitle: "ذهبي ومقرمش",
      description: "وافل فاخر مغطى بإضافات الشوكولاتة الغنية.",
    },
    "rec-pancakes": {
      name: "بان كيك",
      subtitle: "طري وهش",
      description: "يُقدَّم مع صوص الشوكولاتة والإضافات المفضلة لديك.",
    },
    "rec-crepe": {
      name: "كريب",
      subtitle: "كريب شوكولاتة كلاسيكي",
      description: "كريب رقيق ودافئ محضر طازجًا عند الطلب.",
    },
    "sig-fruit-cocktail": {
      name: "كوكتيل الفواكه",
      subtitle: "تشكيلة طازجة",
    },
    "sig-fruit-shake": {
      name: "ميلك شيك بالفواكه",
      subtitle: "فواكه طازجة وحليب",
    },
    "sig-milkshake": {
      name: "ميلك شيك",
      subtitle: "خليط كريمي",
    },
    "waffle-belgian": {
      name: "وافل بلجيكي",
      subtitle: "ذهبي ومقرمش",
      description: "وافل بلجيكي فاخر مع إضافاتك المفضلة.",
    },
    "pancake-1": {
      name: "بان كيك (قطعة واحدة)",
    },
    "pancake-3": {
      name: "بان كيك (3 قطع)",
    },
    "crepe-regular": {
      name: "كريب",
      subtitle: "كريب شوكولاتة كلاسيكي",
      description: "كريب رقيق ودافئ مع الشوكولاتة الغنية.",
    },
    "crepe-fettuccine": {
      name: "كريب فيتوتشيني",
      subtitle: "أسلوب مميز",
      description: "شرائط كريب رقيقة مع طبقات الشوكولاتة.",
    },
    "choco-skewers-7": { name: "7 قطع" },
    "choco-skewers-10": { name: "10 قطع" },
    "choco-skewers-15": { name: "15 قطعة" },
    "choco-skewers-20": { name: "20 قطعة" },
    "ice-1": { name: "سكوب واحد" },
    "ice-3": { name: "3 سكوبات" },
    "juice-orange": { name: "عصير البرتقال" },
    "juice-carrot": { name: "عصير الجزر" },
    "juice-orange-carrot": { name: "عصير البرتقال والجزر" },
    "juice-apple": { name: "عصير التفاح" },
    "juice-pomegranate": { name: "عصير الرمان" },
    "ref-mojito": { name: "موهيتو" },
    "ref-jarous": {
      name: "جاروس",
      subtitle: "مشروب منعش مميز",
    },
    "ref-lemonade": {
      name: "ليمونادة",
      subtitle: "طازجة ومضغوطة",
    },
    "ref-ice-cafe": { name: "آيس كافيه" },
    "ref-basiflora": { name: "باسيفلورا" },
    "soft-drinks": { name: "المشروبات الغازية" },
    "soft-water": { name: "ماء" },
    "soft-soda": { name: "صودا" },
  },
};

let sectionObserver = null;

const state = {
  categories: [],
  items: [],
  filteredItems: [],
  activeCategoryId: null,
  searchQuery: "",
  lang: getInitialLanguage(),
};

yearEl.textContent = new Date().getFullYear();
applyLanguage(state.lang);
bindEvents();
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
    applyFilters();
  } catch (error) {
    menuContent.innerHTML = `<p class="error-text">${escapeHtml(
      UI_TEXT[state.lang].noResults,
    )}</p>`;
    console.error(error);
  }
}

function bindEvents() {
  searchInput.addEventListener("input", (event) => {
    state.searchQuery = event.target.value.trim().toLowerCase();
    applyFilters();
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
    state.activeCategoryId = targetId;

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

  langButtons.forEach((button) => {
    button.addEventListener("click", () => {
      setLanguage(button.dataset.lang);
    });
  });
}

function setLanguage(lang) {
  if (!SUPPORTED_LANGUAGES.includes(lang) || lang === state.lang) {
    return;
  }

  state.lang = lang;

  try {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
  } catch {
    // Ignore storage failures and keep the live switch working.
  }

  applyLanguage(lang);
  applyFilters();
}

function applyLanguage(lang) {
  const text = UI_TEXT[lang];
  const direction = lang === "ar" ? "rtl" : "ltr";

  document.documentElement.lang = lang;
  document.documentElement.dir = direction;
  document.body.dir = direction;
  document.title = text.title;
  sloganEl.textContent = text.slogan;
  searchLabel.textContent = text.searchLabel;
  searchInput.placeholder = text.searchPlaceholder;
  searchInput.dir = direction;
  if (heroImage) {
    heroImage.alt = text.heroAlt;
  }

  if (footerLabelEls.length >= 4) {
    footerLabelEls[0].textContent = text.phone;
    footerLabelEls[1].textContent = text.whatsapp;
    footerLabelEls[2].textContent = text.instagram;
    footerLabelEls[3].textContent = text.address;
  }

  const whatsappButton = document.querySelector(".whatsapp-btn");
  if (whatsappButton) {
    whatsappButton.textContent = text.chatNow;
  }

  if (footerCopyright) {
    footerCopyright.textContent = `© ${new Date().getFullYear()} CHELLO CHOCOLATE. ${text.copyright}`;
  }

  const loadingText = menuContent.querySelector(".loading-text");
  if (loadingText) {
    loadingText.textContent = text.loading;
  }

  updateLanguageButtons();
}

function updateLanguageButtons() {
  langButtons.forEach((button) => {
    const isActive = button.dataset.lang === state.lang;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
}

function applyFilters() {
  state.filteredItems = state.items.filter((item) => {
    const searchText = getItemSearchText(item);
    return searchText.includes(state.searchQuery);
  });

  renderCategoryNav();
  renderMenu();
  observeSections();
}

function renderCategoryNav() {
  const categories = getVisibleCategories();

  if (!categories.length) {
    categoryNav.innerHTML = "";
    return;
  }

  const fallbackTarget = `section-${categories[0].id}`;
  const activeTarget =
    state.activeCategoryId &&
    categories.some(
      (category) => `section-${category.id}` === state.activeCategoryId,
    )
      ? state.activeCategoryId
      : fallbackTarget;

  state.activeCategoryId = activeTarget;

  const buttonsMarkup = categories
    .map((category) => {
      const categoryName = getLocalizedCategoryName(category);
      return `
        <button
          type="button"
          class="category-btn ${
            category.id === FEATURED_CATEGORY_ID ? "featured-nav-btn" : ""
          } ${`section-${category.id}` === activeTarget ? "active" : ""}"
          data-target="section-${category.id}"
        >
          ${escapeHtml(categoryName)}
        </button>
      `;
    })
    .join("");

  categoryNav.innerHTML = buttonsMarkup;
}

function renderMenu() {
  const categories = getVisibleCategories();

  if (!categories.length) {
    menuContent.innerHTML = `<p class="no-results">${escapeHtml(
      UI_TEXT[state.lang].noCategories,
    )}</p>`;
    return;
  }

  const sections = categories
    .map((category) => {
      const items = state.filteredItems.filter(
        (item) => item.categoryId === category.id,
      );

      const cards = items.length
        ? items.map(renderCard).join("")
        : `<p class="empty-category">${escapeHtml(
            UI_TEXT[state.lang].noMatching,
          )}</p>`;

      const sectionClasses =
        category.id === FEATURED_CATEGORY_ID
          ? "category-section featured-section"
          : "category-section";

      return `
        <section class="${sectionClasses}" id="section-${category.id}">
          <h2 class="category-title">${escapeHtml(
            getLocalizedCategoryName(category),
          )}</h2>
          <div class="cards-grid">${cards}</div>
        </section>
      `;
    })
    .join("");

  const hasResults = state.filteredItems.length > 0;

  menuContent.innerHTML = hasResults
    ? sections
    : `<p class="no-results">${escapeHtml(UI_TEXT[state.lang].noResults)}</p>`;

  attachImageFallbacks();
}

function renderCard(item) {
  const localizedItem = getLocalizedItem(item);
  const safeName = escapeHtml(localizedItem.name || item.name);
  const safeSubtitle = localizedItem.subtitle
    ? escapeHtml(localizedItem.subtitle)
    : "";
  const safeDescription = localizedItem.description
    ? escapeHtml(localizedItem.description)
    : "";
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
  state.activeCategoryId = sectionId;

  const buttons = document.querySelectorAll(".category-btn");
  buttons.forEach((button) => {
    const isActive = button.getAttribute("data-target") === sectionId;
    button.classList.toggle("active", isActive);
  });
}

function getVisibleCategories() {
  const hasSearchQuery = state.searchQuery.length > 0;
  if (!hasSearchQuery) {
    return state.categories;
  }

  return state.categories.filter((category) =>
    state.filteredItems.some((item) => item.categoryId === category.id),
  );
}

function getLocalizedCategoryName(category) {
  return CATEGORY_TRANSLATIONS[state.lang]?.[category.id] || category.name;
}

function getLocalizedItem(item, lang = state.lang) {
  const translated = ITEM_TRANSLATIONS[lang]?.[item.id];
  return {
    ...item,
    name: translated?.name || item.name,
    subtitle: translated?.subtitle || item.subtitle || "",
    description: translated?.description || item.description || "",
  };
}

function getItemSearchText(item) {
  const englishText = [item.name, item.subtitle, item.description]
    .filter(Boolean)
    .join(" ");
  const arabicItem = getLocalizedItem(item, "ar");
  const arabicText = [
    arabicItem.name,
    arabicItem.subtitle,
    arabicItem.description,
  ]
    .filter(Boolean)
    .join(" ");

  return `${englishText} ${arabicText}`.toLowerCase();
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

function getInitialLanguage() {
  try {
    const savedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (SUPPORTED_LANGUAGES.includes(savedLanguage)) {
      return savedLanguage;
    }
  } catch {
    // Ignore storage access failures and fall back to English.
  }

  return DEFAULT_LANGUAGE;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
