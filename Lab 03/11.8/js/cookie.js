function getCookie(name) {
  var cookieArr = document.cookie.split(";");

  for (var i = 0; i < cookieArr.length; i++) {
    var cookiePair = cookieArr[i].split("=");

    if (name == cookiePair[0].trim()) {
      return decodeURIComponent(cookiePair[1]);
    }
  }
  return null;
}

// ADD BLOG
function addBlog() {
  var data = document.myform.textarea.value;
  if (data == "") {
    return false;
  } else {
    var oldCookie = null; //reset the cookie
    var cookieValue = "";
    if (oldCookie != null) {
      cookieValue = encodeURIComponent(oldCookie + " " + data);
    } else {
      cookieValue = encodeURIComponent(data);
    }
    var maxAge = "; max-age=" + 1 * 24 * 60 * 60 + ";";
    document.cookie = "cookie=" + cookieValue + maxAge;
    document.myform.textarea.value = "";
  }
}

//RETRIEVE BLOG FROM COOKIE
function loadCookie() {
  var allCookie = getCookie("cookie");
  let start = 0;
  let stop = allCookie.length;
  let i = 0;
  while (true) {
    for (i = start; i < stop; i++) {
      if (allCookie[i] == " ") break;
    }

    var tmpCookie = allCookie.substring(start, i);
    document.writeln(tmpCookie);
    start = i + 1;
    if (start >= stop) break;
  }
}

//REFRESH THE PAGE
function refreshPage() {
    window.parent.location = window.parent.location.href;
}
