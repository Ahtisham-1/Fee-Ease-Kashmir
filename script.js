const parentButton = document.getElementById("parentButton");
const adminButton = document.getElementById("adminButton");
const parentDashboard = document.getElementById("parentDashboard");
const adminDashboard = document.getElementById("adminDashboard");

//section 1 parent elements
const studentSelect = document.getElementById("studentSelect");
let totalOwned = document.getElementById("totalOwned");
let totalPaid = document.getElementById("totalPaid");
let netBalanceDue = document.getElementById("netBalanceDue");

//Active parent by default
let activeParentId = "P1";

//by default we hide the admin dashboard
adminDashboard.classList.add("hidden");

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

let studentfees = JSON.parse(localStorage.getItem("studentfees")) || [
  {
    studentID: "S1",
    fees: 1505550,
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
  localStorage.setItem("studentfees", JSON.stringify(studentfees));
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

// Function for loading the students in parent dashboard
function loadStudentDropdown() {
  const activeStudent = students.filter(
    (elements) => elements.parentId === activeParentId,
  );
  activeStudent.forEach((student) => {
    const optionElement = document.createElement("option");
    optionElement.value = student.id;
    optionElement.textContent = student.name;
    studentSelect.appendChild(optionElement);
  });
}
loadStudentDropdown();

//Filter function for showing what each student has paid owns and their net balance

function updateBalances() {
  let balanceOwned = 0;
  let balancePaid = 0;

  const selectedStudentId = studentSelect.value;
  studentfees.forEach((feeItem) => {
    if (feeItem.studentID === selectedStudentId) {
      balanceOwned = balanceOwned + feeItem.fees;
    }
  });

  transactions.forEach((transactionItem) => {
    if (transactionItem.studentID === selectedStudentId) {
      balancePaid = balancePaid + transactionItem.paid;
    }
  });

  let balanceDue = balanceOwned - balancePaid;

  totalOwned.textContent = balanceOwned;
  totalPaid.textContent = balancePaid;
  netBalanceDue.textContent = balanceDue;
}

updateBalances();
studentSelect.addEventListener("change", updateBalances);

//These buttons show whatever button we click its dashboard and hide the other one
parentButton.addEventListener("click", function () {
  adminDashboard.classList.add("hidden");
  parentDashboard.classList.remove("hidden");
});
adminButton.addEventListener("click", function () {
  parentDashboard.classList.add("hidden");
  adminDashboard.classList.remove("hidden");
});
