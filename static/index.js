"use strict";

const gender = document.querySelector("#input-gender");
const email = document.querySelector("#inputEmail");
const fileInput = document.querySelector("#inputFiles");
const retryOrderId = document.querySelector("#retry_order_id");
const retryKey = document.querySelector("#retry_key");

const submitButton = document.querySelector("#form-submit");
const modalBtnSubmit = document.querySelector("#btn-modal-submit");
const photoChecks = document.querySelector("#photo-checks");
const photoLoading = document.querySelector("#photo-loading");
const modalHeader = document.querySelector(".modal-header");
const modalFooter = document.querySelector(".modal-footer");
//to do: add a check that these checkboxes are inside modal
//На данный момент других чекбоксов нет, поэтому я просто беру ВСЕ чекбоксы, как только появится любой другой чекбокс, все сломается
const modalCheckboxes = document.querySelectorAll(".form-check-input");

const myModal = new bootstrap.Modal("#staticBackdrop", {
  keyboard: false,
});

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
document.querySelector("#form-main").addEventListener("submit", showModal);

// prompt.addEventListener("keyup", () => {
//   console.log(prompt.value);
//   //prompt.value = prompt.value.replace(/[!@#$%^&*()_+-=~`,./\|&*<>]/, "");
// });

modalBtnSubmit.addEventListener("click", () => {
  if (modalCheckboxes[0].checked && modalCheckboxes[1].checked) {
    photoChecks.classList.add("hidden");
    photoLoading.classList.remove("hidden");
    modalHeader.classList.add("hidden");
    modalFooter.classList.add("hidden");
    sendPhotosToServer();
    //myModal.hide();
  }
});

function showModal(event) {
  event.preventDefault();
  ym(91608464, "reachGoal", "show_modal");
  myModal.show();
}

async function sendPhotosToServer(event) {
  //  event.preventDefault();
  ym(91608464, "reachGoal", "form_submit");
//  ym(91608464, "reachGoal", "request_sent");

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

  await fetch("/submit?ajax=1", {
    //   await fetch("https://httpbin.org/post", {
    method: "POST",
    body: formData,
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data && Object.hasOwn(data, "redirect_url")) {
        console.log(data);
        const redirectUrl = data["redirect_url"];
        console.log("redirect Url", redirectUrl);
        window.location.href = redirectUrl;
      } else {
        alert("Something went wrong. Please, reload the page and try again");
      }
    });
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

  if (window.location.hash == "#test") {
    console.log("test");
    var opt = document.createElement('option');
    opt.value = "female_experimental";
    opt.innerHTML = "Женский (Экспериментальный)";
    gender.appendChild(opt);
  }
});
