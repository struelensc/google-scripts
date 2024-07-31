function getSkuData(sheetName) {
  let ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(sheetName);
  let range = sheet.getDataRange();
  let lastRow = range.getLastRow();

  let row = 2; //Excluding header

  let skuData = new Map();

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

  return skuData;
}
