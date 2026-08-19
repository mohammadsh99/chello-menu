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
const flavorOverlay = document.getElementById("flavorOverlay");
const flavorSheet = flavorOverlay?.querySelector(".flavor-sheet");
const flavorSheetTitle = document.getElementById("flavorSheetTitle");
const flavorGrid = document.getElementById("flavorGrid");
const flavorCloseBtn = document.getElementById("flavorCloseBtn");
const flavorStepIndicator = document.getElementById("flavorStepIndicator");
const flavorSummary = document.getElementById("flavorSummary");
const flavorFooter = document.getElementById("flavorFooter");
const flavorBackBtn = document.getElementById("flavorBackBtn");
const flavorNextBtn = document.getElementById("flavorNextBtn");
const FALLBACK_IMAGE = "assets/hero/hero-banner.webp";
const FEATURED_CATEGORY_ID = "chefs-recommendations";
let openFlavorItemId = null;
let optionWizardState = null;
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
    flavorsHint: "Tap to see flavors",
    flavorsTitle: "Choose Your Flavor",
    close: "Close",
    customizeHint: "Tap to customize",
    step: "Step",
    of: "of",
    continueLabel: "Continue",
    backLabel: "Back",
    doneLabel: "Done",
    requiredBadge: "Required",
    yourSelection: "Your Selection",
    campaignHint: "Tap to view bundle details",
    campaignIncludes: "What's Included",
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
    flavorsHint: "اضغط لعرض النكهات",
    flavorsTitle: "اختر نكهتك المفضلة",
    close: "إغلاق",
    customizeHint: "اضغط للتخصيص",
    step: "الخطوة",
    of: "من",
    continueLabel: "متابعة",
    backLabel: "رجوع",
    doneLabel: "تم",
    requiredBadge: "مطلوب",
    yourSelection: "اختيارك",
    campaignHint: "اضغط لعرض تفاصيل الحملة",
    campaignIncludes: "محتويات الحملة",
  },
};

const CATEGORY_TRANSLATIONS = {
  ar: {
    "chefs-recommendations": "⭐ توصيات الشيف",
    campaigns: "الحملات",
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
    "camp-milkshake": {
      name: "حملة ميلك شيك",
      description: "باقة مثالية لعشاق الميلك شيك.",
      contents: ["2 ميلك شيك", "2 موهيتو وسط", "2 آيس باسيفلورا / توت"],
    },
    "camp-delaa-halak": {
      name: "حملة دلع حالك",
      description: "دلّع حالك بمزيج حلو من المفضلات.",
      contents: ["قطعتين وافل", "20 كرة فشافيش", "6 ميني بانكيك"],
    },
    "camp-summer": {
      name: "حملة الصيف",
      description: "تركيبة صيفية منعشة.",
      contents: ["2 فخفخينا صغير", "كريب", "15 كرة فشافيش", "3 كرات بوظة"],
    },
    "camp-fakhfakhina-chocolate": {
      name: "حملة فخفخينا نشيلو شوكولاتة",
      description: "فخفخينا مع فشافيش الشوكولاتة.",
      contents: ["3 فخفخينا وسط", "20 كرة فشافيش"],
    },
    "camp-happiness": {
      name: "حملة السعادة",
      description: "أكبر باقة لمشاركة السعادة.",
      contents: [
        "2 فخفخينا صغير",
        "2 شيك فواكه صغير",
        "2 ميلك شيك صغير",
        "15 كرة فشافيش",
        "كريب",
        "3 بانكيك كبير",
        "3 كرات بوظة",
      ],
    },
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

const FLAVOR_TRANSLATIONS = {
  ar: {
    "sig-milkshake": {
      oreo: "أوريو",
      berry: "توت",
      chocolate: "شوكولاتة",
      vanilla: "فانيلا",
      pistachio: "فستق",
    },
  },
};

const OPTION_STEP_TRANSLATIONS = {
  ar: {
    "ref-mojito": {
      base: {
        title: "اختر القاعدة",
        options: {
          sprite: "سبرايت",
          xl: "XL",
          "xl-ten": "XL TEN",
          blu: "BLU",
          "blu-day": "BLU DAY",
        },
      },
      flavor: {
        title: "اختر النكهة",
        options: {
          strawberry: "توت",
          watermelon: "بطيخ",
          mango: "مانجو",
          pineapple: "أناناس",
          blueberry: "توت أزرق",
          banana: "موز",
          orange: "برتقال",
          kiwi: "كيوي",
          mastic: "ماستك",
          pomegranate: "رمان",
          marshmallow: "مارشميلو",
          peach: "خوخ",
          mint: "نعناع",
          lemon: "ليمون",
          "passion-fruit": "باسفلورا",
          "green-apple": "تفاح أخضر",
        },
      },
    },
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

  menuContent.addEventListener("click", (event) => {
    const card = event.target.closest(".menu-card[data-flavor-item]");
    if (!card) {
      return;
    }

    openFlavorSheet(card.getAttribute("data-flavor-item"));
  });

  menuContent.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") {
      return;
    }

    const card = event.target.closest(".menu-card[data-flavor-item]");
    if (!card) {
      return;
    }

    event.preventDefault();
    openFlavorSheet(card.getAttribute("data-flavor-item"));
  });

  flavorCloseBtn?.addEventListener("click", closeFlavorSheet);

  flavorGrid?.addEventListener("click", (event) => {
    const optionCard = event.target.closest(".flavor-card[data-option-id]");
    if (!optionCard || !optionWizardState || !openFlavorItemId) {
      return;
    }

    const item = state.items.find(
      (candidate) => candidate.id === openFlavorItemId,
    );
    const step = item?.optionSteps?.[optionWizardState.stepIndex];
    if (!step) {
      return;
    }

    optionWizardState.selections[step.id] =
      optionCard.getAttribute("data-option-id");
    renderFlavorSheet(openFlavorItemId);
  });

  flavorGrid?.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") {
      return;
    }

    const optionCard = event.target.closest(".flavor-card[data-option-id]");
    if (!optionCard) {
      return;
    }

    event.preventDefault();
    optionCard.click();
  });

  flavorBackBtn?.addEventListener("click", () => {
    if (!optionWizardState) {
      return;
    }
    optionWizardState.stepIndex = Math.max(0, optionWizardState.stepIndex - 1);
    renderFlavorSheet(openFlavorItemId);
  });

  flavorNextBtn?.addEventListener("click", () => {
    if (!optionWizardState || !openFlavorItemId) {
      return;
    }

    const item = state.items.find(
      (candidate) => candidate.id === openFlavorItemId,
    );
    const totalSteps = item?.optionSteps?.length || 0;
    const isLastStep = optionWizardState.stepIndex === totalSteps - 1;

    if (isLastStep) {
      closeFlavorSheet();
      return;
    }

    optionWizardState.stepIndex += 1;
    renderFlavorSheet(openFlavorItemId);
  });

  flavorOverlay?.addEventListener("click", (event) => {
    if (event.target === flavorOverlay) {
      closeFlavorSheet();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && openFlavorItemId) {
      closeFlavorSheet();
    }
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

  if (flavorCloseBtn) {
    flavorCloseBtn.setAttribute("aria-label", text.close);
  }

  if (openFlavorItemId) {
    renderFlavorSheet(openFlavorItemId);
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

  const hasFlavors = Array.isArray(item.flavors) && item.flavors.length > 0;
  const hasOptionSteps =
    Array.isArray(item.optionSteps) && item.optionSteps.length > 0;
  const hasCampaignContents =
    Array.isArray(item.contents) && item.contents.length > 0;
  const isInteractive = hasFlavors || hasOptionSteps || hasCampaignContents;
  const hintText = hasOptionSteps
    ? UI_TEXT[state.lang].customizeHint
    : hasCampaignContents
      ? UI_TEXT[state.lang].campaignHint
      : UI_TEXT[state.lang].flavorsHint;
  const flavorHint = isInteractive
    ? `<p class="card-flavor-hint">${escapeHtml(hintText)}</p>`
    : "";
  const flavorAttr = isInteractive
    ? ` data-flavor-item="${escapeHtml(item.id)}" role="button" tabindex="0"`
    : "";
  const cardClasses = isInteractive ? "menu-card has-flavors" : "menu-card";

  return `
    <article class="${cardClasses}"${flavorAttr}>
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
        ${flavorHint}
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
    contents: translated?.contents || item.contents || [],
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

function openFlavorSheet(itemId) {
  const item = state.items.find((candidate) => candidate.id === itemId);
  const hasFlavors = Array.isArray(item?.flavors) && item.flavors.length > 0;
  const hasOptionSteps =
    Array.isArray(item?.optionSteps) && item.optionSteps.length > 0;
  const hasCampaignContents =
    Array.isArray(item?.contents) && item.contents.length > 0;

  if (!item || (!hasFlavors && !hasOptionSteps && !hasCampaignContents)) {
    return;
  }

  openFlavorItemId = itemId;
  optionWizardState = hasOptionSteps ? { stepIndex: 0, selections: {} } : null;
  renderFlavorSheet(itemId);

  flavorOverlay.hidden = false;
  requestAnimationFrame(() => {
    flavorOverlay.classList.add("open");
  });
  document.body.classList.add("no-scroll");
}

function closeFlavorSheet() {
  if (!openFlavorItemId) {
    return;
  }

  openFlavorItemId = null;
  optionWizardState = null;
  flavorOverlay.classList.remove("open");
  document.body.classList.remove("no-scroll");

  setTimeout(() => {
    if (!openFlavorItemId) {
      flavorOverlay.hidden = true;
    }
  }, 300);
}

function renderFlavorSheet(itemId) {
  const item = state.items.find((candidate) => candidate.id === itemId);
  if (!item) {
    return;
  }

  if (Array.isArray(item.optionSteps) && item.optionSteps.length) {
    renderOptionWizard(item);
    return;
  }

  if (Array.isArray(item.contents) && item.contents.length) {
    renderCampaignDetail(item);
    return;
  }

  if (!Array.isArray(item.flavors)) {
    return;
  }

  flavorStepIndicator.hidden = true;
  flavorFooter.hidden = true;
  flavorSummary.hidden = true;

  const localizedItem = getLocalizedItem(item);
  const itemName = localizedItem.name || item.name;
  flavorSheetTitle.textContent = `${UI_TEXT[state.lang].flavorsTitle} · ${itemName}`;

  const flavorTranslations = FLAVOR_TRANSLATIONS[state.lang]?.[item.id] || {};

  flavorGrid.innerHTML = item.flavors
    .map((flavor) => {
      const safeName = escapeHtml(flavorTranslations[flavor.id] || flavor.name);
      const safeImage = flavor.image
        ? escapeHtml(flavor.image)
        : FALLBACK_IMAGE;

      return `
        <article class="flavor-card">
          <img
            class="flavor-media"
            src="${safeImage}"
            alt="${safeName}"
            loading="lazy"
            decoding="async"
          />
          <p class="flavor-name">${safeName}</p>
        </article>
      `;
    })
    .join("");

  flavorGrid.querySelectorAll(".flavor-media").forEach((img) => {
    img.addEventListener(
      "error",
      () => {
        img.src = FALLBACK_IMAGE;
      },
      { once: true },
    );
  });
}

function renderCampaignDetail(item) {
  flavorStepIndicator.hidden = true;
  flavorFooter.hidden = true;
  flavorSummary.hidden = true;

  const localizedItem = getLocalizedItem(item);
  const itemName = localizedItem.name || item.name;
  const safeImage = item.image ? escapeHtml(item.image) : FALLBACK_IMAGE;
  const safeName = escapeHtml(itemName);

  flavorSheetTitle.textContent = itemName;

  const contentsList = localizedItem.contents
    .map((line) => `<li>${escapeHtml(line)}</li>`)
    .join("");

  flavorGrid.innerHTML = `
    <div class="campaign-detail">
      <img
        class="campaign-detail-image"
        src="${safeImage}"
        alt="${safeName}"
        loading="lazy"
        decoding="async"
      />
      <span class="campaign-detail-price">${item.price} ₪</span>
      <p class="campaign-detail-label">${escapeHtml(
        UI_TEXT[state.lang].campaignIncludes,
      )}</p>
      <ul class="campaign-detail-list">${contentsList}</ul>
    </div>
  `;

  flavorGrid.querySelectorAll(".campaign-detail-image").forEach((img) => {
    img.addEventListener(
      "error",
      () => {
        img.src = FALLBACK_IMAGE;
      },
      { once: true },
    );
  });
}

function renderOptionWizard(item) {
  const text = UI_TEXT[state.lang];
  const steps = item.optionSteps;
  const totalSteps = steps.length;
  optionWizardState.stepIndex = Math.min(
    optionWizardState.stepIndex,
    totalSteps - 1,
  );
  const stepIndex = optionWizardState.stepIndex;
  const step = steps[stepIndex];
  const isLastStep = stepIndex === totalSteps - 1;
  const stepTranslation =
    OPTION_STEP_TRANSLATIONS[state.lang]?.[item.id]?.[step.id];
  const stepTitle = stepTranslation?.title || step.title;
  const selectedOptionId = optionWizardState.selections[step.id] || null;

  const localizedItem = getLocalizedItem(item);
  flavorSheetTitle.textContent = localizedItem.name || item.name;

  flavorStepIndicator.hidden = false;
  flavorStepIndicator.innerHTML = `
    <span class="flavor-step-count">${escapeHtml(text.step)} ${
      stepIndex + 1
    } ${escapeHtml(text.of)} ${totalSteps}</span>
    <span class="flavor-step-title">${escapeHtml(stepTitle)}</span>
    <span class="flavor-required-badge">${escapeHtml(text.requiredBadge)}</span>
  `;

  flavorGrid.innerHTML = step.options
    .map((option) => {
      const optionName = stepTranslation?.options?.[option.id] || option.name;
      const safeName = escapeHtml(optionName);
      const safeImage = option.image
        ? escapeHtml(option.image)
        : FALLBACK_IMAGE;
      const isSelected = option.id === selectedOptionId;

      return `
        <article
          class="flavor-card selectable ${isSelected ? "selected" : ""}"
          data-option-id="${escapeHtml(option.id)}"
          role="button"
          tabindex="0"
        >
          <img
            class="flavor-media"
            src="${safeImage}"
            alt="${safeName}"
            loading="lazy"
            decoding="async"
          />
          <p class="flavor-name">${safeName}</p>
        </article>
      `;
    })
    .join("");

  flavorGrid.querySelectorAll(".flavor-media").forEach((img) => {
    img.addEventListener(
      "error",
      () => {
        img.src = FALLBACK_IMAGE;
      },
      { once: true },
    );
  });

  flavorFooter.hidden = false;
  flavorBackBtn.hidden = stepIndex === 0;
  flavorBackBtn.textContent = text.backLabel;
  flavorNextBtn.disabled = !selectedOptionId;
  flavorNextBtn.textContent = isLastStep ? text.doneLabel : text.continueLabel;

  const allSelected = steps.every(
    (wizardStep) => optionWizardState.selections[wizardStep.id],
  );

  if (isLastStep && allSelected) {
    const summaryParts = steps.map((wizardStep) => {
      const translation =
        OPTION_STEP_TRANSLATIONS[state.lang]?.[item.id]?.[wizardStep.id];
      const optionId = optionWizardState.selections[wizardStep.id];
      const option = wizardStep.options.find((o) => o.id === optionId);
      return translation?.options?.[optionId] || option?.name || "";
    });

    flavorSummary.hidden = false;
    flavorSummary.textContent = `${text.yourSelection}: ${summaryParts.join(" + ")}`;
  } else {
    flavorSummary.hidden = true;
  }
}
