var REK = "6NitGRUTASKAAM1kxXLJ1YSzLokPtx8XGCHj8_VV";

function validateEmail(i) {
    var a = i.indexOf("@"),
        e = i.lastIndexOf(".");
    return !(a < 1 || e < a + 2 || e + 2 >= i.length)
}

function isNumber(i) {
    var a = (i = i || window.event).which ? i.which : i.keyCode;
    return !(a > 31 && (a < 48 || a > 57))
}

function getCaptchaCode() {
    var i = (new Date).getTime(),
        a = "",
        e = "",
        t = "";
    void 0 !== jsVars.college_id && (a = "&cid=" + jsVars.college_id), void 0 !== jsVars.uniqid && ("<uniqid>" == jsVars.uniqid && (jsVars.uniqid = i + Math.floor(100 * Math.random()), $("#uniqid").length > 0 && $("#uniqid").val(jsVars.uniqid)), e = "&u=" + jsVars.uniqid), void 0 !== jsVars.widgetId && (t = "&wid=" + jsVars.widgetId), $("#CaptchaImage").attr("src", jsVars.CaptchaLink + "?" + i + a + e + t)
}
$(document).on("click", "#CaptchaRefreshBtn", function() {
    getCaptchaCode()
}), $(window).load(function() {
    getCaptchaCode()
}), $(function() {
    $("#Email,#email").length > 0 && $("#Email,#email").keyup(function() {
        var i = $(this).val();
        if (re = /[`~!#$%^&*()|+\=?;:'",<>\{\}\[\]\\\/]/gi, re.test(i)) {
            var a = i.replace(/[`~!#$%^&*()|+\=?;:'",<>\{\}\[\]\\\/]/gi, "");
            $(this).val(a)
        }
    })
});