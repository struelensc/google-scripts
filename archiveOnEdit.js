function archiveOnEdit() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getActiveSheet();
  var range = sheet.getDataRange();
  var lastRow = range.getLastRow();
  var rowsToArchive = [];

  var r = 3; // Excluding headers

  // Adding all the rows that have been checked for archival to rowsToArchive array.
  while (r <= lastRow) {
    var cellValue = range.getCell(r, 8).getValue();

    if (cellValue == true) {
      rowsToArchive.push(r);
    }

    r++;
  }

  // If array isn't empty, move data to archive spreadsheet using rows collected in array.
  if (rowsToArchive.length > 0) {
    // Prompt for user approval before moving data.
    var ui = SpreadsheetApp.getUi();
    var response = ui.alert(
      "Are you sure you want to archive the selected PO(s)?",
      ui.ButtonSet.YES_NO
    );

    // If user confirms prompt:
    if (response == ui.Button.YES) {
      for (let i = 0; i < rowsToArchive.length; i++) {
        var row = rowsToArchive[i] - i;
        var archiveSheet = ss.getSheetByName("Archive");
        var targetRow = archiveSheet.getLastRow() + 1;
        var target = archiveSheet.getRange(targetRow, 1);
        var targetSecondary = archiveSheet.getRange(targetRow, 5);
        sheet.getRange(row, 1, 1, 4).moveTo(target); //PO Info
        sheet.getRange(row, 10, 1, 2).moveTo(targetSecondary); //PO Amount
        sheet.deleteRow(row);
      }
    }
  }
}
