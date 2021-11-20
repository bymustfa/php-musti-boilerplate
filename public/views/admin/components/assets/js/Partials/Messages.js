$(document).ready(function () {
  // Table begin

  let table;
  let url = $("#dataTable").data("url");
  let page = 1;

  function pagination(data) {
    if (data) {
      $("#tableInfo").html(
        `Toplam <b class="font-weight-bold">${
          data.total
        }</b> kayıttan <b class="font-weight-bold">${
          data.from ? data.from : 0
        }</b> ile <b class="font-weight-bold">${
          data.to ? data.to : 0
        }</b> arası gösteriliyor.`
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
        { data: "form_name" },
        { data: "form_email" },
        { data: "form_phone" },
        { data: "form_subject" },
        { data: "add_date" },
        { Veri: "İşlemler", responsivePriority: -1 },
      ],
      columnDefs: [
        {
          targets: 0,
          title: "Ad",
          render: function (data, type, full, meta) {
            let html = full.form_name;
            return full.read_status == 0
              ? `<b class="font-weight-bold">${html}</b>`
              : html;
          },
        },
        {
          targets: 1,
          title: "E-Posta",
          render: function (data, type, full, meta) {
            let html = `<a href="mailto:${full.form_email}">${full.form_email}</a>`;
            return full.read_status == 0
              ? `<b class="font-weight-bold">${html}</b>`
              : html;
          },
        },
        {
          targets: 2,
          title: "Telefon",
          render: function (data, type, full, meta) {
            let html = `<a href="tel:${full.form_phone}">${full.form_phone}</a>`;
            return full.read_status == 0
              ? `<b class="font-weight-bold">${html}</b>`
              : html;
          },
        },
        {
          targets: 3,
          title: "Konu",
          render: function (data, type, full, meta) {
            let html = full.form_subject;
            return full.read_status == 0
              ? `<b class="font-weight-bold">${html}</b>`
              : html;
          },
        },
        {
          targets: 4,
          title: "Tarih",
          render: function (data, type, full, meta) {
            let html = moment(full.add_date).format("DD MMM YYYY H:m");
            return full.read_status == 0
              ? `<b class="font-weight-bold">${html}</b>`
              : html;
          },
        },
        {
          targets: -1,
          title: "İşlemler",
          width: "75px",
          orderable: false,
          render: function (data, type, full, meta) {
            return `
            <div>
                <button class="btn btn-sm btn-primary  btnReadMessage" data-id="${full.id}">Oku</button>
                <button class="btn btn-sm btn-danger  btnDeleteMessage" data-id="${full.id}">Sil</button>
            </div>
            `;
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

  $("body").on("click", ".btnReadMessage", function () {
    $.get(
      BASE_URL + "api/messages/getById/" + $(this).data("id") + "/true",
      function (msg) {
        let html = `
            <table class="table table-striped table-bordered table-sm"> 
              <tbody>
                <tr>
                  <th >Ad ve Soyad: </th>
                  <td>  ${msg.form_name}</td>
                  <th>E-Posta</th>
                  <td>
                     <a href="mailto:${msg.form_email}">
                            ${msg.form_email}
                     </a>
                  </td>
                </tr>                
                <tr>
                  <th >Tarih: </th>
                  <td>${moment(msg.add_date).format("DD MMM YYYY H:m")}</td>
                  <th>Telefon</th>
                  <td>
                     <a href="tel:${msg.form_phone}">
                            ${msg.form_phone}
                     </a>
                  </td>
                </tr> 
                               
                 <tr>
                  <th colspan="1">Konu: </th>
                  <td colspan="3">${msg.form_subject}</td>                   
                </tr> 
                               
                <tr>
                  <th colspan="4">Mesaj: </th>                                 
                    </tr>
                  <tr>
                  <td colspan="4">
                    <p>${msg.form_message}</p>
                   </td>                                 
                </tr>
                 
                 
              </tbody>
            </table>
 
       `;

        $("#messageArea").html(html);
        $(".MessageReadModal").modal("show");
      }
    );
  });

  $(".MessageReadModal").on("hidden.bs.modal", function (e) {
    tableF();
  });

  $("body").on("click", ".btnDeleteMessage", function () {
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
          url: BASE_URL + "api/messages/delete/" + id,
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

  //  Table end
});
