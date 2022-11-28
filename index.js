const initApp = () => {
  const droparea = document.querySelector(".droparea");
  const input = document.querySelector("input");

  const active = () => input.classList.add("green-border");

  const inactive = () => input.classList.remove("green-border");

  const prevents = (e) => e.preventDefault();

  ["dragenter", "dragover", "dragleave", "drop"].forEach((evtName) => {
    droparea.addEventListener(evtName, prevents);
  });

  ["dragenter", "dragover"].forEach((evtName) => {
    droparea.addEventListener(evtName, active);
  });

  ["dragleave", "drop"].forEach((evtName) => {
    droparea.addEventListener(evtName, inactive);
  });
  //if a user uploads using drag & drop
  droparea.addEventListener("drop", (e) => {
    const dt = e.dataTransfer;
    const fileArray = [...dt.files];
    sendPhotosToServer(fileArray);
  });

  //if a user uploads using choose file button
  input.addEventListener("change", (e) => {
    const fileArray = Array.from(input.files);
    sendPhotosToServer(fileArray);
  });
};

document.addEventListener("DOMContentLoaded", initApp);

const sendPhotosToServer = (files) => {
  console.log(files);
  let formData = new FormData();
  files.forEach((file) => {
    formData.append("file", file);
  });
  console.log(formData);

  //POST REQUEST TO DO
  axios
    .post("https://httpbin.org/post", formData, {
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        console.log(`upload process: ${percentCompleted}%`);
      },
    })
    .then((res) => {
      console.log(res.data);
      console.log(res.data.url);
    });
};
