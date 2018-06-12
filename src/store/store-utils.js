
export function setCookie(cname, cvalue, expiredays) {
  let d = new Date()
  d.setTime(d.getTime() + (expiredays*24*60*60*1000))
  let expires = "expires="+ d.toUTCString()
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/"
}

export function getCookie(name) {
  let arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)")
  if (arr = document.cookie.match(reg))
    return (arr[2])
  else
    return null
}

export function delCookie(name) {
  const exp = new Date();
  exp.setTime(exp.getTime() - 1);
  const cval = getCookie(name);
  if (cval != null)
    document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}

export function setSession(c_name, value) {
  window.sessionStorage.setItem(c_name, value)
}

export function getSession(name) {
  return window.sessionStorage.getItem(name)
}

export function delSession(name) {
  window.sessionStorage.removeItem(name)
}

export function deleteAllCookies() {
  let cookies = document.cookie.split(";");

  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i];
    let eqPos = cookie.indexOf("=");
    let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
  }
}

export function clearAllSession() {
  window.sessionStorage.clear()
}

export function clearAllSessionAndCookies() {
  deleteAllCookies()
  clearAllSession()
}


