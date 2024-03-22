function createRecap() {
  let ss = SpreadsheetApp.getActiveSpreadsheet();

  let poData = getPOData();
  let po = poData["po"];
  let startDate = poData["startDate"];
  let cancelDate = poData["cancelDate"];

  let skuData = getSkuData("POST PO HERE");

  let templateSheet = ss.getSheetByName("Recap Template");
  ss.insertSheet(po + "-RECAP", 0, { template: templateSheet });
  let sheet = ss.getActiveSheet();

  // set PO
  let poCell = sheet.getRange("B3");
  poCell.setValue(po);

  // set start
  let startCell = sheet.getRange("D3");
  startCell.setValue(startDate);

  // set start
  let cancelCell = sheet.getRange("D4");
  cancelCell.setValue(cancelDate);

  // set sku data
  skuData.forEach(logSkuData);
  sortRange();
}

function logSkuData(value, key, map) {
  let ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getActiveSheet();
  let range = sheet.getDataRange();
  let lastRow = range.getLastRow() + 1;

  let skuCell = sheet.getRange(lastRow, 1);
  skuCell.setValue(value.sku);

  let colorCell = sheet.getRange(lastRow, 2);
  colorCell.setValue(value.color);

  let upcCell = sheet.getRange(lastRow, 3);
  upcCell.setValue(key);

  let shipAmountCell = sheet.getRange(lastRow, 4);
  shipAmountCell.setValue(value.shipAmount);
}

function sortRange() {
  let ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getActiveSheet();
  let lastRow = sheet.getLastRow();
  let range = sheet.getRange(7, 1, lastRow, 4);

  range.sort(1);
  highlightAltRows(lastRow);
}

function highlightAltRows(lastRow) {
  let ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getActiveSheet();

  let row = 7;

  while (row <= lastRow) {
    let range = sheet.getRange(row, 1, 1, 4);

    if (row % 2 != 0) {
      range.setBackground("#efefef");
    }

    row++;
  }
}
