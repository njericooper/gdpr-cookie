var accept = document.getElementById("cookiescript_accept");
var reject = document.getElementById("reject");
var gdprBox = document.getElementById("cookiescript_wrapper");

function setCookieGdpr(cname, cvalue, exdays) {
    var expires = "";
    if (exdays != undefined) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        expires = "expires=" + d.toUTCString();
    } else {
        expires = "expires = Fri, 31 Dec 9999 23:59:59 GMT";
    }
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

var consentCookie = {
    accept : "no";
}

function getconsentCookie() {
    var stringa = getCookieGdpr("gdprConsent");
    var consent = JSON.parse(stringa);
    return consent;
}

function getCookieGdpr(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

accept.addEventListener("click", function (event) {
    event.preventDefault();
    if (accept.click) { consentCookie.accept = "ok"; } else { consentCookie.accept = "no"; }
    setCookieGdpr("gdprConsent", JSON.stringify(consentCookie));
    gdprBox.classList.add('hide');
});

var consent = getCookieGdpr("gdprConsent");
if (consent == "") {
    gdprBox.classList.remove('hide');
    setCookieGdpr("gdprConsent", JSON.stringify(consentCookie));
}


function initGdprPopupListener() {
    var gdprPopupLink = document.getElementById('gdpr-popup-trigger');
    gdprPopupLink.addEventListener('click', function (e) {
        e.preventDefault();
        gdprBox.classList.remove('hide');
    })
}

window.addEventListener('DOMContentLoaded', initGdprPopupListener, false);