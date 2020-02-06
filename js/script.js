//Global variables
const form = document.querySelector("form");
//Basic Info Variables
const basicInfoFieldset = form.firstElementChild;
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("mail");
const emailLabel = document.querySelector("label[for='mail']");
const realTimeMessageDiv = document.createElement("div");
//creates the real time error message (email in this case)
const realTimeMessage = document.createElement("span");
basicInfoFieldset.insertBefore(realTimeMessageDiv, emailInput);
realTimeMessageDiv.appendChild(realTimeMessage);
realTimeMessage.textContent = `please follow the format "example@domain.com ..."`;
realTimeMessage.style.color = "red";
realTimeMessage.hidden = true;

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
colorsDdMenu.prepend(selectThemeColor);
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

//regular expressions for important fields
const name = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
const eMail = /^([a-z0-9_\-\.]+)@([a-z0-9_\-\.]+)\.([a-z]{2,5}[^\s])$/i;
const cNumber = /^\d{13,16}$/;
const zipCode = /^\d{5}$/;
const cvv = /^\d{3}$/;

//function that checks if input matches regex of inputs and create error message and also turns the input border to red if not matching
function inputCheck(input, regex, message, id, e) {
  let match = regex.test(input.value);
  deleteInvalidMessage(id);
  if (!match) {
    input.style.border = "2px solid rgb(255, 0, 0)";
    createInvalidMessages(message, id);
    e.preventDefault();
  } else {
    input.style.border = null;
  }
}
//function to check if any activity is checked and changes the color of the legend accordingly
function isActivityBoxChecked(e) {
  let isChecked = true;
  //loops through the avtivity boxes and checks if atleast 1 box is checked
  for (let i = 0; i < activitiesCB.length; i++) {
    if (activitiesCB[i].checked) {
      isChecked = false;
    }
  }
  //delets any error message (if exists)
  deleteInvalidMessage("no-activity");
  //if any box is checked changes the color of the legend and displays a message accordingly with ID (as per createInvalidMessage function)
  if (isChecked) {
    activitiesLegend.style.color = "red";
    createInvalidMessages("*Please choose an activity.", "no-activity");
    e.preventDefault();
  } else {
    activitiesLegend.style.color = null;
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
//function to create a invalid message and gives it and Id attribute and appends it accordingly
function createInvalidMessages(message, id) {
  let p = document.createElement("p");
  form.insertBefore(p, form.firstElementChild);
  p.textContent = message;
  p.style.color = "red";
  p.id = id;
}
//function to delete invalid message if any exists
function deleteInvalidMessage(id) {
  let message = document.getElementById(id);
  if (message) {
    message.remove();
  }
}
//set the focus on the name field when the page loads
nameInput.focus();
//set credit card payement method as default payement option
payementDefaultOption();

//hides the other job role field (initially)
otherJobRoleField.style.display = "none";
//makes the other option input field appear when other option is selected else it disapears
jobDdMenu.addEventListener("change", e => {
  if (e.target.value === "other") {
    otherJobRoleField.style.display = "block";
  } else {
    otherJobRoleField.style.display = "none";
  }
});

//if the slect theme option is selected hides the tshirt's colors option
if (selectThemeOption.selected) {
  tshirtColorDiv.hidden = true;
}

//hides the select theme option as soon as the selection is clicked
tshirtThemeDdMenu.addEventListener("mouseover", e => {
  selectThemeOption.hidden = true;
});

//changes the slection of tshirt colors according to the theme chosen
tshirtThemeDdMenu.addEventListener("change", e => {
  tshirtColorDiv.hidden = false;
  for (let i = 0; i < colors.length; i++) {
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

//displays invalid message on top of the form if any of the input does not meet the criteria or an activity is not chosen
form.addEventListener("submit", e => {
  deleteInvalidMessage("invalid-cc");
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
      "*Please provide a valid Zip Code.",
      "invalid-zipcode",
      e
    );
    //checks if the CC number meets the criteria and displays an error message accordingly at the top of the form if else
    if (creditcardInput.value == "") {
      createInvalidMessages(
        "*No credit card number was provided, please provide a number.",
        "invalid-cc"
      );
      creditcardInput.style.border = "2px solid rgb(255, 0, 0)";
    } else if (
      creditcardInput.value.match(/^[0-9]*$/) != null &&
      (creditcardInput.value.length < 13 || creditcardInput.value.length > 16)
    ) {
      createInvalidMessages(
        "*Please provide a valid Credit Card number between 13 and 16 digits",
        "invalid-cc"
      );
    } else {
      inputCheck(
        creditcardInput,
        cNumber,
        "*Please provide a valid Credit Card Number, only digits are allowed",
        "invalid-cc",
        e
      );
    }
  } else {
    deleteInvalidMessage("invalid-zipcode");
    deleteInvalidMessage("invalid-cvv");
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
//shows the message as soon as the user starts typing and hids it once the email meets the test criteria
emailInput.addEventListener("keyup", e => {
  if (!eMail.test(emailInput.value)) {
    realTimeMessage.hidden = false;
  } else {
    realTimeMessage.hidden = true;
  }
});
