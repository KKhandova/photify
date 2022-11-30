const fileInput = document.querySelector("#inputFiles");

const email = document.querySelector("#inputEmail");
const prompt = document.querySelector("#inputPrompt");
//Click on logo will send AJAX post request (instead of sending it from the form)
const logo = document.querySelector(".logo");
let isSubmit = false;

//Limit number of files
//сделать неактивной кнопку сабмит, и активировать ее только если подходит количество файлов
fileInput.addEventListener("change", (e) => {
  const fileArray = Array.from(fileInput.files);
  console.log(fileArray);
  if (fileArray.length < 15 || fileArray.length > 30) {
    //isSubmit = false;
    fileInput.setCustomValidity("Please select 15-25 photos");
  } else {
    fileInput.setCustomValidity("");
    //isSubmit = true;
  }
});

fileInput.setCustomValidity("Please select 15-25 photos");

//document.addEventListener("DOMContentLoaded", initApp);

//alternative way of sending POST request
//logo.addEventListener("click", sendPhotosToServer);

prompt.addEventListener("keyup", () => {
  console.log(prompt.value);
  //prompt.value = prompt.value.replace(/[!@#$%^&*()_+-=~`,./\|&*<>]/, "");
});

async function sendPhotosToServer() {
  if (!isSubmit) {
    alert("Please check number of your images");
    return;
  }
  let formData = new FormData();
  formData.append("email", email.value);
  formData.append("prompt", prompt.value);

  const files = Array.from(fileInput.files);

  files.forEach((file) => {
    formData.append("files", file);
  });

  console.log(formData);

  //POST REQUEST TO DO
  await fetch("https://httpbin.org/post", {
    method: "POST",
    body: formData,
  })
    .then((res) => res.json())
    .then((data) => console.log(data));
}

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
