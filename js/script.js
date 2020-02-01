//Global variables

//Basic Info Variables
const nameInput = document.getElementById("name");
const jobDdMenu = document.getElementById("title");
const otherOption = jobDdMenu.lastElementChild;
const otherJobRoleField = document.getElementById("other-title");

//T-shirt info Variables
const tshirtThemeDdMenu = document.getElementById("design");
const selectThemeOption = tshirtThemeDdMenu.firstElementChild;
//creates the chose a theme option and appends it to the color menu as first child
const colorsDdMenu = document.getElementById("color");
const selectThemeColor = document.createElement("option");
selectThemeColor.textContent = "Please Select a tshirt theme";
selectThemeColor.selected = true;
colorsDdMenu.insertBefore(selectThemeColor, colorsDdMenu.firstChild);
//items in the tshirt color menu
const colors = colorsDdMenu.children;

//Register for activities Variables
const activities = document.querySelector(".activities");
const activitiesCB = document.querySelectorAll(".activities input");
//creats the total activity price text and adds under activity list
const totalSpan = document.createElement("H2");
activities.appendChild(totalSpan);
let totalPrice = 0;
totalSpan.textContent = `Total: $${totalPrice}`;

//PAYEMENT INFO variables
const payementMenu = document.getElementById("payment");
const creditcardOption = document.querySelector('option[value="credit card"]');
const creditCardDiv = document.getElementById("credit-card");
const paypalDiv = document.getElementById("paypal");
const bitcoinDiv = document.getElementById("bitcoin");

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
if (selectThemeOption.selected) {
  for (let i = 0; i < colors.length; i++) {
    colors[i].hidden = true;
  }
}

//hides the select theme option as soon as the selection is clicked
tshirtThemeDdMenu.addEventListener("mouseover", e => {
  selectThemeOption.hidden = true;
});

//changes
tshirtThemeDdMenu.addEventListener("change", e => {
  for (let i = 0; i < colors.length; i++) {
    //if the option js puns is selected hides al the non relataed color options as well as
    if (e.target.value === "js puns") {
      colors[i].hidden = false;
      colors[1].selected = true;
      colors[0].hidden = true;
      colors[4].hidden = true;
      colors[5].hidden = true;
      colors[6].hidden = true;
    } else if (e.target.value === "heart js") {
      colors[i].hidden = false;
      colors[4].selected = true;
      colors[0].hidden = true;
      colors[1].hidden = true;
      colors[2].hidden = true;
      colors[3].hidden = true;
    }
  }
});
//event listener on activities section
activities.addEventListener("change", e => {
  let clicked = e.target;
  let clickedActivityDate = clicked.getAttribute("data-day-and-time");
  let activityPrice = parseInt(clicked.getAttribute("data-cost"), 0);
  //adds the cost in data cost after parsing it into Int and adding it to the total price if the box is checked/ diplaying result as a string
  if (clicked.checked) {
    totalPrice = totalPrice + activityPrice;
  } else {
    totalPrice = totalPrice - activityPrice;
  }
  totalSpan.textContent = `Total: $${totalPrice}`;
  // loops through the activities boxes to get rid of conflicts, if two or more activites are on the same time it disables them
  for (let i = 0; i < activitiesCB.length; i++) {
    let checkboxDate = activitiesCB[i].getAttribute("data-day-and-time");
    if (checkboxDate === clickedActivityDate && clicked !== activitiesCB[i]) {
      if (clicked.checked) {
        activitiesCB[i].disabled = true;
      } else {
        activitiesCB[i].disabled = false;
      }
    }
  }
});

//
//function setting the default payement option to credit card and hiding the the other options informations;
const payementDefaultOption = () => {
  creditcardOption.selected = true;
  if (creditcardOption.selected) {
    creditCardDiv.hidden = false;
    paypalDiv.hidden = true;
    bitcoinDiv.hidden = true;
  }
};
payementDefaultOption();

// event to remove the “Select Payment Method” option when the user opens the menu
payementMenu.addEventListener("mouseover", e => {
  payementMenu.firstElementChild.hidden = true;
});

//shows the payement methode information and fields according to the option selected from the drop down menu
payementMenu.addEventListener("change", e => {
  if (e.target.value === "paypal") {
    creditCardDiv.hidden = true;
    paypalDiv.hidden = false;
    bitcoinDiv.hidden = true;
  } else if (e.target.value === "bitcoin") {
    creditCardDiv.hidden = true;
    paypalDiv.hidden = true;
    bitcoinDiv.hidden = false;
  } else {
    payementDefaultOption();
  }
});
