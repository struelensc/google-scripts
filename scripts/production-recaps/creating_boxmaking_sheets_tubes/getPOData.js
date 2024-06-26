function getPOData() {
  let ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName("POST PO HERE");
  let range = sheet.getDataRange();

  let po = range.getCell(2, 1).getValue().split("-")[0];
  let startDate = range.getCell(2, 8).getValue();
  let cancelDate = range.getCell(2, 9).getValue();

  return { po: po, startDate: startDate, cancelDate: cancelDate };
}
