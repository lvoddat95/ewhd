$(function () {
    if ($("#main-menu").length > 0) {
        if (typeof hcOffcanvasNav == "undefined") {
            console.warn("Warning - hcOffcanvasNav Js is not loaded.");
            return;
        }
        if ($(".navbar-toggle").length == 0) {
            console.warn(
                "Warning - Thieu button sidebar-mobile-main-toggle. Kiem tra lai HTML!"
            );
            return;
        }
        var $nav = $("#main-menu").hcOffcanvasNav({
            disableAt: 1200,
            customToggle: ".navbar-toggle",
            levelSpacing: 0,
            navTitle: "Danh Sách Menu",
            levelTitles: true,
            levelTitleAsBack: true,
            // pushContent: '#ci-content',
            labelBack: "Quay lại",
            labelClose: "",
        });
        var Nav = $nav.data("hcOffcanvasNav");
    }

    // Len dau trang
    $(".go-top").on("click", function () {
        $("html, body").animate(
            {
                scrollTop: 0,
            },
            500
        );
    });
});

// Show pass
var show_password = function (p_this) {
    var x = document.getElementById("password-input");
    if (x.type === "password") {
        x.type = "text";
        $(p_this).addClass("show");
    } else {
        x.type = "password";
        $(p_this).removeClass("show");
    }
};

var fancybox_modal = function (source, closeMethod = "true") {
    if (closeMethod == false) {
        clickSlide = false;
        clickOutside = false;
    } else {
        clickSlide = "close";
        clickOutside = "close";
    }

    $.fancybox.open({
        src: source,
        opts: {
            // btnTpl: {
            //     smallBtn: "",
            // },
            touch: false,
            clickSlide: clickSlide,
            clickOutside: clickOutside,
        },
    });
};

var AlertMessage = function (source, urlBack) {
    Swal.fire({
        template: "#alert-message-template",
        title: "<strong>THÔNG BÁO</strong>",
        html: $(source).html(),
        width: 600,
        backdrop: `rgba(0,0,0,.8)`,
        position: "center",
        showCancelButton: false,
        showDenyButton: false,
        customClass: {
            htmlContainer: "entry_content",
            confirmButton: "btn ci-btn ci-bg-sub-color",
        },
        buttonsStyling: false,
    }).then((result) => {
        if (result.isConfirmed) {
            window.location.href = urlBack;
        }
    });
};

var fancybox_new_modal = function (source) {
    parent.jQuery.fancybox.getInstance().close();
    fancybox_modal(source, false);
};

var show_package_select = function (p_this) {
    $(".package-select").slideToggle("fast");
};

var copy_text = function (element) {
    var $temp = $("<input>");
    $("body").append($temp);
    $temp.val($(element).prev().text()).select();
    document.execCommand("copy");
    $(element).text("Đã sao chép");
    $temp.remove();
};
