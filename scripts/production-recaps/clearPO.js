function clearPO() {
  let ss = SpreadsheetApp.getActiveSpreadsheet();
  let poSheet = ss.getSheetByName("POST PO HERE");
  let asnSheet = ss.getSheetByName("POST ASN HERE");
  poSheet.clear();
  asnSheet.clear();
}
