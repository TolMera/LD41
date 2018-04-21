// Code From:  https://www.w3schools.com/js/js_cookies.asp

/**
 * SetCookie creates a cookie with name, value and time to expire in seconds
 * @param {String} cname 
 * @param {String} cvalue 
 * @param {Number} seconds 
 * @return {String}
 */
function setCookie(cname, cvalue, seconds) {
    var date = new Date();
    date.setTime(date.getTime() + (seconds * 1000));
    var expires = "expires=" + date.toUTCString();
	var cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    document.cookie = cookie;
	return cookie;
}

/**
 * getCookie get's a cookie by name
 * 
 * @param {String} cname 
 * @returns 
 */
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return false;
}

/**
 * Remove Cookie (set expiry time to passed
 * 
 * @param {String} cname
 * @return {String}
 */
function delCookie(cname) {
	return setCookie(cname, '', -1);
}