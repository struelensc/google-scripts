function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu("Recap Options")
    .addItem("Create Recap", "getSKUData")
    .addToUi();
}
