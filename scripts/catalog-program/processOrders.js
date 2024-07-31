function processOrders() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getActiveSheet();
  var range = sheet.getDataRange();
  var lastRow = range.getLastRow();
  var rowsToMove = [];

  var row = 4; // Excluding headers

  // Adding all the rows that have been checked for archival to rowsToMove array.
  while (row <= lastRow) {
    var cellValue = range.getCell(row, 1).getValue();

    if (cellValue != "") {
      rowsToMove.push(row);
    }

    row++;
  }

  // If array isn't empty, move data to orders to follow up on spreadsheet using rows collected in array.
  if (rowsToMove.length > 0) {
    // Prompt for user approval before moving data.
    var ui = SpreadsheetApp.getUi();
    var response = ui.alert(
      "Are you sure you want to process these orders?",
      ui.ButtonSet.YES_NO
    );

    // If user confirms prompt:
    if (response == ui.Button.YES) {
      for (let i = 0; i < rowsToMove.length; i++) {
        var row = rowsToMove[i] - i;
        var orderFollowUps = ss.getSheetByName("Orders to follow up on");

        var targetRow = orderFollowUps.getLastRow() + 1;

        var target = orderFollowUps.getRange(targetRow, 3);

        sheet.getRange(row, 1, 1, 10).copyTo(target);

        sheet.deleteRow(row);
      }
    }
  }
}
