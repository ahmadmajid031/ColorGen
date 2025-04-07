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
          colorBars[index].style.backgroundColor = color.hex.value;
          colorCode[index].textContent = color.hex.value;
        }
      });
    })
    .catch((error) => console.error("Error fetching color scheme:", error));
});
