const colorPicker = document.getElementById("color-picker");
const button = document.getElementById("button");
const modeSelect = document.getElementById("mode-select");
let seedColor = "";
let mode = "";
modeSelect.addEventListener("change", (e) => {
  mode = e.target.value;
});

colorPicker.addEventListener("input", (event) => {
  seedColor = event.target.value.slice(1);
});

button.addEventListener("click", () => {
  if (!seedColor) {
    console.log("Please select a seed color first.");
    return;
  }

  fetch(
    `https://www.thecolorapi.com/scheme?hex=${seedColor}&mode=${mode}&count=5`
  )
    .then((res) => res.json())
    .then((data) => {
      console.log("Seed Color:", seedColor);
      console.log(
        "Color Scheme:",
        data.colors.map((color) => color.hex.value)
      );
      const colorBars = document.querySelectorAll(".color-bar");
      const colorCode = document.querySelectorAll(".code");
      console.log(data);
      data.colors.forEach((color, index) => {
        if (colorBars[index]) {
          const hex = color.hex.value;
          colorBars[index].style.backgroundColor = hex;
          colorCode[index].textContent = hex;

          // Update contrast-aware text color
          const textColor = getContrastColor(hex);
          colorCode[index].style.color = textColor;
        }
      });
    })
    .catch((error) => console.error("Error fetching color scheme:", error));
});
function getContrastColor(hex) {
  hex = hex.replace("#", "");
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
  return luminance > 186 ? "#000000" : "#FFFFFF"; // black if background is light, else white
}

document.querySelectorAll(".color-bar").forEach((bar) => {
  const bg = getComputedStyle(bar).backgroundColor;
  const hex = rgbToHex(bg);
  const textColor = getContrastColor(hex);
  bar.querySelector(".code").style.color = textColor;
  bar.querySelector(".code").textContent = hex.toUpperCase();
});

// Helper: Convert rgb to hex
function rgbToHex(rgb) {
  const [r, g, b] = rgb.match(/\d+/g);
  return (
    "#" +
    [r, g, b].map((x) => parseInt(x).toString(16).padStart(2, "0")).join("")
  );
}
