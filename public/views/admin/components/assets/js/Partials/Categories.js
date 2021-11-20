$(document).ready(function () {
  // Table begin
  $("#categoryForm").parsley();

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
        { data: "category_name" },
        { data: "category_slug" },
        { data: "category_href" },
        { data: "category_status" },
        { data: "category_image" },
        { Veri: "İşlemler", responsivePriority: -1 },
      ],
      columnDefs: [
        {
          targets: 0,
          title: "Ad",
        },
        {
          targets: 1,
          title: "Benzersiz Ad",
          width: "120px",
        },
        {
          targets: 2,
          title: "Dış Bağlantı",
          width: "100px",
          render: function (data, type, full, meta) {
            return full.category_href
              ? `<a 
                  href="${full.category_href}"  
                  title="${full.category_href}"
                  target="_blank">
                        ${
                          full.category_href.length > 20
                            ? full.category_href.slice(0, 20).concat("...")
                            : full.category_href
                        }
                  </a>`
              : "-";
          },
        },
        {
          targets: 3,
          title: "Durum",
          render: function (data, type, full, meta) {
            console.log(full);
            return full.category_status === "1"
              ? `<span class="text-success">Aktif</span>`
              : `<span class="text-danger">Pasif</span>`;
          },
        },
        {
          targets: 4,
          title: "Resim",
          width: "75px",
          render: function (data, type, full, meta) {
            if (full.category_image) {
              let img = JSON.parse(full.category_image);
              return `<img 
                    src="${BASE_URL + img.dir + "/" + img.small}" 
                     height="55px"  />`;
            } else {
              return `<img 
                    src="${ADMIN_ASSETS + "assets/images/no-img.jpg"}" 
                     height="55px"  />`;
            }
          },
        },
        {
          targets: -1,
          title: "İşlemler",
          width: "75px",
          orderable: false,
          render: function (data, type, full, meta) {
            return ` <div class="dropdown dropdown-inline" >
                         <a href="javascript:;" class="btn " data-toggle="dropdown">
                            <i class="mdi mdi-cogs"></i> İşlemler
                         </a>
                         <div class="dropdown-menu dropdown-menu-sm dropdown-menu-right" style="width: 150px">
                              <ul class="nav nav-hoverable flex-column">
                                  <li class="nav-item">
                                     <a class="nav-link btnEditCategory" href="javascript:;" data-id='${full.id}'>
                                        <i class="nav-icon mdi mdi-square-edit-outline" ></i>
                                        <span class="nav-text">Düzenle</span>
                                    </a>
                                  </li>
                                  
                                  <li class="nav-item">
                                  <a class="nav-link btnDeleteCategory" href="javascript:;" data-id='${full.id}'>
                                        <i class="nav-icon mdi mdi-trash-can" ></i>
                                        <span class="nav-text">Sil</span>
                                    </a>
                                  </li>
                              </ul>
                         </div>
                      </div>`;
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
  let preloaded = [];
  $("body").on("click", ".btnEditCategory", function () {
    let id = $(this).data("id");
    $.get(BASE_URL + "api/categories/get/" + id, function (msg) {
      Object.keys(msg).map((key) => {
        let k = key.split("_");
        if (k.length > 1) k.shift();
        let newKey = k.join("_");
        if (newKey !== "image")
          $("#categoryForm").find(`[name="${newKey}"]`).val(msg[key]);
      });
      if (msg.category_image) {
        let img = JSON.parse(msg.category_image);
        preloaded.push({
          id: Math.ceil(Math.random() * 9999),
          src: BASE_URL + img.dir + "/" + img.small,
        });
      }
      $(".CategoryAddModal").modal("show");
    });
  });

  $("body").on("click", ".btnDeleteCategory", function () {
    let id = $(this).data("id");

    swal({
      title: "Eminmisiniz?",
      text: "Bu öğeyi silmek üzeresiniz!",
      type: "warning",
      showCancelButton: true,
      confirmButtonText: "Evet, Sil!",
      cancelButtonText: "Hayır, İptal!",
      confirmButtonClass: "btn btn-success",
      cancelButtonClass: "btn btn-danger ml-2",
      buttonsStyling: false,
    }).then(function (result) {
      if (result.value) {
        $.ajax({
          url: BASE_URL + "api/categories/delete/" + id,
          type: "DELETE",
          success: function (msg) {
            if (msg.status) {
              alertify.success(msg.message);
            } else {
              alertify.error(msg.message);
            }
            tableF();
          },
          cache: false,
          contentType: false,
          processData: false,
        });
      }
    });
  });

  // Edit end

  $("#imageUploadStatus").change(function () {
    if ($(this).is(":checked")) {
      $(".input-images").imageUploader({
        multiple: false,
        name: "image",
        preloaded: preloaded,
      });
    } else {
      $(".input-images").empty();
    }
  });

  $(".CategoryAddModal").on("hidden.bs.modal", function (e) {
    $(".CategoryAddModal").find("form").trigger("reset");
    $(".input-images").empty();
    $("#imageUploadStatus").prop("checked", false);
    $("#imageUploadStatus").trigger("change");
    preloaded = [];
  });

  //  Form Save begin
  $("#categoryForm").submit(function (e) {
    e.preventDefault();

    let formElement = $(this);
    let formData = new FormData(this);

    let url =
      $("#categoryForm").find('[name="id"]').val() === "0"
        ? formElement.attr("action")
        : formElement.data("update");

    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      success: function (msg) {
        if (msg.status) {
          alertify.success(msg.message);
        } else {
          alertify.error(msg.message);
        }
        $(".CategoryAddModal").modal("hide");
        page = 1;
        tableF();
      },
      cache: false,
      contentType: false,
      processData: false,
    });
  });

  //  Form Save end
});
