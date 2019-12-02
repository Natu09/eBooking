var newEvent;
var editEvent;

$(document).ready(async function () {

  console.log(AUTH_URL);

  console.log(window.location.search)
  const userId = parseInt(getUrlParameter('id'))
  console.log(userId)


  // Gets all the doctors available for booking
  let $doc_ops = $('#docList')
  getAllDoc(userId)
    .then(results => {
      $.each(results, (i, item) => {
        console.log(item)
        let doc_name = `${item.fname} ${item.lname}`
        let input_ops = '<input class=\'filter\' type="checkbox" value="' + `${item.userid}` + '" checked>' + doc_name
        let $label_ops = $('<label class="checkbox-inline"></label>').html(input_ops)
        $doc_ops.append($label_ops)
      })
    })
    .catch(err => handleError(err))


  var calendar = $('#calendar').fullCalendar({

    eventRender: function (event, element, view) {

      var startTimeEventInfo = moment(event.start).format('HH:mm');
      var endTimeEventInfo = moment(event.end).format('HH:mm');
      var displayEventDate = startTimeEventInfo + " - " + endTimeEventInfo;;

      element.popover({
        title: '<div class="popoverTitleCalendar" style="background-color:' + event.backgroundColor + '; color:' + event.textColor + '">' + event.title + '</div>',
        content: '<div class="popoverInfoCalendar">' +
          '<p><strong>Doctor:</strong> ' + event.doc_id + '</p>' +
          '<p><strong>Event Time:</strong> ' + displayEventDate + '</p>' +
          '</div>',
        delay: {
          show: "800",
          hide: "50"
        },
        trigger: 'hover',
        placement: 'top',
        html: true,
        container: 'body'
      });

      if (event.type == "available") {
        element.css('background-color', '#ff6666');
      }
      if (event.type == "booked") {
        element.css('background-color', '#228B22');
      }

      var show_type = true, show_calendar = true;

      // var username = $('input:checkbox.filter:checked').map(function () {
      //   return $(this).val();
      // }).get();

      var types = $('#type_filter').val();
      var calendars = $('#calendar_filter').val();

      // show_username = username.indexOf(event.username) >= 0;

      if (types && types.length > 0) {
        if (types[0] == "all") {
          show_type = true;
        } else {
          show_type = types.indexOf(event.type) >= 0;
        }
      }

      if (calendars && calendars.length > 0) {
        if (calendars[0] == "all") {
          show_calendar = true;
        } else {
          show_calendar = calendars.indexOf(event.calendar) >= 0;
        }
      }

      return show_type && show_calendar;

    },
    customButtons: {
      printButton: {
        icon: 'print',
        click: function () {
          window.print();
        }
      }
    },
    header: {
      left: 'today, prevYear, nextYear, printButton',
      center: 'prev, title, next',
      right: 'month,agendaWeek,agendaDay,listWeek'
    },
    views: {
      month: {
        columnFormat: 'dddd'
      },
      agendaWeek: {
        columnFormat: 'ddd D/M',
        eventLimit: false
      },
      agendaDay: {
        columnFormat: 'dddd',
        eventLimit: false
      },
      listWeek: {
        columnFormat: ''
      }
    },

    loading: function (bool) {
      //alert('events are being rendered');
    },
    eventAfterAllRender: function (view) {
      if (view.name == "month") {
        $(".fc-content").css('height', 'auto');
      }
    },
    eventLimitClick: function (cellInfo, event) {


    },
    eventResize: function (event, delta, revertFunc, jsEvent, ui, view) {
      $('.popover.fade.top').remove();
    },
    eventDragStart: function (event, jsEvent, ui, view) {
      var draggedEventIsAllDay;
      draggedEventIsAllDay = event.allDay;
    },
    eventDrop: function (event, delta, revertFunc, jsEvent, ui, view) {
      $('.popover.fade.top').remove();
    },
    unselect: function (jsEvent, view) {
      //$(".dropNewEvent").hide();
    },
    dayClick: function (startDate, jsEvent, view) {

      // var today = moment();
      // var startDate;

      // if (view.name == "month") {

      //   startDate.set({ hours: today.hours(), minute: today.minutes() });
      //   alert('Clicked on: ' + startDate.format());

      // }

    },
    select: function (startDate, endDate, jsEvent, view) {

      var today = moment();
      var startDate;
      var endDate;

      if (view.name == "month") {
        startDate.set({ hours: today.hours(), minute: today.minutes() });
        startDate = moment(startDate).format('ddd DD MMM YYYY HH:mm');
        endDate = moment(endDate).subtract('days', 1);
        endDate.set({ hours: today.hours() + 1, minute: today.minutes() });
        endDate = moment(endDate).format('ddd DD MMM YYYY HH:mm');
      } else {
        startDate = moment(startDate).format('ddd DD MMM YYYY HH:mm');
        endDate = moment(endDate).format('ddd DD MMM YYYY HH:mm');
      }

      var $contextMenu = $("#contextMenu");

      var HTMLContent = '<ul class="dropdown-menu dropNewEvent" role="menu" aria-labelledby="dropdownMenu" style="display:block;position:static;margin-bottom:5px;">' +
        '<li onclick=\'newEvent("' + startDate + '","' + endDate + '","' + "Appointment" + '")\'> <a tabindex="-1" href="#">Add Appointment</a></li>' +
        '<li onclick=\'newEvent("' + startDate + '","' + endDate + '","' + "Check-in" + '")\'> <a tabindex="-1" href="#">Add Check-In</a></li>' +
        '<li onclick=\'newEvent("' + startDate + '","' + endDate + '","' + "Checkout" + '")\'> <a tabindex="-1" href="#">Add Checkout</a></li>' +
        '<li onclick=\'newEvent("' + startDate + '","' + endDate + '","' + "Inventory" + '")\'> <a tabindex="-1" href="#">Add Inventory</a></li>' +
        '<li onclick=\'newEvent("' + startDate + '","' + endDate + '","' + "Valuation" + '")\'> <a tabindex="-1" href="#">Add Valuation</a></li>' +
        '<li onclick=\'newEvent("' + startDate + '","' + endDate + '","' + "Viewing" + '")\'> <a tabindex="-1" href="#">Add Viewing</a></li>' +
        '<li class="divider"></li>' +
        '<li><a tabindex="-1" href="#">Close</a></li>' +
        '</ul>';


      // $(".fc-body").unbind('click');
      // $(".fc-body").on('click', 'td', function (e) {

      //   document.getElementById('contextMenu').innerHTML = (HTMLContent);

      //   $contextMenu.addClass("contextOpened");
      //   $contextMenu.css({
      //     display: "block",
      //     left: e.pageX,
      //     top: e.pageY
      //   });
      //   return false;

      // });

      $contextMenu.on("click", "a", function (e) {
        e.preventDefault();
        $contextMenu.removeClass("contextOpened");
        $contextMenu.hide();
      });

      $('body').on('click', function () {
        $contextMenu.hide();
        $contextMenu.removeClass("contextOpened");
      });

      //newEvent(startDate, endDate);

    },
    eventClick: function (event, jsEvent, view) {
      if (event.type == "Available") {
        bookEvent(event)
      } else {
        editEvent(event);
      }


    },
    // eventOverlap: false,
    locale: 'en-GB',
    timezone: "local",
    nextDayThreshold: "09:00:00",
    allDaySlot: true,
    displayEventTime: true,
    displayEventEnd: true,
    firstDay: 1,
    weekNumbers: false,
    selectable: true,
    weekNumberCalculation: "ISO",
    eventLimit: true,
    eventLimitClick: 'week', //popover
    navLinks: true,
    defaultDate: Date.now(),      // Change later
    timeFormat: 'HH:mm',
    defaultTimedEventDuration: '01:00:00',
    editable: true,
    minTime: '07:00:00',
    maxTime: '20:00:00',
    slotLabelFormat: 'HH:mm',
    weekends: true,
    nowIndicator: true,
    dayPopoverFormat: 'dddd DD/MM',
    longPressDelay: 0,
    eventLongPressDelay: 0,
    selectLongPressDelay: 0,

    events: await getAllAvailableApt(userId)



  });

  $('.filter').on('change', function () {
    $('#calendar').fullCalendar('rerenderEvents');
  });

  $("#type_filter").select2({
    placeholder: "Filter Types",
    allowClear: true
  });

  $("#calendar_filter").select2({
    placeholder: "Filter Calendars",
    allowClear: true
  });

  $("#starts-at, #ends-at").datetimepicker({
    format: 'ddd DD MMM YYYY HH:mm'
  });

  //var minDate = moment().subtract(0, 'days').millisecond(0).second(0).minute(0).hour(0);

  $(" #editStartDate, #editEndDate").datetimepicker({
    format: 'ddd DD MMM YYYY HH:mm'
    //minDate: minDate
  });

  //CREATE NEW EVENT CALENDAR

  newEvent = function (start, end, eventType) {

    var colorEventyType;

    if (eventType == "Appointment") {
      colorEventyType = "colorAppointment";
    }
    else if (eventType == "Check-in") {
      colorEventyType = "colorCheck-in";
    }
    else if (eventType == "Checkout") {
      colorEventyType = "colorCheckout";
    }
    else if (eventType == "Inventory") {
      colorEventyType = "colorInventory";
    }
    else if (eventType == "Valuation") {
      colorEventyType = "colorValuation";
    }
    else if (eventType == "Viewing") {
      colorEventyType = "colorViewing";
    }

    $("#contextMenu").hide();
    $('.eventType').text(eventType);
    $('input#title').val("");
    $('#starts-at').val(start);
    $('#ends-at').val(end);
    $('#newEventModal').modal('show');

    var statusAllDay;
    var endDay;

    $('.allDayNewEvent').on('change', function () {

      if ($(this).is(':checked')) {
        statusAllDay = true;
        var endDay = $('#ends-at').prop('disabled', true);
      } else {
        statusAllDay = false;
        var endDay = $('#ends-at').prop('disabled', false);
      }
    });


    $('#save-event').unbind();
    $('#save-event').on('click', function () {
      var title = $('input#title').val();
      var startDay = $('#starts-at').val();
      if (!$(".allDayNewEvent").is(':checked')) {
        var endDay = $('#ends-at').val();
      }
      var calendar = $('#calendar-type').val();
      var description = $('#add-event-desc').val();
      var type = eventType;
      if (title) {
        var eventData = {
          _id: eventId,
          title: title,
          start: startDay,
          end: endDay,
          description: description,
          type: type,
          calendar: calendar,
          className: colorEventyType,
          username: 'Caio Vitorelli',
          backgroundColor: '#1756ff',
          textColor: '#ffffff',
          allDay: statusAllDay
        };
        $("#calendar").fullCalendar('renderEvent', eventData, true);
        $('#newEventModal').find('input, textarea').val('');
        $('#newEventModal').find('input:checkbox').prop('checked', false);
        $('#ends-at').prop('disabled', false);
        $('#newEventModal').modal('hide');
      }
      else {
        alert("Title can't be blank. Please try again.")
      }
    });
  }

  bookEvent = function (event, element, view) {
    let start = new Date(event.start);
    let startTime = start.toUTCString();

    let end = new Date(event.end);
    let endTime = end.toUTCString()


    $('#bookAppointment').modal('show')
    $('#docId').text(event.doc_id);
    $('#startTime').text(start);
    $('#endTime').text(endTime);

  }




  //<ul style="list-style-type:circle;">
  //<li><b>Coffee</b>: meh</li>
  //<li>Tea</li>
  //<li>Milk</li>
  //</ul>

  // console.log(item)
  // let doc_name = `${item.fname} ${item.lname}`
  // let input_ops = '<input class=\'filter\' type="checkbox" value="' + `${item.userid}` + '" checked>' + doc_name
  // let $label_ops = $('<label class="checkbox-inline"></label>').html(input_ops)
  // $doc_ops.append($label_ops)

  //EDIT EVENT CALENDAR

  editEvent = function (event, element, view) {

    $('.popover.fade.top').remove();
    $(element).popover("hide");

    //$(".dropdown").hide().css("visibility", "hidden");

    if (event.allDay == true) {
      $('#editEventModal').find('#editEndDate').attr("disabled", true);
      $('#editEventModal').find('#editEndDate').val("");
      $(".allDayEdit").prop('checked', true);
    } else {
      $('#editEventModal').find('#editEndDate').attr("disabled", false);
      $('#editEventModal').find('#editEndDate').val(event.end.format('ddd DD MMM YYYY HH:mm'));
      $(".allDayEdit").prop('checked', false);
    }

    $('.allDayEdit').on('change', function () {

      if ($(this).is(':checked')) {
        $('#editEventModal').find('#editEndDate').attr("disabled", true);
        $('#editEventModal').find('#editEndDate').val("");
        $(".allDayEdit").prop('checked', true);
      } else {
        $('#editEventModal').find('#editEndDate').attr("disabled", false);
        $(".allDayEdit").prop('checked', false);
      }
    });

    $('#editTitle').val(event.title);
    $('#editStartDate').val(event.start.format('ddd DD MMM YYYY HH:mm'));
    $('#edit-calendar-type').val(event.calendar);
    $('#edit-event-desc').val(event.description);
    $('.eventName').text(event.title);
    $('#editEventModal').modal('show');
    $('#updateEvent').unbind();
    $('#updateEvent').on('click', function () {
      var statusAllDay;
      if ($(".allDayEdit").is(':checked')) {
        statusAllDay = true;
      } else {
        statusAllDay = false;
      }
      var title = $('input#editTitle').val();
      var startDate = $('input#editStartDate').val();
      var endDate = $('input#editEndDate').val();
      var calendar = $('#edit-calendar-type').val();
      var description = $('#edit-event-desc').val();
      $('#editEventModal').modal('hide');
      var eventData;
      if (title) {
        event.title = title
        event.start = startDate
        event.end = endDate
        event.calendar = calendar
        event.description = description
        event.allDay = statusAllDay
        $("#calendar").fullCalendar('updateEvent', event);
      } else {
        alert("Title can't be blank. Please try again.")
      }
    });

    $('#deleteEvent').on('click', function () {
      $('#deleteEvent').unbind();
      if (event._id.includes("_fc")) {
        $("#calendar").fullCalendar('removeEvents', [event._id]);
      } else {
        $("#calendar").fullCalendar('removeEvents', [event._id]);
      }
      $('#editEventModal').modal('hide');
    });
  }


  //SET DEFAULT VIEW CALENDAR

  var defaultCalendarView = $("#calendar_view").val();

  if (defaultCalendarView == 'month') {
    $('#calendar').fullCalendar('changeView', 'month');
  } else if (defaultCalendarView == 'agendaWeek') {
    $('#calendar').fullCalendar('changeView', 'agendaWeek');
  } else if (defaultCalendarView == 'agendaDay') {
    $('#calendar').fullCalendar('changeView', 'agendaDay');
  } else if (defaultCalendarView == 'listWeek') {
    $('#calendar').fullCalendar('changeView', 'listWeek');
  }

  $('#calendar_view').on('change', function () {

    var defaultCalendarView = $("#calendar_view").val();
    $('#calendar').fullCalendar('changeView', defaultCalendarView);

  });

  var activeInactiveWeekends = false;
  checkCalendarWeekends();

  $('.showHideWeekend').on('change', function () {
    checkCalendarWeekends();
  });

  function checkCalendarWeekends() {

    if ($('.showHideWeekend').is(':checked')) {
      activeInactiveWeekends = true;
      $('#calendar').fullCalendar('option', {
        weekends: activeInactiveWeekends
      });
    } else {
      activeInactiveWeekends = false;
      $('#calendar').fullCalendar('option', {
        weekends: activeInactiveWeekends
      });
    }

  }

});

// Query function to retrieve all doctors
function getAllDoc(id) {
  return $.get(`${AUTH_URL}/user/${id}/doc`)           // Need to change this
}

function getAllAvailableApt(id) {
  return $.get(`${AUTH_URL}/user/${id}/availabilities`)      // Need to change this
}


function handleError(error) {
  console.log(error)
  window.location = '/index.html'
}

function getUrlParameter(name) {
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  let regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
  let results = regex.exec(location.search);
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};