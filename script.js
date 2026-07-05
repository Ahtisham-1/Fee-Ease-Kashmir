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

// Admin Dashboard Elements
const todayCollection = document.getElementById("todayCollection");
const monthlyCollection = document.getElementById("monthlyCollection");
const yearlyCollection = document.getElementById("yearlyCollection");
const studentsPendingFeesList = document.getElementById(
  "studentsPendingFeesList",
);

// ============================================
// SECTION 2: DATA ARRAYS
// ============================================

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

// ============================================
// SECTION 3: GLOBAL STATE VARIABLES
// ============================================

let selectedParentId = "P1";
let selectedStudentId = "S1";

// ============================================
// SECTION 4: UTILITY FUNCTIONS
// ============================================

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
      studentNameOption.textContent = student.studentName;
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
  let allStudentsFees = 0;

  FeesArray.forEach((student) => {
    let allStudentsPaid = 0;
    TransactionArray.filter((studentPending) => {
      if (student.studentFeesConnectingID === studentPending.studentId) {
        allStudentsPaid += studentPending.paidAmount;
      }
    });
    allStudentsFees = student.fees - allStudentsPaid;
    if (allStudentsFees > 0) {
      StudentsArray.find((userName) => {
        if (userName.studentId === student.studentFeesConnectingID) {
          ParentsArray.find((userParentName) => {
            if (userName.connectingId === userParentName.parentId) {
              let newElement = document.createElement("li");
              newElement.textContent = `${userName.studentName} ${userParentName.parentName}  Pending:${allStudentsFees}`;
              studentsPendingFeesList.appendChild(newElement);
            }
          });
        }
      });
    }
  });
}

studentsRemainingFees();

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
});

// ============================================
// SECTION 8: INITIAL FUNCTION CALLS
// ============================================

loadStudents();
filteringStudent();
updateBalance();
showTransactions();
calculateCollections();
