function createBoxMaking() {
  let ss = SpreadsheetApp.getActiveSpreadsheet();
  let asnSheet = ss.getSheetByName("POST ASN HERE");
  let asnDataRange = asnSheet.getDataRange();

  let poSheet = ss.getSheetByName("POST PO HERE");
  let poDataRange = poSheet.getDataRange();

  let po = poDataRange.getCell(2, 1).getValue().split("-")[0];
  let startDate = poDataRange.getCell(2, 8).getValue();
  let cancelDate = poDataRange.getCell(2, 9).getValue();

  let templateSheet = ss.getSheetByName("Box Making Template");
  ss.insertSheet("BOXMAKING", 0, { template: templateSheet });
  let boxMakingSheet = ss.getActiveSheet();

  let poCell = ss.getRange("B3");
  poCell.setValue(po);

  let startCell = ss.getRange("B4");
  startCell.setValue(startDate);

  let cancelCell = ss.getRange("B5");
  cancelCell.setValue(cancelDate);

  let range = boxMakingSheet.getRange("A7");
  let pivotTable = range.createPivotTable(asnDataRange);

  pivotTable.addRowGroup(17);

  let sum = SpreadsheetApp.PivotTableSummarizeFunction.SUM;
  pivotTable.addPivotValue(27, sum);
}
