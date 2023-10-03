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
    let event = {};

    var nameValue = range.getCell(r, 2).getValue();
    var startDateValue = range.getCell(r, 4).getValue();
    var endDateValue = range.getCell(r, 5).getValue();

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

    r++;
  }

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
