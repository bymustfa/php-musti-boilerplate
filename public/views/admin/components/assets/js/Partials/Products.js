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
        { data: "image_small" },
        { data: "product_code" },
        { data: "product_name" },
        { data: "product_price" },
        { data: "product_peice" },
        { data: "add_date" },
        { data: "product_publish_status" },
        { Veri: "İşlemler", responsivePriority: -1 },
      ],
      columnDefs: [
        {
          targets: 0,
          title: "Resim",
          render: function (data, type, full, meta) {
            return `<img class="img-thumbnail" src="${BASE_URL}${full.image_dir}/${full.image_small}" style="width: 65px"   alt="${full.product_name}" />`;
          },
        },
        {
          targets: 1,
          title: "Kod",
        },

        {
          targets: 2,
          title: "Ad",
          render: function (data, type, full, meta) {
            let name = JSON.parse(full.product_name)["tr"];
            return name;
          },
        },

        {
          targets: 3,
          title: "Fiyat",
          render: function (data, type, full, meta) {
            if (full.product_discount) {
              let dt = JSON.parse(full.product_discount);
              let money = parseFloat(full.product_price - dt.money).toFixed(2);
              return ` <small><s> ${full.product_price}</s></small> <b class="text-success">${money}</b>  `;
            } else {
              return full.product_price;
            }
          },
        },

        {
          targets: 4,
          title: "Stok",
        },

        {
          targets: 5,
          title: "Ekl. Tar.",
        },
        {
          targets: 6,
          title: "Yayın Dur.",
          render: function (data, type, full, meta) {
            return full.product_publish_status === "1"
              ? `<span class="text-success">Yayında</span>`
              : `<span class="text-secondary">Taslak</span>`;
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
                                     <a class="nav-link" href="${
                                       BASE_URL +
                                       "admin/urun-duzenle/" +
                                       full.id
                                     }" data-id='${full.id}'>
                                        <i class="nav-icon mdi mdi-square-edit-outline" ></i>
                                        <span class="nav-text">Düzenle</span>
                                    </a>
                                  </li>
                                  
                                   <li class="nav-item">
                                  <a class="nav-link btnDiscountProduct" href="javascript:;" data-id='${
                                    full.id
                                  }'>
                                        <i class="nav-icon mdi mdi-sale" ></i>
                                        <span class="nav-text">İndirim Uygula</span>
                                    </a>
                                  </li>
                                  
                                  <li class="nav-item">
                                  <a class="nav-link btnDeleteProduct" href="javascript:;" data-id='${
                                    full.id
                                  }'>
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

  $("body").on("click", ".btnDeleteProduct", function () {
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
          url: BASE_URL + "api/products/delete/" + id,
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

  $("body").on("click", ".btnDiscountProduct", function () {
    let productId = $(this).data("id");
    $("#productDiscountForm").find('[name="id"]').val(productId);
    $.get(BASE_URL + "api/products/getById/" + productId, function (response) {
      let product_price = response.data.tax_added_price;
      product_price = parseFloat(product_price);
      $("#resultMoney").text(product_price);
      let originalPrice = product_price;
      $('[name="original_money"]').val(originalPrice);
      $('[name="money"]').attr("max", product_price);

      if (response.data.product_discount) {
        let dt = JSON.parse(response.data.product_discount);

        $('[name="money"]').val(dt.money);
        $('[name="money"]').trigger("input");
        $('[name="percent"]').val(dt.percent);
        $('[name="percent"]').trigger("input");

        let vl = parseFloat(response.data.product_price - dt.money).toFixed(2);
        $("#resultMoney").text(vl);
      }

      $(".DiscountEditModal").modal("show");

      $('[name="money"]').on("change, input", function () {
        let max = parseFloat($(this).attr("max"));
        let value = parseFloat($(this).val()).toFixed(2);
        if (value <= max) {
          let res = parseFloat(originalPrice - value).toFixed(2);
          if (!res || res === "NaN") {
            res = 0;
          }

          let toPercent = (
            ((originalPrice - res) / originalPrice) *
            100
          ).toFixed(2);
          $('[name="percent"]').val(toPercent);
          $("#resultMoney").text(res);
        } else {
          $('[name="money"]').val(max).trigger("input");
        }
      });

      $('[name="percent"]').on("change, input", function () {
        let value = parseFloat($(this).val()).toFixed(2);
        let max = parseFloat($(this).attr("max"));
        if (value <= max) {
          let res = parseFloat(
            originalPrice - (originalPrice * value) / 100
          ).toFixed(2);

          if (!res || res === "NaN") {
            res = 0;
          }
          let toMoney = (originalPrice - res).toFixed(2);
          $('[name="money"]').val(toMoney);
          $("#resultMoney").text(res);
        } else {
          $('[name="percent"]').val(max).trigger("input");
        }
      });
    });
  });

  $("#productDiscountForm").submit(function (e) {
    e.preventDefault();
    let id = parseInt($("#productDiscountForm").find('[name="id"]').val());
    let money = parseFloat(
      $("#productDiscountForm").find('[name="money"]').val()
    );
    let percent = parseFloat(
      $("#productDiscountForm").find('[name="percent"]').val()
    );

    let original_money = parseFloat($('[name="original_money"]').val());
    let datas = { id, money, percent, original_money };
    $.post(
      BASE_URL + "api/products/update-discount",
      datas,
      function (response) {
        if (response.status) {
          alertify.success(response.message);
        } else {
          alertify.error(response.message);
        }
        $("#productDiscountForm").trigger("reset");
        $(".DiscountEditModal ").modal("hide");
        tableF();
      }
    );
  });

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
