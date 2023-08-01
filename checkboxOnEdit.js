function checkboxOnEdit() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getActiveSheet();
  var editedCell = sheet.getActiveCell();

  if (
    sheet.getSheetName() == "PO Tracking" &&
    editedCell.getColumn() == 1 &&
    editedCell.getRow() != 1
  ) {
    var startingColumn = 5;
    var row = editedCell.getRow();
    var range = sheet.getRange(row, startingColumn, 1, 4);

    range.insertCheckboxes();
  }
}
