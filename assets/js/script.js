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

var AlertMessage = function (title, message, urlBack) {
  Swal.fire({
    title: `<span class="fz-24 fw-medium">` + title + `</span>`,
    html: `<p class="fz-14 mb-0 text-start">` + message + `</p>`,
    width: 600,
    padding: "24px 40px",
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
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
          if (this.status == 200) {
            elmnt.innerHTML = this.responseText;
          }
          if (this.status == 404) {
            elmnt.innerHTML = "Page not found.";
          }
          /* Remove the attribute, and call this function once more: */
          elmnt.removeAttribute("include-html");
          includeHTML();
        }
      };
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
    return num.toString().padStart(2, "0");
  }

  function formatDate(date) {
    return [
      padTo2Digits(date.getMonth() + 1),
      padTo2Digits(date.getDate()),
      date.getFullYear(),
    ].join("/");
  }

  $(".input-file").each(function (index, elem) {
    let file_list = $(elem).closest("tr").find(".input-list-files");
    $(elem).on("change", function (event) {
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

  $("body").on("click", ".file-item__remove", function () {
    $(this).parent(".file-item").remove();
  });
  
  // Countdown

  const myCountdown = new countdown({
    target: '.countdown',
    dayWord: ' days',
    hourWord: ' hours',
    minWord: ' mins',
    secWord: ' seconds'
  });

});

var dragNdrop = function (event) {
  console.log(event);
  let fileName = URL.createObjectURL(event.target.files[0]);
  let preview = document.getElementById("input-file-avatar");
  let removeImg = document.getElementById("input-remove-avatar");
  let previewImg = document.createElement("img");
  previewImg.setAttribute("src", fileName);
  preview.innerHTML = "";
  removeImg.innerHTML =
    '<a href="javascript:;" onclick="removeAvatar(this);" class="text-danger">Xoá ảnh đại diện</a>';
  preview.appendChild(previewImg);
};
var removeAvatar = function () {
  let preview = document.getElementById("input-file-avatar");
  let removeImg = document.getElementById("input-remove-avatar");
  preview.innerHTML = `<?xml version="1.0" encoding="utf-8"?>
  <svg version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="169px" height="175px" xmlns="http://www.w3.org/2000/svg">
    <g transform="matrix(1 0 0 1 -925 -424 )">
      <path d="M 51.68080357142858 6.933593749999997  C 62.117559523809526 2.3111979166666656  73.05729166666667 0  84.5 0  C 95.94270833333334 0  106.8824404761905 2.3111979166666656  117.31919642857143 6.933593749999997  C 127.7559523809524 11.555989583333329  136.74665178571428 17.7734375  144.29129464285714 25.585937499999993  C 151.83593750000003 33.3984375  157.84021577380955 42.708333333333314  162.30412946428572 53.51562499999999  C 166.76804315476193 64.32291666666666  169 75.65104166666666  169 87.5  C 169 99.28385416666667  166.78376116071428 110.57942708333333  162.35128348214286 121.38671874999999  C 157.91880580357144 132.19401041666669  151.93024553571428 141.50390625  144.38560267857144 149.31640625  C 136.84095982142856 157.12890625  127.85026041666669 163.36263020833331  117.41350446428572 168.017578125  C 106.97674851190477 172.67252604166666  96.00558035714285 175  84.5 175  C 72.99441964285714 175  62.02325148809525 172.68880208333334  51.586495535714285 168.06640625  C 41.149739583333336 163.44401041666666  32.17475818452381 157.21028645833331  24.66155133928571 149.365234375  C 17.148344494047617 141.52018229166666  11.159784226190476 132.21028645833334  6.695870535714286 121.435546875  C 2.231956845238095 110.66080729166664  0 99.34895833333331  0 87.5  C 0 75.65104166666666  2.231956845238095 64.32291666666666  6.695870535714286 53.51562499999999  C 11.159784226190476 42.708333333333314  17.1640625 33.3984375  24.708705357142858 25.585937499999993  C 32.253348214285715 17.7734375  41.24404761904762 11.555989583333329  51.68080357142858 6.933593749999997  Z M 114.01841517857143 100  C 129.10770089285714 100  138.72712053571428 110.64453125  142.87667410714286 131.93359375  C 152.24460565476193 118.58723958333334  156.92857142857144 103.77604166666666  156.92857142857144 87.5  C 156.92857142857144 77.34375  155.01097470238096 67.64322916666666  151.17578125 58.39843749999999  C 147.34058779761907 49.15364583333333  142.18508184523813 41.17838541666665  135.70926339285714 34.47265624999999  C 129.2334449404762 27.766927083333336  121.53162202380953 22.428385416666657  112.60379464285715 18.45703125  C 103.67596726190477 14.485677083333323  94.30803571428572 12.499999999999995  84.5 12.499999999999995  C 74.69196428571428 12.499999999999995  65.32403273809524 14.485677083333323  56.39620535714286 18.45703125  C 47.46837797619048 22.428385416666657  39.76655505952382 27.766927083333336  33.29073660714286 34.47265624999999  C 26.81491815476191 41.17838541666665  21.659412202380953 49.15364583333333  17.82421875 58.39843749999999  C 13.98902529761905 67.64322916666666  12.071428571428571 77.34375  12.071428571428571 87.5  C 12.071428571428571 103.77604166666666  16.7553943452381 118.58723958333334  26.123325892857142 131.93359375  C 30.27287946428571 110.64453125  39.89229910714286 100  54.98158482142858 100  C 63.2178199404762 108.33333333333334  73.05729166666667 112.49999999999999  84.5 112.49999999999999  C 95.94270833333334 112.49999999999999  105.78218005952381 108.33333333333334  114.01841517857143 100  Z M 110.10463169642857 95.263671875  C 117.177734375 87.939453125  120.71428571428572 79.1015625  120.71428571428572 68.75000000000001  C 120.71428571428572 58.39843749999999  117.177734375 49.560546875  110.10463169642857 42.23632812499999  C 103.03152901785715 34.91210937500001  94.49665178571428 31.250000000000007  84.5 31.250000000000007  C 74.50334821428572 31.250000000000007  65.96847098214286 34.91210937500001  58.89536830357142 42.23632812499999  C 51.822265625 49.560546875  48.285714285714285 58.39843749999999  48.285714285714285 68.75000000000001  C 48.285714285714285 79.1015625  51.822265625 87.939453125  58.89536830357142 95.263671875  C 65.96847098214286 102.58789062499999  74.50334821428572 106.25000000000001  84.5 106.25000000000001  C 94.49665178571428 106.25000000000001  103.03152901785715 102.58789062499999  110.10463169642857 95.263671875  Z " fill-rule="nonzero" fill="#f59a23" stroke="none" transform="matrix(1 0 0 1 925 424 )" />
    </g>
  </svg>`;
  removeImg.innerHTML = "";
};
var drag = function () {
  document.getElementById("avatar").parentNode.className = "draging dragBox";
};
var drop = function () {
  document.getElementById("avatar").parentNode.className = "dragBox";
};


