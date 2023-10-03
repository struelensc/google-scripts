function clearCalendar() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var calendarId = spreadsheet.getRange("O1").getValue();
  var eventCal = CalendarApp.getCalendarById(calendarId);

  var fromDate = new Date(2000, 0, 0, 0, 0, 0);
  var toDate = new Date(3000, 0, 0, 0, 0, 0);

  var events = eventCal.getEvents(fromDate, toDate);

  for (var i = 0; i < events.length; i++) {
    var event = events[i];
    Logger.log(event.getTitle());
    event.deleteEvent();
  }
}
