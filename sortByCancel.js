function sortByCancel(event) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getActiveSheet();
  var editedCell = sheet.getActiveCell();

  var sheetName = "PO Tracking"; // The name of the sheet you'd like this script to apply to.
  var columnToSortBy = 4; // Column to sort by
  var tableRange = "A3:Z1000"; // Table excluding headers

  if (
    sheet.getSheetName() == sheetName &&
    editedCell.getColumn() == columnToSortBy
  ) {
    var range = sheet.getRange(tableRange);
    range.sort({ column: columnToSortBy });
  }
}
