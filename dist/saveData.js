"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveData = saveData;
const data_js_1 = require("./data.js");
//This function stores the data into local storage and stringifies them
function saveData() {
    localStorage.setItem("storedStudentsArray", JSON.stringify(data_js_1.StudentsArray));
    localStorage.setItem("storedParentsArray", JSON.stringify(data_js_1.ParentsArray));
    localStorage.setItem("storedFeesArray", JSON.stringify(data_js_1.FeesArray));
    localStorage.setItem("storedTransactionArray", JSON.stringify(data_js_1.TransactionArray));
}
//# sourceMappingURL=saveData.js.map