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
  var x = $(p_this).parent().find("input")[0];
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
      btnTpl: {
          smallBtn: "",
      },
      touch: false,
      clickSlide: clickSlide,
      clickOutside: clickOutside,
    },
  });
};

var AlertMessage = function (title, message,urlBack) {
  Swal.fire({
    title: `<span class="fz-24 fw-medium">`+title+`</span>`,
    html: `<p class="fz-14 mb-0 text-start">`+message+`</p>`,
    width: 600,
    padding: '24px 40px',
    position: "center",
    showCancelButton: false,
    showDenyButton: false,
    customClass: {
      container: "swal2-style",
      confirmButton: "btn btn-primary border-0",
    },
    confirmButtonText: "Đóng",
    buttonsStyling: false,
  }).then((result) => {
    if (result.isConfirmed) {
      if (urlBack.length > 0) {
        window.location.href = urlBack;
      }
    }
  });
};

var fancybox_new_modal = function (source) {
  parent.jQuery.fancybox.getInstance().close();
  fancybox_modal(source, false);
};

var copy_text = function (element) {
  var $temp = $("<input>");
  $("body").append($temp);
  $temp.val($(element).prev().text()).select();
  document.execCommand("copy");
  $(element).text("Đã sao chép");
  $temp.remove();
};

var timer;
var countdownOtp = function () {
  var count = 60;
  $("#otp-timer,#otp-text").show();
  $("#otp-timer").text(count);
  timer = setTimeout(update, 1000);

  function update() {
    if (count > 0) {
      $("#otp-timer").text(--count);
      timer = setTimeout(update, 1000);
    } else {
      $("#otp-timer,#otp-text").hide();
      // alert("Done!!!");
    }
  }
};

var resendOtp = function () {
  clearTimeout(timer);
  countdownOtp();
};

var showDateRange = function (element) {
  let val = $(element).val();
  if (val == 6) {
    $("#date-range").show();
  } else {
    $("#date-range").hide();
  }
};

// $(document).ready(function () {
//   let clock;

//   // Giờ hiện tại
//   let currentDate = new Date();

//   // Mục tiêu ngày trong tương lai
//   let targetDate = moment.tz("2022-08-29 23:59", "Asia/Bangkok");

//   // Tính chênh lệch tính theo giây giữa ngày trong tương lai và hiện tại
//   let diff = targetDate / 1000 - currentDate.getTime() / 1000;

//   console.log(diff <= 0);

//   if (diff <= 0) {
//     // Nếu đếm ngược trở về 0
//     clock = $(".clock").FlipClock(0, {
//       clockFace: "Đếm ngược",
//       countdown: true,
//       autostart: false,
//       showSeconds: false,
//     });
//     console.log("Ngày đã trôi qua!");
//   } else {
//     // Chạy đồng hồ đếm ngược
//     clock = $(".clock").FlipClock(diff, {
//       clockFace: "DailyCounter",
//       showSeconds: false,
//       callbacks: {
//         stop: function () {
//           console.log("Hẹn giờ đã kết thúc!");
//         },
//       },
//     });

//     // Kiểm tra khi bộ đếm thời gian về 0, sau đó dừng ở 0
//     // setTimeout(function() {
//     //   checktime();
//     // }, 1000);

//     // function checktime() {
//     //   t = clock.getTime();
//     //   if (t <= 0) {
//     //     clock.setTime(0);
//     //   }
//     //   setTimeout(function() {
//     //     checktime();
//     //   }, 1000);
//     // }
//   }
// });



function includeHTML() {
  var z, i, elmnt, file, xhttp;
  /* Loop through a collection of all HTML elements: */
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    /*search for elements with a certain atrribute:*/
    file = elmnt.getAttribute("include-html");
    if (file) {
      /* Make an HTTP request using the attribute value as the file name: */
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
          if (this.status == 200) {elmnt.innerHTML = this.responseText;}
          if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
          /* Remove the attribute, and call this function once more: */
          elmnt.removeAttribute("include-html");
          includeHTML();
        }
      }
      xhttp.open("GET", file, true);
      xhttp.send();
      /* Exit the function: */
      return;
    }
  }
}


// UPload file
$(document).ready(function () {

  function padTo2Digits(num) {
      return num.toString().padStart(2, '0');
  }

  function formatDate(date) {
      return [
          padTo2Digits(date.getMonth() + 1),
          padTo2Digits(date.getDate()),
          date.getFullYear(),
      ].join('/');
  }

  $('.input-file').each(function (index, elem) {
      let file_list = $(elem).closest('tr').find('.input-list-files');
      $(elem).on('change', function (event) {
          var files = event.target.files;
          for (var i = 0; i < files.length; i++) {
              var file = files[i];
              console.log(file);
              var html = `<div class="file-item">
                              <div class="file-item__text">${file.name}</div>
                              <div class="file-item__remove" data-id="${file.name}">Xoá</div>
                          </div>`;
              file_list.append(html);
          }
      });
  });


  $('body').on('click', '.file-item__remove', function () {
      $(this).parent('.file-item').remove();
  });

});
