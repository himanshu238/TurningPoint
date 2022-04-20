// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyB5oUtTbm10HTg_LJ9fonw4NElYN9SD4iw",
  authDomain: "tpsc-landing-page.firebaseapp.com",
  projectId: "tpsc-landing-page",
  storageBucket: "tpsc-landing-page.appspot.com",
  messagingSenderId: "714004131843",
  appId: "1:714004131843:web:edd9ad0cd36b136d471e36"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var firestore = firebase.firestore()

//Variable to access database collection
const db = firestore.collection("formData")
const dbe = firestore.collection("newsLetter")
// Listen for a submit
let submitButton = document.getElementById("submit")
var emailPattern = /\S+@\S+\.\S+/;
var mobilePattern = /^\d{10}$/;

function formValidator(name, email, mobile, country, year, payOption, study, known) {
  var correct_name = false
  var correct_email = false
  var correct_mobile = false
  var correct_study = false

  if (name === '' || name == null) {
    element = document.getElementById("emptyname")
    element.classList.remove("hide")
  } else {
    element = document.getElementById("emptyname")
    element.classList.add("hide")
    valid_name = name;
    correct_name = true
  }
  if (email.match(emailPattern)) {
    element = document.getElementById("emptyemail")
    valid_email = email;
    element.classList.add("hide")
    correct_email = true
  } else {
    element = document.getElementById("emptyemail")
    element.classList.remove("hide")
  }
  if (mobile.match(mobilePattern)) {
    element = document.getElementById("emptymobile")
    element.classList.add("hide")
    valid_mobile = mobile;
    correct_mobile = true
  } else {
    element = document.getElementById("emptymobile")
    element.classList.remove("hide")
  }
  if (study == 'Select type' || study == null) {
    console.log(study)
    element = document.getElementById("emptystudy")
    element.classList.remove("hide")
  } else {
    element = document.getElementById("emptystudy")
    element.classList.add("hide")
    valid_study = study;
    console.log(valid_study)
    correct_study = true
  }

  if (correct_name == true && correct_email == true) {
    if (correct_mobile == true && correct_study == true) {
      db.doc().set({
        name: valid_name,
        email: valid_email,
        mobile: valid_mobile,
        country: country,
        year: year,
        payOption: payOption,
        study: valid_study,
        known: known,
      }).then(() => {
        document.querySelector(".contact-form").reset();
        btnElement = document.getElementById("submit")
        btnElement.classList.add("footer-button-color-success")
        btnElement.innerHTML = "Success"
        setTimeout(() => {
          btnElement.classList.remove("footer-button-color-success")
          btnElement.innerHTML = "Submit"
        }, 1500);
      })
    }
  }
}

let newsLetterForm = document.getElementById("newsletter")

newsLetterForm.addEventListener("click", (e) => {
  e.preventDefault()
  let tempEmail = document.querySelector("#nemail").value
  if (tempEmail != "" && tempEmail.match(emailPattern)) {
    let email = document.querySelector("#nemail").value
    onNewsLetterSubmit(email)
  } else {
    element = document.getElementById("newsletterforminvalid")
    element.classList.add("invalidSubmission")
    btnElement = document.getElementById("newsletter")
    btnElement.classList.add("footer-button-color-error")
    btnElement.innerHTML = "Error"
    setTimeout(() => {
      element.classList.remove("invalidSubmission")
      btnElement.classList.remove("footer-button-color-error")
      btnElement.innerHTML = "Submit"
    }, 1000);
  }
})

function onNewsLetterSubmit(email) {
  dbe.doc().set({
    email: email
  }).then(() => {
    btnElement = document.getElementById("newsletter")
    document.getElementById("newsletterforminvalid").reset()
    btnElement.classList.add("footer-button-color-success")
    btnElement.innerHTML = "Success"
    setTimeout(() => {
      btnElement.classList.remove("footer-button-color-success")
      btnElement.innerHTML = "Submit"
    }, 1500);
  })
}
//first pass all the values in validator function if result is true then call firebase db.set() function

submitButton.addEventListener("click", (e) => {
  e.preventDefault()
  let name = document.querySelector("#name").value;
  let email = document.querySelector("#email").value;
  let mobile = document.querySelector("#mobile").value;
  let country = document.querySelector("#country").value;
  let year = document.querySelector("#year").value;
  let payOption = document.querySelector("#paytype").value;
  let study = document.querySelector("#study").value;
  let known = document.querySelector("#known").value;

  formValidator(name, email, mobile, country, year, payOption, study, known)
})