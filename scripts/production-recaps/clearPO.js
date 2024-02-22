function clearPO() {
  let ss = SpreadsheetApp.getActiveSpreadsheet();
  let poSheet = ss.getSheetByName("POST PO HERE");
  poSheet.clear();
}
