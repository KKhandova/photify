const fileInput = document.querySelector("#inputFiles");
const email = document.querySelector("#inputEmail");
const prompt = document.querySelector("#inputPrompt");
//Click on logo will send AJAX post request (instead of sending it from the form)
const logo = document.querySelector(".logo");

//if a user uploads using choose file button
//   input.addEventListener("change", (e) => {
//     const fileArray = Array.from(input.files);
//     sendPhotosToServer(fileArray);
//   });

//document.addEventListener("DOMContentLoaded", initApp);

//alternative way of sending POST request
logo.addEventListener("click", sendPhotosToServer);

async function sendPhotosToServer() {
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
