$(document).ready(function () {
  // Table begin

  let table;
  let url = $("#dataTable").data("url");
  let page = 1;

  function pagination(data) {
    if (data) {
      $("#tableInfo").html(
        `Toplam <b>${data.total}</b> kayıttan <b>${
          data.from ? data.from : 0
        }</b> ile <b>${data.to ? data.to : 0}</b> arası gösteriliyor.`
      );
      const { links } = data;
      let html = "";
      links.map((link) => {
        let p = link.url && link.url != "..." ? link.url.split("=")[1] : null;
        link.label =
          link.label == "Previous"
            ? "«"
            : link.label == "Next"
            ? "»"
            : link.label;

        html += ` <li class="page-item  ${link.active && "active"}">
              <a class="page-link ${p && "tablePage"}" 
                ${p && 'data-page="' + p + '"'}
                 href="javascript:;">${link.label}
                 </a>
        </li>`;
      });
      $("#pagination").html(html);
    }
  }

  $("body").on("click", ".tablePage", function () {
    page = $(this).data("page");
    tableF();
  });

  tableF();

  function tableF(
    URL = `${url}${page}`,
    type = "GET",
    dataSrc = function (json) {
      pagination(json);
      return json.data;
    }
  ) {
    table = $("#dataTable").DataTable({
      destroy: true,
      responsive: true,
      processing: true,
      serverSide: true,
      filter: true,
      orderMulti: false,
      ordering: false,

      pageLength: 25,
      lengthMenu: [
        [10, 25, 50, 100, -1],
        ["10 Adet", "25 Adet", "50 Adet", "100 Adet", "Tümü"],
      ],

      ajax: {
        url: URL,
        type: type,
        dataSrc: dataSrc,
      },
      columns: [
        { data: "user_name" },
        { data: "user_mail" },
        { data: "user_phone" },
        { data: "user_mail_verification" },
        { data: "add_date" },
        { Veri: "İşlemler", responsivePriority: -1 },
      ],
      columnDefs: [
        {
          targets: 0,
          title: "Ad Soyad",
        },
        {
          targets: 1,
          title: "E-posta",
        },
        {
          targets: 2,
          title: "Telefon",
        },
        {
          targets: 3,
          title: "E-posta Doğrulama",
          width: "200px",
          render: function (data, type, full, meta) {
            return full.user_mail_verification === "1"
              ? `<span class="text-success">Doğrulandı</span>`
              : `<span class="text-danger">Doğrulanmadı</span>`;
          },
        },
        {
          targets: 4,
          title: "Kayıt Tarihi",
          render: function (data, type, full, meta) {
            return moment(full.add_date).format("DD MMM YYYY H:m");
          },
        },

        {
          targets: -1,
          title: "İşlemler",
          width: "75px",
          orderable: false,
          render: function (data, type, full, meta) {
            return `  <a class="nav-link btnEditCategory" href="javascript:;" data-id='${full.id}'>
                                        <i class="nav-icon mdi mdi-square-edit-outline" ></i>
                                        <span class="nav-text">Düzenle</span>
                                    </a>`;
          },
        },
      ],

      dom: ` <'row'
              <'col-sm-12 col-md-10 ' <"#toolbar"> >
              <'col-sm-12 col-md-2'>
              >
              <'row'<'col-sm-12 'tr>>
              <'row'
              <'col-sm-12 col-md-5'>
              <'col-sm-12 col-md-7'>
              >`,
    });
  }

  //  Table end

  // Edit begin

  $("body").on("click", ".btnEditCategory", function () {
    let id = $(this).data("id");
    $.get(BASE_URL + "api/users/get-user/" + id, function (response) {
      if (response.status) {
        let data = response.data;

        Object.keys(data).map((key) => {
          $("#UserUpdateForm")
            .find('[name="' + key + '"]')
            .val(data[key]);
        });
        let veri =
          data.user_mail_verification === 1
            ? ` <span> Üye <b class="text-success">
                ${moment(data.user_verification_date).format(
                  "DD MMM YYYY H:m"
                )} </b>
                tarihinde e-posta doğrulaması yapmıştır. </span> `
            : ` <span class="text-danger">E-posta doğrulama yapılmamış</span> `;
        $("#mailVerification").html(veri);
        $(".UserEditModal").modal("show");
      } else {
        alertify.error(response.message);
      }
    });
  });

  // Edit end

  //  Form Save begin
  $("#UserUpdateForm").submit(function (e) {
    e.preventDefault();

    let formElement = $(this);

    let formData = {};
    formElement.serializeArray().map((data) => {
      formData[data.name] = data.value;
    });

    $.post(formElement.attr("action"), formData, function (response) {
      if (response.status) {
        alertify.success(response.message);
        tableF();
      } else {
        alertify.error(response.message);
      }
      $(".UserEditModal").modal("hide");
      $("#UserUpdateForm").trigger("reset");
    });
  });

  //  Form Save end
});
