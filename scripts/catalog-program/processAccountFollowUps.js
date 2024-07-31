function processAccountFollowUps() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getActiveSheet();
  var range = sheet.getDataRange();
  var lastRow = range.getLastRow();
  var rowsToMove = [];

  var r = 5; // Excluding headers

  // Adding all the rows that have been checked for archival to rowsToMove array.
  while (r <= lastRow) {
    var cellValue = range.getCell(r, 1).getValue();

    if (cellValue != "") {
      rowsToMove.push(r);
    }

    r++;
  }

  // If array isn't empty, move data to orders to follow up on spreadsheet using rows collected in array.
  if (rowsToMove.length > 0) {
    // Prompt for user approval before moving data.
    var ui = SpreadsheetApp.getUi();
    var response = ui.alert(
      "Are you sure you want to process these accounts?",
      ui.ButtonSet.YES_NO
    );

    // If user confirms prompt:
    if (response == ui.Button.YES) {
      for (let i = 0; i < rowsToMove.length; i++) {
        var row = rowsToMove[i] - i;
        var awaitingOrderSheet = ss.getSheetByName("Awaiting order");

        var targetRow = awaitingOrderSheet.getLastRow() + 1;

        var followUpTarget = awaitingOrderSheet.getRange(targetRow, 2);
        var companyInfoTarget = awaitingOrderSheet.getRange(targetRow, 4);

        sheet.getRange(row, 1, 1, 2).copyTo(followUpTarget); //Last follow up details
        sheet.getRange(row, 5, 1, 7).copyTo(companyInfoTarget);

        var FollowUpCounterValue = awaitingOrderSheet
          .getRange(targetRow, 4)
          .getValue();
        FollowUpCounterValue += 1;

        awaitingOrderSheet
          .getRange(targetRow, 4)
          .setValue(FollowUpCounterValue);

        sheet.deleteRow(row);
      }
    }
  }
}
