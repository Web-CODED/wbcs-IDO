var REK = "6NitGRUTASKAAM1kxXLJ1YSzLokPtx8XGCHj8_VV";
$(window).load(function() {
    "undefined" != typeof runAutoLoadJs && $.isFunction(runAutoLoadJs) && runAutoLoadJs(), void 0 !== jsVars.FULL_URL && ("undefined" == typeof prepareAjaxRequest && ($.getScript(jsVars.FULL_URL + "/js/lib/cryptojs.min.js"), $.getScript(jsVars.FULL_URL + "/js/lib/json.js")), "undefined" == typeof send_ajax_request && $.getScript(jsVars.FULL_URL + "/js/ajax_request.js"))
}), $(document).ready(function() {
    $(".msg_success").length && $(".msg_success").show().delay(1e4).fadeOut(), $('[data-toggle="popover"]').length && (document.documentElement.clientWidth > 968 ? $('[data-toggle="popover"]').popover({
        placement: "left"
    }) : $('[data-toggle="popover"]').popover({
        placement: "top"
    })), void 0 !== jsVars.enable_ilearn && 1 == jsVars.enable_ilearn && ($("form#registerForm #registerBtn").length && $("form#registerForm #registerBtn").attr("disabled", "disabled"), $("#Name").length && $("#Name").parents(".reg_name_div").hide(), $("#Mobile").length && $("#Mobile").parents(".merge_field_div").hide(), $("#fetchProfileFromILearnLink").show()), $(".sumo-select").length && $(".sumo-select").each(function() {
        $(this).SumoSelect({
            search: !0,
            placeholder: $(this).data("placeholder"),
            captionFormatAllSelected: "All Selected.",
            searchText: $(this).data("placeholder"),
            floatWidth: 200,
            triggerChangeCombined: !0,
            forceCustomRendering: !0
        }), $(this).data("prev", $(this).val()), void 0 !== $(this).data("limit") && parseInt($(this).data("limit")) > 0 && $(this).on("change", function(e) {
            if (null != $(this).val() && $(this).val().length > parseInt($(this).data("limit"))) {
                alert("Max " + parseInt($(this).data("limit")) + " selections allowed!");
                var t = $(this),
                    r = $(this).data("prev");
                t[0].sumo.unSelectAll(), $.each(r, function(e, r) {
                    t[0].sumo.selectItem(t.find('option[value="' + r + '"]').index())
                }), last_valid_selection = r
            } else null != $(this).val() && $(this).data("prev", $(this).val())
        })
    }), $("img[src*='//bat.bing.com/action/0']").css("display", "none"), $(document).on("click", "#SuccessPopupArea button.npf-close,#SuccessPopupArea  a.npf-close", function(e) {
        e.preventDefault(), window.location.href = window.location.href
    }), $(document).on("change", "input[name='career_utsav_id[]']", function() {
        getAreaOfInterestForList()
    }), $("select#SeminarPreferenceId").length > 0 && $("select#SeminarPreferenceId").SumoSelect({
        placeholder: "Seminar Preference Name",
        search: !0,
        searchText: "Seminar Preference Name",
        captionFormatAllSelected: "All Selected.",
        triggerChangeCombined: !0
    }), $("select#MockPreferenceId").length > 0 && $("select#MockPreferenceId").SumoSelect({
        placeholder: "Mock Preference Name",
        search: !0,
        searchText: "Mock Preference Name",
        captionFormatAllSelected: "All Selected.",
        triggerChangeCombined: !0
    }), $("#Password").keyup(function() {
        validateUsersPassword("Password")
    }), $("#Password").focus(function() {
        validateUsersPassword("Password")
    }), $("#forgot-new-password").keyup(function() {
        validateUsersPassword("forgot-new-password")
    }), $("#forgot-new-password").focus(function() {
        validateUsersPassword("forgot-new-password")
    }), loadCustomDateTime(), $("#Email,#email").length > 0 && $("#Email,#email").keyup(function() {
        var e = $(this).val();
        if (re = /[`~!#$%^&*()|+\=?;:'",<>\{\}\[\]\\\/]/gi, re.test(e)) {
            var t = e.replace(/[`~!#$%^&*()|+\=?;:'",<>\{\}\[\]\\\/]/gi, "");
            $(this).val(t)
        }
    })
}), "verify" == jsVars.VerifyStudent && ($("#VerifyLink").trigger("click"), delete jsVars.VerifyStudent), "verify" == jsVars.onlyCrmEnableConfirmation && ($("div#ConfirmationMsgPopupArea").modal().css("display", "block"), delete jsVars.onlyCrmEnableConfirmation), void 0 !== jsVars.SocialError && ($("#RegisterSocialLink").trigger("click"), delete jsVars.SocialError);
var isVarLoginUser = !1;

function changesOfFullBannerLayout(e, t) {
    if (void 0 !== jsVars.FullBannerLayoutEnabled || void 0 !== jsVars.isCustomTheme)
        for (var r in t) "" == $("#" + e + " #" + r).val() && (t[r] = "");
    return t
}

function checkStudentRegisterValidation() {
    $("span.help-block").text("");
    var e = $("form#registerForm input[name='_csrfToken']").val();
    $.ajax({
        url: jsVars.RegisterValidationCheck,
        type: "post",
        data: $("form#registerForm").serialize(),
        dataType: "json",
        headers: {
            "X-CSRF-Token": e
        },
        beforeSend: function() {
            $("#register-now div.loader-block").show(), $("#register-page div.loader-block").show()
        },
        complete: function() {
            $("#register-now div.loader-block").hide(), $("#register-page div.loader-block").hide()
        },
        success: function(e) {
            if (e.redirect) location = e.redirect;
            else if (e.error) {
                if (e.error.msg) alertPopup(e.error.msg, "error");
                else if (e.error.list)
                    if (e.error.list.missing) alertPopup(e.error.list.missing, "error");
                    else
                        for (var t in e.error.list = changesOfFullBannerLayout("registerForm", e.error.list), e.error.list) {
                            if ("CareerUtsavId" == t) var r = $("form#registerForm input[name='career_utsav_id[]']").parents("div.form-group");
                            else r = $("form#registerForm #" + t).parents("div.form-group");
                            $(r).addClass("has-error"), $(r).find("span.help-block").html(e.error.list[t]), "Captcha" == t && (void 0 !== e.error.list.captchField ? $("#" + e.error.list.captchField).trigger("click") : $("#CaptchaRefreshBtn").trigger("click"))
                        }
            } else if (200 == e.success) {
                e.AnalyticsCodeSlug && hitC360AnalyticsCode(e.AnalyticsCodeSlug, e.AnalyticsCodeAction, e.GAName, e.NPFAnalyticsCodeAction);
                $("#college-instruction").append(""), $("#hit_popup_instructions").trigger("click")
            }
        },
        error: function(e, t, r) {
            console.log(r + "\r\n" + e.statusText + "\r\n" + e.responseText), $("#register-now div.loader-block,#register-page div.loader-block").hide()
        }
    })
}

function agreeConditions() {
    var e = $("#InstructionAgree").parents("div.agree-group");
    return $(e).removeClass("has-error"), $(e).find("span.help-block").text(""), $("#InstructionAgree").is(":checked") ? ($("#InstructionAgree").trigger("click"), $("#college-instruction").modal("hide"), $("#RegisterPopupOpenBtn").trigger("click"), !0) : ($(e).addClass("has-error"), $(e).find("span.help-block").text("Please select the checkbox to continue."), !1)
}
$(document).on("click", "#loginBtn", function() {
    $("form#loginForm span.help-block").text("");
    var e = $("form#loginForm input[name='_csrfToken']").val();
    if (1 != isVarLoginUser) {
        isVarLoginUser = !0;
        var t = $("form#loginForm").serializeArray(),
            r = {
                "X-CSRF-Token": e
            };
        send_ajax_request(jsVars.LoginUrl, "post", t, function(e) {
            if (isVarLoginUser = !1, e.redirect) location = e.redirect;
            else if (e.error) {
                if (e.error.msg) alertPopup(e.error.msg, "error");
                else if (e.error.list)
                    for (var t in e.error.list = changesOfFullBannerLayout("loginForm", e.error.list), e.error.list) {
                        var r = t;
                        "Email" == t && (r = "loginEmail"), "Password" == t && (r = "loginPassword");
                        var o = $("form#loginForm #" + r).parents("div.form-group");
                        $(o).addClass("has-error"), $(o).find("span.help-block").text(""), $(o).find("span.help-block").append(e.error.list[t])
                    }
            } else 200 == e.success && (pushLoginDatainDatalayer(), location = e.location)
        }, function() {
            $("#already-registered div.loader-block,#register-now div.loader-block").hide()
        }, function() {
            $("#already-registered div.loader-block,#register-now div.loader-block").show()
        }, function(e, t, r) {
            console.log(r + "\r\n" + e.statusText + "\r\n" + e.responseText), $("#already-registered div.loader-block,#register-now div.loader-block").hide()
        }, r)
    }
}), "undefined" != jsVars.ShowInstructionPopup && $(document).on("click", "#ContinueWithAgree, #ContinueAndRegister", function() {
    agreeConditions() && registerUser()
}), $(document).on("click", "#registerBtn", function() {
    registerUser()
});
var isVarRegisterUser = !1,
    userRegistered = !1;

function registerUser() {
    $("form#registerForm #registerBtn").attr("disabled", "disabled"), $("form#registerForm #registerBtn").css("pointer-events", "none"), $("span.help-block").text("");
    var e = $("form#registerForm input[name='_csrfToken']").val(),
        t = $("form#registerForm input[name='widgetId']").val();
    if (1 != isVarRegisterUser) {
        if (runConditionalJs()) return !1;
        var r = new FormData($("form#registerForm")[0]);
        void 0 !== jsVars.dynamicRequest && 1 == jsVars.dynamicRequest && r.append("dynamicRequest", jsVars.dynamicRequest), isVarRegisterUser = !0, $.ajax({
            url: jsVars.RegisterUrl,
            xhrFields: {
                withCredentials: !0
            },
            type: "post",
            data: r,
            dataType: "json",
            processData: !1,
            contentType: !1,
            async: !1,
            headers: {
                "X-CSRF-Token": e,
                token: jsVars.requestCsrf
            },
            beforeSend: function() {
                $("#register-now div.loader-block").show(), $("#register-page div.loader-block").show(), $("form#registerForm #registerBtn").attr("disabled", "disabled"), $("form#registerForm #registerBtn").css("pointer-events", "none")
            },
            complete: function() {
                $("#register-now div.loader-block").hide(), $("#register-page div.loader-block").hide()
            },
            success: function(e) {
                if (isVarRegisterUser = !1, e.redirect) location = e.redirect;
                else if (e.error) {
                    if ("csrf" == e.error) alertPopup("Please refresh the page and try again.", "error");
                    else if (e.error.msg) alertPopup(e.error.msg, "error");
                    else if (e.error.list)
                        if (e.error.list.missing) alertPopup(e.error.list.missing, "error");
                        else {
                            e.error.list = changesOfFullBannerLayout("registerForm", e.error.list);
                            var r = '<div style="text-align:left">';
                            for (var o in e.error.list)
                                if ("captchField" != o)
                                    if (void 0 !== jsVars.register_error && "popup" == jsVars.register_error) r += e.error.list[o] + "<br>";
                                    else {
                                        if ("CareerUtsavId" == o) var a = $("form#registerForm input[name='career_utsav_id[]']").parents("div.form-group");
                                        else if ("Captcha" == o && void 0 !== e.error.list.captchField) a = $("form#registerForm #" + e.error.list.captchField).parents("div.form-group");
                                        else a = $("form#registerForm #" + o).parents("div.form-group");
                                        $(a).addClass("has-error"), $(a).find("span.help-block").html(e.error.list[o]), "Captcha" == o && (void 0 !== e.error.list.captchField ? $("#" + e.error.list.captchField + "Btn").trigger("click") : $("#CaptchaRefreshBtn").trigger("click"))
                                    }
                            1 != e.entry_flag && ($("form#registerForm #registerBtn").removeAttr("disabled"), $("form#registerForm #registerBtn").css("pointer-events", "auto")), void 0 !== $("#opt_dataMobile") && "" == $("#opt_dataMobile").val() && $("#otpunverifiedMobile").show(), r += "</div>", void 0 !== jsVars.register_error && "popup" == jsVars.register_error && alertPopup(r, "error")
                        }
                    $("#ErrorPopupArea .modal-dialog").addClass("modal-sm"), $("#ErrorPopupArea #ErroralertTitle").css("font-size", "20px")
                } else if (200 == e.success) {
                    var i = !1,
                        s = !1,
                        n = "",
                        l = 0;
                    void 0 !== e.thankyou_type && 1 == parseInt(e.thankyou_type) && 0 == parseInt(e.thankyou_redirect_delay) ? (i = !0, n = e.thankyou_external_url) : parseInt(e.thankyou_redirect_delay) > 0 && (i = !1, s = !0, n = e.thankyou_external_url, l = parseInt(e.thankyou_redirect_delay)), userRegistered = !0;
                    var d = $(document).find("#Mobile").val(),
                        c = "",
                        g = "",
                        p = "",
                        u = "",
                        m = "",
                        f = "";
                    if ("lpuDataLayer" in e && e.lpuDataLayer) {
                        var h = e.lpuDataLayer;
                        "utm_source" in h && h.utm_source && (c = h.utm_source), "utm_medium" in h && h.utm_medium && (g = h.utm_medium), "utm_name" in h && h.utm_name && (p = h.utm_name), "current_url" in h && h.current_url && (u = h.current_url), "widget_name" in h && h.widget_name && (m = h.widget_name), "host_name" in h && h.host_name && (f = h.host_name)
                    }
                    if (pushRegisterDatainDatalayer(d, c, g, p, u, m, f), "registrationDataLayerData" in e && e.registrationDataLayerData && registrationDataLayerData(e.registrationDataLayerData), "function" == typeof npfGtmTagCodeOnRegSuccess && npfGtmTagCodeOnRegSuccess(), e.AnalyticsCodeSlug && hitC360AnalyticsCode(e.AnalyticsCodeSlug, e.AnalyticsCodeAction, e.GAName, e.NPFAnalyticsCodeAction), e.location) location = e.location;
                    else {
                        $("form#registerForm #Agree").val("1"), $('form#registerForm [type="hidden"][name="Agree"]').val("0"), $("span.help-block").text(""), $("div.form-group").removeClass("has-error"), "false" != jsVars.auto_trigger && $(".npf-close").trigger("click");
                        var v = "";
                        if (void 0 !== jsVars.trigger_collegedunia && e.register_continue_collegedunia_pixel && (v = e.register_continue_collegedunia_pixel), i) i && n.length > 0 && (hitOnWidgetThanyou(e.passDataDecoded), window.top.location.href = n);
                        else if (void 0 !== e.msgPosition)
                            if (void 0 === e.passDataDecoded && (e.passDataDecoded = []), hitOnWidgetThanyou(e.passDataDecoded), t != jsVars.lpu_sso_widgetId && "string" == typeof e.parentRedirectURL && "" !== e.parentRedirectURL) window.parent.location = e.parentRedirectURL;
                            else if ($("div.widget_thankyou_msg").hide(), "after_heading" == e.msgPosition) $("div.after_heading").html(e.msg), $("div.after_heading").fadeIn(), s && "" != n && setTimeout(function() {
                            window.top.location.href = n
                        }, parseInt(1e3 * l));
                        else if ("above_button" == e.msgPosition) $("div.above_button").html(e.msg), $("div.above_button").fadeIn(), s && "" != n && setTimeout(function() {
                            window.top.location.href = n
                        }, parseInt(1e3 * l));
                        else if ("new_page" == e.msgPosition) {
                            var y = "";
                            void 0 !== e.passData && (y = e.passData);
                            var k = "";
                            void 0 !== e.cid && (k = e.cid), window.location.href = "/thankyou?cid=" + k + "&w=" + y
                        } else $("div.next_page").html(e.msg), $("div.widget_container").fadeOut(), $("div.next_page").fadeIn(), s && "" != n && setTimeout(function() {
                            window.top.location.href = n
                        }, parseInt(1e3 * l));
                        else $("#SuccessPopupArea .modal-title").html("Thank you for registration" + v), $("#SuccessPopupArea p#MsgBody").text(""), $("#SuccessPopupArea p#MsgBody").append(e.msg), $("#SuccessLink").trigger("click"), e.triggerDataLayer && hitOnRegisterSuccessPopup();
                        t == jsVars.lpu_sso_widgetId && "string" == typeof e.parentRedirectURLNewTab && "" !== e.parentRedirectURLNewTab && window.open(e.parentRedirectURLNewTab, "_blank"), void 0 !== t ? setTimeout(function() {
                            $("form#registerForm #registerBtn").removeAttr("disabled"), $("form#registerForm #registerBtn").css("pointer-events", "auto")
                        }, 1e3 * (l + 5)) : ($("form#registerForm #registerBtn").removeAttr("disabled"), $("form#registerForm #registerBtn").css("pointer-events", "auto"))
                    }
                }
            },
            error: function(e, t, r) {
                console.log(r + "\r\n" + e.statusText + "\r\n" + e.responseText), $("#register-now div.loader-block").hide(), isVarRegisterUser = !1
            }
        })
    }
}
if (void 0 !== jsVars.AnalyticsCodeSlug) {
    var CodeSlug = jsVars.AnalyticsCodeSlug,
        CodeAction = jsVars.AnalyticsCodeAction,
        NPFCodeAction = jsVars.NPFAnalyticsCodeAction,
        GAName = jsVars.GAName;
    hitC360AnalyticsCode(CodeSlug, CodeAction, GAName, NPFCodeAction), redirectPageOnMobile()
}

function redirectPageOnMobile() {
    void 0 !== jsVars.RedirectAfterAnalyticsCodeSlug && (location = jsVars.RedirectAfterAnalyticsCodeSlug)
}

function hitC360AnalyticsCode(e, t, r, o) {
    "" !== e && dataLayer.push({
        event: "GAevent",
        eventCategory: "Register",
        eventAction: o,
        eventLabel: e
    })
}

function hitOnRegisterSuccessPopup() {
    dataLayer.push({
        event: "registerpopup"
    })
}

function hitOnWidgetThanyou(e) {
    var t = {
        event: "widgetthankyou",
        transactionId: "",
        transactionTotal: 0,
        pInstanceDate: 0,
        oInstanceDate: 0,
        countryName: 0
    };
    void 0 !== e.user_id && (t.transactionId = e.user_id), void 0 !== e.final_register_date && (t.pInstanceDate = e.final_register_date), void 0 !== e.other_instance_date && (t.oInstanceDate = e.other_instance_date), void 0 !== e.user_id && (t.transactionId = e.user_id);
    var r = {
        name: "",
        sku: "",
        category: ""
    };
    void 0 !== e.name && (r.name = e.name), void 0 !== e.email && (r.name += "_" + e.email), void 0 !== e.mobile && (r.sku = e.mobile), void 0 !== e.coursename && (r.category = e.coursename), void 0 !== e.state && (r.category += "_" + e.state), void 0 !== e.city && (r.category += "_" + e.city), void 0 !== e.countryName && (t.countryName = e.countryName), t.transactionProducts = [r], "undefined" == typeof dataLayer && (window.dataLayer = window.dataLayer || []), dataLayer.push(t)
}

function sendVerificationEmail(e) {
    triggerVerficationMail({
        action: "mail",
        key: e
    })
}

function resendMail(e) {
    var t = "";
    void 0 !== e && (t = e), triggerVerficationMail({
        action: "mail",
        key: t
    })
}

function triggerVerficationMail(e) {
    var t, r = !1;
    $("form#loginForm").length > 0 ? t = $("form#loginForm input[name='_csrfToken']").val() : $("form#registerForm").length > 0 ? t = $("form#registerForm input[name='_csrfToken']").val() : $("form#forgotForm").length > 0 ? t = $("form#forgotForm input[name='_csrfToken']").val() : $("form#ProfileForm").length > 0 ? t = $("form#ProfileForm input[name='_csrfToken']").val() : $("form#chnageEmailId").length > 0 ? (t = $("form#chnageEmailId input[name='_csrfToken']").val(), r = !0) : void 0 !== jsVars._csrfToken && (t = jsVars._csrfToken);
    var o = {
        "X-CSRF-Token": t
    };
    send_ajax_request(jsVars.ResendMailUrl, "post", e, function(e) {
        e.redirect ? location = e.redirect : e.error ? e.error.msg && alertPopup(e.error.msg, "error") : 200 == e.success && (void 0 !== jsVars.auto_trigger && "false" != jsVars.auto_trigger ? $(".npf-close").trigger("click") : $("div#register-now").modal("hide"), void 0 !== r && 1 == r ? $("#SuccessPopupArea .modal-title").text("Login Credentials Sent.") : void 0 !== e.messageType && "" !== $.trim(e.messageType) ? "error" == e.messageType ? $("#SuccessPopupArea .modal-title").text("Error") : "verification" == e.messageType ? $("#SuccessPopupArea .modal-title").text("Verification Credentials Sent") : "credential" == e.messageType && $("#SuccessPopupArea .modal-title").text("Login Credentials Sent") : $("#SuccessPopupArea .modal-title").text("Thank you for registration"), $("#SuccessPopupArea p#MsgBody").text(""), $("#SuccessPopupArea p#MsgBody").append(e.msg), $("#SuccessLink").trigger("click"))
    }, function() {
        $("div.loader-block").hide()
    }, function() {
        $("div.loader-block").show()
    }, function(e, t, r) {
        console.log(r + "\r\n" + e.statusText + "\r\n" + e.responseText), $("div.loader-block").hide()
    }, o)
}
var isVarForgotUser = !1;
$(document).on("click", "#forgotBtn", function() {
    $("span.help-block").text("");
    var e = $("form#forgotForm input[name='_csrfToken']").val();
    if (1 != isVarForgotUser) {
        isVarForgotUser = !0;
        var t = {
                Email: $("form#forgotForm input[name='Email']").val()
            },
            r = {
                "X-CSRF-Token": e
            };
        send_ajax_request(jsVars.ForgotPasswordUrl, "post", t, function(e) {
            if (isVarForgotUser = !1, e.redirect) location = e.redirect;
            else if (e.error) {
                if (e.error.msg) alertPopup(e.error.msg, "error");
                else if (e.error.list)
                    for (var t in e.error.list = changesOfFullBannerLayout("forgotForm", e.error.list), e.error.list) {
                        var r = t;
                        "Email" == t && (r = "forgetEmail");
                        var o = $("form#forgotForm #" + r).parents("div.form-group");
                        $(o).addClass("has-error"), $(o).find("span.help-block").text(""), $(o).find("span.help-block").append(e.error.list[t])
                    }
            } else 200 == e.success && (e.location ? location = e.location : ($("#ForgotOtpTabContainer").show(), $("#ForgotTabContainer").length > 0 && $("#ForgotTabContainer").hide(), $("#forgot_pwd_form_without_popup").length > 0 && $("#forgot_pwd_form_without_popup").hide(), $("#forgotOtpBtn").hide(), $("#hashValue").val(e.hash), countdownStartFOrget()))
        }, function() {
            $("#forget-password div.loader-block,#register-now div.loader-block").hide(), $(this).attr("disabled", !1)
        }, function() {
            $("#forget-password div.loader-block,#register-now div.loader-block").show(), $(this).attr("disabled", !0)
        }, function(e, t, r) {
            console.log(r + "\r\n" + e.statusText + "\r\n" + e.responseText), $("#forget-password div.loader-block,#register-now div.loader-block").hide()
        }, r)
    }
}), jQuery(function() {
    $("form#registerForm #Agree").val("1"), $('form#registerForm [type="hidden"][name="Agree"]').val("0"), $("form#registerForm #Agree").click(function() {
        $(this).is(":checked") ? ($("form#registerForm #Agree").val("1"), $('form#registerForm [type="hidden"][name="Agree"]').val("0"), $(this).attr("checked", "checked"), $(this).attr("checked", !0)) : $(this).removeAttr("checked")
    })
});
var preCurrentRequest = null;

function validateMobileLength(e) {
    var t = !1,
        r = "+91";
    if ($("form#registerForm #country_dial_codeMobile").length > 0 && (t = !0, r = $("form#registerForm #country_dial_codeMobile").val()), 1 == t) {
        if ("+91" == r && 10 == e.length) return !0;
        if ("+91" != r && e.length >= 6 && e.length <= 16) return !0
    } else if (10 == e.length) return !0;
    return !1
}

function populatePredefinedValues(e, t, r, o) {
    var a = 0;
    void 0 !== jsVars.college_id && null != jsVars.college_id && (a = jsVars.college_id);
    var i = '<option value="">' + t + "</option>";
    $("#" + o).html(i), void 0 !== e && "" !== e && null !== e && $.ajax({
        url: jsVars.getTaxonomyChildListLink,
        type: "post",
        data: {
            parentKey: e,
            college_id: a
        },
        dataType: "html",
        headers: {
            "X-CSRF-Token": jsVars.csrfToken
        },
        beforeSend: function() {
            $("#register-now div.loader-block,#register-page div.loader-block").show()
        },
        complete: function() {
            $("#register-now div.loader-block,#register-page div.loader-block").hide()
        },
        success: function(e) {
            var a = $.parseJSON(e);
            if (1 == a.status) {
                if ("object" == typeof a.data) {
                    var i = '<option value="">' + t + "</option>";
                    $.each(a.data, function(e, t) {
                        i += e == r ? '<option value="' + e + '" selected >' + t + "</option>" : '<option value="' + e + '">' + t + "</option>"
                    }), $("#" + o).html(i)
                }
            } else "session" === a.message ? location = jsVars.FULL_URL : alertPopup(a.message, "error")
        },
        error: function(e, t, r) {
            alert(r + "\r\n" + e.statusText + "\r\n" + e.responseText)
        }
    })
}

function GetChildByMachineKey(e, t) {
    if (void 0 !== t && $("#" + t).length) {
        $("#" + t + ' option[value!=""]').remove();
        var r = 0;
        void 0 !== jsVars.dependentDropdownFieldList && $(jsVars.dependentDropdownFieldList).each(function(e, o) {
            if (r > 0) return !1;
            var a = 0;
            $.each(o, function(e, o) {
                if (o == t && (r = ++a), a > 0 && $("#" + o).length) {
                    var i = '<option value="">' + $("#" + o).data("label") + "</option>";
                    $("#" + o).hasClass("sumo-select") ? ($("#" + o).find('option[value!=""]').remove(), $("#" + o + ".sumo-select")[0].sumo.reload()) : ($("#" + o).html(i), $("#" + o + "_chosen").length && ($(".chosen-select").chosen(), $(".chosen-select-deselect").chosen({
                        allow_single_deselect: !0
                    }), $(".chosen-select").trigger("chosen:updated"))), $("#" + o).hasClass("selectpicker") && $(".selectpicker").selectpicker("refresh")
                }
            })
        });
        var o = !1,
            a = !1;
        if ($("#" + t).find('option[value!=""]').remove(), "StateId" == t && ($("#DistrictId").length > 0 && ($("#DistrictId.chosen-select").length > 0 && (o = !0), $("#DistrictId").find('option[value!=""]').remove(), $("#DistrictId.sumo-select").length > 0 && $("#DistrictId.sumo-select")[0].sumo.reload(), $("#DistrictId.selectpicker").length > 0 && (a = !0)), $("#CityId").length > 0 && ($("#CityId.chosen-select").length > 0 && (o = !0), $("#CityId").find('option[value!=""]').remove(), $("#CityId.sumo-select").length > 0 && $("#CityId.sumo-select")[0].sumo.reload(), $("#CityId.selectpicker").length > 0 && (a = !0))), "DistrictId" == t && $("#CityId").length > 0 && ($("#CityId.chosen-select").length > 0 && (o = !0), $("#CityId").find('option[value!=""]').remove(), $("#CityId.sumo-select").length > 0 && $("#CityId.sumo-select")[0].sumo.reload(), $("#CityId.selectpicker").length > 0 && (a = !0)), !o && $("#" + t + ".chosen-select").length > 0 && (o = !0), !a && $("#" + t + ".selectpicker").length > 0 && (a = !0), o && $(".chosen-select").length > 0 && ($(".chosen-select").chosen(), $(".chosen-select-deselect").chosen({
                allow_single_deselect: !0
            }), $(".chosen-select").trigger("chosen:updated")), a && $(".selectpicker").length > 0 && $(".selectpicker").selectpicker("refresh"), $(".sumo-select").length > 0 && $("#" + t + ".sumo-select").length > 0 && $("#" + t + ".sumo-select")[0].sumo.reload(), void 0 !== e && "" !== e) {
            var i = "";
            void 0 !== $("#" + t).attr("name") && "" !== $("#" + t).attr("name") && (i = $("#" + t).attr("name"));
            var s = {
                key: e,
                ContainerId: t,
                fieldName: i
            };
            $("#collegeId").length && (s.college_id = $("#collegeId").val()), "DistrictId" == t && (s.includeDistricts = "1"), void 0 !== jsVars.widgetId && "" != jsVars.widgetId && (s.widgetId = jsVars.widgetId);
            s.cf = "lm-user-profile";
            var n = jsVars.GetTaxonomyLink.replace("get-children-list", "common/GetChildByMachineKeyForRegistrationNew");
            send_ajax_request(n, "post", s, function(e) {
                if (e.redirect && (location = e.redirect), e.error && "csrf" !== e.error) alertPopup(e.error, "error");
                else if (e.error && "csrf" === e.error) alertPopup("Please refresh the page and try again.", "error");
                else if (e.success) {
                    var r = "";
                    if (e.CategoryOptions) r = e.CategoryOptions;
                    else
                        for (var i in e.list) r += '<option value="' + i + '">' + e.list[i] + "</option>";
                    if (void 0 !== $("#" + t).data("label")) {
                        var s = '<option value="">' + $("#" + t).data("label") + "</option>";
                        $("#" + t).html(s + r)
                    } else $("#" + t).append(r);
                    "StateId" == t && ($("#StateId").attr("disabled", "false"), $("#StateId").removeAttr("disabled"), $("#DistrictId").length > 0 && ($("#DistrictId.chosen-select").length > 0 && (o = !0), $("#DistrictId").find('option[value!=""]').remove(), $("#DistrictId.sumo-select").length > 0 && $("#DistrictId.sumo-select")[0].sumo.reload(), $("#DistrictId.selectpicker").length > 0 && (a = !0)), $("#CityId").length > 0 && ($("#CityId.chosen-select").length > 0 && (o = !0), $("#CityId").find('option[value!=""]').remove(), $("#CityId.sumo-select").length > 0 && $("#CityId.sumo-select")[0].sumo.reload(), $("#CityId.selectpicker").length > 0 && (a = !0))), "DistrictId" == t && ($("#DistrictId").attr("disabled", "false"), $("#DistrictId").removeAttr("disabled"), $("#CityId").length > 0 && ($("#CityId.chosen-select").length > 0 && (o = !0), $("#CityId").find('option[value!=""]').remove(), $("#CityId.sumo-select").length > 0 && $("#CityId.sumo-select")[0].sumo.reload(), $("#CityId.selectpicker").length > 0 && (a = !0))), "CityId" == t && $("#CityId").length > 0 && ($("#CityId.chosen-select").length > 0 && (o = !0), $("#CityId.selectpicker").length > 0 && (a = !0), $("#CityId").attr("disabled", "false"), $("#CityId").removeAttr("disabled")), o && $(".chosen-select").length > 0 && ($(".chosen-select").chosen(), $(".chosen-select-deselect").chosen({
                        allow_single_deselect: !0
                    }), $(".chosen-select").trigger("chosen:updated")), $("#" + t + ".sumo-select").length > 0 && $("#" + t + ".sumo-select")[0].sumo.reload(), a && $(".selectpicker").length > 0 && $(".selectpicker").selectpicker("refresh")
                }
            }, function() {
                $("#register-now div.loader-block,#register-page div.loader-block").hide()
            }, function() {
                $("#register-now div.loader-block,#register-page div.loader-block").show()
            }, function(e, t, r) {
                console.log(r + "\r\n" + e.statusText + "\r\n" + e.responseText)
            })
        }
    }
}

function updateSelectInput(e, t, r) {
    var o = "Choose";
    void 0 !== jsVars.CollegeId && 139 == jsVars.CollegeId && (o = "Domicile");
    var a = '<option value=""> ' + o + " " + t + "</option>";
    "State" == t && $("#CityId").length > 0 && $("#CityId").html('<option value="">' + o + " City</option>"), "City" == t && $("#CityId").length > 0 && ($("#CityId").attr("disabled", "false"), $("#CityId").removeAttr("disabled")), void 0 !== r && (a += r), $("#" + e).html(a), $(".chosen-select").length > 0 && ($(".chosen-select").chosen(), $(".chosen-select-deselect").chosen({
        allow_single_deselect: !0
    }), $(".chosen-select").trigger("chosen:updated"))
}

function filterDialCode(e) {
    void 0 !== e && null != e && "undefined" != e || (e = "");
    var t = $("#filter_dial_code" + e).val();
    t = t.toLowerCase(), $("#ul_dial_code" + e + " > li").each(function() {
        $(this).text().toLowerCase().search(t) > -1 ? $(this).show() : $(this).hide()
    })
}

function isValidEmailDNS(e, t, r) {
    if ("" != $.trim(e)) {
        $(t).html("");
        var o = jsVars.csrfToken;
        null == o && $("form#registerForm").length > 0 ? o = $("form#registerForm input[name='_csrfToken']").val() : null == o && $("form#loginForm").length > 0 && (o = $("form#loginForm input[name='_csrfToken']").val());
        var a = {
                email: $.trim(e),
                marketPage: void 0 !== jsVars.marketingPage && 1 == jsVars.marketingPage,
                college_id: void 0 !== jsVars.college_id ? jsVars.college_id : 0
            },
            i = {
                "X-CSRF-TOKEN": o
            },
            s = (void 0 !== jsVars.marketingPage && 1 == jsVars.marketingPage ? jsVars.FULL_URL : "") + "/common/check-email";
        send_ajax_request(s, "post", a, function(e) {
            void 0 !== e.message && "" != e.message && ($(t).show(), null != r && "" !== r && -1 === e.message.indexOf("you mean") ? $(t).html(r).css({
                color: "#f44336",
                display: "block"
            }) : $(t).html(e.message).css({
                color: "#f44336",
                display: "block"
            })), $("#registerBtn").removeAttr("disabled")
        }, null, null, function(e, t, r) {
            console.log(r + "\r\n" + e.statusText + "\r\n" + e.responseText)
        }, i)
    }
}
$(document).ready(function(e) {
    $(document).on("click", ".bs-dropdown-to-select-group .dropdown-menu-list li", function(e) {
        var t = $(e.currentTarget),
            r = $(this).data("fieldid");
        return t.closest(".bs-dropdown-to-select-group").find('[data-bind="bs-drp-sel-value"]').val(t.attr("data-value")).end().children(".dropdown-toggle").dropdown("toggle"), t.closest(".bs-dropdown-to-select-group").find('[data-bind="bs-drp-sel-masterid-value"]').val(t.attr("data-masterid")).end().children(".dropdown-toggle").dropdown("toggle"), t.closest(".bs-dropdown-to-select-group").find('[data-bind="bs-drp-sel-label"]').text(t.attr("data-value")), t.closest(".bs-dropdown-to-select-group").removeClass("open"), $("#" + r).val(""), t.attr("data-value") == jsVars.defaultCountryCode ? $("#" + r).attr("maxlength", jsVars.maxMobileLength) : $("#" + r).attr("maxlength", jsVars.internationalMaxMobileLength), !1
    }), jQuery(".filter_dial_code").on("click", function(e) {
        e.stopPropagation()
    })
});
var fetchProfileFromILearnRequestInProgress = !1;

function fetchProfileFromILearn(e, t, r) {
    var o = $("#" + t).val();
    "" != $.trim(o) && 0 == fetchProfileFromILearnRequestInProgress && (fetchProfileFromILearnRequestInProgress = !0, $(r).html(""), $.ajax({
        url: "/common/fetch-profile-from-i-learn",
        type: "post",
        dataType: "json",
        async: !0,
        data: "email=" + $.trim(o) + "&college_id=" + e,
        headers: {
            "X-CSRF-TOKEN": jsVars.csrfToken
        },
        beforeSend: function() {
            $("#fetchProfileFromILearnLink").find("a").html("Please wait..")
        },
        complete: function() {
            $("#fetchProfileFromILearnLink").find("a").html("Validate"), fetchProfileFromILearnRequestInProgress = !1
        },
        success: function(e) {
            if (void 0 !== e.status && 1 == e.status) {
                $("form#registerForm #registerBtn").length && $("form#registerForm #registerBtn").removeAttr("disabled"), $("#fetchProfileFromILearnLink").hide();
                var t = e.data;
                if ($("#Name").length) {
                    $("#Name").parents(".reg_name_div").show(), $("#Name").prop("readonly", !0);
                    var o = "";
                    "first_name" in t && void 0 !== t.first_name && "" !== t.first_name && (o = t.first_name, "last_name" in t && void 0 !== t.last_name && "" !== t.last_name && (o = o + " " + t.last_name), $("#Name").val(o))
                }
                var a = "";
                if ($("#FieldCountryOfResidence").length && ($("#FieldCountryOfResidence").prop("readonly", !0), "country_of_residence" in t && void 0 !== t.country_of_residence && "" !== t.country_of_residence && (a = t.country_of_residence, $("#FieldCountryOfResidence").val(a))), $("#Mobile").length) {
                    if ($("#Mobile").parents(".merge_field_div").show(), $("#Mobile").prop("readonly", !0), "mobile_no" in t && void 0 !== t.mobile_no && "" !== t.mobile_no) {
                        var i = t.mobile_no,
                            s = $.parseJSON(jsVars.iso_country_list),
                            n = "";
                        "" !== a && a in s && void 0 !== s[a] && (s[a] = String(s[a]), n = "+" + s[a], -1 !== i.indexOf(n) && (i = $.trim(i.substr(n.length))), -1 !== i.indexOf(s[a]) && (i = $.trim(i.substr(s[a].length)))), -1 !== i.indexOf(" ") && -1 !== i.indexOf("+") && ("" == n && (n = $.trim(i.substr(0, i.indexOf(" ")))), i = i.substr(i.indexOf(" ") + 1)), -1 !== i.indexOf("+") && (i = i.substr(i.indexOf("+") + 1)), i = i.split(" ").join(""), $("#ul_dial_codeMobile").length && $("#ul_dial_codeMobile").find("li").each(function() {
                            $(this).data("value") == n && ($(this).trigger("click"), $(this).parents("div.bs-dropdown-to-select-group").removeClass("open"), $("button.bs-dropdown-to-select").attr("aria-expanded", "false"), $("button.bs-dropdown-to-select").prop("disabled", !0))
                        }), $("#Mobile").val(i)
                    }
                    $("#Mobile").prop("readonly", !0)
                }
                $("#FieldLearningCenter").length && ($("#FieldLearningCenter").prop("readonly", !0), "learning_center" in t && void 0 !== t.learning_center && "" !== t.learning_center && $("#FieldLearningCenter").val(t.learning_center)), $("#FieldLearningCenterName").length && ($("#FieldLearningCenterName").prop("readonly", !0), "learning_center_name" in t && void 0 !== t.learning_center_name && "" !== t.learning_center_name && $("#FieldLearningCenterName").val(t.learning_center_name)), $("#Email").prop("readonly", !0)
            } else void 0 !== e.message && "" !== e.message ? ($(r).show(), $(r).html(e.message).css({
                color: "#f44336",
                display: "block"
            })) : ($(r).show(), $(r).html("Somethig went wrong. Please refresh the page and try again."))
        },
        error: function(e, t, r) {
            console.log(r + "\r\n" + e.statusText + "\r\n" + e.responseText)
        }
    }))
}

function showCharactersLeft(e, t, r) {
    var o = $("#" + e).val().length,
        a = parseInt(r);
    $("#" + t).html("Total characters count: " + o + "/" + a)
}

function changeYear(e, t, r, o, a, i, s) {
    if ($("#" + e).val(""), $("#" + e + "_month").length > 0) {
        if ($("#" + e + "_month").html('<option value="">' + i + "</option>"), $("#" + e + "_day").length > 0 && $("#" + e + "_day").html('<option value="">' + s + "</option>"), "" !== $("#" + e + "_year").val()) {
            var n = 1,
                l = 12;
            parseInt($("#" + e + "_year").val()) <= parseInt(r) && (n = parseInt(t)), parseInt($("#" + e + "_year").val()) >= parseInt(a) && (l = parseInt(o));
            for (var d = '<option value="">' + i + "</option>", c = n; c <= l; c++) {
                var g = c < 10 ? "0" + String(c) : String(c);
                d += '<option value="' + g + '">' + g + "</option>"
            }
            $("#" + e + "_month").html(d)
        }
    } else "" !== $("#" + e + "_year").val() && $("#" + e).val("01-01-" + $("#" + e + "_year").val())
}

function changeMonth(e, t, r, o, a, i, s, n) {
    if ($("#" + e).val(""), $("#" + e + "_day").length > 0) {
        if ($("#" + e + "_day").html('<option value="">' + n + "</option>"), "" !== $("#" + e + "_year").val() && "" !== $("#" + e + "_month").val()) {
            var l = parseInt($("#" + e + "_year").val()),
                d = parseInt($("#" + e + "_month").val()),
                c = 1,
                g = 31;
            [4, 6, 9, 11].indexOf(d) > -1 && (g = 30), 2 === d && (g = l % 4 == 0 ? 29 : 28), l <= parseInt(o) ? d <= parseInt(r) && (c = parseInt(t)) : l >= parseInt(s) && d >= parseInt(i) && (g = parseInt(a));
            for (var p = '<option value="">' + n + "</option>", u = c; u <= g; u++) {
                var m = u < 10 ? "0" + String(u) : String(u);
                p += '<option value="' + m + '">' + m + "</option>"
            }
            $("#" + e + "_day").html(p)
        }
    } else "" !== $("#" + e + "_year").val() && "" !== $("#" + e + "_month").val() && $("#" + e).val("01-" + $("#" + e + "_month").val() + "-" + $("#" + e + "_year").val())
}

function changeDay(e) {
    $("#" + e).val(""), "" !== $("#" + e + "_year").val() && "" !== $("#" + e + "_month").val() && $("#" + e).val($("#" + e + "_day").val() + "-" + $("#" + e + "_month").val() + "-" + $("#" + e + "_year").val())
}

function gotoLogin(e) {
    $("a[href='#cflogin']").trigger("click"), $("form#loginForm input[name='Email']").val(e)
}

function userRegisterByChat(e, t, r, o) {
    $.ajax({
        url: jsVars.preRegisterChatUrl,
        type: "post",
        data: {
            Email: e,
            mobile: t,
            name: r,
            type: o
        },
        dataType: "json",
        headers: {
            "X-CSRF-Token": jsVars._csrfToken
        },
        success: function(e) {
            e.success
        },
        error: function(e, t, r) {
            console.log(r + "\r\n" + e.statusText + "\r\n" + e.responseText)
        }
    })
}

function checkBypassOtp(e, t, r) {
    "+91" != $(e).data("value") && "1" == t ? ($(".hideShowOptBypass").hide(), $("#otpverifylinkMobile").hide()) : "registerBtn" === r && $(".hideShowOptBypass").show(), $("#showMObileVerified").hide()
}

function resendVerifyCode() {
    var e = $("#hashValue").val();
    if ("" == e) return !1;
    var t = {
        "X-CSRF-Token": $("form#forgotOtpForm input[name='_csrfToken']").val()
    };
    send_ajax_request(jsVars.ForgotPasswordUrl, "post", {
        hash: e
    }, function(e) {
        e.redirect ? location = e.redirect : e.error ? void 0 !== e.error.list.Email && alertPopup(e.error.list.Email, "error") : 200 == e.success && (e.location ? location = e.location : countdownStartFOrget())
    }, function() {
        $("#forget-password div.loader-block,#register-now div.loader-block").hide(), $(this).attr("disabled", !1)
    }, function() {
        $("#forget-password div.loader-block,#register-now div.loader-block").show(), $(this).attr("disabled", !0), $("#resent").hide()
    }, function(e, t, r) {
        console.log(r + "\r\n" + e.statusText + "\r\n" + e.responseText), $("#forget-password div.loader-block,#register-now div.loader-block").hide()
    }, t, {
        async: "false"
    })
}
$(function() {
    $("#ul_dial_codeMobile li").length > 0 && $("#ul_dial_codeMobile li").on("click", function() {
        var e = "",
            t = 0,
            r = 0;
        if (void 0 !== $(this).data("fieldid") && (e = (e = $(this).data("fieldid")).toLowerCase()), "mobile" == e) {
            var o = $(this).data("value");
            if ("" != o && "+91" != o) $("#StateId").length && ($("#StateId").val(""), void 0 !== $("select#StateId")[0].sumo && ($("select#StateId")[0].sumo.unSelectAll(), $("select#CityId")[0].sumo.unSelectAll())), $("#CityId").length && ($("#CityId").val(""), void 0 !== $("select#CityId")[0].sumo && $("select#CityId")[0].sumo.unSelectAll()), $(".chosen-select").length && $(".chosen-select").trigger("chosen:updated"), $("div.StateId, div.CityId").hide();
            else if ("+91" == o) {
                if ($("#StateId").length) t = $("#StateId").attr("field-hide-show");
                if ($("#CityId").length) r = $("#CityId").attr("field-hide-show");
                1 != t && $("div.StateId").show(), 1 != r && $("div.CityId").show()
            }
        }
    })
}), $(document).on("click", "#forgotVerifyCode", function() {
    var e = $("form#forgotOtpForm #otpcode").parents("div.form-group"),
        t = $("#hashValue").val();
    if ("" == t) return !1;
    var r = $("#otpcode").val();
    if ("" == r) return $(e).addClass("has-error"), $(e).find("span.help-block").text(""), $(e).find("span.help-block").append("Please enter otp code."), !1;
    var o = {
            hash: t,
            forget_otp: r
        },
        a = {
            "X-CSRF-Token": $("form#forgotOtpForm input[name='_csrfToken']").val()
        };
    send_ajax_request(jsVars.ForgotPasswordVerifyCode, "post", o, function(t) {
        t.redirect ? location = t.redirect : 0 == t.status ? ($(e).addClass("has-error"), $(e).find("span.help-block").text(""), $(e).find("span.help-block").append(t.message)) : 200 == t.status ? ($(e).find("span.help-block").text(""), $("#afterCodeVerify").show(), $("#resendVerifyCodeBtn").remove(), $("#forgotVerifyCode").remove(), $("#forgotOtpBtn").show()) : ($(e).addClass("has-error"), $(e).find("span.help-block").text(""), $(e).find("span.help-block").append(t.message))
    }, function() {
        $("#forget-password div.loader-block,#register-now div.loader-block").hide(), $(this).attr("disabled", !1)
    }, function() {
        $("#forget-password div.loader-block,#register-now div.loader-block").show(), $(this).attr("disabled", !0)
    }, function(e, t, r) {
        console.log(r + "\r\n" + e.statusText + "\r\n" + e.responseText), $("#forget-password div.loader-block,#register-now div.loader-block").hide()
    }, a)
}), $(document).on("click", "#forgotOtpBtn", function() {
    var e = $("form#forgotOtpForm #otpcode").parents("div.form-group");
    if ("" == $("#hashValue").val()) return !1;
    if ("" == $("#otpcode").val()) return $(e).addClass("has-error"), $(e).find("span.help-block").text(""), $(e).find("span.help-block").append("Please enter otp code."), !1;
    var t = $("form#forgotOtpForm input[name='_csrfToken']").val(),
        r = $("form#forgotOtpForm").serializeArray(),
        o = {
            "X-CSRF-Token": t
        };
    send_ajax_request(jsVars.ForgotPasswordChange, "post", r, function(e) {
        if (e.redirect) location = e.redirect;
        else if (0 == e.status) {
            var t = "Some thing went wrong, please try again.";
            if (void 0 !== e.Password) {
                var r = $("form#forgotOtpForm #forgot-new-password").parents("div.form-group");
                t = e.Password
            } else void 0 !== e.Confirm ? (r = $("form#forgotOtpForm #forgot-confirm-password").parents("div.form-group"), t = e.Confirm) : (t = e.message, r = $("form#forgotOtpForm #forgot-confirm-password").parents("div.form-group"));
            $(r).addClass("has-error"), $(r).find("span.help-block").text(""), $(r).find("span.help-block").append(t)
        } else 200 == e.status ? ($("span.help-block").text(""), $("div.form-group").removeClass("has-error"), $("#forget-password .npf-close").trigger("click"), $("#SuccessPopupArea .modal-title").text("Reset Password Sent"), $("#SuccessPopupArea p#MsgBody").text(e.message), $("#SuccessLink").trigger("click")) : (r = $("form#forgotOtpForm #otpcode").parents("div.form-group"), $(r).addClass("has-error"), $(r).find("span.help-block").text(""), $(r).find("span.help-block").append(e.message))
    }, function() {
        $("#forget-password div.loader-block,#register-now div.loader-block").hide(), $(this).attr("disabled", !1)
    }, function() {
        $("#forget-password div.loader-block,#register-now div.loader-block").show(), $(this).attr("disabled", !0)
    }, function(e, t, r) {
        console.log(r + "\r\n" + e.statusText + "\r\n" + e.responseText), $("#forget-password div.loader-block,#register-now div.loader-block").hide()
    }, o)
});
var isVarresendVlinkBtnUser = !1;

function validateUsersPassword(e) {
    var t = !1,
        r = $("#" + e).val(),
        o = 0,
        a = 0,
        i = 0,
        s = 0;
    $(".ul_new_password li").removeClass("active"), r.length >= 8 && (s = 1, $(".ul_new_password .password_len").addClass("active")), r.toLowerCase() !== r && (o = 1, $(".ul_new_password .capital").addClass("active")), r.toUpperCase(), /\d/.test(r) && (a = 1, $(".ul_new_password .numeric").addClass("active"));
    return 1 == /[!@#$%^&*()_+\-=\[\]{}`~;':"\\|,.<>\/?]/.test(r) && (i = 1, $(".ul_new_password .special").addClass("active")), 1 == o && 1 == a && 1 == s && 1 == i && (t = !0), t
}

function reloadImage(e) {
    var t = (new Date).getTime();
    $("#" + e).attr("src", jsVars.CaptchaLink + "?" + t)
}

function mobileNumberChanged(e) {
    $(e).parent().parent().find(".help-block").html(""), $("#registerBtn").removeAttr("disabled")
}
$(document).on("click", "#resendVlinkBtn", function() {
    $("span.help-block").text("");
    var e = $("form#resendVlinkForm input[name='_csrfToken']").val();
    if (1 != isVarresendVlinkBtnUser) {
        isVarresendVlinkBtnUser = !0;
        var t = $("form#resendVlinkForm #resentVerificationEmail ").parents("div.form-group");
        if ("" == $("#resentVerificationEmail").val()) return $(t).addClass("has-error"), $(t).find("span.help-block").text(""), $(t).find("span.help-block").append("Please enter email id."), isVarresendVlinkBtnUser = !1, !1;
        var r = {
                email: jQuery('form#resendVlinkForm input[name="email"]').val()
            },
            o = {
                "X-CSRF-Token": e
            };
        send_ajax_request(jsVars.studentResendVerificationLink, "post", r, function(e) {
            isVarresendVlinkBtnUser = !1, e.redirect ? location = e.redirect : 0 == e.status && "csrf" != e.message ? ($(t).addClass("has-error"), $(t).find("span.help-block").text(""), $(t).find("span.help-block").append(e.message)) : 200 == e.status ? ($("span.help-block").text(""), $("div.form-group").removeClass("has-error"), $("#resentVerificationEmail .npf-close").trigger("click"), $("#SuccessPopupArea .modal-title").text("Verification Email Sent"), $("#SuccessPopupArea p#MsgBody").text(e.message), $("#SuccessLink").trigger("click")) : "csrf" != e.message && ($(t).addClass("has-error"), $(t).find("span.help-block").text(""), $(t).find("span.help-block").append(e.message))
        }, function() {
            $("#forget-password div.loader-block,#register-now div.loader-block").hide(), $(this).attr("disabled", !1)
        }, function() {
            $("#forget-password div.loader-block,#register-now div.loader-block").show(), $(this).attr("disabled", !0)
        }, function(e, t, r) {
            console.log(r + "\r\n" + e.statusText + "\r\n" + e.responseText), $("#resentVerificationEmail div.loader-block,#register-now div.loader-block").hide()
        }, o)
    }
}), $(document).on("keypress", "#resendVlinkForm input", function(e) {
    13 == e.which && (e.preventDefault(), $(this).parents("form").find("button").trigger("click").focus())
});
var sendLoginWithPasswordData = 0;

function pushLoginDatainDatalayer() {
    524 == $("#collegeId").val() && 0 === sendLoginWithPasswordData && (window.dataLayer = window.dataLayer || [], dataLayer.push({
        event: "Login",
        category: "Login",
        action: "Submit",
        label: "Login with Email & Password"
    }), sendLoginWithPasswordData = 1)
}
var sendRegisterWithFormData = 0;

function pushRegisterDatainDatalayer(e, t, r, o, a, i, s) {
    if (524 == $("#collegeId").val() && 0 === sendRegisterWithFormData) {
        window.dataLayer = window.dataLayer || [];
        var n = {
            event: "New User Registration",
            category: "New User Registration",
            action: "Submit",
            label: "Register with Registration Form"
        };
        void 0 !== i && (n.pageType = "Widget", n.pageName = i), void 0 !== e && (n.mobileNo = e), void 0 !== t && (n.utm_source = t), void 0 !== r && (n.utm_medium = r), void 0 !== o && (n.utm_campaign = o), void 0 !== a && (n.pageUrl = a), void 0 !== s && (n.hostName = s), dataLayer.push(n), sendRegisterWithFormData = 1
    }
}

function showFieldsAndtriggerWebhooks(e, t) {
    if ($("span.help-block").text(""), $("#callingevent").val(e), 1 !== t) return registerUser(), !0;
    var r = $("form#registerForm input[name='_csrfToken']").val(),
        o = $("form#registerForm").serializeArray();
    o.push({
        name: "event",
        value: e
    }), $.ajax({
        url: jsVars.widgetCallingUrl,
        type: "post",
        data: o,
        dataType: "html",
        headers: {
            "X-CSRF-Token": r
        },
        beforeSend: function() {
            $("form#registerForm #callNowBtn").attr("disabled", "disabled"), $("form#registerForm #scheduleCallBtn").attr("disabled", "disabled")
        },
        complete: function() {
            $("form#registerForm #callNowBtn").removeAttr("disabled"), $("form#registerForm #scheduleCallBtn").removeAttr("disabled")
        },
        success: function(e) {
            e = JSON.parse(e), $(".agree-group").before(e.html), $("#callNowBtn").hide(), $("#scheduleCallBtn").hide(), $("#registerBtn").text(e.submitBtnText), $("#registerBtn").show(), $("#resetBtn").show()
        },
        error: function(e, t, r) {
            console.log(r + "\r\n" + e.statusText + "\r\n" + e.responseText), $("#register-now div.loader-block").hide(), isVarRegisterUser = !1
        }
    })
}

function getDynamicFieldDependencyLPU(e, t) {
    if ("string" != typeof e || "" === e || null === e) return [];
    $.ajax({
        url: jsVars.lpuDynamicFieldDependencyLink,
        type: "post",
        data: {
            field: e
        },
        async: !0,
        dataType: "json",
        beforeSend: function() {
            $("#register-now div.loader-block,#register-page div.loader-block").show()
        },
        complete: function() {
            $("#register-now div.loader-block,#register-page div.loader-block").hide()
        },
        success: function(e) {
            if (e.redirect) location = e.redirect;
            else if (1 == e.status)
                for (let r in e.data) t[r] = e.data[r]
        },
        error: function(e, t, r) {
            console.log(r + "\r\n" + e.statusText + "\r\n" + e.responseText)
        }
    })
}

function getDynamicFieldValueMappingLPU(e, t) {
    if ("string" != typeof e || "" === e || null === e) return [];
    $.ajax({
        url: jsVars.lpuDynamicFieldValueMappingLink,
        type: "post",
        data: {
            field: e
        },
        async: !0,
        dataType: "json",
        beforeSend: function() {
            $("#register-now div.loader-block,#register-page div.loader-block").show()
        },
        complete: function() {
            $("#register-now div.loader-block,#register-page div.loader-block").hide()
        },
        success: function(e) {
            if (e.redirect) location = e.redirect;
            else if (1 == e.status)
                for (let r in e.data) t[r] = e.data[r]
        },
        error: function(e, t, r) {
            console.log(r + "\r\n" + e.statusText + "\r\n" + e.responseText)
        }
    })
}

function loadCustomDateTime() {
    $(".registration-date").length && $(".registration-date").each(function() {
        var e = $(this).data("format"),
            t = $(this).data("startdate"),
            r = $(this).data("enddate");
        "DD/MM/YYYY" == e ? $(this).datepicker({
            startView: "decade",
            format: "dd/mm/yyyy",
            enableYearToMonth: !0,
            enableMonthToDay: !0,
            startDate: t,
            endDate: r
        }) : "MM/YYYY" == e ? $(this).datepicker({
            startView: "decade",
            format: "mm/yyyy",
            minViewMode: "months",
            startDate: t,
            endDate: r
        }) : "YYYY" == e && $(this).datepicker({
            startView: "decade",
            format: "yyyy",
            minViewMode: "years",
            startDate: String(t),
            endDate: String(r)
        })
    }), $(".registration-date-time").length && $(".registration-date-time").each(function() {
        var e = $(this).data("format"),
            t = $(this).data("startdate"),
            r = $(this).data("enddate"),
            o = $(this).data("customdays"),
            a = [];
        for (var i in o.weeks) "0" === o.weeks[i] && a.push(i);
        var s = new Date,
            n = new Date;
        n.setDate(n.getDate() + 7), "DD/MM/YYYY" == e ? $(this).datetimepicker({
            format: "DD/MM/YYYY HH:mm",
            daysOfWeekDisabled: a,
            minDate: s,
            maxDate: n
        }) : "MM/YYYY" == e ? $(this).datepicker({
            startView: "decade",
            format: "mm/yyyy",
            minViewMode: "months",
            startDate: t,
            endDate: r
        }) : "YYYY" == e && $(this).datepicker({
            startView: "decade",
            format: "yyyy",
            minViewMode: "years",
            startDate: String(t),
            endDate: String(r)
        })
    }), $(".registration-date-time").val("")
}

function resetShowFields() {
    $("div.widget-show-fields").remove(), $("#callingevent").val(""), $("#callNowBtn").show(), $("#scheduleCallBtn").show(), $("#registerBtn").text("Register"), $("#registerBtn").hide(), $("#resetBtn").hide()
}

function resetInputFile(e) {
    var t = $(e).data("id");
    $("#" + t).val(""), $("#" + t + "_choose_files").val("")
}

function showSelectedFiles(e) {
    $("#" + e).parent().removeClass("file"), $("#" + e + "_choose_files").val("");
    for (var t = document.getElementById(e), r = (document.getElementById(e + "_show"), document.getElementById(e + "_choose_files")), o = "", a = 0; a < t.files.length; ++a) a > 0 ? o = a + 1 + " files" : o += t.files.item(a).name, '<span class="badge">' + t.files.item(a).name + "</span>&nbsp;";
    r.value = o
}

function downloadWidgetPDF(e) {
    var t = jsVars.FULL_URL + "/downloadWidgetPdf/" + btoa(e);
    window.top.location = t
}

function registrationDataLayerData(e) {
    var t = 0;
    if ("collegeId" in e && e.collegeId && (t = e.collegeId), 0 === t) return !0;
    var r = 0;
    if ("configureDatalayerColleges" in e && e.configureDatalayerColleges && -1 !== $.inArray(t, e.configureDatalayerColleges) && (r = 1), 0 === r) return !0;
    window.dataLayer = window.dataLayer || [];
    var o = {};
    "name" in e && e.name && (o.name = e.name), "email" in e && e.email && (o.email = e.email), "mobile" in e && e.mobile && (o.mobile = e.mobile), dataLayer.push(o)
}

function alertPopup(e, t, r) {
    if ("error" == t) var o = "#ErrorPopupArea",
        a = "#ErroralertTitle",
        i = "#ErrorMsgBody",
        s = "#ErrorOkBtn",
        n = "Error";
    else if ("alert" == t) o = "#SuccessPopupArea", a = "#SuccessPopupArea #alertTitle", i = "#MsgBody", s = "#OkBtn", n = "Alert";
    else if ("Preview" == t) o = "#SuccessPopupArea", a = "#SuccessPopupArea #alertTitle", i = "#MsgBody", s = "#OkBtn", n = "Preview";
    else o = "#SuccessPopupArea", a = "#alertTitle", i = "#MsgBody", s = "#OkBtn", n = "Success";
    $(a).html(n), $(o + " " + i).html(e), $(".oktick").hide(), void 0 !== r ? ($(s).show(), $(o).modal({
        keyboard: !1
    }).one("click", s, function(e) {
        window.location.href = r
    })) : $(o).modal()
}
$('[data-toggle="tooltip"]').length && $('[data-toggle="tooltip"]').tooltip(), $("select[data-limit]").map((e, t) => {
    $(t).attr("data-limit");
    $(t).closest(".form-group").append(`<span class="validation-limit small">Max ${+parseInt($(t).data("limit"))} selections allowed!</span>`)
}), $(document).on("show.bs.select", "select[data-limit]", function(e) {
    $(e).hasClass("selectpicker") && $(e).selectpicker({
        maxOptions: +parseInt($(e).data("limit"))
    })
}), $(document).on("change", "select[data-limit]", function() {
    $(this).hasClass("sumo-select") && window.innerWidth < 767 && ($(this).val().length >= parseInt($(this).data("limit")) ? $(this).closest(".SumoSelect").find(".optWrapper ul.options .opt:not('.selected')").css({
        "pointer-events": "none",
        opacity: ".6"
    }) : $(this).closest(".SumoSelect").find(".optWrapper ul.options .opt:not('.selected')").css({
        "pointer-events": "",
        opacity: "1"
    }))
});