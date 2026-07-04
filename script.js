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
const chunkAmountFive = document.getElementById("chunkAmountFive");
const chunkAmountThousand = document.getElementById("chunkAmountThousand");
const chunkAmountFifteenHundred = document.getElementById(
  "chunkAmountFifteenHundred",
);
const chunkContainer = document.getElementById("chunkContainer");
const paymentHistoryList = document.getElementById("paymentHistoryList");

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
    showTransactions();
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
  let remainBalance = Number(netBalanceLeft.textContent);

  if (
    isNaN(inputPaymentAmount) ||
    inputPaymentAmount <= 0 ||
    inputPaymentAmount > remainBalance
  ) {
    window.alert(
      "whatever you wrote is either not valid numbers or is too High than the fee amount you own",
    );
  } else {
    let newTransactionObject = {
      studentId: selectedStudentId,
      paidAmount: inputPaymentAmount,
      paymentDate: Date.now(),
    };
    TransactionArray.push(newTransactionObject);
    saveData();
    updateBalance();
  }
  amountInput.value = "";
}

function showTransactions() {
  paymentHistoryList.textContent = "";

  TransactionArray.filter((studentsHistory) => {
    if (selectedStudentId === studentsHistory.studentId) {
        new Date(Number);
      const options = {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      };
      const paymentElement = document.createElement("li");
      paymentElement.textContent = `${new Date(studentsHistory.paymentDate).toLocaleString("en-GB", options)} || Rs ${studentsHistory.paidAmount}`;
      paymentHistoryList.prepend(paymentElement);
    }
  });
}
showTransactions(); // This one calls the history when we open the page first time

amountButton.addEventListener("click", function () {
  makePayment();
  showTransactions(); // This one shows the transactions history when we manually enter the amount and submit that
});

//This eventlistner gives us the value of current selected students id
studentDropdown.addEventListener("change", function (e) {
  selectedStudentId = e.target.value;
  updateBalance();
  showTransactions(); //This one shows the transaction list of the changed students
});

chunkContainer.addEventListener("click", function (e) {
  if (e.target.tagName === "BUTTON") {
    let tagValue = e.target.textContent;
    amountInput.value = tagValue;
    makePayment();
    showTransactions(); // This one shows the chunk buttons transaction when we click them
  }
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
