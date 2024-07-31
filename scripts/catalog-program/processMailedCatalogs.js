function processMailedCatalogs() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getActiveSheet();
  var range = sheet.getDataRange();
  var lastRow = range.getLastRow();
  var rowsToMove = [];

  var r = 4; // Excluding headers

  // Adding all the rows that have been checked for archival to rowsToMove array.
  while (r <= lastRow) {
    var cellValue = range.getCell(r, 1).getValue();

    if (cellValue != "") {
      rowsToMove.push(r);
    }

    r++;
  }

  // If array isn't empty, move data to awaiting order spreadsheet using rows collected in array.
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
        var catalogFollowUpSheet = ss.getSheetByName("Catalog follow up");

        var targetRow = catalogFollowUpSheet.getLastRow() + 1;

        var companyInfoTarget = catalogFollowUpSheet.getRange(targetRow, 4);
        var emailTarget = catalogFollowUpSheet.getRange(targetRow, 8);
        var phoneTarget = catalogFollowUpSheet.getRange(targetRow, 9);

        sheet.getRange(row, 1, 1, 4).moveTo(companyInfoTarget); //Company info
        sheet.getRange(row, 5).moveTo(emailTarget); //Email info
        sheet.getRange(row, 12).moveTo(phoneTarget); //Phone mumber info

        catalogFollowUpSheet.getRange(targetRow, 3).setValue("0");

        sheet.deleteRow(row);
      }
    }
  }
}
