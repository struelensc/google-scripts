function sortRange(topRow, lastColumn) {
  let ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getActiveSheet();
  let lastRow = sheet.getLastRow();
  let range = sheet.getRange(topRow, 1, lastRow, lastColumn);

  range.sort(1);
}

function highlightAltRows(topRow, lastColumn) {
  let ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getActiveSheet();
  let range = sheet.getDataRange();
  let lastRow = range.getLastRow() + 1;

  let row = topRow;

  while (row <= lastRow - 1) {
    let range = sheet.getRange(row, 1, 1, lastColumn);

    if (row % 2 != 0) {
      range.setBackground("#efefef");
    }

    row++;
  }
}
