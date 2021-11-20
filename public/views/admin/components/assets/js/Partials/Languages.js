$(document).ready(function () {
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
      if (links) {
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
      }

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
        { data: "language_name" },
        { data: "short_code" },
        { data: "iso_code" },
        // { Veri: "İşlemler", responsivePriority: -1 },
      ],
      columnDefs: [
        {
          targets: 0,
          title: "Ad",
        },
        {
          targets: 1,
          title: "Kısa Ad",
        },
        {
          targets: 2,
          title: "Iso Kodu",
        },

        // {
        //   targets: -1,
        //   title: "İşlemler",
        //   width: "75px",
        //   orderable: false,
        //   render: function (data, type, full, meta) {
        //     return ` <div class="dropdown dropdown-inline" >
        //                  <a href="javascript:;" class="btn " data-toggle="dropdown">
        //                     <i class="mdi mdi-cogs"></i> İşlemler
        //                  </a>
        //                  <div class="dropdown-menu dropdown-menu-sm dropdown-menu-right" style="width: 150px">
        //                       <ul class="nav nav-hoverable flex-column">
        //                           <li class="nav-item">
        //                              <a class="nav-link btnEditCategory" href="javascript:;" data-id='${full.id}'>
        //                                 <i class="nav-icon mdi mdi-square-edit-outline" ></i>
        //                                 <span class="nav-text">Düzenle</span>
        //                             </a>
        //                           </li>
        //
        //                           <li class="nav-item">
        //                           <a class="nav-link btnDeleteCategory" href="javascript:;" data-id='${full.id}'>
        //                                 <i class="nav-icon mdi mdi-trash-can" ></i>
        //                                 <span class="nav-text">Sil</span>
        //                             </a>
        //                           </li>
        //                       </ul>
        //                  </div>
        //               </div>`;
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

  $("#languageAddForm").submit(function (e) {
    e.preventDefault();

    let formElement = $(this);
    let formData = new FormData(this);

    let url =
      formElement.find('[name="id"]').val() !== "0"
        ? formElement.attr("action")
        : formElement.data("update");

    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      success: function (msg) {
        console.log(msg);
        if (msg.status) {
          alertify.success(msg.message);
        } else {
          alertify.error(msg.message);
        }
        $(".LanguageAddModal").modal("hide");
        page = 1;
        tableF();
      },
      cache: false,
      contentType: false,
      processData: false,
    });
  });
});
