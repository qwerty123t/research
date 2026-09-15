(() => {
  "use strict";

  const root = document.documentElement;
  const media = window.matchMedia("(prefers-color-scheme: dark)");

  /* Переключатель темы: явный выбор хранится в localStorage */
  const toggle = document.getElementById("theme-toggle");
  const toggleLabel = toggle ? toggle.querySelector("[data-theme-label]") : null;

  try {
    const stored = localStorage.getItem("research-theme");
    if (stored === "light" || stored === "dark") {
      root.dataset.theme = stored;
    }
  } catch (_) {
    /* приватный режим — просто идём дальше */
  }

  const isDark = () => {
    const forced = root.dataset.theme;
    return forced ? forced === "dark" : media.matches;
  };

  const paint = () => {
    if (toggleLabel) {
      toggleLabel.textContent = isDark() ? "светлая" : "тёмная";
    }
  };

  if (toggle) {
    toggle.addEventListener("click", () => {
      root.dataset.theme = isDark() ? "light" : "dark";
      try {
        localStorage.setItem("research-theme", root.dataset.theme);
      } catch (_) {}
      paint();
    });
  }

  if (typeof media.addEventListener === "function") {
    media.addEventListener("change", paint);
  }

  paint();

  /* Подсчёт записей */
  const list = document.querySelector(".entries");

  const plural = (n, forms) => {
    const n10 = n % 10;
    const n100 = n % 100;
    if (n10 === 1 && n100 !== 11) return forms[0];
    if (n10 >= 2 && n10 <= 4 && (n100 < 10 || n100 >= 20)) return forms[1];
    return forms[2];
  };

  if (list) {
    const count = list.children.length;

    const countEl = document.getElementById("entries-count");
    if (countEl) {
      countEl.textContent = `${count} ${plural(count, ["запись", "записи", "записей"])}`;
    }

    const factEl = document.getElementById("fact-count");
    if (factEl) {
      factEl.textContent = String(count).padStart(2, "0");
    }
  }

  /* Год в подвале */
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
})();
