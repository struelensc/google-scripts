function clearPO() {
  let ss = SpreadsheetApp.getActiveSpreadsheet();
  let poSheet = ss.getSheetByName("POST PO HERE");
  let asnSheet = ss.getSheetByName("POST ASN HERE");
  let oldRecapSheet = ss.getSheetByName("RECAP");
  let oldBoxmakingSheet = ss.getSheetByName("BOXMAKING");
  poSheet.clear();
  asnSheet.clear();
  ss.deleteSheet(oldRecapSheet);
  ss.deleteSheet(oldBoxmakingSheet);
}
