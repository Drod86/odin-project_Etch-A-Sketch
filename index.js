// DOM Helper Functions //
const grab = (selector) => document.querySelector(selector);
const grabAll = (selector) => document.querySelectorAll(selector);
const render = (domElement, content, add = false) => {
  const str =
    typeof content === "string"
      ? content
      : content.reduce((acc, str) => (acc += str), ``);
  add ? (domElement.innerHTML += str) : (domElement.innerHTML = str);
};
// events
const click = (node, callback) => node.addEventListener("click", callback);
const mouseover = (node, callback) =>
  node.addEventListener("mouseover", callback);

// HTML Elements creators //
const div = (className, content = "") =>
  `<div class="${className}">${
    typeof content === "string"
      ? content
      : content.reduce((acc, str) => (acc += str), ``)
  }</div>`;
const btn = (className, text) =>
  `<button class="${className}">${text}</button>`;
const heading = (size = 1, text) => `<h${size}>${text}</h${size}>`;
//////////////////////////

// App elements //
const gridSizeBtn = btn("gridSize", "Change the grid size here.");
const clearBtn = btn("clear", "Clear");
const chooseColorHeading = heading(3, "Choose paint color");
const chooseBlackBtn = btn("chooseBlack", "Black");
const chooseRainbowBtn = btn("rainbow", "Rainbow");
const chooseShadesOfGrayBtn = btn("shadesOfGray", "Shades of Gray");
const chooseColorSection = div("chooseColor", [
  chooseColorHeading,
  chooseBlackBtn,
  chooseRainbowBtn,
  chooseShadesOfGrayBtn,
]);

// state
const state = { gridSize: 100, paintColor: 0 };

// Functions //
// Create the Grid
const buildGrid = (num) => {
  let numItems = num * num;
  let items = "";
  for (let i = 1; i <= numItems; i++) {
    items = items.concat(div(`item item--${i}`));
  }
  return items;
};

// change the grid size
const changeGridSize = () => {
  // clear the background
  clearGrid();

  // get the new size from user
  gridSize = parseInt(
    prompt("Enter an number between 10 and 100 to resize the grid", ""),
    ""
  );
  const validateEntry = (entry) =>
    typeof entry === "number" && entry <= 100 && entry >= 10;
  let isNum = validateEntry(gridSize);
  while (!isNum) {
    gridSize = parseInt(
      prompt(
        "Invalid entry --- Enter an number between 10 and 100 to resize the grid",
        ""
      ),
      ""
    );
    isNum = validateEntry(gridSize);
  }

  // build the grid
  buildGrid(gridSize);
  // scale the ui to the new grid size
  gridContainer.setAttribute(
    "style",
    `grid-template-columns: repeat(${gridSize}, 1fr);
  grid-template-rows: repeat(${gridSize}, 1fr);`
  );
};

// functions to manipulate the background
const backgroundColor = (h = 0, s = 0, l = 50, a = 1) =>
  `background-color: hsla(${h}, ${s}%, ${l}%, ${a});`;

const toBlack = (div) => div.classList.add("black");

const toRandomColor = (div) => {
  const random =
    Math.floor(Math.random() * 180) + Math.floor(Math.random() * 180);
  div.setAttribute("style", backgroundColor(random, 100, 50));
};

const toShadesOfGray = (div) => {
  const isNotShaded = div.attributes.length === 1;
  if (isNotShaded) {
    div.setAttribute("style", backgroundColor(...[, ,], 90));
  } else {
    for (const attr of div.attributes) {
      if (attr.name === "style") {
        const light = Number(attr.value.substr(30, 2));
        const isNumber = !isNaN(light);
        if (isNumber)
          div.setAttribute("style", backgroundColor(...[, ,], light - 10));
      }
    }
  }
};

const clearGrid = () => {
  cells.forEach((div) => {
    div.classList.remove("black");
    div.attributes.length > 1 && div.attributes.removeNamedItem("style");
  });
};

// Render the app //
let { gridSize, paintColor } = state;
const BODY = grab("body");
render(BODY, [clearBtn, chooseColorSection, gridSizeBtn], true);
const gridContainer = grab(".container");
render(gridContainer, buildGrid(gridSize));
const cells = grabAll(".item"); //grab the grid cells
const changeGridSizeBtn = grab(".gridSize");
const blackBtn = grab(".chooseBlack"); // choose the color to sketch with
const rainbowBtn = grab(".rainbow");
const shadesOfGrayBtn = grab(".shadesOfGray");
const colorChoices = [blackBtn, rainbowBtn, shadesOfGrayBtn];
const clearBtnNode = document.querySelector(".clear");
colorChoices.forEach((btn, i) => click(btn, () => (paintColor = i))); // listen for clicks

// Listeners //
cells.forEach((cell) =>
  // Sketch functionality
  mouseover(cell, () => {
    paintColor === 0
      ? toBlack(cell)
      : paintColor === 1
      ? toRandomColor(cell)
      : toShadesOfGray(cell);
  })
);
click(changeGridSizeBtn, changeGridSize); // change grid size
click(clearBtnNode, clearGrid); /// clear
