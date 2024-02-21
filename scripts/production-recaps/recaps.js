function getSKUData() {
  let ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getActiveSheet();
  let range = sheet.getDataRange();
  let lastRow = range.getLastRow();

  let row = 2; //Excluding header

  let skuData = new Map();
  let po = range.getCell(2, 1).getValue().split("-")[0];
  let startDate = range.getCell(2, 8).getValue();
  let cancelDate = range.getCell(2, 9).getValue();

  while (row <= lastRow) {
    let upc = range.getCell(row, 18).getValue();

    if (upc == "") {
      row++;
      continue;
    }

    let sku = range.getCell(row, 19).getValue();
    let color = range.getCell(row, 22).getValue();
    let shipAmount = range.getCell(row, 29).getValue();

    if (skuData.has(upc) == false) {
      skuData.set(upc, { sku: sku, color: color, shipAmount: shipAmount });
    } else {
      let newAmount = skuData.get(upc).shipAmount + shipAmount;
      skuData.set(upc, { sku: sku, color: color, shipAmount: newAmount });
    }

    row++;
  }

  createRecap(skuData, po, startDate, cancelDate);
}

function createRecap(skuData, po, startDate, cancelDate) {
  let ss = SpreadsheetApp.getActiveSpreadsheet();
  let templateSheet = ss.getSheetByName("Recap Template");
  ss.insertSheet(po, { template: templateSheet });
  let sheet = ss.getActiveSheet();

  // set PO
  let poCell = sheet.getRange("B3");
  poCell.setValue(po);

  // set start and cancel
  let startCell = sheet.getRange("D3");
  startCell.setValue(startDate);

  let cancelCell = sheet.getRange("D4");
  cancelCell.setValue(cancelDate);

  // set sku data

  skuData.forEach(logSkuData);
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

  sortRange();
}

function sortRange() {
  let ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getActiveSheet();
  let lastRow = sheet.getLastRow();
  let range = sheet.getRange(7, 1, lastRow, 4);

  range.sort(1);
}
