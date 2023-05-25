const BODY = document.querySelector("body");
BODY.innerHTML += `<button class="gridSize">Change the grid size here.</button><button class="clear">Clear</button><div class='chooseColor'><h3>Choose paint color:</h3><button class="chooseBlack">Black</button><button class="rainbow">Rainbow</button><button class="shadesOfGray">Shades of Gray</button></div>`;

// Create the Grid
const addGridItems = (num) => {
  let numItems = num * num;
  let items = "";
  for (let i = 1; i <= numItems; i++) {
    items = items.concat(`<div class="item item--${i}"></div>`);
  }
  return items;
};
let gridSize = 100;
const gridContainer = document.querySelector(".container");
gridContainer.innerHTML = addGridItems(gridSize);

// Sketch functionality -- manipulate background color
// functions to manipulate the background
const toBlack = (div) => div.classList.add("black");
const toRandomColor = (div) => {
  const random =
    Math.floor(Math.random() * 180) + Math.floor(Math.random() * 180);
  div.setAttribute("style", `background-color: hsla(${random}, 100%, 50%, 1);`);
};
const toShadesOfGray = (div) => {
  const isShaded = div.attributes.length;
  if (isShaded === 1) {
    div.setAttribute("style", `background-color: hsla(0, 0%, ${90}%, 1);`);
  } else {
    for (const attr of div.attributes) {
      if (attr.name === "style") {
        const light = Number(attr.value.substr(30, 2));
        if (!isNaN(light))
          div.setAttribute(
            "style",
            `background-color: hsla(0, 0%, ${light - 10}%, 1);`
          );
      }
    }
  }
};

// choose the color to sketch with
const blackBtn = document.querySelector(".chooseBlack");
const rainbowBtn = document.querySelector(".rainbow");
const shadesOfGrayBtn = document.querySelector(".shadesOfGray");
let paintColor = 0;
const colorChoices = [blackBtn, rainbowBtn, shadesOfGrayBtn];
colorChoices.forEach((btn, i) =>
  btn.addEventListener("click", () => (paintColor = i))
);

//grab the grid cells
const divs = document.querySelectorAll(".item");

// Sketch functionality
divs.forEach((div) =>
  div.addEventListener("mouseover", (e) => {
    paintColor === 0
      ? toBlack(div)
      : paintColor === 1
      ? toRandomColor(div)
      : toShadesOfGray(div);
  })
);

// button to change the grid size or pixel scale
const changeGridSize = () => {
  divs.forEach((div) => div.classList.remove("black"));
  gridSize = parseInt(
    prompt("Enter an number between 10 and 100 to resize the grid", ""),
    10
  );
  let isNum = typeof gridSize === "number" && gridSize <= 100 && gridSize >= 10;
  while (!isNum) {
    gridSize = parseInt(
      prompt(
        "Invalid entry --- Enter an number between 10 and 100 to resize the grid",
        ""
      ),
      10
    );
    isNum = typeof gridSize === "number" && gridSize <= 100 && gridSize >= 10;
  }
  addGridItems(gridSize);
  gridContainer.setAttribute(
    "style",
    `grid-template-columns: repeat(${gridSize}, 1fr);
  grid-template-rows: repeat(${gridSize}, 1fr);`
  );
};

const changeGridSizeBtn = document.querySelector(".gridSize");

changeGridSizeBtn.addEventListener("click", changeGridSize);

/// clear
const clearBtn = document.querySelector(".clear");

clearBtn.addEventListener("click", () => {
  divs.forEach((div) => {
    div.classList.remove("black");
    div.attributes.length > 1 && div.attributes.removeNamedItem("style");
  });
});
