(function () {
  const params = new URLSearchParams(window.location.search);
  if (params.get("edit") !== "1") return;

  const editableSelector = [
    "main h1",
    "main h2",
    "main h3",
    "main p",
    "main strong",
    "main span",
    "main a.btn",
    "main a.link-arrow",
    ".partner-logo",
    ".foot-tag",
    ".foot-disclaimer"
  ].join(",");

  const originals = {};

  function cleanText(value) {
    return value.replace(/\s+/g, " ").trim();
  }

  function labelFor(el, index) {
    const section = el.closest("section");
    const sectionLabel = section
      ? section.getAttribute("id") || section.className.split(" ").filter(Boolean).join(".")
      : "footer";
    return `${sectionLabel} · ${el.tagName.toLowerCase()} ${index + 1}`;
  }

  function makeToolbar() {
    const bar = document.createElement("div");
    bar.className = "rrff-review-toolbar";
    bar.innerHTML = `
      <strong>Review mode</strong>
      <span>Click text on the page and type. Changes save only in this browser.</span>
      <button type="button" data-copy>Copy edits</button>
      <button type="button" data-clear>Clear edits</button>
    `;
    document.body.appendChild(bar);

    bar.querySelector("[data-copy]").addEventListener("click", async () => {
      const changes = [];
      document.querySelectorAll("[data-review-key]").forEach((el) => {
        const key = el.dataset.reviewKey;
        const current = cleanText(el.textContent);
        if (current && current !== originals[key]) {
          changes.push(`- ${el.dataset.reviewLabel}\n  FROM: ${originals[key]}\n  TO: ${current}`);
        }
      });

      const output = changes.length
        ? `RRFF page edits for ${window.location.pathname}\n\n${changes.join("\n\n")}`
        : "No text changes detected yet.";

      await navigator.clipboard.writeText(output);
      bar.querySelector("span").textContent = changes.length
        ? "Copied edits. Paste them into the chat when ready."
        : "No text changes detected yet.";
    });

    bar.querySelector("[data-clear]").addEventListener("click", () => {
      window.location.reload();
    });
  }

  function enableEditing() {
    const elements = Array.from(document.querySelectorAll(editableSelector))
      .filter((el) => cleanText(el.textContent).length > 0)
      .filter((el) => !el.closest(".topbar"))
      .filter((el) => !el.closest(".signup"));

    elements.forEach((el, index) => {
      const key = `${el.tagName.toLowerCase()}-${index}`;
      const original = cleanText(el.textContent);
      originals[key] = original;
      el.dataset.reviewKey = key;
      el.dataset.reviewLabel = labelFor(el, index);
      el.contentEditable = "true";
      el.spellcheck = true;
      el.classList.add("rrff-review-editable");

      el.addEventListener("click", (event) => {
        if (el.tagName.toLowerCase() === "a") event.preventDefault();
      });
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    document.body.classList.add("rrff-review-mode");
    makeToolbar();
    enableEditing();
  });
})();
