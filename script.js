const toggleThemeBtn = document.getElementById("toggle-themes");

if (!localStorage.getItem("theme")) {
  document.documentElement.setAttribute("data-theme", "light");
  localStorage.setItem("theme", "light")
} else {
  document.documentElement.setAttribute("data-theme", localStorage.getItem("theme"));
}

toggleThemeBtn.addEventListener("click", () => {
  let themeToSet = document.documentElement.getAttribute("data-theme");
  let currentTheme = themeToSet === "light" ? "dark" : "light";

  document.documentElement.setAttribute("data-theme", currentTheme);
  localStorage.setItem("theme", currentTheme);
});
