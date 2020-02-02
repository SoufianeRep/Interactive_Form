//Global variables
const form = document.querySelector("form");
//Basic Info Variables
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("mail");
const jobDdMenu = document.getElementById("title");
const otherOption = jobDdMenu.lastElementChild;
const otherJobRoleField = document.getElementById("other-title");

//T-shirt info Variables
const tshirtColorDiv = document.getElementById("colors-js-puns");
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
const activitiesFS = document.querySelector("fieldset.activities");
const activitiesLegend = activitiesFS.firstElementChild;
const activities = document.querySelector(".activities");
const activitiesCB = document.querySelectorAll(".activities input");
//creats the total activity price text and adds under activity list
const totalSpan = document.createElement("H2");
activities.appendChild(totalSpan);
let totalPrice = 0;
totalSpan.textContent = `Total: $${totalPrice}`;

//PAYEMENT INFO variables
const creditcardInput = document.getElementById("cc-num");
const zipCodeInput = document.getElementById("zip");
const cvvInput = document.getElementById("cvv");
const payementMenu = document.getElementById("payment");
const creditcardOption = document.querySelector('option[value="credit card"]');
const creditCardDiv = document.getElementById("credit-card");
const paypalDiv = document.getElementById("paypal");
const bitcoinDiv = document.getElementById("bitcoin");

//submit button
const submitBtn = document.querySelector("button");

//regular expressions for important fields
const name = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
const eMail = /^([a-z0-9_\-\.]+)@([a-z0-9_\-\.]+)\.([a-z]{2,5})$/i;
const cNumber = /^\d{13,16}$/;
const zipCode = /^\d{5}$/;
const cvv = /^\d{3}$/;

function inputCheck(input, regex, message, id, e) {
  let match = regex.test(input.value);
  if (!match) {
    input.style.border = "2px solid rgb(255, 0, 0)";
    createInvalidMessages(message, id);
    e.preventDefault();
    return false;
  } else {
    input.style.border = null;
    return true;
  }
}

function isActivityBoxChecked(e) {
  let isChecked = true;
  for (let i = 0; i < activitiesCB.length; i++) {
    if (activitiesCB[i].checked) {
      isChecked = false;
    }
  }
  if (isChecked) {
    activitiesLegend.style.color = "red";
    createInvalidMessages("*Please choose an activity.", "no-activity");
    e.preventDefault();
    return false;
  } else {
    activitiesLegend.style.color = null;
    return true;
  }
}
//function setting the default payement option to credit card and hiding the the other options informations;
function payementDefaultOption() {
  creditcardOption.selected = true;
  if (creditcardOption.selected) {
    creditCardDiv.hidden = false;
    paypalDiv.hidden = true;
    bitcoinDiv.hidden = true;
  }
}

function createInvalidMessages(message, id) {
  let p = document.createElement("p");
  form.insertBefore(p, form.firstElementChild);
  p.textContent = message;
  p.style.color = "red";
  p.id = id;
}

function deleteInvalidMessage(id) {
  let message = document.getElementById(id);
  if (message) {
    message.remove();
  }
}
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
  // for (let i = 0; i < colors.length; i++) {
  //   colors[i].hidden = true;
  // }
  tshirtColorDiv.hidden = true;
}

//hides the select theme option as soon as the selection is clicked
tshirtThemeDdMenu.addEventListener("mouseover", e => {
  selectThemeOption.hidden = true;
});

//changes
tshirtThemeDdMenu.addEventListener("change", e => {
  tshirtColorDiv.hidden = false;
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

//function setting the default payement option to credit card and hiding the the other options informations;

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

//name validation
form.addEventListener("submit", e => {
  deleteInvalidMessage("invalid-name");
  deleteInvalidMessage("invalid-mail");
  deleteInvalidMessage("invalid-cc");
  deleteInvalidMessage("invalid-zipcode");
  deleteInvalidMessage("invalid-cvv");
  deleteInvalidMessage("no-activity");

  if (creditcardOption.selected) {
    //CVV valid input check
    inputCheck(
      cvvInput,
      cvv,
      "*Please provide a valid CVV Number.",
      "invalid-cvv",
      e
    );
    //zipcode valid input check
    inputCheck(
      zipCodeInput,
      zipCode,
      "*Please provide a valid Credit Card Number.",
      "invalid-zipcode",
      e
    );
    //CC number valid input check
    inputCheck(
      creditcardInput,
      cNumber,
      "*Please provide a valid Credit Card Number",
      "invalid-cc",
      e
    );
  }
  //activity checkboxes input check
  isActivityBoxChecked(e);
  //mail valid input check
  inputCheck(
    emailInput,
    eMail,
    "*Please provide a valid E-Mail adress.",
    "invalid-mail",
    e
  );
  //name valid input check
  inputCheck(
    nameInput,
    name,
    "*Please Provide a valid Name.",
    "invalid-name",
    e
  );
});
