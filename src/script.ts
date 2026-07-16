import { saveData } from "./saveData.js";
import {
  type Student,
  type Parent,
  type Fee,
  type Transaction,
  ParentsArray,
  StudentsArray,
  FeesArray,
  TransactionArray,
} from "./data.js";
// ============================================
// SECTION 1: DOM SELECTIONS
// ============================================
// Parent Dashboard Elements
const parentButton = document.getElementById(
  "parentButton",
)! as HTMLButtonElement;
const adminButton = document.getElementById(
  "adminButton",
)! as HTMLButtonElement;
const parentDashboard = document.getElementById(
  "parentDashboard",
)! as HTMLElement;
const adminDashboard = document.getElementById(
  "adminDashboard",
)! as HTMLElement;
const parentDropdown = document.getElementById(
  "parentDropdown",
)! as HTMLSelectElement;
const studentDropdown = document.getElementById(
  "studentDropdown",
)! as HTMLSelectElement;
const totalFees = document.getElementById("totalFees")! as HTMLSpanElement;
const totalPaid = document.getElementById("totalPaid")! as HTMLSpanElement;
const netBalanceLeft = document.getElementById(
  "netBalanceLeft",
)! as HTMLSpanElement;
const amountInput = document.getElementById("amountInput")! as HTMLInputElement;
const amountButton = document.getElementById(
  "amountButton",
)! as HTMLButtonElement;
const chunkAmountFive = document.getElementById(
  "chunkAmountFive",
)! as HTMLButtonElement;
const chunkAmountThousand = document.getElementById(
  "chunkAmountThousand",
)! as HTMLButtonElement;
const chunkAmountFifteenHundred = document.getElementById(
  "chunkAmountFifteenHundred",
)! as HTMLButtonElement;
const chunkContainer = document.getElementById(
  "chunkContainer",
)! as HTMLDivElement;
const paymentHistoryList = document.getElementById(
  "paymentHistoryList",
)! as HTMLUListElement;
const paidByMonth = document.getElementById("paidByMonth") as HTMLUListElement;
// Admin Dashboard Elements
const todayCollection = document.getElementById(
  "todayCollection",
)! as HTMLDivElement;
const monthlyCollection = document.getElementById(
  "monthlyCollection",
)! as HTMLDivElement;
const yearlyCollection = document.getElementById(
  "yearlyCollection",
)! as HTMLDivElement;
const studentsPendingFeesList = document.getElementById(
  "studentsPendingFeesList",
)! as HTMLUListElement;
const addParentInput = document.getElementById(
  "addParentInput",
)! as HTMLInputElement;

const addStudentsInput = document.getElementById(
  "addStudentsInput",
)! as HTMLInputElement;
const addStudentsButton = document.getElementById(
  "addStudentsButton",
)! as HTMLButtonElement;
const assignFeesInput = document.getElementById(
  "assignFeesInput",
)! as HTMLInputElement;
const assignMonthInput = document.getElementById(
  "assignMonthInput",
)! as HTMLInputElement;
const addFeesMonthButton = document.getElementById(
  "addFeesMonthButton",
)! as HTMLButtonElement;
const showModalDialoge = document.getElementById(
  "showModalDialoge",
)! as HTMLButtonElement;
const modalContainer = document.getElementById(
  "modalContainer",
)! as HTMLDivElement;
const modalStudentList = document.getElementById(
  "modalStudentList",
)! as HTMLUListElement;
const promotionButton = document.getElementById(
  "promotionButton",
)! as HTMLButtonElement;
const assignClassInput = document.getElementById(
  "assignClassInput",
)! as HTMLInputElement;

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
function loadStudents(): void {
  ParentsArray.forEach((parent) => {
    const parentNameOption = document.createElement("option");
    parentNameOption.textContent = parent.parentName;
    parentNameOption.value = parent.parentId;
    parentDropdown.appendChild(parentNameOption);
  });

  parentDropdown.addEventListener("change", function (e) {
    studentDropdown.innerHTML = "";
    const target = e.target as HTMLSelectElement;
    selectedParentId = target.value;
    filteringStudent();
    selectedStudentId = studentDropdown.value;
    updateBalance();
    showTransactions();
  });
}

//This function filters the students whoose ids match with parentsId
function filteringStudent(): void {
  StudentsArray.filter((student) => {
    if (selectedParentId === student.connectingId) {
      const studentNameOption = document.createElement("option");
      studentNameOption.textContent = ` ${student.studentName} (Class ${student.class})`;
      studentNameOption.value = student.studentId;
      studentDropdown.appendChild(studentNameOption);
    }
  });
}

function updateBalance(): void {
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
  totalFees.textContent = String(balance);
  netBalanceLeft.textContent = String(balance - counter);
  totalPaid.textContent = String(counter);
}

function makePayment(): void {
  let inputPaymentAmount = Number(amountInput.value);
  let remainBalance = Number(netBalanceLeft.textContent);

  if (
    isNaN(inputPaymentAmount) ||
    inputPaymentAmount <= 0 ||
    inputPaymentAmount > remainBalance
  ) {
    window.alert("The Amount is either invalid or higher than the fee amount");
  } else {
    let newTransactionObject: Transaction = {
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

function showTransactions(): void {
  paymentHistoryList.textContent = "";

  TransactionArray.filter((studentsHistory) => {
    if (selectedStudentId === studentsHistory.studentId) {
      const options: Intl.DateTimeFormatOptions = {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      };
      const paymentElement = document.createElement("li");
      paymentElement.textContent = `${new Date(studentsHistory.paymentDate).toLocaleString("en-GB", options)} || Rs ${studentsHistory.paidAmount}`;
      paymentHistoryList.prepend(paymentElement);
    }
  });
  showMonthlyBreakdown();
}

function showMonthlyBreakdown(): void {
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
function calculateCollections(): void {
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
  todayCollection.textContent = String(todaySum);
  monthlyCollection.textContent = String(monthlySum);
  yearlyCollection.textContent = String(yearlySum);
}

function studentsRemainingFees(): void {
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

function addParentsFunction(): void {
  let newParentName = addParentInput.value;
  if (addParentInput.value === "") {
    alert("Invalid");
  } else {
    let parentNewDropdown = document.createElement("option");
    parentNewDropdown.textContent = newParentName;
    parentNewDropdown.value = `P${ParentsArray.length + 1}`;
    parentDropdown.appendChild(parentNewDropdown);

    let newParentObject: Parent = {
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

function addStudentFunction(): void {
  let newStudentName = addStudentsInput.value;
  let assignClassValue = Number(assignClassInput.value);

  if (addStudentsInput.value === "" && assignClassInput.value === "") {
    alert("Invalid");
  } else {
    let studentNewDropdown = document.createElement("option");
    studentNewDropdown.textContent = newStudentName;
    studentNewDropdown.value = `S${StudentsArray.length + 1}`;
    studentDropdown.appendChild(studentNewDropdown);

    let newStudentObject: Student = {
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

function assignFeesFunction(): void {
  let addingFees = Number(assignFeesInput.value);
  let addingMonth = assignMonthInput.value;
  StudentsArray.forEach((student) => {
    let feesMonthObject: Fee = {
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

function loadModalStudents(): void {
  modalStudentList.textContent = "";
  StudentsArray.forEach((student) => {
    let modalStudentsListItems = document.createElement("li");
    modalStudentsListItems.textContent = `${student.studentName} Class:${student.class} `;
    modalStudentsListItems.value = Number(student.studentId);
    modalStudentList.appendChild(modalStudentsListItems);

    let checkboxElements = document.createElement("input");
    checkboxElements.type = "checkbox";
    checkboxElements.value = student.studentId;
    modalStudentsListItems.appendChild(checkboxElements);
  });
}

function promotionFunction(): void {
  const allCheckboxes = document.querySelectorAll('input[type="checkbox"]');
  allCheckboxes.forEach((item) => {
    const checked = item as HTMLInputElement;
    if (checked.checked) {
      StudentsArray.find((students) => {
        if (students.studentId === checked.value) {
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
  let selectedStudentTarget = e.target as HTMLSelectElement;
  selectedStudentId = selectedStudentTarget.value;
  updateBalance();
  showTransactions();
});

chunkContainer.addEventListener("click", function (e) {
  let buttonTarget = e.target as HTMLButtonElement;
  if (buttonTarget) {
    let tagValue = buttonTarget.value;
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
