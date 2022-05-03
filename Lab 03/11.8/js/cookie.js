function getCookie(name) {
  let cookies = document.cookie.split(";");
  let cname = name + "=";

  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i];

    while (cookie.charAt(0) == " ") {
      cookie = cookie.substring(1);
    }

    if (cookie.indexOf(cname) == 0) {
      return decodeURIComponent(cookie.substring(cname.length, cookie.length));
    }
  }

  return null;
}

// ADD BLOG
function addBlog() {
  let data = document.myForm.textarea.value;

  if (data.trim() !== "") {
    let cookieValue = encodeURIComponent(data);
    const d = new Date();
    d.setTime(d.getTime() + 1 * 24 * 60 * 60 * 1000);
    let expires = "expires=" + d.toUTCString();

    document.cookie = "blog=" + cookieValue + ";" + expires;
    parent.leftFrame.document.body.innerText = data;
  }

  document.myForm.textarea.value = "";
}

//RETRIEVE BLOG FROM COOKIE
function loadCookie() {
  var blog = getCookie("blog");

  if (blog !== null) document.body.innerText = blog;
}
