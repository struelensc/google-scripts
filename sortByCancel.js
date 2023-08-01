function sortByCancel(event) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getActiveSheet();
  var editedCell = sheet.getActiveCell();

  var columnToSortBy = 4; // Cancel Date column
  var tableRange = "A3:Z1000"; // Table excluding headers

  if (
    sheet.getSheetName() == "PO Tracking" &&
    editedCell.getColumn() == columnToSortBy
  ) {
    var range = sheet.getRange(tableRange);
    range.sort({ column: columnToSortBy });
  }
}
