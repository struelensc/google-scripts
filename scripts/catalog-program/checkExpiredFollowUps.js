function checkExpiredFollowUps() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("Awaiting order");
  var range = sheet.getDataRange();
  var lastRow = range.getLastRow();
  var rowsToMove = [];

  var r = 4; // Excluding headers

  // Adding all the rows that have been checked for archival to rowsToMove array.
  while (r <= lastRow) {
    var cellValue = range.getCell(r, 2).getValue();
    var today = new Date();
    var lastFollowUp = Math.floor((today - cellValue) / 86400000);

    if (lastFollowUp > 14) {
      rowsToMove.push(r);
    }

    r++;
  }

  // If follow ups have aged 14 days without an order
  if (rowsToMove.length > 0) {
    for (let i = 0; i < rowsToMove.length; i++) {
      var row = rowsToMove[i] - i;
      var catalogFollowUpSheet = ss.getSheetByName("Catalog follow up");

      var targetRow = catalogFollowUpSheet.getLastRow() + 1;

      var target = catalogFollowUpSheet.getRange(targetRow, 3);

      sheet.getRange(row, 2, 1, 9).copyTo(target);

      catalogFollowUpSheet.getRange(targetRow, 3).clearFormat();

      sheet.deleteRow(row);
    }

    fixConditionalFormatting();
  }
}
