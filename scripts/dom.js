export function el(tag, className = "", attributes = {}) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  Object.entries(attributes).forEach(([key, value]) => {
    if (value === undefined || value === null) return;
    if (key === "text") {
      node.textContent = value;
      return;
    }
    if (key === "html") {
      node.innerHTML = value;
      return;
    }
    node.setAttribute(key, value);
  });
  return node;
}

export function append(parent, children) {
  children.filter(Boolean).forEach((child) => parent.appendChild(child));
  return parent;
}

export function sectionShell(id, kicker, title, intro) {
  const section = el("section", "border-t border-gold-500/20 py-16 transition-colors duration-500 ease-out sm:py-20 dark:border-gold-300/15", { id });
  const inner = el("div", "mx-auto max-w-6xl px-5");
  const header = el("div", "max-w-3xl");
  append(header, [
    el("p", "text-sm font-semibold uppercase tracking-[0.22em] text-gold-700 dark:text-gold-300", { text: kicker }),
    el("h2", "mt-3 text-3xl font-semibold tracking-normal text-stone-950 sm:text-4xl dark:text-white", { text: title }),
    intro ? el("p", "mt-5 text-lg leading-8 text-stone-700 dark:text-stone-300", { text: intro }) : null
  ]);
  inner.appendChild(header);
  section.appendChild(inner);
  return { section, inner };
}
