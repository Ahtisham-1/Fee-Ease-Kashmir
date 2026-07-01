const parentButton = document.getElementById("parentButton");
const adminButton = document.getElementById("adminButton");
const parentDashboard = document.getElementById("parentDashboard");
const adminDashboard = document.getElementById("adminDashboard");
const parentDropdown = document.getElementById("parentDropdown");
const studentDropdown = document.getElementById("studentDropdown");
const totalFees = document.getElementById("totalFees");
const totalPaid = document.getElementById("totalPaid");
const netBalanceLeft = document.getElementById("netBalanceLeft");
const amountInput = document.getElementById("amountInput");
const amountButton = document.getElementById("amountButton");

let StudentsArray = JSON.parse(localStorage.getItem("storedStudentsArray")) || [
  { studentName: "Ahtisham", studentId: "S1", connectingId: "P1" },
  { studentName: "Mehnan", studentId: "S2", connectingId: "P2" },
  { studentName: "Anees", studentId: "S3", connectingId: "P3" },
  { studentName: "Sahil", studentId: "S4", connectingId: "P4" },
  { studentName: "Xahid", studentId: "S5", connectingId: "P5" },
  { studentName: "Moomin", studentId: "S6", connectingId: "P5" },
];
let ParentsArray = JSON.parse(localStorage.getItem("storedParentsArray")) || [
  { parentName: "Quyoom", parentId: "P1" },
  { parentName: "Mukhtar", parentId: "P2" },
  { parentName: "Maqbool", parentId: "P3" },
  { parentName: "Rafiq", parentId: "P4" },
  { parentName: "Akbar", parentId: "P5" },
];
let FeesArray = JSON.parse(localStorage.getItem("storedFeesArray")) || [
  {
    studentFeesConnectingID: "S1",
    fees: 1500,
    month: "June",
    feesType: "Tution",
    feesId: "F1",
  },
  {
    studentFeesConnectingID: "S2",
    fees: 2222,
    month: "June",
    feesType: "Tution",
    feesId: "F2",
  },
  {
    studentFeesConnectingID: "S3",
    fees: 356,
    month: "June",
    feesType: "Tution",
    feesId: "F3",
  },
  {
    studentFeesConnectingID: "S4",
    fees: 34563,
    month: "June",
    feesType: "Tution",
    feesId: "F4",
  },
  {
    studentFeesConnectingID: "S5",
    fees: 644,
    month: "June",
    feesType: "Tution",
    feesId: "F5",
  },
  {
    studentFeesConnectingID: "S6",
    fees: 1500,
    month: "June",
    feesType: "Tution",
    feesId: "F6",
  },
];
let TransactionArray =
  JSON.parse(localStorage.getItem("storedTransactionArray")) || [];

//This function stores the data into local storage and stringifies them
function saveData() {
  localStorage.setItem("storedStudentsArray", JSON.stringify(StudentsArray));
  localStorage.setItem("storedParentsArray", JSON.stringify(ParentsArray));
  localStorage.setItem("storedFeesArray", JSON.stringify(FeesArray));
  localStorage.setItem(
    "storedTransactionArray",
    JSON.stringify(TransactionArray),
  );
}

let selectedParentId = "P1";
let selectedStudentId = "S1";

//This function loads the parents option on the page
function loadStudents() {
  ParentsArray.forEach((parent) => {
    const parentNameOption = document.createElement("option");
    parentNameOption.textContent = parent.parentName;
    parentNameOption.value = parent.parentId;
    parentDropdown.appendChild(parentNameOption);
  });

  parentDropdown.addEventListener("change", function (e) {
    studentDropdown.innerHTML = "";
    selectedParentId = e.target.value;
    filteringStudent();
    selectedStudentId = studentDropdown.value;
    updateBalance();
  });
}
loadStudents();

//This function filters the students whoose ids match with parentsId
function filteringStudent() {
  StudentsArray.filter((student) => {
    if (selectedParentId === student.connectingId) {
      const studentNameOption = document.createElement("option");
      studentNameOption.textContent = student.studentName;
      studentNameOption.value = student.studentId;
      studentDropdown.appendChild(studentNameOption);
    }
  });
}
filteringStudent();

function updateBalance() {
  let counter = 0;
  let balance = 0;
  let paid = 0;
  totalFees.textContent = ""; //This clear total fees before showing another students fees
  FeesArray.filter((feeAmount) => {
    if (selectedStudentId === feeAmount.studentFeesConnectingID) {
      totalFees.textContent = feeAmount.fees;
      balance = feeAmount.fees;
    }
  });

  TransactionArray.filter((studentTransaction) => {
    if (selectedStudentId === studentTransaction.studentId) {
      counter += studentTransaction.paidAmount;
    }
  });
  netBalanceLeft.textContent = balance - counter;
  totalPaid.textContent = counter;
}
updateBalance();

function makePayment() {
  let inputPaymentAmount = Number(amountInput.value);
  let newTransactionObject = {
    studentId: selectedStudentId,
    paidAmount: inputPaymentAmount,
  };

  TransactionArray.push(newTransactionObject);
  saveData();
  updateBalance();
  amountInput.value = "";
}

amountButton.addEventListener("click", function () {
  makePayment();
});

//This eventlistner gives us the value of current selected students id
studentDropdown.addEventListener("change", function (e) {
  selectedStudentId = e.target.value;
  updateBalance();
});

// By default it hides the admin dashboard and when we click parent or admin dashboard one hides and one shows dinamically
adminDashboard.classList.add("hidden");
parentButton.addEventListener("click", function () {
  adminDashboard.classList.add("hidden");
  parentDashboard.classList.remove("hidden");
});

adminButton.addEventListener("click", function () {
  parentDashboard.classList.add("hidden");
  adminDashboard.classList.remove("hidden");
});
