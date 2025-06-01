const tabs = document.querySelectorAll(".tab-btn");
const sections = document.querySelectorAll(".tab-content");

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    tabs.forEach(t => t.classList.remove("active"));
    sections.forEach(s => s.classList.remove("active"));

    tab.classList.add("active");
    const contentId = tab.getAttribute("data-tab");
    document.getElementById(contentId).classList.add("active");
  });
});