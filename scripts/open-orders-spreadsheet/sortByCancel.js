function sortByCancel(event) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getActiveSheet();
  var editedCell = sheet.getActiveCell();

  var sheetName = "PO Tracking"; // Name of the spreadsheet this script needs to apply to
  var columnToSortBy = 4; // Sorting by cancel date column
  var tableRange = "A3:Z1000";

  if (
    sheet.getSheetName() == sheetName &&
    editedCell.getColumn() == columnToSortBy
  ) {
    var range = sheet.getRange(tableRange);
    range.sort({ column: columnToSortBy });
  }
}
