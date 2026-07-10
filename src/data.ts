// ============================================
// SECTION 2: DATA ARRAYS
// ============================================

let StudentsArray = JSON.parse(localStorage.getItem("storedStudentsArray")) || [
  { studentName: "Ahtisham", studentId: "S1", connectingId: "P1", class: 1 },
  { studentName: "Mehnan", studentId: "S2", connectingId: "P2", class: 1 },
  { studentName: "Anees", studentId: "S3", connectingId: "P3", class: 1 },
  { studentName: "Sahil", studentId: "S4", connectingId: "P4", class: 1 },
  { studentName: "Xahid", studentId: "S5", connectingId: "P5", class: 1 },
  { studentName: "Moomin", studentId: "S6", connectingId: "P5", class: 1 },
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
    studentFeesConnectingID: "S1",
    fees: 1500,
    month: "July",
    feesType: "Tution",
    feesId: "F7",
  },
  {
    studentFeesConnectingID: "S2",
    fees: 2000,
    month: "June",
    feesType: "Tution",
    feesId: "F2",
  },
  {
    studentFeesConnectingID: "S2",
    fees: 2000,
    month: "July",
    feesType: "Tution",
    feesId: "F8",
  },
  {
    studentFeesConnectingID: "S3",
    fees: 3000,
    month: "June",
    feesType: "Tution",
    feesId: "F3",
  },
  {
    studentFeesConnectingID: "S3",
    fees: 3000,
    month: "July",
    feesType: "Tution",
    feesId: "F9",
  },
  {
    studentFeesConnectingID: "S4",
    fees: 4000,
    month: "June",
    feesType: "Tution",
    feesId: "F4",
  },
  {
    studentFeesConnectingID: "S5",
    fees: 5000,
    month: "June",
    feesType: "Tution",
    feesId: "F5",
  },
  {
    studentFeesConnectingID: "S6",
    fees: 6000,
    month: "June",
    feesType: "Tution",
    feesId: "F6",
  },
];

let TransactionArray =
  JSON.parse(localStorage.getItem("storedTransactionArray")) || [];

export { StudentsArray, ParentsArray, FeesArray, TransactionArray };
