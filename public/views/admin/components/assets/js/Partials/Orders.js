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
        { data: "id" },
        { data: "user_name" },
        { data: "user_mail" },
        { data: "total_count", className: "text-center" },
        { data: "total_amount", className: "text-right" },
        { data: "net_total", className: "text-right" },
        { data: "status_name" },
        { data: "add_date" },
        { Veri: "İşlemler", responsivePriority: -1 },
      ],

      fnRowCallback: function (nRow, aData, iDisplayIndex) {
        if (aData.status_type == "1") {
          $(nRow).addClass("font-weight-bold");
        }
      },
      columnDefs: [
        {
          targets: 0,
          title: "Sipariş No",
          render: function (data, type, full, meta) {
            return `<b>#${full.id}</b>`;
          },
        },

        {
          targets: 1,
          title: "Müşteri Ad",
        },

        {
          targets: 2,
          title: "Müşteri Mail",
        },

        {
          targets: 3,
          title: "Toplam Adet",
        },
        {
          targets: 4,
          title: " Fiyat",
        },

        {
          targets: 5,
          title: " Genel Top.",
        },
        {
          targets: 6,
          title: "Durum",
          render: function (data, type, full, meta) {
            let html = full.status_name;
            html +=
              full.payment_status == 1
                ? ` <br><small class="text-success">Ödeme Yapıldı</small> `
                : ` <br><small class="text-danger">Ödeme Yapılmadı</small> `;
            return html;
          },
        },
        {
          targets: 7,
          title: "Sipariş Tarihi",
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
            return ` <div class="dropdown dropdown-inline" >
                         <a href="javascript:;" class="btn " data-toggle="dropdown">
                            <i class="mdi mdi-cogs"></i> İşlemler
                         </a>
                         <div class="dropdown-menu dropdown-menu-sm dropdown-menu-right" style="width: 150px">
                              <ul class="nav nav-hoverable flex-column">
                                   
                                  
                                  <li class="nav-item">
                                       <a class="nav-link " href="${
                                         BASE_URL +
                                         "admin/siparisler/detay/" +
                                         full.id
                                       }" data-id=''>
                                            <i class="nav-icon mdi mdi-eye-circle-outline" ></i>
                                            <span class="nav-text">Detay </span>
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
});
