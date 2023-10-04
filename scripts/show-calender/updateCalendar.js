function updateCalendar() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getActiveSheet();
  var range = sheet.getDataRange();
  var calendarId = spreadsheet.getRange("O1").getValue();
  var eventCal = CalendarApp.getCalendarById(calendarId);

  var eventsToSchedule = [];

  var lastRow = range.getLastRow();
  var currentRow = 4; // Excluding headers

  // Data columns - change if column order changes
  var eventNameCol = 2;
  var startDateCol = 4;
  var endDateCol = 5;

  // Add all the rows that have a name and date range.
  while (currentRow <= lastRow) {
    let event = {};

    var nameValue = range.getCell(currentRow, eventNameCol).getValue();
    var startDateValue = range.getCell(currentRow, startDateCol).getValue();
    var endDateValue = range.getCell(currentRow, endDateCol).getValue();

    if (nameValue != "" && startDateValue != "") {
      event.name = nameValue;
      event.start = startDateValue;
    }

    if (endDateValue != "" && endDateValue > startDateValue) {
      event.end = endDateValue;
    }

    if (Object.keys(event).length != 0) {
      eventsToSchedule.push(event);
    }

    currentRow++;
  }

  // Create events in Google Calendar
  for (let i = 0; i < eventsToSchedule.length; i++) {
    const eventDetails = eventsToSchedule[i];

    var event = eventCal.createAllDayEvent(
      eventDetails.name,
      eventDetails.start,
      eventDetails.end
    );

    Logger.log("Event ID: " + event.getId());
  }
}
