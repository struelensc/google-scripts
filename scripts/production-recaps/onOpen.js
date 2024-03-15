function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu("Recap Options")
    .addItem("Create Recap", "createRecap")
    .addSeparator()
    .addSubMenu(ui.createMenu("New PO").addItem("Clear current PO", "clearPO"))
    .addToUi();
}
