function getStoreData(sheetName) {
  let ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(sheetName);
  let range = sheet.getDataRange();
  let lastRow = range.getLastRow();

  let row = 2; //Excluding header

  let storeData = new Map();

  while (row <= lastRow) {
    let store = range.getCell(row, 17).getValue();
    let sku = range.getCell(row, 21).getValue();
    let qty = range.getCell(row, 27).getValue();

    const tubeQuantityToAdd = sku == "LI4563" ? qty : 0;

    if (storeData.has(store) == false) {
      storeData.set(store, { totalQty: qty, tubeQty: tubeQuantityToAdd });
    } else {
      let newtubeQty = storeData.get(store).tubeQty + tubeQuantityToAdd;
      let newTotalQty = storeData.get(store).totalQty + qty;

      storeData.set(store, { totalQty: newTotalQty, tubeQty: newtubeQty });
    }

    row++;
  }

  return storeData;
}
