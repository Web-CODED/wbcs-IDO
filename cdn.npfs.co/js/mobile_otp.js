var otpTimer, timeinterval = [];

function showOTPVerifyLink(e, t, i, o, a = "") {
    void 0 !== i && null != i && "undefined" != i || (i = ""), $("#" + t).attr("disabled", "disabled"), $("#otpverifylink_a" + i).hide(), $("#otpverifylink-text" + i).remove();
    var r = $(e).val(),
        n = !1,
        l = 10,
        d = 10,
        s = ["9", "8", "7", "6", "5", "4"],
        p = !1;
    "" == a ? ($("#country_dial_code" + i).length > 0 && "+91" !== $.trim($("#country_dial_code" + i).val()) || $("#country_dialcode" + i).length > 0 && "+91" !== $.trim($("#country_dialcode" + i).val())) && (l = 16, d = 6, s = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"], 1 == parseInt(o) && (p = !0, $("#" + t).removeAttr("disabled"), $(".hideShowOptBypass").hide())) : $("#country_dial_code" + i).length > 0 && "+91" !== $.trim($("#country_dial_code" + i).val()) || $("#country_dialcode" + i).length > 0 && "+91" !== $.trim($("#country_dialcode" + i).val()) ? (l = 16, d = 6, s = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"], (1 == parseInt(a) && 1 == parseInt(o) || 0 == parseInt(a)) && ($("#" + t).removeAttr("disabled"), 1 == parseInt(a) && 1 == parseInt(o) && (p = !0, $(".hideShowOptBypass").hide()))) : ($("#country_dial_code" + i).length > 0 && "+91" === $.trim($("#country_dial_code" + i).val()) || $("#country_dialcode" + i).length > 0 && "+91" === $.trim($("#country_dialcode" + i).val())) && 0 == parseInt(a) && $("#" + t).removeAttr("disabled"), $(e).parent().parent().find(".help-block").html(""), Math.floor(r) == r && $.isNumeric(r) && -1 == r.indexOf(".") && (r.length <= l && r.length >= d && jQuery.inArray(r.charAt(0), s) >= 0 && (n = !0), n && 0 == p && showVerifylink(i))
}

function showVerifylink(e) {
    void 0 !== e && null != e && "undefined" != e || (e = ""), $("#otpverifylink-text" + e).remove(), $("#otpresendlink" + e).hide(), $("#otpverified" + e).hide(), $("#otpunverified" + e).hide(), $("#clockdiv" + e).hide(), $("#showMObileVerified").hide(), $("#otpverifylink_a" + e).show(), $("#otpverifylink" + e).show()
}

function showOTPlink(e) {
    void 0 !== e && null != e && "undefined" != e || (e = ""), $("#otpverifylink_a" + e).hide(), $("#otpverifylink-text" + e).remove(), $("#otpresendlink" + e).hide(), $("#otpverifylink" + e).append('<span id="otpverifylink-text' + e + '">OTP Sent</span>'), $("#otpverifylink-text" + e).css({
        color: "#b8b8b8",
        "font-size": "12px;"
    }), $("#opt_data" + e).removeAttr("disabled"), $("#otpverified" + e).hide(), $("#otpunverified" + e).hide()
}

function showAfterVerified(e, t) {
    void 0 !== t && null != t && "undefined" != t || (t = ""), $("#otpresendlink" + t).hide(), $("#clockdiv" + t).hide(), $("#otpverifylink_a" + t).hide(), $("#otpunverified" + t).hide(), $("#otpverified" + t).show(), $("#opt_data" + t).attr("readonly", !0), $("#" + e).removeAttr("disabled"), sendMobileOTPVerifiedDatalayer()
}

function showAfterUnverified(e, t) {
    void 0 !== t && null != t && "undefined" != t || (t = ""), $("#otpverifylink-text" + t).remove(), $("#otpverified" + t).hide(), $("#otpverifylink_a" + t).hide(), $("#clockdiv" + t).hide(), $("#otpunverified" + t).show(), $("#otpresendlink" + t).show(), $("#" + e).attr("disabled", "disabled")
}

function sendMobileOTP(e, t, i, o = null, a = null) {
    var r = !1,
        n = "",
        l = "";
    if ($(".reg_email_div").length && (n = $(".reg_email_div input").val(), $.trim(n) ? 0 == validateEmail(n) && ($(".reg_email_div .help-block").text("Enter Correct Email Address").css({
            display: "block"
        }), r = !0) : ($(".reg_email_div .help-block").text("Enter Email Address *").css({
            display: "block"
        }), r = !0)), $(".reg_name_div").length ? l = $(".reg_name_div input").val() : $("#Name").length && (l = $("#Name").val()), r) return !1;
    var d = "Mobile";
    void 0 === t || null == t || "undefined" == t ? t = "" : d = t, void 0 !== i && null != i || (i = ""), "student_profile" == i && $("#mobileError").length && ($("#mobileError").html(""), $("#mobileError").hide());
    var s = null;
    void 0 !== a && null != a && "undefined" != a && (s = a);
    var p = void 0 !== jsVars.marketingPage && 1 == jsVars.marketingPage;
    if (!0 === p) var c = $("form#registerForm input[name='_csrfToken']").val();
    else c = $("form input[name='_csrfToken']").val();
    $("#otpverifylink-text" + t).remove(), $("#showMObileVerified").hide(), $("#otpverifylink_a" + t).hide(), $("#otpresendlink" + t).hide(), $("#otpverifylink-text" + t).remove(), $("#otpverifylink" + t).append('<span id="otpverifylink-text' + t + '">Wait...</span>'), $("#otpverifylink-text" + t).css({
        color: "#b8b8b8",
        "font-size": "12px;"
    }), $("#opt_data" + t).removeAttr("readonly");
    var u = $("#" + d).val(),
        v = 12183;
    $("#country_dial_code" + t).length && $("#country_dial_code" + t).val().length ? u = $("#country_dial_code" + t).val() + "-" + u : $("#country_dialcode" + t).length && $("#country_dialcode" + t).val().length && (u = $("#country_dialcode" + t).val() + "-" + u), $("#country_dial_code_master_idMobile").length && (v = $("#country_dial_code_master_idMobile").val());
    var f = {
            mobile: u,
            dialCodeId: v,
            college_id: e,
            module: i,
            email: n,
            name: l,
            userId: o,
            opt_digit_count: s,
            marketingPage: p
        },
        m = {
            "X-CSRF-TOKEN": c
        },
        g = (void 0 !== jsVars.marketingPage && 1 == jsVars.marketingPage ? jsVars.FULL_URL : "") + "/students/sent-mobile-otp";
    return send_ajax_request(g, "post", f, function(e) {
        e.redirect && (location = e.redirect), e.error ? (showVerifylink(t), "limit" == e.error && "csrf" != e.error && ($("#otpverifylink_a" + t).hide(), $("#otpresendlink" + t).hide(), alertErrorPopup("Oops! Maximum attempts reached. Retry in 3 hours.")), "limit" != e.error && "csrf" == e.error ? ($("#otpverifylink_a" + t).hide(), $("#otpresendlink" + t).hide(), alertErrorPopup("Please refresh the page and try again.")) : "student_profile" == i && $("#mobileError").length && ($("#mobileError").html(e.error).css("color", "red"), $("#mobileError").show()), void 0 !== e.email && $(".reg_email_div .help-block").text(e.email).css({
            display: "block"
        })) : 200 == e.success && (showOTPlink(t), countdownStart(t), $("#opt_data" + t).val(""), $(".hideShowOptBypass").show())
    }, null, null, function(e, t, i) {
        console.log(i + "\r\n" + e.statusText + "\r\n" + e.responseText)
    }, m), !1
}

function alertErrorPopup(e, t) {
    var i = "#ErrorOkBtn";
    $("#ErrorPopupArea").length ? ($("#ErrorPopupArea").find(".modal-title").html("Error"), $("#ErrorMsgBody").html(e), $(".oktick").hide(), void 0 !== t ? ($(i).show(), $("#ErrorPopupArea").modal({
        keyboard: !1
    }).one("click", i, function(e) {
        e.preventDefault(), window.location.href = t
    })) : ($("#ErrorPopupArea").appendTo("body"), $("#ErrorPopupArea").modal())) : alert(e)
}

function sendMobileOTPForEmailChange(e, t, i) {
    var o = "Mobile";
    void 0 === t || null == t || "undefined" == t ? t = "" : o = t;
    var a = $("form input[name='_csrfToken']").val(),
        r = {
            uuid: $("#uuid").val(),
            college_id: e,
            mobile: $("#" + o).val()
        },
        n = {
            "X-CSRF-Token": a
        };
    $("#ErrorPopupArea").appendTo("body");
    send_ajax_request("/students/sent-mobile-otp-change-email", "post", r, function(e) {
        e.error ? "limit" == e.error && $("#notSentError").html("you have try too many times.") : 200 == e.success ? ($("#otpverifylink_aMobile").hide(), $("#VerifyOtpEmailChange").attr("disabled", !1), $("#otpresendlink" + t).show(), void 0 !== i && "resend" == i ? $("#otpresendlink" + t).html("") : $("#otpverifylinkMobile").append('<span id="otpverifylink-text' + t + '">OTP Sent</span>')) : $("#notSentError").html("Invalid Request.")
    }, null, null, function(e, t, i) {
        console.log(i + "\r\n" + e.statusText + "\r\n" + e.responseText)
    }, n)
}

function verifyMobileOtpForEmailChange(e, t, i) {
    var o = "Mobile";
    void 0 === i || null == i || "undefined" == i ? i = "" : o = i;
    var a = $("form input[name='_csrfToken']").val(),
        r = $("#uuid").val(),
        n = $("#" + o).val(),
        l = $("#opt_data" + i).val();
    send_ajax_request("/students/verify-mobile-otp-for-change-email", "post", {
        otp_value: l,
        mobile: n,
        college_id: e,
        uuid: r
    }, function(e) {
        $("div#profile-page div.loader-block").hide(), 1 == e.status ? window.location = jsVars.postUrl : void 0 !== e.error && "csrf" != e.error ? void 0 !== e.error ? $("#notVerified").html(e.error) : $("#notVerified").html("Invalid Request") : void 0 !== e.error && "csrf" == e.error && $("#ErrorPopupArea").appendTo("body")
    }, null, null, function(e, t, i) {
        console.log(i + "\r\n" + e.statusText + "\r\n" + e.responseText), $("div#profile-page div.loader-block").hide()
    }, {
        "X-CSRF-TOKEN": a
    })
}

function verifyMobileOTP(e, t, i) {
    var o = "Mobile";
    void 0 === i || null == i || "undefined" == i ? i = "" : o = i;
    var a = $("#opt_data" + i).val(),
        r = $("#opt_data" + i).attr("maxLength");
    if (a.toString().length == r) {
        $("div#profile-page div.loader-block").show();
        var n = void 0 !== jsVars.marketingPage && 1 == jsVars.marketingPage;
        if (!0 === n) var l = $("form#registerForm input[name='_csrfToken']").val();
        else l = $("form input[name='_csrfToken']").val();
        var d = $("#" + o).val();
        $("#otpverified" + i).hide(), $("#otpunverified" + i).hide(), $("#country_dial_code" + i).length && $("#country_dial_code" + i).val().length && (d = $("#country_dial_code" + i).val() + "-" + d);
        var s = {
                otp_value: a,
                mobile: d,
                college_id: e,
                marketingPage: n
            },
            p = {
                "X-CSRF-TOKEN": l
            },
            c = (void 0 !== jsVars.marketingPage && 1 == jsVars.marketingPage ? jsVars.FULL_URL : "") + "/students/verify-mobile-otp";
        send_ajax_request(c, "post", s, function(e) {
            $("div#profile-page div.loader-block").hide(), 1 == e.status ? (void 0 !== timeinterval[i] && clearInterval(timeinterval[i]), "undefined" != typeof updateLeadMobile && updateLeadMobile(e.verified_number), showAfterVerified(t, i), $("#showMObileVerified").length > 0 && ($("#showMObileVerified").show(), $("#otpverifylinkMobile").hide())) : showAfterUnverified(t, i)
        }, null, null, function(e, t, i) {
            console.log(i + "\r\n" + e.statusText + "\r\n" + e.responseText), $("div#profile-page div.loader-block").hide()
        }, p)
    } else $("#otpverified" + i).hide()
}

function getTimeRemaining(e) {
    var t = Date.parse(e) - Date.parse(new Date),
        i = Math.floor(t / 1e3 % 60),
        o = Math.floor(t / 1e3 / 60 % 60),
        a = Math.floor(t / 36e5 % 24);
    return {
        total: t,
        days: Math.floor(t / 864e5),
        hours: a,
        minutes: o,
        seconds: i
    }
}

function resentOTPLink(e, t) {
    void 0 !== t && null != t && "undefined" != t || (t = ""), void 0 !== timeinterval[[t]] && clearInterval(timeinterval[t]);
    var i = new Date;
    i.setSeconds(i.getSeconds() + 30);
    var o = document.getElementById(e + t);
    timeinterval[t] = setInterval(function() {
        var e = getTimeRemaining(i);
        o.innerHTML = e.seconds + " seconds", e.total <= 0 && (clearInterval(timeinterval[t]), $("#otpresendlink" + t).show(), $("#clockdiv" + t).hide())
    }, 1e3)
}

function countdownStart(e) {
    void 0 !== e && null != e && "undefined" != e || (e = ""), $("#clockdiv" + e).show(), $("#clockdiv" + e).html("30 seconds"), resentOTPLink("clockdiv", e)
}

function resentforGetOTPLink(e, t) {
    void 0 !== t && null != t && "undefined" != t || (t = ""), void 0 !== timeinterval[[t]] && clearInterval(timeinterval[t]);
    var i = new Date;
    i.setSeconds(i.getSeconds() + 30);
    var o = document.getElementById(e + t);
    timeinterval[t] = setInterval(function() {
        var e = getTimeRemaining(i);
        o.innerHTML = e.seconds + " seconds", e.total <= 0 && (clearInterval(timeinterval[t]), $("#resent").show(), $("#clockdivForget").hide())
    }, 1e3)
}

function countdownStartFOrget(e) {
    $("#clockdivForget").show(), $("#clockdivForget").html("30 seconds"), resentforGetOTPLink("clockdivForget", e)
}
$("#loginOtpForm label.control-label").remove(), $("#loginOtpForm input").each(function() {
    var e = $(this).attr("id"),
        t = e;
    "otpField" == e && 1 === jsVars.enableMobileOTPLogin && 1 === jsVars.enableEMailOTPLLogin ? t = "Enter Mobile No./Email ID" : "otpField" == e && 1 === jsVars.enableMobileOTPLogin ? t = "Enter Mobile No" : "otpField" == e && 1 === jsVars.enableEMailOTPLLogin ? t = "Enter Email ID" : "otpValue" == e && (t = "Enter OTP"), $(this).attr("placeholder", t + " * "), "filter_dial_codeMobile_otp" == e && $(this).attr("placeholder", ""), void 0 !== e && -1 !== e.search("digit-") && $(this).attr("placeholder", "")
});
var otpFieldVal = "";

function loginViaOtpFunctionality() {
    $("#LoginTabContainer").hide(), $("#login_form_without_popup").hide(), $("#LoginWithOtpTabContainer").fadeIn(), $("#otpField").val(""), $("#mobileOtpDialCode").hide(), $("#helpInstruction").hide(), defaultLoginOtpForm()
}

function redirectToRegisterTab() {
    $('.nav-tabs a[href="#cfregister"]').tab("show"), $('.nav-tabs a[href="#tab1default"]').tab("show"), $("#cfregister").addClass("active in"), $("#tab1default").addClass("active in"), $("#cflogin").removeClass("active in"), $("#tab2default").removeClass("active in"), $("#LoginTabContainer").show(), $("#login_form_without_popup").show(), $("#LoginWithOtpTabContainer").hide(), $("#otpField").val(""), $("#mobileOtpDialCode").css("display", "table-cell"), $("#helpInstruction").hide(), defaultLoginOtpForm()
}
$(document).on("click", "#loginViaOtp", loginViaOtpFunctionality), $(document).on("click", "#registerTab", redirectToRegisterTab), $(document).on("keyup", "#otpField", showHideCountryCode);
var show_validation_error_msg = "";

function showHideCountryCode() {
    var e = $(this).val(),
        t = 0,
        i = 0;
    $.isNumeric(e) && 1 === jsVars.enableMobileOTPLogin ? ($("#mobileOtpDialCode").css("display", "table-cell"), $("#helpInstruction").show()) : ($("#mobileOtpDialCode").hide(), $("#helpInstruction").hide()), void 0 !== jsVars.enableMobileOTPLogin && 1 === jsVars.enableMobileOTPLogin && (show_validation_error_msg = "Please enter the correct mobile number", i = 1), void 0 !== jsVars.enableEMailOTPLLogin && 1 === jsVars.enableEMailOTPLLogin && (show_validation_error_msg = "Invalid Email", t = 1), 1 == t && 1 == i && (show_validation_error_msg = $.isNumeric(e) ? "Please enter the correct mobile number" : "Invalid Email"), e !== otpFieldVal && (otpFieldVal = e, defaultLoginOtpForm())
}

function defaultLoginOtpForm() {
    var e = $.trim($("input[name=otpField]").val());
    clearInterval(otpTimer), "" !== e ? $("#getOtpBtn").show() : ($("#getOtpBtn").hide(), $("#mobileOtpDialCode").css("display", "table-cell")), $("#otpValue").val(""), $("#getOtpBtnWait").attr("id", "getOtpBtn"), $("#getOtpBtn").html("Get OTP"), $("#otpMsgBlock").html(""), $("#otpTimer").html("");
    var t = $("form#loginOtpForm #otpField").parents("div.form-group");
    $(t).removeClass("has-error"), $(t).find("span.help-block").text("");
    t = $("form#loginOtpForm #otpValue").parents("div.form-group");
    $(t).removeClass("has-error"), $(t).find("span.help-block").text(""), $("#otpSubmitBtn").attr("disabled", !0), $(".otpValueBox").attr("readonly", !0), $("#otpMsgBlock").css("color", "#000"), $(".otpValueBox").val(""), showCountryCodeMsg()
}

function showCountryCodeMsg() {
    var e = $("#country_dial_codeMobile_otp").val();
    if (void 0 !== e) {
        var t = $("#otpField").val();
        "" === t ? $("#mobileOtpDialCode").hide() : $.isNumeric(t) && 1 === jsVars.enableMobileOTPLogin && ($("#getOtpBtn").show(), $("#mobileOtpDialCode").css("display", "table-cell"));
        var i = $("form#loginOtpForm #otpField").parents(".merge_field_div");
        "+91" !== e ? ($(i).addClass("has-error"), $(i).find("span.help-block").text(""), $(i).find("span.help-block").append('<span>Login via OTP is available only for India. Please proceed with <a class="loginViaPassword" href="javascript:void(0);">Login via Password</a></span>'), $("#otpField").attr("disabled", !0), $("#getOtpBtn").hide()) : ($(i).removeClass("has-error"), $(i).find("span.help-block").text(""), $("#otpField").attr("disabled", !1))
    }
}

function timerForOtp() {
    var e = 30;
    $("#otpTimer").text("in " + e + " Secs"), otpTimer = setInterval(function() {
        if (--e <= 0) return clearInterval(otpTimer), $("#otpMsgBlock").css("color", "#000"), $("#otpMsgBlock").html("Did not receive OTP? "), void $("#otpTimer").html("<a href='javascript:void(0);' id='resendLoginOtp'>Resend OTP</a>");
        $("#otpTimer").text("in " + e + " Secs")
    }, 1e3)
}

function disableLoginSubmitBtn() {
    var e = !0;
    $(".otpValueBox").each(function() {
        "" === $.trim($(this).val()) && (e = !1)
    }), !0 === e ? $("#otpSubmitBtn").attr("disabled", !1) : $("#otpSubmitBtn").attr("disabled", !0)
}
$('[data-toggle="tooltip"]').length && $('[data-toggle="tooltip"]').tooltip(), $(document).on("change", "#otpField", function() {
    $.trim($("input[name=otpField]").val()) !== otpFieldVal && defaultLoginOtpForm()
}), $(document).on("click", ".loginViaPassword", function() {
    $("#LoginWithOtpTabContainer").hide(), $("#LoginTabContainer").fadeIn(), $("#login_form_without_popup").fadeIn()
}), $(document).ready(function() {
    showCountryCodeMsg()
}), $(document).on("click", ".updateOtpDialCode", function() {
    setTimeout(function() {
        showCountryCodeMsg()
    }, 100)
}), $(document).on("click", "#getOtpBtn", function() {
    event.preventDefault();
    var e = $("form#loginOtpForm #otpField").parents(".merge_field_div");
    $(e).removeClass("has-error"), $(e).find("span.help-block").text("");
    var t = $.trim($("input[name=otpField]").val());
    $(".otpValueBox").attr("readonly", !0), $(".otpValueBox").val("");
    var i = !1,
        o = "",
        a = "";
    if ($.isNumeric(t) && 10 !== t.length) $(e).addClass("has-error"), $(e).find("span.help-block").text(""), $(e).find("span.help-block").append(show_validation_error_msg);
    else if ($.isNumeric(t) && 10 === t.length) i = !0, o = t, $("#inputField").val("mobile");
    else if (!$.isNumeric(t)) {
        /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i.test(t) ? (i = !0, a = t, $("#inputField").val("email")) : ($(e).addClass("has-error"), $(e).find("span.help-block").text(""), $(e).find("span.help-block").append(show_validation_error_msg))
    }
    var r = jsVars.csrfToken;
    if ("" != jsVars.csrfToken && null != jsVars.csrfToken || (r = $("form input[name='_csrfToken']").val()), !0 === i) {
        var n = $("#inputField").val(),
            l = $("#collegeId").val();
        clearInterval(otpTimer), otpFieldVal = t;
        send_ajax_request("/students/validate-and-send-otp", "post", {
            email: a,
            mobile: o,
            inputField: n,
            collegeId: l
        }, function(t) {
            0 === t.status && void 0 !== t.message && "csrf" !== t.message && (void 0 !== t.limitValidity && 1 === t.limitValidity ? ($("#otpMsgBlock").css("color", "#f54242"), $("#otpMsgBlock").html(t.message), $("#otpTimer").html(""), $("#getOtpBtn").html("Get OTP")) : ($(e).addClass("has-error"), $(e).find("span.help-block").text(""), void 0 !== t.redirectRegister && 1 === t.redirectRegister && (t.message += ' <span><a id="registerTab" href="javascript:void(0);">Click Here</a></span> to Register'), $(e).find("span.help-block").append(t.message), $("#getOtpBtn").html("Get OTP"))), void 0 !== t.status && 1 === t.status && ($("#getOtpBtn").html("OTP Sent"), $("#getOtpBtn").attr("id", "getOtpBtnWait"), $(".otpValueBox").attr("readonly", !0), $(".otpValueBox").val(""), $(".otpValueBox").first().attr("readonly", !1), $(".otpValueBox").first().focus(), $("#otpMsgBlock").html('<span id="otpMsgSpan">Resend OTP </span>'), timerForOtp())
        }, null, function() {
            $("#getOtpBtn").html("wait")
        }, function(e, t, i) {
            console.log(i + "\r\n" + e.statusText + "\r\n" + e.responseText)
        }, {
            "X-CSRF-TOKEN": r
        })
    }
}), $(document).on("click", "#resendLoginOtp", function() {
    $("#otpMsgBlock").html("");
    var e = $.trim($("input[name=otpField]").val()),
        t = !1,
        i = "",
        o = "";
    if ($.isNumeric(e) && 10 === e.length) t = !0, i = e;
    else if (!$.isNumeric(e)) {
        /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i.test(e) && (t = !0, o = e)
    }
    var a = jsVars.csrfToken;
    if ("" != jsVars.csrfToken && null != jsVars.csrfToken || (a = $("form input[name='_csrfToken']").val()), !0 === t) {
        var r = $("#inputField").val(),
            n = $("#collegeId").val();
        send_ajax_request("/students/validate-and-send-otp", "post", {
            email: o,
            mobile: i,
            inputField: r,
            collegeId: n
        }, function(e) {
            if (0 === e.status && void 0 !== e.message)
                if (void 0 !== e.limitValidity && 1 === e.limitValidity) $("#otpMsgBlock").css("color", "#f54242"), $("#otpMsgBlock").html(e.message), $("#otpTimer").html("");
                else {
                    var t = $("form#loginOtpForm #otpField").parents("div.form-group");
                    $(t).addClass("has-error"), $(t).find("span.help-block").text(""), $(t).find("span.help-block").append(e.message)
                }
            void 0 !== e.status && 1 === e.status && ($("#otpMsgBlock").css("color", "#000"), $("#otpMsgBlock").html("Resend OTP "), $(".otpValueBox").attr("readonly", !0), $(".otpValueBox").val(""), $(".otpValueBox").first().attr("readonly", !1), timerForOtp())
        }, null, null, function(e, t, i) {
            console.log(i + "\r\n" + e.statusText + "\r\n" + e.responseText)
        }, {
            "X-CSRF-TOKEN": a
        })
    }
}), $(document).on("click", "#otpSubmitBtn", function() {
    var e = !0;
    if ($(".otpValueBox").each(function() {
            if ("" === $.trim($(this).val())) return clearInterval(otpTimer), $("#otpMsgBlock").text("Incorrect OTP. "), $("#otpMsgBlock").css("color", "#f54242"), $("#otpTimer").html("<a href='javascript:void(0);' id='resendLoginOtp'>Resend OTP</a>"), e = !1, !1
        }), !0 === e) {
        var t = $("form#loginOtpForm input[name='_csrfToken']").val(),
            i = $("form#loginOtpForm").serializeArray(),
            o = {
                "X-CSRF-Token": t
            };
        send_ajax_request(jsVars.LoginWithOtpUrl, "post", i, function(e) {
            if (e.redirect) location = e.redirect;
            else if (e.error) {
                if (e.error.msg) alertPopup(e.error.msg, "error");
                else if (e.error.list)
                    for (var t in e.error.list = changesOfFullBannerLayout("loginOtpForm", e.error.list), e.error.list) {
                        if ("Email" == t) {
                            var i = $("form#loginOtpForm #otpField").parents("div.form-group");
                            $(i).addClass("has-error"), $(i).find("span.help-block").text(""), $(i).find("span.help-block").append(e.error.list[t])
                        }
                        "OtpValue" == t && (void 0 !== e.error.list[t] ? ($("#otpMsgBlock").text(e.error.list[t] + " "), $("#otpMsgBlock").css("color", "#f54242")) : ($("#otpMsgBlock").text("Incorrect OTP. "), $("#otpMsgBlock").css("color", "#f54242")), clearInterval(otpTimer), $("#otpTimer").html("<a href='javascript:void(0);' id='resendLoginOtp'>Resend OTP</a>"))
                    }
            } else 200 == e.success && (pushLoginWithOTPinDatalayer(), location = e.location)
        }, null, null, function(e, t, i) {
            console.log(i + "\r\n" + e.statusText + "\r\n" + e.responseText)
        }, o)
    }
}), $(".digit-group").find("input").each(function() {
    $(this).attr("maxlength", 1), $(this).on("keyup touchend", function(e) {
        var t = e.which;
        if (229 === t) {
            var i = this.value.toUpperCase();
            t = i.charCodeAt(i.length - 1)
        }
        var o = $($(this).parent());
        if (8 === t || 37 === t) {
            var a = o.find("input#" + $(this).data("previous"));
            $(this).attr("readonly", !0), $(".otpValueBox").first().attr("readonly", !1), a.length && $(a).select()
        } else if (t >= 48 && t <= 57 || t >= 65 && t <= 90 || t >= 96 && t <= 105 || 39 === t) {
            if ("" === $(this).val()) return;
            var r = o.find("input#" + $(this).data("next"));
            $(r).attr("readonly", !1), r.length ? $(r).select() : o.data("autosubmit") && o.submit()
        }
        disableLoginSubmitBtn()
    })
});
var sendFbLoginData = 0,
    sendFbSignupData = 0,
    sendGoogleLoginData = 0,
    sendGoogleSignupData = 0,
    sendLoginWithOtpData = 0,
    sendMobileOTPVerifiedData = 0,
    sendSaveAndContinueData = 0,
    sendMobileVerifyClickData = 0;

function pushLoginWithOTPinDatalayer() {
    524 == $("#collegeId").val() && 0 === sendLoginWithOtpData && (window.dataLayer = window.dataLayer || [], dataLayer.push({
        event: "Login",
        category: "Login",
        action: "Submit",
        label: "Login with OTP"
    }), sendLoginWithOtpData = 1)
}

function sendMobileOTPVerifiedDatalayer() {
    524 == $("#collegeId").val() && 0 === sendMobileOTPVerifiedData && (window.dataLayer = window.dataLayer || [], dataLayer.push({
        event: "Profile",
        category: "Application - Profile | Mobile Verify",
        action: "Submit",
        label: "OTP Verified"
    }), sendMobileOTPVerifiedData = 1)
}
$(document).on("click", ".fbLogin", function() {
    var e = $(this).html(),
        t = e.search(/sign/i),
        i = e.search(/login/i); - 1 !== t && (t = 1), -1 !== i && (i = 1);
    var o = $("#collegeId").val();
    524 == o && 0 === sendFbLoginData && 1 === i && (window.dataLayer = window.dataLayer || [], dataLayer.push({
        event: "Login",
        category: "Login",
        action: "Submit",
        label: "Login with Facebook"
    }), sendFbLoginData = 1), 524 == o && 0 === sendFbSignupData && 1 === t && (window.dataLayer = window.dataLayer || [], dataLayer.push({
        event: "New User Registration",
        category: "New User Registration",
        action: "Submit",
        label: "Register with Facebook"
    }), sendFbSignupData = 1)
}), $(document).on("click", ".gpLogin", function() {
    var e = $(this).html(),
        t = e.search(/sign/i),
        i = e.search(/login/i); - 1 !== t && (t = 1), -1 !== i && (i = 1);
    var o = $("#collegeId").val();
    524 == o && 0 === sendGoogleLoginData && 1 === i && (window.dataLayer = window.dataLayer || [], dataLayer.push({
        event: "Login",
        category: "Login",
        action: "Submit",
        label: "Login with Google"
    }), sendGoogleLoginData = 1), 524 == o && 0 === sendGoogleSignupData && 1 === t && (window.dataLayer = window.dataLayer || [], dataLayer.push({
        event: "New User Registration",
        category: "New User Registration",
        action: "Submit",
        label: "Register with Google"
    }), sendGoogleSignupData = 1)
}), $(document).on("click", "#SaveProfileBtn", function() {
    524 == $("#collegeId").val() && 0 === sendSaveAndContinueData && (window.dataLayer = window.dataLayer || [], dataLayer.push({
        event: "Profile",
        category: "Application - Profile",
        action: "Submit",
        label: "Save & Continue"
    }), sendSaveAndContinueData = 1)
}), $(document).on("click", "#otpverifylink_aMobile", function() {
    524 == $("#collegeId").val() && 0 === sendMobileVerifyClickData && (window.dataLayer = window.dataLayer || [], dataLayer.push({
        event: "Profile",
        category: "Application - Profile | Mobile Verify",
        action: "Submit",
        label: "Verify Mobile"
    }), sendMobileVerifyClickData = 1)
});