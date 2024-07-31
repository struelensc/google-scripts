function checkExpiredFollowUps() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("Awaiting order");
  var range = sheet.getDataRange();
  var lastRow = range.getLastRow();
  var accountsToFollowUp = [];
  var unseccussfulAccounts = [];

  var row = 4; // Excluding headers

  // Adding all the rows that have been checked for archival to accountsToFollowUp array.
  while (row <= lastRow) {
    var lastFollowUp = range.getCell(row, 2).getValue();
    var followUpCounter = range.getCell(row, 4).getValue();

    var today = new Date();
    var daysPassed = Math.floor((today - lastFollowUp) / 86400000);

    if (daysPassed > 14) {
      if (followUpCounter >= 4) {
        unseccussfulAccounts.push(row);
      } else {
        accountsToFollowUp.push(row);
      }
    }

    row++;
  }

  // If follow ups have aged 14 days without an order
  if (accountsToFollowUp.length > 0) {
    for (let i = 0; i < accountsToFollowUp.length; i++) {
      var row = accountsToFollowUp[i] - i;
      var catalogFollowUpSheet = ss.getSheetByName("Catalog follow up");

      var targetRow = catalogFollowUpSheet.getLastRow() + 1;

      var target = catalogFollowUpSheet.getRange(targetRow, 3);

      sheet.getRange(row, 2, 1, 9).copyTo(target);

      catalogFollowUpSheet.getRange(targetRow, 3).clearFormat();

      sheet.deleteRow(row);
    }

    fixConditionalFormatting();
  }

  if (unseccussfulAccounts.length > 0) {
    var unseccuessfulSheet = ss.getSheetByName("Unsucessful");

    for (let i = 0; i < unseccussfulAccounts.length; i++) {
      var row = unseccussfulAccounts[i] - i - accountsToFollowUp.length;

      var targetRow = unseccuessfulSheet.getLastRow() + 1;

      var target = unseccuessfulSheet.getRange(targetRow, 1);

      sheet.getRange(row, 2, 1, 9).copyTo(target);

      unseccuessfulSheet.getRange(targetRow, 1, 1, 9).clearFormat();

      sheet.deleteRow(row);
    }
  }
}
