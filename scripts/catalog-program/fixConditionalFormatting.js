function fixConditionalFormatting() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var catalogFollowUpSheet = ss.getSheetByName("Catalog follow up");

  catalogFollowUpSheet.clearConditionalFormatRules();

  var followUpCells = catalogFollowUpSheet.getRange("A:B");
  var catalogDateCol = catalogFollowUpSheet.getRange("F:F");
  var lastFollowUpDate = catalogFollowUpSheet.getRange("C:C");

  var highlightCatalogDateRule = SpreadsheetApp.newConditionalFormatRule()
    .whenFormulaSatisfied('=AND($F1<>"",$C1="",$F1<TODAY()-7)')
    .setBackground("#f4c7c3")
    .setRanges([followUpCells, catalogDateCol])
    .build();

  var highlightFollowUpDateRule = SpreadsheetApp.newConditionalFormatRule()
    .whenFormulaSatisfied('=AND($C1<>"",$C1<TODAY()-14)')
    .setBackground("#f4c7c3")
    .setRanges([followUpCells, lastFollowUpDate])
    .build();

  catalogFollowUpSheet.setConditionalFormatRules([
    highlightCatalogDateRule,
    highlightFollowUpDateRule,
  ]);
}
