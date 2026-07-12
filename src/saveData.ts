import {
  StudentsArray,
  ParentsArray,
  FeesArray,
  TransactionArray,
} from "./data.js";

//This function stores the data into local storage and stringifies them
export function saveData():void {
  localStorage.setItem("storedStudentsArray", JSON.stringify(StudentsArray));
  localStorage.setItem("storedParentsArray", JSON.stringify(ParentsArray));
  localStorage.setItem("storedFeesArray", JSON.stringify(FeesArray));
  localStorage.setItem(
    "storedTransactionArray",
    JSON.stringify(TransactionArray),
  );
}
