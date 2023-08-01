function checkboxOnEdit() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getActiveSheet();
  var editedCell = sheet.getActiveCell();

  var sheetName = "PO Tracking"; // The name of the sheet you'd like this script to apply to.
  var columnEdit = 1; // When a user edits a cell in this column add the checkboxes.

  if (
    sheet.getSheetName() == sheetName &&
    editedCell.getColumn() == columnEdit &&
    editedCell.getRow() != 1 // Excluding headers
  ) {
    var startingColumn = 5; // The first column you want a check box.
    var endingColumn = 4; // The last column you want a checkbox.
    var row = editedCell.getRow();
    var range = sheet.getRange(row, startingColumn, 1, endingColumn);

    range.insertCheckboxes();
  }
}
