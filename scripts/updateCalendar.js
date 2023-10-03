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

function clearCalendar() {}

function updateCalendar() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getActiveSheet();
  var range = sheet.getDataRange();
  var calendarId = spreadsheet.getRange("O1").getValue();
  var eventCal = CalendarApp.getCalendarById(calendarId);

  var eventsToSchedule = [];

  var lastRow = range.getLastRow();
  var r = 4; // Excluding headers

  // Adding all the rows that have a name and date range.
  while (r <= lastRow) {
    var event = [];

    var nameValue = range.getCell(r, 2).getValue();
    var startDateValue = range.getCell(r, 4).getValue();
    var endDateValue = range.getCell(r, 5).getValue();

    if (nameValue != "" && startDateValue != "") {
      event.push(nameValue);
      event.push(startDateValue);
    }

    if (endDateValue != "") {
      event.push(endDateValue);
    }

    if (event.length) {
      eventsToSchedule.push(event);
    }

    r++;
  }

  Logger.log(eventsToSchedule);
}
