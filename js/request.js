// api
const API = "https://randomuser.me/api/?results=9";

// for leader
const overlay = document.getElementById("overlay");

// toggle loader
const loaderToggle = (toggle) => {
  if (toggle) {
    overlay.classList.remove("hidden");
  } else {
    overlay.classList.add("hidden");
  }
};

// request promise
const getDate = (resource) => {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.addEventListener("readystatechange", () => {
      //   console.log(request);
      if (request.readyState < 4) {
        loaderToggle(true);
      } else if (request.readyState === 4 && request.status == 200) {
        loaderToggle(false);
        const date = JSON.parse(request.responseText);
        resolve(date.results);
      } else if (request.request === 4) {
        reject("eror!!!");
        loaderToggle(false);
      }
    });
    request.open("GET", resource);
    request.send();
  });
};

// load func

const reload = () => {
  getDate(API)
    .then((data) => {
      update(data);
    })
    .catch((err) => {
      console.log(err);
    });
};

reload();

document.addEventListener("DOMContentLoaded", reload);
