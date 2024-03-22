function boxMaking() {
  let ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getActiveSheet();
  let range = sheet.getDataRange();

  // get po data
  let poData = getPOData();

  // get sku data
  let storeData = getStoreData("POST ASN HERE");
}
