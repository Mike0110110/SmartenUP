function check() {
  var resMenu = document.querySelector("#res-menu");
  if (resMenu.checked == true) {
    $("body").css("overflow", "hidden");
    $("#navigtions-wrap").css("right", "0%");
  } else {
    $("body").css("overflow", "unset");
    $("body").css("overflow-x", "hidden");
    $("#navigtions-wrap").css("right", "-100%");
  }
}

const slider = document.querySelector(".items");
let isDown = false;
let startX;
let scrollLeft;

slider.addEventListener("mousedown", (e) => {
  isDown = true;
  slider.classList.add("active");
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
});
slider.addEventListener("mouseleave", () => {
  isDown = false;
  slider.classList.remove("active");
});
slider.addEventListener("mouseup", () => {
  isDown = false;
  slider.classList.remove("active");
});
slider.addEventListener("mousemove", (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - slider.offsetLeft;
  const walk = (x - startX) * 3; //scroll-fast
  slider.scrollLeft = scrollLeft - walk;
});

var container = document.getElementById("Dots_Wrap");
var items = document.querySelectorAll(".User_Item");

if (items.length > 1) {
  var count = 1;
  items.forEach((val) => {
    val.id = "item" + count;
    CreateHref(count);
    count++;
  });
}

const scrollers = document.querySelectorAll(".slider");

if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  addAnimation();
}

function addAnimation() {
  scrollers.forEach((scroller) => {
    scroller.setAttribute("data-animated", true);

    const scrollerInner = scroller.querySelector(".slider__inner");
    const scrollerContent = Array.from(scrollerInner.children);

    scrollerContent.forEach((item) => {
      const duplicatedItem = item.cloneNode(true);
      duplicatedItem.setAttribute("aria-hidden", true);
      scrollerInner.appendChild(duplicatedItem);
    });
  });
}

function CreateHref(count) {
  var Href = document.createElement("a");
  Href.setAttribute("href", "#item" + count);
  Href.name = "item" + count;

  container.appendChild(Href);
  Href.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });

  Href.addEventListener("click", function handleClick(event) {
    var allItems = container.children;
    for (let i = 0; i < allItems.length; i++) {
      if (allItems[i].classList.contains("Active_Clicked")) {
        allItems[i].classList.remove("Active_Clicked");
      }
      event.target.classList.add("Active_Clicked");
    }
  });
}
