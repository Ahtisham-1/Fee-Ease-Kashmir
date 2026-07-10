import { saveData } from "./saveData.js";
import {
  StudentsArray,
  ParentsArray,
  FeesArray,
  TransactionArray,
} from "./data.js";
// ============================================
// SECTION 1: DOM SELECTIONS
// ============================================
// Parent Dashboard Elements
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
const paidByMonth = document.getElementById("paidByMonth");

// Admin Dashboard Elements
const todayCollection = document.getElementById("todayCollection");
const monthlyCollection = document.getElementById("monthlyCollection");
const yearlyCollection = document.getElementById("yearlyCollection");
const studentsPendingFeesList = document.getElementById(
  "studentsPendingFeesList",
);
const addParentInput = document.getElementById("addParentInput");
const addParentButton = document.getElementById("addParentButton");
const addStudentsInput = document.getElementById("addStudentsInput");
const addStudentsButton = document.getElementById("addStudentsButton");
const assignFeesInput = document.getElementById("assignFeesInput");
const assignMonthInput = document.getElementById("assignMonthInput");
const addFeesMonthButton = document.getElementById("addFeesMonthButton");
const showModalDialoge = document.getElementById("showModalDialoge");
const modalContainer = document.getElementById("modalContainer");
const modalStudentList = document.getElementById("modalStudentList");
const promotionButton = document.getElementById("promotionButton");
const assignClassInput = document.getElementById("assignClassInput");
const addClassButton = document.getElementById("addClassButton");
modalContainer.style.display = "none";

// ============================================
// SECTION 3: GLOBAL STATE VARIABLES
// ============================================

let selectedParentId = "P1";
let selectedStudentId = "S1";

// ============================================
// SECTION 5: PARENT DASHBOARD FUNCTIONS
// ============================================

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

//This function filters the students whoose ids match with parentsId
function filteringStudent() {
  StudentsArray.filter((student) => {
    if (selectedParentId === student.connectingId) {
      const studentNameOption = document.createElement("option");
      studentNameOption.textContent = ` ${student.studentName} (Class ${student.class})`;
      studentNameOption.value = student.studentId;
      studentDropdown.appendChild(studentNameOption);
    }
  });
}

function updateBalance() {
  let counter = 0;
  let balance = 0;
  let paid = 0;
  totalFees.textContent = "";
  FeesArray.filter((feeAmount) => {
    if (selectedStudentId === feeAmount.studentFeesConnectingID) {
      balance += feeAmount.fees;
    }
  });

  TransactionArray.filter((studentTransaction) => {
    if (selectedStudentId === studentTransaction.studentId) {
      counter += studentTransaction.paidAmount;
    }
  });
  totalFees.textContent = balance;
  netBalanceLeft.textContent = balance - counter;
  totalPaid.textContent = counter;
}

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
  showMonthlyBreakdown();
}

function showMonthlyBreakdown() {
  paidByMonth.textContent = "";
  let newCounter = 0;
  TransactionArray.filter((studentTransaction) => {
    if (selectedStudentId === studentTransaction.studentId) {
      newCounter += studentTransaction.paidAmount;
    }
  });
  FeesArray.filter((student) => {
    if (selectedStudentId === student.studentFeesConnectingID) {
      const newListElement = document.createElement("li");
      newListElement.textContent = `${student.month} ${student.fees} ${newCounter}`;
      paidByMonth.appendChild(newListElement);
      if (newCounter >= student.fees) {
        newListElement.textContent = "Paid";
        newCounter = newCounter - student.fees;
      } else {
        let latestAmount = student.fees - newCounter;
        newCounter = 0;

        newListElement.textContent = `${student.month} Pending:${latestAmount}`;
      }
    }
  });
}
showMonthlyBreakdown();
// ============================================
// SECTION 6: ADMIN DASHBOARD FUNCTIONS
// ============================================
function calculateCollections() {
  let todaySum = 0;
  let monthlySum = 0;
  let yearlySum = 0;
  TransactionArray.forEach((item) => {
    let txDate = new Date(item.paymentDate);
    let today = new Date();
    if (
      txDate.getDate() === today.getDate() &&
      txDate.getMonth() === today.getMonth() &&
      txDate.getFullYear() === today.getFullYear()
    ) {
      todaySum += item.paidAmount;
    }
    if (
      txDate.getMonth() === today.getMonth() &&
      txDate.getFullYear() === today.getFullYear()
    ) {
      monthlySum += item.paidAmount;
    }
    if (txDate.getFullYear() === today.getFullYear()) {
      yearlySum += item.paidAmount;
    }
  });
  todayCollection.textContent = todaySum;
  monthlyCollection.textContent = monthlySum;
  yearlyCollection.textContent = yearlySum;
}

function studentsRemainingFees() {
  studentsPendingFeesList.innerHTML = "";

  StudentsArray.forEach((student) => {
    let allStudentsFees = 0;
    let allStudentsPaid = 0;
    TransactionArray.filter((studentPending) => {
      if (student.studentId === studentPending.studentId) {
        allStudentsPaid += studentPending.paidAmount;
      }
    });
    FeesArray.forEach((feesStudent) => {
      if (feesStudent.studentFeesConnectingID === student.studentId) {
        allStudentsFees += feesStudent.fees;
      }
    });
    let remaining = allStudentsFees - allStudentsPaid;
    if (remaining > 0) {
      ParentsArray.find((userParentName) => {
        if (student.connectingId === userParentName.parentId) {
          let newElement = document.createElement("li");
          newElement.textContent = `${student.studentName} ${userParentName.parentName}  Pending:${remaining}`;
          studentsPendingFeesList.appendChild(newElement);
        }
      });
    }
  });
}

function addParentsFunction() {
  let newParentName = addParentInput.value;
  if (addParentInput.value === "") {
    alert("Invalid");
  } else {
    let parentNewDropdown = document.createElement("option");
    parentNewDropdown.textContent = newParentName;
    parentNewDropdown.value = `P${ParentsArray.length + 1}`;
    parentDropdown.appendChild(parentNewDropdown);

    let newParentObject = {
      parentName: newParentName,
      parentId: parentNewDropdown.value,
    };
    console.log(newParentObject.parentId);
    ParentsArray.push(newParentObject);
    saveData();
    selectedParentId = newParentObject.parentId;
  }
  addParentInput.value = "";
}

function addStudentFunction() {
  let newStudentName = addStudentsInput.value;
  let assignClassValue = Number(assignClassInput.value);

  if (addStudentsInput.value === "" && assignClassInput.value === "") {
    alert("Invalid");
  } else {
    let studentNewDropdown = document.createElement("option");
    studentNewDropdown.textContent = newStudentName;
    studentNewDropdown.value = `S${StudentsArray.length + 1}`;
    studentDropdown.appendChild(studentNewDropdown);

    let newStudentObject = {
      studentName: newStudentName,
      studentId: studentNewDropdown.value,
      connectingId: selectedParentId,
      class: assignClassValue,
    };
    StudentsArray.push(newStudentObject);
    saveData();
  }
  addStudentsInput.value = "";
  assignClassInput.value = "";
}

function assignFeesFunction() {
  let addingFees = Number(assignFeesInput.value);
  let addingMonth = assignMonthInput.value;
  StudentsArray.forEach((student) => {
    let feesMonthObject = {
      studentFeesConnectingID: student.studentId,
      fees: addingFees,
      month: addingMonth,
      feesType: "Tution",
      feesId: `F${FeesArray.length + 1}`,
    };
    FeesArray.push(feesMonthObject);
    saveData();
  });
  assignFeesInput.value = "";
  assignMonthInput.value = "";
  showMonthlyBreakdown();
}

function loadModalStudents() {
  modalStudentList.textContent = "";
  StudentsArray.forEach((student) => {
    let modalStudentsListItems = document.createElement("li");
    modalStudentsListItems.textContent = `${student.studentName} Class:${student.class} `;
    modalStudentsListItems.value = student.studentId;
    modalStudentList.appendChild(modalStudentsListItems);

    let checkboxElements = document.createElement("input");
    checkboxElements.type = "checkbox";
    checkboxElements.value = student.studentId;
    modalStudentsListItems.appendChild(checkboxElements);
  });
}

function promotionFunction() {
  const allCheckboxes = document.querySelectorAll('input[type="checkbox"]');
  allCheckboxes.forEach((item) => {
    if (item.checked) {
      StudentsArray.find((students) => {
        if (students.studentId === item.value) {
          let classCounter = students.class + 1;
          students.class = classCounter;
        }
      });
    }
  });
  saveData();
  studentDropdown.innerHTML = "";
  filteringStudent();
}
// ============================================
// SECTION 7: EVENT LISTENERS
// ============================================

amountButton.addEventListener("click", function () {
  makePayment();
  showTransactions();
});

studentDropdown.addEventListener("change", function (e) {
  selectedStudentId = e.target.value;
  updateBalance();
  showTransactions();
});

chunkContainer.addEventListener("click", function (e) {
  if (e.target.tagName === "BUTTON") {
    let tagValue = e.target.textContent;
    amountInput.value = tagValue;
    makePayment();
    showTransactions();
  }
});

addStudentsButton.addEventListener("click", function () {
  addParentsFunction();
  addStudentFunction();
});

addFeesMonthButton.addEventListener("click", function () {
  assignFeesFunction();
});

// Dashboard Toggle
adminDashboard.classList.add("hidden");
parentButton.addEventListener("click", function () {
  adminDashboard.classList.add("hidden");
  parentDashboard.classList.remove("hidden");
});

adminButton.addEventListener("click", function () {
  parentDashboard.classList.add("hidden");
  adminDashboard.classList.remove("hidden");
  calculateCollections();
  studentsRemainingFees();
});

showModalDialoge.addEventListener("click", function () {
  modalContainer.style.display = "block";
  loadModalStudents();
});

promotionButton.addEventListener("click", function () {
  promotionFunction();
  modalContainer.style.display = "none";
});

// ============================================
// SECTION 8: INITIAL FUNCTION CALLS
// ============================================

loadStudents();
filteringStudent();
updateBalance();
showTransactions();
calculateCollections();
studentsRemainingFees();
