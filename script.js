function load() {
  fillDot();
}

window.onpointermove = (event) => {
  //if (screen != 0) return;
  const blob = document.getElementById("blob");
  var rect = blob.getBoundingClientRect();
  const { clientX, clientY } = event;
  //blob.style.height = "${clientX*0.25+40}px";
  var difference = Math.max(
    Math.abs(window.innerWidth / 2 - clientX),
    Math.abs(window.innerHeight / 2 - clientY)
  );
  if (screen == 0) {
    blob.animate(
      {
        left: `${clientX}px`,
        top: `${clientY}px`
      },

      { duration: 300, fill: "forwards" }
    );
    blob.animate(
      {
        transform: `scale(${difference / 5}%)`
      },

      { duration: 1000, fill: "forwards" }
    );
  }
  //   else {
  //     blob.animate(
  //       {
  //         left: `${clientX}px`,
  //         top: `${clientY}px`
  //       },

  //       { duration: 300, fill: "forwards" }
  //     );
  //   }
};
// duration: 1000,
let screen = 0;

function scrollEvent(event) {
  var wrapper = document.getElementById("wrapper");
  var dots = document.getElementById("dots");
  if (event.deltaY < 0) {
    if (screen > 0) {
      screen--;
    }
  } else if (event.deltaY > 0) {
    if (screen < 3) {
      screen++;
    }
  }

  fillDot();
}

// window.addEventListener("wheel", function (event) {
//   scrollEvent(event);
// });

window.addEventListener("wheel", (e) => e.preventDefault(), { passive: false });

function hideAllCards() {
  var elements = document.getElementsByClassName("neu-card");
  for (let i = 0; i < 4; i++) {
    if (!Array.from(elements)[i].classList.contains("hidden")) {
      Array.from(elements)[i].classList.add("hidden");
    }
  }
}
//dots

function changeDot(i) {
  let blob = document.getElementById("blob");
  let slider = document.getElementById("education");
  let bars = document.getElementById("bar-wrapper");
  let levels = document.getElementById("bar-levels");
  hideAllCards();
  screen = i;

  switch (screen) {
    case 0:
      blob.classList.remove("a_large");
      blob.classList.remove("a_small");
      slider.classList.remove("slider-shown");
      bars.classList.remove("bars-shown");
      levels.classList.remove("bars-shown");
      break;
    case 1:
      blob.classList.add("a_large");
      blob.classList.remove("a_small");
      slider.classList.add("slider-shown");
      bars.classList.remove("bars-shown");
      levels.classList.remove("bars-shown");
      break;
    case 2:
      blob.classList.remove("a_large");
      blob.classList.add("a_small");
      slider.classList.remove("slider-shown");
      bars.classList.add("bars-shown");
      levels.classList.add("bars-shown");
      break;
    default:
      blob.classList.remove("a_large");
      blob.classList.add("a_small");
      slider.classList.remove("slider-shown");
      bars.classList.remove("bars-shown");
      levels.classList.remove("bars-shown");
      break;
  }

  fillDot();
}

function fillDot() {
  var elements = document.getElementsByClassName("dot");

  Array.from(elements).forEach((dot) => {
    if (dot.classList.contains("dot-full")) {
      dot.classList.remove("dot-full");
    }
  });
  dots.children[screen].classList.add("dot-full");
}

function showCard(id) {
  //console.log(id);
  var elements = document.getElementsByClassName("neu-card");
  //console.log(Array.from(elements)[id]);
  if (Array.from(elements)[id].classList.contains("hidden")) {
    Array.from(elements)[id].classList.remove("hidden");
  } else {
    Array.from(elements)[id].classList.add("hidden");
  }
}

//letters
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopstuvwxyz%$#&:_-/|@";
//let interval = null;
function glitch(element) {
  let interval = null;
  let iteration = 0;

  clearInterval(interval);

  interval = setInterval(() => {
    element.innerText = element.innerText
      .split("")
      .map((letter, index) => {
        if (index < iteration) {
          return element.dataset.value[index];
        }

        return letters[Math.floor(Math.random() * letters.length)];
      })
      .join("");

    if (iteration >= element.dataset.value.length) {
      clearInterval(interval);
    }

    iteration += 1 / 5;
  }, 60);
}

var position = 0;

async function revealCard(i) {
  var elements = document.getElementsByClassName("neu-card");

  //console.log(i);
  for (let j = position; j < i; j++) {
    if (Array.from(elements)[j] === undefined) return;
    if (Array.from(elements)[j].classList.contains("hidden")) {
      Array.from(elements)[j].classList.remove("hidden");
    }
    await delay(200);
  }
  position = i;
}

function delay(milliseconds) {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}

//JQuery

$(document).ready(function () {
  $(".neu-card").hover(
    function () {
      // Mouse enters, fade the box-shadow
      $(this).css(
        "box-shadow",
        "0px 0px 0px rgb(190,190,190),0px 0px 0px rgb(255,255,255)"
      );
    },
    function () {
      // Mouse leaves, set the box-shadow
      $(this).css(
        "box-shadow",
        "10px 10px 30px rgb(190,190,190),-10px -10px 30px rgb(255,255,255)"
      );
    }
  );

  $(".pill").hover(
    function () {
      // Mouse enters, fade the box-shadow
      $(this).css(
        "box-shadow",
        "-0px -0px 0px rgb(255,255,255) inset, 0px 0px 0px #1e1e1e inset"
      );
    },
    function () {
      // Mouse leaves, set the box-shadow
      $(this).css(
        "box-shadow",
        " -2px -2px 8px rgb(255,255,255) inset,  2px 2px 8px #1e1e1e inset"
      );
    }
  );

  $("#twitter").hover(
    function () {
      // Mouse enters, fade the box-shadow
      $("#twitter").fadeTo(100, 0.5, function () {
        $("#twitter").toggleClass("fa-square-x-twitter fa-twitter");
      });

      $("#twitter").fadeTo(100, 1);
    },
    function () {
      // Mouse leaves, set the box-shadow
      $("#twitter").fadeTo(100, 0.5, function () {
        $("#twitter").toggleClass("fa-twitter fa-square-x-twitter");
      });
      $("#twitter").fadeTo(100, 1);
    }
  );
});

//trigger animation onmouseover event
function stretch() {
  let collection = document.getElementsByClassName("bar");
  for (let i = 0; i < collection.length; i++) {
    if (collection[i].classList.contains("unstretched")) {
      collection[i].classList.remove("unstretched");
      collection[i].style.animationName = "shrink" + i + 1;
    }
  }
}

document.addEventListener("DOMContentLoaded", function () {
  // Get the elements that should allow scrolling
  var scrollableElements = document.querySelectorAll(".range-style");

  // Disable scrolling on touch devices, except for specific elements
  document.addEventListener(
    "touchmove",
    function (e) {
      console.log("trying");
      if (!isScrollableElement(e.target)) {
        console.log("yoooo");
        e.preventDefault();
      }
    },
    { passive: false }
  );

  // Check if an element or its ancestors have the 'scrollable' class
  function isScrollableElement(el) {
    for (; el && el !== document; el = el.parentNode) {
      if (el.classList.contains("range-style")) {
        return true;
      }
    }
    return false;
  }
});
