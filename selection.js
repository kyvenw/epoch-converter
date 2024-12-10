$(document).ready(function () {
  $('body').append('<div id="ec-bubble"><pre id="ec-bubble-text"></pre></div>');

  $(document).click(function () {
    hideBubble();
  });

  $('#ec-bubble').click(function (event) {
    event.stopPropagation();
  });

  $(document).dblclick(function (e) {
    processSelection(e);
  });

  $(document).bind('mouseup', function (e) {
    processSelection(e);
  });

});

function processSelection(e) {
  let text = getSelectedText();

  if ($.isNumeric(text) && [10, 13].includes(text.length)) {
    if (text.length == 13) {  // Handle millisecond timestamps
      text = text / 1000;
    }
    var date = timestampToDate(text);
    showBubble(e, getLocalString(date), getPTLocalString(date), getUTCString(date));
  }
}

function getSelectedText() {
  var text = "";

  if (window.getSelection) {
    text = window.getSelection().toString();
  } else if (document.selection && document.selection.type !== 'Control') {
    text = document.selection.createRange().text;
  }

  return text;
}

const LOCAL_FORMATTER = Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZoneName: 'longOffset',
})

const LA_FORMATTER = Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Los_Angeles',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZoneName: 'longOffset',
})

const UTC_FORMATTER = Intl.DateTimeFormat('en-US', {
    timeZone: 'GMT',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZoneName: 'longOffset',
})

function timestampToDate(ts) {
  ts = ts.length === 13 ? parseInt(ts) : ts * 1000;
  return new Date(ts);
}

function getLocalString(date) {
  return LOCAL_FORMATTER.format(date)
}

function getPTLocalString(date) {
  return LA_FORMATTER.format(date)
}

function getUTCString(date) {
  return UTC_FORMATTER.format(date)
}

function pad(v) {
  return v.toString().padStart(2, '0')
}

function showBubble(e, localDateStr, ptDateStr, utcDateStr) {
  $('#ec-bubble').css('top', e.pageY + 20 + "px");
  $('#ec-bubble').css('left', e.pageX - 85 + "px");
  $('#ec-bubble-text').html(localDateStr + '<br/>' + ptDateStr + '<br/>' + utcDateStr);
  $('#ec-bubble').css('visibility', 'visible');
}

function hideBubble() {
  $('#ec-bubble').css('visibility', 'hidden');
  $('#ec-bubble-text').html('');
}
