function loadFile() {
    document.getElementById('loaded').textContent = "File caricato con successo.";
}

let button = document.querySelector("#button");
let error = document.querySelector("#error");
let f = 0;

button.addEventListener("click", function () {
  if (f === 0) {
    error.style.display = "block";
    f = 1;
    console.log("show");
  } else {
    error.style.display = "none";
    f = 0;
    console.log("hide");
  }
});