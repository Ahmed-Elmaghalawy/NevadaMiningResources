import { append, el, sectionShell } from "./dom.js";
import { initMotion } from "./motion.js";

const smooth = "transition-all duration-500 ease-out";
const glass = "border border-white/60 bg-white/55 shadow-glow backdrop-blur-2xl ring-1 ring-gold-500/10 dark:border-white/10 dark:bg-neutral-900/45 dark:ring-gold-300/10";
const softGlass = "bg-white/45 shadow-sm backdrop-blur-xl ring-1 ring-white/60 dark:bg-white/5 dark:ring-white/10";
const pageClass = `min-h-screen ${smooth} bg-[radial-gradient(circle_at_top_right,rgba(214,165,40,0.18),transparent_34rem),radial-gradient(circle_at_bottom_left,rgba(255,249,219,0.8),transparent_28rem)] dark:bg-[radial-gradient(circle_at_top_right,rgba(247,209,84,0.14),transparent_34rem),radial-gradient(circle_at_bottom_left,rgba(214,165,40,0.07),transparent_28rem)]`;
const pillClass = `inline-flex items-center justify-center rounded-full border border-gold-500/40 bg-white/35 px-5 py-3 text-sm font-semibold text-stone-950 backdrop-blur-xl ${smooth} hover:border-gold-500 hover:bg-gold-100/70 dark:bg-white/5 dark:text-white dark:hover:bg-gold-500/10`;

export function renderSite(data, mount) {
  document.title = data.meta.title;
  document.querySelector('meta[name="description"]')?.setAttribute("content", data.meta.description);

  const page = el("div", pageClass);
  append(page, [
    renderHeader(data),
    renderHero(data),
    renderProcess(data.process),
    renderParticipate(data.participate),
    renderInformation(data.information),
    renderContact(data.contact),
    renderMarketWidget(data.marketWidget),
    renderFooter(data)
  ]);

  mount.replaceChildren(page);
  initMotion();
}

function renderHeader(data) {
  const header = el("header", `sticky top-0 z-30 border-b border-white/60 bg-stone-50/55 backdrop-blur-2xl ${smooth} dark:border-white/10 dark:bg-neutral-950/55`);
  const wrap = el("div", "mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4");
  const brand = el("a", "flex items-center gap-3", { href: "#top", "aria-label": data.brand.name });
  brand.appendChild(el("img", "h-10 w-auto", { src: data.brand.logo, alt: data.brand.name }));

  const nav = el("nav", "hidden items-center gap-1 md:flex", { "aria-label": "Primary navigation" });
  data.navigation.forEach((item) => {
    nav.appendChild(el("a", `rounded-full px-4 py-2 text-sm font-medium text-stone-700 ${smooth} hover:bg-white/70 hover:text-stone-950 hover:shadow-sm dark:text-stone-200 dark:hover:bg-white/10 dark:hover:text-white`, { href: item.href, text: item.label }));
  });

  append(wrap, [brand, nav]);
  header.appendChild(wrap);
  return header;
}

function renderHero(data) {
  const hero = el("main", "mx-auto max-w-6xl px-5 pb-16 pt-16 sm:pb-20 sm:pt-24", { id: "top" });
  const grid = el("div", "grid items-center gap-10 lg:grid-cols-[1.08fr_0.92fr]");
  const copy = el("div", "");
  append(copy, [
    el("p", "text-sm font-semibold uppercase tracking-[0.24em] text-gold-700 dark:text-gold-300", { text: data.hero.eyebrow }),
    el("h1", "mt-5 max-w-4xl text-5xl font-semibold tracking-normal text-stone-950 sm:text-6xl lg:text-7xl dark:text-white", { text: data.hero.title }),
    el("p", "mt-6 max-w-2xl text-xl leading-9 text-stone-700 dark:text-stone-300", { text: data.hero.subtitle }),
    renderActions(data.hero.primaryAction, data.hero.secondaryAction)
  ]);

  const panel = el("div", `rounded-lg p-8 ${glass} ${smooth}`);
  const symbolWrap = el("div", `flex items-center justify-between gap-5 border-b border-gold-500/20 pb-7 ${smooth} dark:border-gold-300/15`);
  append(symbolWrap, [
    el("img", "h-14 w-auto", { src: data.brand.symbol, alt: "" }),
    el("p", "max-w-xs text-right text-sm font-medium uppercase tracking-[0.18em] text-gold-700 dark:text-gold-300", { text: data.brand.tagline })
  ]);
  const stats = el("div", "mt-7 grid gap-4");
  data.hero.stats.forEach((stat) => {
    const row = el("div", `flex items-start justify-between gap-5 rounded-md p-5 ${softGlass} ${smooth}`);
    append(row, [
      el("strong", "text-3xl font-semibold text-gold-700 dark:text-gold-300", { text: stat.value }),
      el("span", "max-w-sm text-right text-sm leading-6 text-stone-700 dark:text-stone-300", { text: stat.label })
    ]);
    stats.appendChild(row);
  });
  append(panel, [symbolWrap, stats]);
  append(grid, [copy, panel]);
  hero.appendChild(grid);
  return hero;
}

function renderActions(primary, secondary) {
  const actions = el("div", "mt-9 flex flex-wrap gap-3");
  actions.appendChild(el("a", `inline-flex items-center justify-center rounded-full bg-gold-500 px-6 py-3 text-sm font-semibold text-neutral-950 shadow-glow ${smooth} hover:bg-gold-300`, { href: primary.href, text: primary.label }));
  actions.appendChild(el("a", pillClass, { href: secondary.href, text: secondary.label }));
  return actions;
}

function renderProcess(process) {
  const { section, inner } = sectionShell(process.id, process.kicker, process.title, process.intro);
  const grid = el("div", "mt-10 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]");
  const body = el("div", "space-y-5 text-base leading-8 text-stone-700 dark:text-stone-300");
  process.body.forEach((paragraph) => body.appendChild(el("p", "", { text: paragraph })));

  const steps = el("div", "grid gap-4 sm:grid-cols-2");
  process.steps.forEach((step, index) => {
    const card = el("article", `rounded-lg p-6 ${glass} ${smooth}`);
    append(card, [
      el("span", "text-sm font-semibold text-gold-700 dark:text-gold-300", { text: String(index + 1).padStart(2, "0") }),
      el("h3", "mt-3 text-xl font-semibold text-stone-950 dark:text-white", { text: step.title }),
      el("p", "mt-3 text-sm leading-6 text-stone-700 dark:text-stone-300", { text: step.text })
    ]);
    steps.appendChild(card);
  });
  append(grid, [body, steps]);
  inner.appendChild(grid);
  return section;
}

function renderParticipate(participate) {
  const { section, inner } = sectionShell(participate.id, participate.kicker, participate.title, participate.intro);
  const body = el("div", "mt-8 max-w-4xl space-y-4 text-base leading-8 text-stone-700 dark:text-stone-300");
  participate.body.forEach((paragraph) => body.appendChild(el("p", "", { text: paragraph })));
  const audiences = el("div", "mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3");
  participate.audiences.forEach((audience) => {
    const card = el("article", `rounded-lg p-6 ${softGlass} ${smooth}`);
    append(card, [
      el("h3", "text-lg font-semibold text-stone-950 dark:text-white", { text: audience.name }),
      el("p", "mt-3 text-sm leading-6 text-stone-700 dark:text-stone-300", { text: audience.description })
    ]);
    audiences.appendChild(card);
  });
  append(inner, [body, audiences, el("a", `${pillClass} mt-10`, { href: participate.cta.href, text: participate.cta.label })]);
  return section;
}

function renderInformation(info) {
  const { section, inner } = sectionShell(info.id, info.kicker, info.title, info.intro);
  const groups = el("div", "mt-10 grid gap-5 lg:grid-cols-3");
  info.groups.forEach((group) => {
    const card = el("article", `rounded-lg p-6 ${glass} ${smooth}`);
    card.appendChild(el("h3", "text-xl font-semibold text-stone-950 dark:text-white", { text: group.name }));
    const list = el("ul", "mt-5 space-y-2");
    group.items.forEach((item) => {
      const details = typeof item === "string" ? { label: item } : item;
      const line = el("li", "");
      const content = details.href
        ? el("a", `block rounded-md px-3 py-2 text-sm text-stone-700 ${softGlass} ${smooth} hover:bg-gold-100 hover:text-stone-950 dark:text-stone-300 dark:hover:bg-gold-500/10 dark:hover:text-white`, { href: details.href, text: details.label, target: "_blank", rel: "noreferrer" })
        : el("span", `block rounded-md px-3 py-2 text-sm text-stone-700 ${softGlass} dark:text-stone-300`, { text: details.label });
      line.appendChild(content);
      list.appendChild(line);
    });
    card.appendChild(list);
    groups.appendChild(card);
  });
  inner.appendChild(groups);
  return section;
}

function renderContact(contact) {
  const { section, inner } = sectionShell(contact.id, contact.kicker, contact.title, contact.intro);
  const grid = el("div", "mt-10 grid gap-5 lg:grid-cols-3");
  contact.offices.forEach((office) => {
    const card = el("article", `rounded-lg p-6 ${softGlass} ${smooth}`);
    card.appendChild(el("h3", "text-lg font-semibold text-stone-950 dark:text-white", { text: office.city }));
    office.lines.forEach((line) => card.appendChild(el("p", "mt-2 text-sm text-stone-700 dark:text-stone-300", { text: line })));
    grid.appendChild(card);
  });
  const action = el("article", `rounded-lg bg-gold-500/90 p-6 text-neutral-950 shadow-glow backdrop-blur-xl ring-1 ring-white/40 ${smooth}`);
  append(action, [
    el("h3", "text-lg font-semibold", { text: "Contact" }),
    el("p", "mt-2 text-sm", { text: contact.email }),
    el("a", `mt-5 inline-flex rounded-full bg-neutral-950 px-5 py-3 text-sm font-semibold text-white ${smooth} hover:bg-neutral-800`, { href: `mailto:${contact.email}`, text: "Send email" })
  ]);
  grid.appendChild(action);
  inner.appendChild(grid);
  return section;
}

function renderMarketWidget(widget) {
  const { section, inner } = sectionShell(widget.id, widget.kicker, widget.title, widget.intro);
  append(inner, [
    renderKitcoWidget("widget_live_precious_metals"),
    renderKitcoWidget("widget_spot_price"),
    renderKitcoWidget("widget_morning_fix"),
    renderKitcoWidget("widget_cross_rates")
  ]);
  queueMicrotask(initKitcoWidgets);
  return section;
}

function renderKitcoWidget(widgetId) {
  const wrapper = el("div", `widget-wrapper mt-12 flex w-full justify-center overflow-hidden rounded-lg border border-gold-300/15 bg-neutral-950/80 p-4 shadow-glow ring-1 ring-white/10 ${smooth}`);
  wrapper.appendChild(el("div", "w-full bg-neutral-950 text-white", { id: widgetId, style: "margin-bottom: 0;width:100%;color-scheme:dark;" }));
  return wrapper;
}

function initKitcoWidgets() {
  const widgets = [
    {
      id: "widget_live_precious_metals",
      src: "https://storage.googleapis.com/kitco-widgets-storage/widgetLivePreciousMetals.bundle.js",
      factory: "createLivePreciousMetalsWidget",
      config: {
        widgetId: "widget_live_precious_metals",
        width: "1000",
        isTransparent: true,
        colorTheme: "dark",
        defaultUnit: "Troy Ounces",
        defaultCurrency: "USD",
        defaultListMetals: ["AU", "AG", "PT", "PD"],
        defaultCardSize: "Regular",
        defaultLayout: "Horizontal",
        defaultPriceType: "Bid",
        defaultBadgeStyle: "Colored"
      }
    },
    {
      id: "widget_spot_price",
      src: "https://storage.googleapis.com/kitco-widgets-storage/widgetSpotPrice.bundle.js",
      factory: "createSpotePriceWidget",
      config: {
        width: 300,
        isTransparent: true,
        colorTheme: "dark"
      }
    },
    {
      id: "widget_morning_fix",
      src: "https://storage.googleapis.com/kitco-widgets-storage/widgetMorningFix.bundle.js",
      factory: "createMorningFixWidget",
      config: {
        widgetId: "widget_morning_fix",
        width: "500",
        isTransparent: true,
        colorTheme: "dark",
        defaultUnit: "Troy Ounces",
        defaultCurrency: "USD",
        defaultDaysNumber: 2,
        defaultLocation: ["New York", "London", "Hong Kong", "Mumbai"],
        defaultListMetals: ["AU", "AG", "PT", "PD"]
      }
    },
    {
      id: "widget_cross_rates",
      src: "https://storage.googleapis.com/kitco-widgets-storage/widgetCrossRates.bundle.js",
      factory: "createCrossRatesWidget",
      config: {
        widgetId: "widget_cross_rates",
        width: "600",
        isTransparent: true,
        colorTheme: "dark",
        defaultUnit: "Troy Ounces",
        defaultShowChange: true,
        defaultCurrencyList: ["USD", "AUD", "BRL", "CAD", "CHF", "CNY", "EUR", "GBP", "HKD", "INR", "JPY", "MXN", "RUB", "ZAR"]
      }
    }
  ];

  widgets.forEach((widget) => {
    loadKitcoScript(widget.src, () => {
      if (typeof window[widget.factory] === "function") {
        window[widget.factory](widget.id, widget.config);
      } else {
        console.error(`window.${widget.factory} is not a function`);
      }
    });
  });
}

function loadKitcoScript(src, onload) {
  const existing = document.querySelector(`script[src="${src}"]`);
  if (existing) {
    existing.addEventListener("load", onload, { once: true });
    if (existing.dataset.loaded === "true") onload();
    return;
  }

  const script = document.createElement("script");
  script.src = src;
  script.onload = () => {
    script.dataset.loaded = "true";
    onload();
  };
  document.body.appendChild(script);
}

function renderFooter(data) {
  const footer = el("footer", `border-t border-gold-500/20 py-8 ${smooth} dark:border-gold-300/15`);
  const wrap = el("div", "mx-auto flex max-w-6xl flex-col gap-4 px-5 text-sm text-stone-400 sm:flex-row sm:items-center sm:justify-between");
  append(wrap, [
    el("p", "", { text: data.footer.copyright }),
    el("p", "", { text: data.footer.note })
  ]);
  footer.appendChild(wrap);
  return footer;
}
