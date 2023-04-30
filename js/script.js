let backdrop;
let section;

const backdropModel = (firstValue, lastValue) => {
  if (section) {
    return;
  }
  section = document.createElement("section");
  section.className = "section-modal";

  const divModal = document.createElement("div");
  divModal.className = "div-modal";

  const headingText = document.createElement("h3");
  headingText.className = "hading-text";
  headingText.innerText = firstValue;

  const paragraphText = document.createElement("p");
  paragraphText.className = "para-text";
  paragraphText.innerText = lastValue;

  const closeButton = document.createElement("button");
  closeButton.className = "close-button";
  closeButton.innerText = "Ok";

  divModal.appendChild(headingText);
  divModal.appendChild(paragraphText);
  divModal.appendChild(closeButton);

  section.appendChild(divModal);

  closeButton.addEventListener("click", closeButtonHandler);

  backdrop = document.createElement("div");
  backdrop.className = "backdrop";

  backdrop.addEventListener("click", closeButtonHandler);

  return (
    document.body.appendChild(section), document.body.appendChild(backdrop)
  );
};

const closeButtonHandler = () => {
  section.remove();
  section = null;

  backdrop.remove();
  backdrop = null;
};

// name field letter, space, and backspace only
function letterOnly(event, eventPara) {
  let charCode = event.keyCode;
  if (
    (charCode < 65 || charCode > 90) &&
    (charCode < 97 || charCode > 122) &&
    charCode !== 8 &&
    charCode !== 32
  ) {
    backdropModel("Please enter some text!", "Enter only letter!");
    return false;
  }
}

// enter only number
function isNumber(evt) {
  evt = evt ? evt : window.event;
  var charCode = evt.which ? evt.which : evt.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57)) {
    backdropModel("Please enter some number!", "Enter only number!");
    return false;
  }
  return true;
}

// password show hide
let passwordVisible = false;

function showPassword() {
  const passwordInput = document.getElementById("password");
  const eyeIcon = document.querySelector(".eye i");

  passwordVisible = !passwordVisible;

  if (passwordVisible) {
    passwordInput.setAttribute("type", "text");
    eyeIcon.classList.remove("fa-eye");
    eyeIcon.classList.add("fa-eye-slash");
    eyeIcon.classList.add("eye-close")
  } else {
    passwordInput.setAttribute("type", "password");
    eyeIcon.classList.remove("fa-eye-slash");
    eyeIcon.classList.add("fa-eye");
    eyeIcon.classList.remove("eye-close")
  }
}

// set min date today date
window.onload = function () {
  var todayDate = new Date();
  var currentYear = todayDate.getFullYear();
  var currentMonth = todayDate.getMonth() + 1;
  var todayDay = todayDate.getDate();

  if (currentMonth < 10) {
    currentMonth = "0" + currentMonth;
  }

  if (todayDay < 10) {
    todayDay = "0" + todayDay;
  }

  var minDate = currentYear + "-" + currentMonth + "-" + todayDay;
  console.log(minDate);
  document.getElementById("date").setAttribute("min", minDate);

  document.getElementById("date").onchange = function () {
    var selectedDate = new Date(this.value);
    if (selectedDate < todayDate) {
      this.value = minDate;
    }
  };
};

// for submit validation
function formSubmitHandler(headingValue, paraValue) {
  const firstName = document.myForm.firstName.value;
  const lastName = document.myForm.lastName.value;
  const email = document.myForm.email.value;
  const phone = document.myForm.phone.value;
  const password = document.myForm.password.value;
  const cPassword = document.myForm.cPassword.value;

  let regex = /^([a-zA-Z0-9\._]+)@([a-zA-Z0-9])+\.([a-z]+)(\.[a-z]+)*$/;

  const date = document.myForm.date.value;
  if (firstName.length === 0) {
    backdropModel("Enter some text", "Please enter first name.");
    return false;
  } else if (firstName.trim().length === 0) {
    backdropModel("Are you sure!", "Please enter valid text.");
    return false;
  } else if (lastName.length === 0) {
    backdropModel("Enter some text", "Please enter last name.");
    return false;
  } else if (lastName.trim().length === 0) {
    backdropModel("Are you sure!", "Please enter valid text.");
    return false;
  } else if (email.length === 0) {
    backdropModel("Enter some text", "Please enter email address.");
    return false;
  } else if (!regex.test(email)) {
    backdropModel("Are you sure!", "Please enter valid email with @ and .");
    return false;
  } else if (phone.length === 0) {
    backdropModel("Enter some number", "Please enter your mobile number.");
    return false;
  } else if (phone.trim().length !== 10) {
    backdropModel(
      "Enter some number",
      "Please enter your 10 digits mobile number."
    );
    return false;
  }else if(date.length===0){
    backdropModel("Please select date!", "Please enter today date!")
    return false;
  } else if(password.trim().length<8){
    backdropModel("Please enter password!", "Password must be 8 character long!")
    return false;
  } else if(!/\d/.test(password)){
    backdropModel("Please enter password!", "Password take at least 1 number!")
    return false;
  }else if(!/[A-Z]/.test(password)){
    backdropModel("Please enter password!", "Password take at least one uppercase letter!")
    return false;
  }else if(!/[a-z]/.test(password)){
    backdropModel("Please enter password!", "Password take at least one lowercase letter!")
    return false;
  } else if(!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)){
    backdropModel("Please enter password", "Password take at least one special characters")
    return false;
  }else if(cPassword !== password){
    backdropModel("Please enter confirm password!", "Password and confirm password does not match!")
    return false;
  }else{
    backdropModel("Account have been created!", "Contact will be soon")
    document.myForm.reset()
    return false;
  }
}
