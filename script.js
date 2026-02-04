const navbar = document.getElementById("navbar");
const sections = document.querySelectorAll("section");


function adjustBrightness(rgb, percent) {
  return rgb
    .map((val) => {
      let newVal = val + (percent / 100) * 255;
      newVal = Math.max(0, Math.min(255, newVal));
      return Math.round(newVal);
    })
    .join(",");
}


function updateNavbarColor() {
  const scrollPos = window.scrollY + navbar.offsetHeight + 10;

  sections.forEach((section) => {
    if (
      scrollPos >= section.offsetTop &&
      scrollPos < section.offsetTop + section.offsetHeight
    ) {
      const bgColor = window.getComputedStyle(section).backgroundColor;
      const rgb = bgColor.match(/\d+/g).map(Number);

      
      const adjusted = adjustBrightness(rgb, -15);
      navbar.style.backgroundColor = `rgb(${adjusted})`;

     
      const brightness = (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000;
      navbar.style.color = brightness < 128 ? "white" : "black";
    }
  });
}


updateNavbarColor();

window.addEventListener("scroll", updateNavbarColor);
window.addEventListener("resize", updateNavbarColor);
