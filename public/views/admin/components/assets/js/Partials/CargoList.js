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
        { data: "cargo_name" },
        { data: "cargo_price" },
        { data: "cargo_status" },
      ],
      columnDefs: [
        {
          targets: 0,
          title: "Ad",
        },
        {
          targets: 1,
          title: "Fiyat",
          render: function (data, type, full, meta) {
            return `
              <div class="input-group">
                  <input type="number" min="0.00" max="9999.99" step="0.01" disabled class="form-control" value="${full.cargo_price}" placeholder="Fiyat" >
                  <div class="input-group-append bg-custom b-0">
                    <button class="input-group-text  priceEditBtn" data-type="edit" data-id="${full.id}">
                        <i class="mdi mdi-pencil"></i>
                    </button>
                  </div>
              </div> `;
          },
        },
        {
          targets: 2,
          title: "Durum",
          width: "120px",
          render: function (data, type, full, meta) {
            let st =
              full.cargo_status === "1"
                ? ` <span class="text-success">Aktif</span>`
                : ` <span class="text-danger">Pasif</span>`;
            let ck = full.cargo_status === "1" ? "checked" : "";
            //    <input type="checkbox" class="switchery cargo_status" ${ck} data-id="${full.id}" data-size="small">
            return `
            <div> 
                <span class="textArea">${st}</span>
            </div>`;
          },
        },
      ],

      rowCallback: function (row, data) {
        // $(row)
        //   .find(".switchery")
        //   .each((key, element) => {
        //     let options = { language: "tr" };
        //     Object.keys($(element).data()).map((data) => {
        //       options[data] = $(element).data(data);
        //     });
        //
        //     let switchery = new Switchery(element, options);
        //   });
      },

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

  $("body").on("click", ".priceEditBtn", function () {
    let button = $(this);
    let input = $(this).parent().parent().find("[type=number]");
    let id = button.data("id");

    if (button.data("type") === "edit") {
      button.html(`<i class="mdi mdi-content-save text-success"></i>`);
      input.prop("disabled", false).focus();
      button.data("type", "save");
    } else {
      console.log();

      if (parseFloat(input.val()) || parseFloat(input.val()) === 0) {
        input.prop("disabled", true);
        button.html(`<i class="mdi mdi-pencil text-primary"></i>`);
        button.data("type", "edit");
        $.post(
          BASE_URL + "api/cargo/price-update",
          { id: id, price: input.val() },
          function (response) {
            if (response.status) {
              alertify.success(response.message);
            } else {
              alertify.error(response.message);
            }
          }
        );
      } else {
        alertify.error("Geçerli fiyat girin");
      }
    }
  });
  $("body").on("change", ".cargo_status", function () {
    let element = $(this);
    let id = element.data("id");
    let status = element.is(":checked");

    element
      .parent()
      .find(".textArea")
      .html(
        status
          ? ` <span class="text-success">Aktif</span>`
          : ` <span class="text-danger">Pasif</span>`
      );

    $.post(
      BASE_URL + "api/cargo/status-update",
      { id: id, status: status },
      function (response) {
        if (response.status) {
          alertify.success(response.message);
        } else {
          alertify.error(response.message);
        }
      }
    );
  });
});
