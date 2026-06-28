const parentButton = document.getElementById("parentButton");
const adminButton = document.getElementById("adminButton");
const parentDashboard = document.getElementById("parentDashboard");
const adminDashboard = document.getElementById("adminDashboard");

//Arrays we store inside them if our local storage has any data inside it then show that if not then fall back to dummy data
let parents = JSON.parse(localStorage.getItem("parents")) || [
  { id: "P1", name: "Shabir Ahmad" },
  { id: "P2", name: "Tariq Ahmad" },
];

let students = JSON.parse(localStorage.getItem("students")) || [
  { id: "S1", name: "Anees", parentId: "P1" },
  { id: "S2", name: "Mehnan", parentId: "P1" },
  { id: "S3", name: "Mehnan", parentId: "P2" },
];

let fees = JSON.parse(localStorage.getItem("fees")) || [
  {
    studentID: "S1",
    fees: 1500,
    month: "June",
    feesType: "Tution",
    feesId: "F1",
  },
  {
    studentID: "S2",
    fees: 1500,
    month: "June",
    feesType: "Tution",
    feesId: "F2",
  },
  {
    studentID: "S3",
    fees: 1500,
    month: "June",
    feesType: "Tution",
    feesId: "F3",
  },
];

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

// This function stringfies the above arrays and saves them into local storage
function saveData() {
  localStorage.setItem("parents", JSON.stringify(parents));
  localStorage.setItem("students", JSON.stringify(students));
  localStorage.setItem("fees", JSON.stringify(fees));
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

//by default we hide the admin dashboard
adminDashboard.classList.add("hidden");

//These buttons show whatever button we click its dashboard and hide the other one
parentButton.addEventListener("click", function () {
  adminDashboard.classList.add("hidden");
  parentDashboard.classList.remove("hidden");
});
adminButton.addEventListener("click", function () {
  parentDashboard.classList.add("hidden");
  adminDashboard.classList.remove("hidden");
});
