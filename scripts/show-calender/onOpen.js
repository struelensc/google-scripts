function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu("Sync to Calendar")
    .addItem("Update Calendar", "updateCalendar")
    .addSeparator()
    .addSubMenu(
      ui
        .createMenu("Delete")
        .addItem("Delete events from Calendar", "clearCalendar")
    )
    .addToUi();
}
