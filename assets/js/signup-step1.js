/** 
Author: Build Rise Shine with Nyros (BRS) 
Created: 2023 
Library / Component: signup form 
Description: Logic for signup form
(c) Copyright by BRS with Nyros. 
**/

/*form validation logic*/
window.onload = function () {
  let root = document.forms[0].elements
  let elementNumber
  for (elementNumber = 0; elementNumber < root.length; elementNumber++) {
    if (root[elementNumber].type == 'text') {
      root[elementNumber].onfocus = function () {
        myFocus(this)
      }
      root[elementNumber].onkeyup = function () {
        text(this)
      }
    }
    if (root[elementNumber].type == 'email') {
      root[elementNumber].onfocus = function () {
        myFocus(this)
      }
      root[elementNumber].onkeyup = function () {
        email(this)
      }
    } else if (root[elementNumber].type == 'submit') {
      root[elementNumber].onclick = function () {
        return validation(root[elementNumber])
      }
    }
    if (root[elementNumber].type == 'password') {
      root[elementNumber].onfocus = function () {
        myFocus(this)
      }
      root[elementNumber].onkeyup = function () {
          password(this)
        strengthChecker(this)
        password(this)

      }
    }
    else if(root[elementNumber].type=="submit")
    {
       root[elementNumber].onclick = function()
       {
        return validation(root);
       }
    }
  }
}
// List of Indian States with their respective zip codes
console.log("Script loaded");
const indianStates = [
  { state: "Andhra Pradesh", zipcodes: ["50", "51", "52", "53", "54"] },
  { state: "Arunachal Pradesh", zipcodes: ["79"] },
  { state: "Assam", zipcodes: ["78"] },
  { state: "Bihar", zipcodes: ["80", "81", "82"] },
  { state: "Chhattisgarh", zipcodes: ["49"] },
  { state: "Goa", zipcodes: ["40"] },
  { state: "Gujarat", zipcodes: ["36", "37", "38"] },
  { state: "Haryana", zipcodes: ["12", "13", "14"] },
  { state: "Himachal Pradesh", zipcodes: ["17"] },
  { state: "Jharkhand", zipcodes: ["82", "83"] },
  { state: "Karnataka", zipcodes: ["56", "57", "58"] },
  { state: "Kerala", zipcodes: ["67", "68"] },
  { state: "Madhya Pradesh", zipcodes: ["45", "46", "47", "48"] },
  { state: "Maharashtra", zipcodes: ["40", "41", "42", "43", "44"] },
  { state: "Manipur", zipcodes: ["79"] },
  { state: "Meghalaya", zipcodes: ["79"] },
  { state: "Mizoram", zipcodes: ["79"] },
  { state: "Nagaland", zipcodes: ["79"] },
  { state: "Odisha", zipcodes: ["75", "76", "77"] },
  { state: "Punjab", zipcodes: ["14", "14"] },
  { state: "Rajasthan", zipcodes: ["30", "31", "32", "33", "34", "30", "31"] },
  { state: "Sikkim", zipcodes: ["73"] },
  { state: "Tamil Nadu", zipcodes: ["60", "60", "62", "63", "64"] },
  { state: "Telangana", zipcodes: ["50", "50", "51", "50", "51"] },
  { state: "Tripura", zipcodes: ["79"] },
  { state: "Uttar Pradesh", zipcodes: ["20", "21", "22", "23", "24"] },
  { state: "Uttarakhand", zipcodes: ["24"] },
  { state: "West Bengal", zipcodes: ["70", "71", "72", "73", "74"] },
  { state: "Andaman and Nicobar Islands", zipcodes: ["74"] },
  { state: "Chandigarh", zipcodes: ["16"] },
  { state: "Dadra and Nagar Haveli and Daman and Diu", zipcodes: ["39"] },
  { state: "Delhi", zipcodes: ["11"] },
  { state: "Lakshadweep", zipcodes: ["68"] },
  { state: "Puducherry", zipcodes: ["60"] },
  { state: "Jammu and Kashmir", zipcodes: ["18", "19"] },
  { state: "Ladakh", zipcodes: ["19"] },
];

// Populate States Dropdown
const stateDropdown = document.getElementById("state");
indianStates.forEach(stateObj => {
  let option = document.createElement("option");
  option.text = stateObj.state;
  option.value = stateObj.state;
  stateDropdown.appendChild(option);
});

// Function to get State by Zipcode
// Function to get State by Zipcode
function getStateByZipcode(zipcode) {
  let trimmedZipcode = zipcode.trim(); // Trim any leading or trailing whitespace
  for (let i = 0; i < indianStates.length; i++) {
    if (indianStates[i].zipcodes.includes(trimmedZipcode)) {
      return indianStates[i].state;
    }
  }
  return null; // Return null if no matching state found
}


// Function to validate Zipcode and update State dropdown
// Function to validate Zipcode and update State dropdown
function validateZipcode() {
  let zipcodeInput = document.getElementById("zipcode");
  let zipcodeValue = zipcodeInput.value.trim(); // Trim whitespace
  let stateValue = getStateByZipcode(zipcodeValue);

  if (stateValue) {
    let stateDropdown = document.getElementById("state");
    stateDropdown.value = stateValue;
  } 
}
// Form Element Validation and State Selection
let form = document.forms[0];
form.onsubmit = function (event) {
  event.preventDefault();
  let isValid = true;

  // Validate Zipcode
  let zipcodeInput = form.elements["zipcode"];
  let zipcodeValue = zipcodeInput.value.trim();
  let zipRegex = /^\d{6}$/;
  if (!zipRegex.test(zipcodeValue)) {
    let errorSpan = document.getElementById("zipcodeerror");
    if (errorSpan) {
      errorSpan.textContent = "Please enter a valid 6-digit Indian zipcode";
      errorSpan.style.color = "red";
    }
    isValid = false;
  } else {
    let stateValue = getStateByZipcode(zipcodeValue);
    if (stateValue) {
      stateDropdown.value = stateValue;
    } else {
      isValid = false;
      let errorSpan = document.getElementById("zipcodeerror");
      if (errorSpan) {
        errorSpan.textContent = "Invalid Indian zipcode entered";
        errorSpan.style.color = "red";
      }
    }
  }

  // Validate State
  let stateInput = form.elements["state"];
  let stateValue = stateInput.value.trim();
  if (stateValue === "") {
    let errorSpan = document.getElementById("stateerror");
    if (errorSpan) {
      errorSpan.textContent = "Please select a state";
      errorSpan.style.color = "red";
    }
    isValid = false;
  }

  // If all validations pass, submit the form
  if (isValid) {
    form.submit();
  }
};
//---------------------------------------------------------------------
// Email validation function
function email(emailValid) {
  let type = emailValid.getAttribute('type')
  let show = emailValid.name + 'error'
  if (type == 'email') {
    let match = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    let emailValue = emailValid.value.length
    if (emailValue == 0) {
      document.getElementById(show).innerHTML = '&#10008; Not Empty'
      document.getElementById(show).style.color = 'balck'
      return false
    }
    if (emailValue > 0 && match.test(emailValid.value) == false) {
      document.getElementById(show).innerHTML =
        '&#10008; Enter a valid email address'
      document.getElementById(show).style.color = 'red'
      return false
    }
    if (emailValue > 0 && match.test(emailValid.value) == true) {
      document.getElementById(show).innerHTML = '&#10004; ok'
      document.getElementById(show).style.color = '#1758c1'
      document.getElementById('email').style.border = '1px solid #1758c1'
      return true
    }
  }
}
//---------------------------------------------------------------------------------
//password validation
let parameters = {
  count: false,
  letters: false,
  numbers: false,
  special: false,
}
let strengthBar = document.getElementById('strength-bar')
let msg = document.getElementById('msg')
function strengthChecker() {
    
  let password = document.getElementById('password').value
  parameters.letters = /[A-Za-z]+/.test(password) ? true : false
  parameters.numbers = /[0-9]+/.test(password) ? true : false
  parameters.special = /[!\"$%&/()=?@~`\\.\';:+=^*_-]+/.test(password)
    ? true
    : false
  parameters.count = password.length > 4 ? true : false
  let barLength = Object.values(parameters).filter((value) => value)
  strengthBar.innerHTML = ''
  for (let i in barLength) {
    let span = document.createElement('span')
    span.classList.add('strength')
    strengthBar.appendChild(span)
  }
  let spanRef = document.getElementsByClassName('strength')
  let link = document.getElementById('passworderror');

  for (let i = 0; i < spanRef.length; i++) {
    switch (spanRef.length - 1) {
      case 0:
        spanRef[i].style.background = '#ff3e36'
        msg.textContent = 'Your password is very weak. Use atleast 5 characters'
        break
      case 1:
        spanRef[i].style.background = '#ff691f'
        msg.textContent = 'Your password is weak.Use (0-9) digits'
        break
      case 2:
        spanRef[i].style.background = '#ffda36'
        msg.textContent = 'Your password is good. Use special characters (@, !, #, $)'
        document.getElementById('password').style.border = '1px solid #1758c1'
        link.style.visibility = 'hidden';

        break
      case 3:
        spanRef[i].style.background = '#0be881'
        msg.textContent = 'Your password is strong'
        document.getElementById('password').style.border = '1px solid #1758c1'
        link.style.visibility = 'hidden';

        break
    }
  }
  return barLength.length > 2
}
function password(pwdValid) {
  let type = pwdValid.getAttribute('type')
  let show = pwdValid.name + 'error'
  if (type == 'password') {
    
    let pwdValue = pwdValid.value.length
    if (pwdValue == 0) {
      document.getElementById(show).innerHTML = '&#10008; enter minimum 4 characters'
      document.getElementById(show).style.color = 'red'
      document.getElementById('password').style.border = '1px solid red'
      return false
    } 
    if (pwdValue == 21) {
      document.getElementById(show).innerHTML = '&#10008; enter maximum 20 characters'
      document.getElementById(show).style.color = 'red'
      document.getElementById('password').style.border = '1px solid red'
      return false
    }
    if (pwdValue >=5 && pwdValue<=20) {
      document.getElementById(show).innerHTML = '&#10004; ok'
      document.getElementById(show).style.color = '#1758c1'
      document.getElementById('email').style.border = '1px solid #1758c1'
      return true
    }
  }
}
 
//----------------------------------------------------------------------------------------
//Form Validation
function validation(form) {
  const mail = document.getElementById('email')
  const mailID = mail.value
  localStorage.setItem('email', `${mailID}`)
  let x = document.forms[0].elements
  let radioCheck = 0,
    radioButton = 0
  for (let i = 0; i < x.length; i++) {
    let funRegex = /^[A-Za-z0-9 ]/
    let match = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    let type = x[i].type
    let minLength = x[i].getAttribute('min')
    let maxLength = x[i].getAttribute('max')
    if (type == 'text') {
      if (minLength == null) minLength = 2
      if (maxLength == null) maxLength = 50
      if (x[i].value.length < minLength || x[i].value.length > maxLength) {
        x[i].focus()
        x[i].style.border="1px solid red";
        return false
      } else if (
        x[i].value.length > minLength &&
        x[i].value.length < maxLength &&
        funRegex.test(x[i]).value == false
      ) {
        x[i].focus()
        x[i].style.border="1px solid red";
        return false
      }
    } else if (type == 'email') {
      if (x[i].value.length == 0) {
        x[i].focus()
        x[i].style.border="1px solid red";
        return false
      }
      if (match.test(x[i].value) != true) {
        x[i].focus()
        x[i].style.border="1px solid red";
        return false
      }
    } else if (type == 'password') {
      if (minLength == null) minLength = 4
      if (maxLength == null) maxLength = 20
      if (
        x[i].value.length < minLength ||
        x[i].value.length > maxLength ||
        x[i].value.length == 0
      ) {
        x[i].focus()
        x[i].style.border="1px solid red";
        return false
      } else if (
        strengthChecker() == false
      ) {
        x[i].focus()
        x[i].style.border="1px solid red";
        return false
      }
    } else if (type == 'radio') {
      let l = x[i].parentNode.children.length
      for (let j = 0; j < l; j++) {
        if (x[i].parentNode.children[j].type == 'radio') {
          radioButton++
        }
        if (x[i].parentNode.children[j].checked == true) {
          radioCheck++
          x[i].style.outline = '0px'
        }
      }
      if (radioButton > 0 && radioCheck == 0) {
        x[i].focus()
        x[i].style.outline = '1px solid red'
        return false
      } else {
        radioButton = 0
        radioCheck = 0
      }
    }
  }
}
//----------------------------------------------------------------------------------------
// Show password function
function toggle() {
  let showPwd = document.getElementById('password')
  if (showPwd.type !== 'password') {
    showPwd.type = 'password'
    return true
  } else {
    showPwd.type = 'text'
    return true
  }
}
