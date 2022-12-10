const gender = document.querySelector("#input-gender");
const email = document.querySelector("#inputEmail");
const fileInput = document.querySelector("#inputFiles");
const retryOrderId = document.querySelector("#retry_order_id");
const retryKey = document.querySelector("#retry_key");
const logo = document.querySelector(".logo");
const submitButton = document.querySelector("#form-submit");

//Limit number of files (15-20)
fileInput.addEventListener("change", (e) => {
  const fileArray = Array.from(fileInput.files);
  if (fileArray.length < 15 || fileArray.length > 25) {
    fileInput.setCustomValidity("Please select 15-25 photos");
  } else {
    fileInput.setCustomValidity("");
  }
});

//document.addEventListener("DOMContentLoaded", initApp);

//alternative way of sending POST request
//submitButton.addEventListener("submit", sendPhotosToServer);
document.querySelector("#form-main").addEventListener("submit", sendPhotosToServer);


// prompt.addEventListener("keyup", () => {
//   console.log(prompt.value);
//   //prompt.value = prompt.value.replace(/[!@#$%^&*()_+-=~`,./\|&*<>]/, "");
// });

async function sendPhotosToServer(event) {
  event.preventDefault();
  ym(91608464,'reachGoal','form_submit')

  let formData = new FormData();
  formData.append("gender", gender.value);
  formData.append("email", email.value);
  formData.append("retry_order_id", retryOrderId.value);
  formData.append("retry_key", retryKey.value);

  const files = Array.from(fileInput.files);

  files.forEach((file) => {
    formData.append("files", file);
  });

  console.log(gender.value);
  console.log(formData);

//  document.querySelector("body").style("background-color", "red");
  document.querySelector("body").classList.remove("text-bg-dark")
  document.querySelector("body").style.background = "red";

//   return
  //POST REQUEST TO DO
//  await fetch("https://httpbin.org/post", {
  console.log("SHOW MODAL WITH SPINNER");
  // todo please add spinner here


  await fetch("/submit?ajax=1", {
//   await fetch("https://httpbin.org/post", {
    method: "POST",
    body: formData,
  })
//    .then((res) => res)
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
        if (data) {
            console.log(data);
            redirectUrl = data["redirect_url"]
            console.log("redirect Url", redirectUrl);
            window.location.href = redirectUrl;
        } else {
             alert("Something went wrong. Please, reload the page and try again")
        }
    })

}

//Different carousels on mobile and desktop
$(document).ready(function () {
  $("#carouselExampleControls").carousel();
  if ($(window).width() < 640) {
    console.log("mobile");
    $(".col-sm-4")
      .unwrap()
      .unwrap()
      .addClass("carousel-item")
      .addClass("container-fluid");
    $(".col-sm-4:first").addClass("active");
  }
});
