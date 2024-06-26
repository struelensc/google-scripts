function createBoxMaking() {
  let ss = SpreadsheetApp.getActiveSpreadsheet();

  // get po data
  let poData = getPOData();
  let po = poData["po"];
  let startDate = poData["startDate"];
  let cancelDate = poData["cancelDate"];

  // get sku data
  let storeData = getStoreData("POST ASN HERE");

  let templateSheet = ss.getSheetByName("Box Making Template");
  ss.insertSheet(po + "-BOXMAKING", 0, { template: templateSheet });
  let sheet = ss.getActiveSheet();

  // set PO
  let poCell = sheet.getRange("B3");
  poCell.setValue(po);

  // set start
  let startCell = sheet.getRange("B4");
  startCell.setValue(startDate);

  // set start
  let cancelCell = sheet.getRange("B5");
  cancelCell.setValue(cancelDate);

  // set store data
  storeData.forEach(logStoreData);

  sortRange(8, 3);
  highlightAltRows(8, 3);
}

function logStoreData(value, key, map) {
  let ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getActiveSheet();
  let range = sheet.getDataRange();
  let lastRow = range.getLastRow() + 1;

  let storeCell = sheet.getRange(lastRow, 1);
  storeCell.setValue(key);

  let totalQtyCell = sheet.getRange(lastRow, 2);
  totalQtyCell.setValue(value.totalQty);

  let tubeQtyCell = sheet.getRange(lastRow, 3);
  if (value.tubeQty == 0) {
    tubeQtyCell.setValue("-");
  } else {
    tubeQtyCell.setValue(value.tubeQty);
  }
}
