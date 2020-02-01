//Global variables
const nameInput = document.getElementById("name");
const jobDdMenu = document.getElementById("title");
const otherOption = jobDdMenu.lastElementChild;
const otherJobRoleField = document.getElementById("other-title");

const tshirtThemeDdMenu = document.getElementById("design");
let selectThemeO = tshirtThemeDdMenu.firstElementChild;
//creates the chose a theme option and appends it to the color menu as first child
const colorsDdMenu = document.getElementById("color");
const selectThemeColor = document.createElement("option");
selectThemeColor.textContent = "Please Select a tshirt theme";
selectThemeColor.selected = true;
colorsDdMenu.insertBefore(selectThemeColor, colorsDdMenu.firstChild);
//items in the tshirt color menue
const colors = colorsDdMenu.children;

//set the focus on the name field when the page loads
nameInput.focus();

//hides the other job role field (initially)
otherJobRoleField.style.display = "none";
//makes the other option input field appear when other option is selected else it disapears
jobDdMenu.addEventListener("change", e => {
  if (e.target.value === "other") {
    otherJobRoleField.style.display = "";
  } else {
    otherJobRoleField.style.display = "none";
  }
});

//if the slect theme option is selected hides all the tshirts colors options
if (selectThemeO.selected) {
  for (let i = 0; i < colors.length; i++) {
    colors[i].hidden = true;
  }
}

//hides the select theme option as soon as the selection is clicked
tshirtThemeDdMenu.addEventListener("mouseover", e => {
  selectThemeO.hidden = true;
});

//changes the
tshirtThemeDdMenu.addEventListener("change", e => {
  for (let i = 0; i < colors.length; i++) {
    if (e.target.value === "js puns") {
      selectThemeO.hidden = true;
      colors[i].hidden = false;
      colors[1].selected = true;
      colors[0].hidden = true;
      colors[4].hidden = true;
      colors[5].hidden = true;
      colors[6].hidden = true;
    } else if (e.target.value === "heart js") {
      selectThemeO.hidden = true;
      colors[i].hidden = false;
      colors[4].selected = true;
      colors[0].hidden = true;
      colors[1].hidden = true;
      colors[2].hidden = true;
      colors[3].hidden = true;
    }
  }
});

//console.log("test");
//e.target.value === "js puns"
//e.target.value === "heart js"
