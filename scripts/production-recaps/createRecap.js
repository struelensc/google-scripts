function createRecap() {
  let ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName("POST PO HERE");
  let dataRange = sheet.getDataRange();

  let po = dataRange.getCell(2, 1).getValue().split("-")[0];
  let startDate = dataRange.getCell(2, 8).getValue();
  let cancelDate = dataRange.getCell(2, 9).getValue();

  let templateSheet = ss.getSheetByName("Recap Template");
  ss.insertSheet(po + "-RECAP", 0, { template: templateSheet });
  let recapSheet = ss.getActiveSheet();

  let poCell = ss.getRange("B3");
  poCell.setValue(po);

  let startCell = ss.getRange("B4");
  startCell.setValue(startDate);

  let cancelCell = ss.getRange("B5");
  cancelCell.setValue(cancelDate);

  let range = recapSheet.getRange("A7");
  let pivotTable = range.createPivotTable(dataRange);

  pivotTable.addRowGroup(19);
  pivotTable.addRowGroup(22);

  let sum = SpreadsheetApp.PivotTableSummarizeFunction.SUM;
  let filterCellsNotEmpty = SpreadsheetApp.newFilterCriteria()
    .whenCellNotEmpty()
    .build();
  pivotTable.addFilter(19, filterCellsNotEmpty);
  pivotTable.addPivotValue(29, sum);
}
