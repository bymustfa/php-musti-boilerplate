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
        { data: "admin_name" },
        { data: "admin_user_name" },
        { data: "admin_email" },
        { data: "admin_status" },
        // { Veri: "İşlemler", responsivePriority: -1 },
      ],
      columnDefs: [
        {
          targets: 0,
          title: "Ad",
        },
        {
          targets: 1,
          title: "Kullanıcı Adı",
        },
        {
          targets: 2,
          title: "Eposta",
        },
        {
          targets: 3,
          title: "Durum",
          width: "200px",
          render: function (data, type, full, meta) {
            return full.admin_status === "1"
              ? `<span class="text-success">Aktif</span>`
              : `<span class="text-danger">Pasif</span>`;
          },
        },

        // {
        //   targets: -1,
        //   title: "İşlemler",
        //   width: "75px",
        //   orderable: false,
        //   render: function (data, type, full, meta) {
        //     return `  <a class="nav-link btnEditCategory" href="javascript:;" data-id='${full.id}'>
        //         <i class="nav-icon mdi mdi-square-edit-outline" ></i>
        //         <span class="nav-text">Düzenle</span>
        //     </a>`;
        //   },
        // },
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

  $("#image").on("change", function () {
    let file = $(this).prop("files")[0];
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      $("#src").attr("src", reader.result);
      $('[name="image"]').val(reader.result);
    };
  });

  //  Form Save begin
  $("#adminForm").submit(function (e) {
    e.preventDefault();

    let formElement = $(this);

    let formData = {};
    formElement.serializeArray().map((data) => {
      formData[data.name] = data.value;
    });

    if (formData.password1.length >= 8) {
      if (formData.password1 === formData.password2) {
        $.post(
          BASE_URL + "api/admins/add-admin",
          formData,
          function (response) {
            if (response.status) {
              alertify.success(response.message);
              $(".AdminAddModal ").modal("hide");
            } else {
              alertify.error(response.message);
            }
            tableF();
          }
        );
      } else {
        alertify.error("Şifreler Eşlemiyor");
      }
    } else {
      alertify.error("Şifre en az 8 karakter olmalıdır");
    }
  });

  //  Form Save end
});
