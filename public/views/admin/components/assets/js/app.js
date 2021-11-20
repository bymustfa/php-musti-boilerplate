/*
 Template Name: Stexo - Responsive Bootstrap 4 Admin Dashboard
 Author: Themesdesign
 Website: www.themesdesign.in
 File: Main js
 */

!(function ($) {
  "use strict";

  $(".switchery").each((key, element) => {
    let options = { language: "tr" };
    Object.keys($(element).data()).map((data) => {
      options[data] = $(element).data(data);
    });

    let switchery = new Switchery(element, options);
  });

  $(".select2").each((index, element) => {
    let width = $(element).attr("select2-width")
      ? $(element).attr("select2-width")
      : "100%";

    let placeholder =
      $(element).attr("placeholder") && $(element).attr("placeholder");

    let options = {
      width: width,
      placeholder: placeholder,
    };
    let dropdownParentString = $(element).attr("select2-parent")
      ? $(element).attr("select2-parent")
      : null;

    let dropdownParent = dropdownParentString && $("#" + dropdownParentString);

    if (dropdownParentString) options["dropdownParent"] = dropdownParent;

    $(element).select2(options);
  });

  Parsley.addMessages("tr", {
    defaultMessage: "Girdiğiniz değer geçerli değil.",
    type: {
      email: "Geçerli bir e-mail adresi yazmanız gerekiyor.",
      url: "Geçerli bir bağlantı adresi yazmanız gerekiyor.",
      number: "Geçerli bir sayı yazmanız gerekiyor.",
      integer: "Geçerli bir tamsayı yazmanız gerekiyor.",
      digits: "Geçerli bir rakam yazmanız gerekiyor.",
      alphanum: "Geçerli bir alfanümerik değer yazmanız gerekiyor.",
    },
    notblank: "Bu alan boş bırakılamaz.",
    required: "Bu alan boş bırakılamaz.",
    pattern: "Girdiğiniz değer geçerli değil.",
    min: "Bu alan %s değerinden büyük ya da bu değere eşit olmalı.",
    max: "Bu alan %s değerinden küçük ya da bu değere eşit olmalı.",
    range: "Bu alan %s ve %s değerleri arasında olmalı.",
    minlength: "Bu alanın uzunluğu %s karakter veya daha fazla olmalı.",
    maxlength: "Bu alanın uzunluğu %s karakter veya daha az olmalı.",
    length: "Bu alanın uzunluğu %s ve %s karakter arasında olmalı.",
    mincheck: "En az %s adet seçim yapmalısınız.",
    maxcheck: "En fazla %s seçim yapabilirsiniz.",
    check: "Bu alan için en az %s, en fazla %s seçim yapmalısınız.",
    equalto: "Bu alanın değeri aynı olmalı.",
  });

  Parsley.setLocale("tr");

  var MainApp = function () {
    (this.$body = $("body")),
      (this.$wrapper = $("#wrapper")),
      (this.$btnFullScreen = $("#btn-fullscreen")),
      (this.$leftMenuButton = $(".button-menu-mobile")),
      (this.$menuItem = $(".has_sub > a"));
  };

  (MainApp.prototype.intSlimscrollmenu = function () {
    $(".slimscroll-menu").slimscroll({
      height: "auto",
      position: "right",
      size: "7px",
      color: "#9ea5ab",
      wheelStep: 5,
      touchScrollStep: 50,
    });
  }),
    (MainApp.prototype.initSlimscroll = function () {
      $(".slimscroll").slimscroll({
        height: "auto",
        position: "right",
        size: "7px",
        color: "#9ea5ab",
        touchScrollStep: 50,
      });
    }),
    (MainApp.prototype.initMetisMenu = function () {
      //metis menu
      $("#side-menu").metisMenu();
    }),
    (MainApp.prototype.initLeftMenuCollapse = function () {
      // Left menu collapse
      $(".button-menu-mobile").on("click", function (event) {
        event.preventDefault();
        $("body").toggleClass("enlarged");
      });
    }),
    (MainApp.prototype.initEnlarge = function () {
      if ($(window).width() < 1025) {
        $("body").addClass("enlarged");
      } else {
        if ($("body").data("keep-enlarged") != true)
          $("body").removeClass("enlarged");
      }
    }),
    (MainApp.prototype.initActiveMenu = function () {
      // === following js will activate the menu in left side bar based on url ====
      $("#sidebar-menu a").each(function () {
        var pageUrl = window.location.href.split(/[?#]/)[0];
        if (this.href == pageUrl) {
          $(this).addClass("mm-active");
          $(this).parent().addClass("mm-active"); // add active to li of the current link
          $(this).parent().parent().addClass("mm-show");
          $(this).parent().parent().prev().addClass("mm-active"); // add active class to an anchor
          $(this).parent().parent().parent().addClass("mm-active");
          $(this).parent().parent().parent().parent().addClass("mm-show"); // add active to li of the current link
          $(this)
            .parent()
            .parent()
            .parent()
            .parent()
            .parent()
            .addClass("mm-active");
        }
      });
    }),
    (MainApp.prototype.initComponents = function () {
      $('[data-toggle="tooltip"]').tooltip();
      $('[data-toggle="popover"]').popover();
    }),
    //full screen
    (MainApp.prototype.initFullScreen = function () {
      var $this = this;
      $this.$btnFullScreen.on("click", function (e) {
        e.preventDefault();

        if (
          !document.fullscreenElement &&
          /* alternative standard method */ !document.mozFullScreenElement &&
          !document.webkitFullscreenElement
        ) {
          // current working methods
          if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
          } else if (document.documentElement.mozRequestFullScreen) {
            document.documentElement.mozRequestFullScreen();
          } else if (document.documentElement.webkitRequestFullscreen) {
            document.documentElement.webkitRequestFullscreen(
              Element.ALLOW_KEYBOARD_INPUT
            );
          }
        } else {
          if (document.cancelFullScreen) {
            document.cancelFullScreen();
          } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
          } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
          }
        }
      });
    }),
    (MainApp.prototype.init = function () {
      this.intSlimscrollmenu();
      this.initSlimscroll();
      this.initMetisMenu();
      this.initLeftMenuCollapse();
      this.initEnlarge();
      this.initActiveMenu();
      this.initComponents();
      this.initFullScreen();
      Waves.init();
    }),
    //init
    ($.MainApp = new MainApp()),
    ($.MainApp.Constructor = MainApp);
})(window.jQuery),
  //initializing
  (function ($) {
    "use strict";
    $.MainApp.init();
  })(window.jQuery);
