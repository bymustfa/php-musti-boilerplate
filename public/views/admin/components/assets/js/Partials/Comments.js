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
        { data: "product_name" },
        { data: "comment_title" },
        { data: "comment_stars", className: "text-center" },
        { data: "comment_status" },
        { data: "add_date" },
        { Veri: "İşlemler", responsivePriority: -1 },
      ],

      fnRowCallback: function (nRow, aData, iDisplayIndex) {
        if (aData.comment_status == "0" && aData.read_status == "0") {
          $(nRow).addClass("font-weight-bold");
        }
      },
      columnDefs: [
        {
          targets: 0,
          title: "Müşteri Ad",
        },
        {
          targets: 1,
          title: "Mail",
        },
        {
          targets: 2,
          title: "Ürün Adı",
          render: function (data, type, full, meta) {
            return JSON.parse(full.product_name)["tr"];
          },
        },
        {
          targets: 3,
          title: "Yorum Başlığı",
        },
        {
          targets: 4,
          title: "Yorum Değer",
          render: function (data, type, full, meta) {
            return full.comment_stars + " / 5";
          },
        },

        {
          targets: 5,
          title: "Yayın",
          render: function (data, type, full, meta) {
            return full.comment_status === "1"
              ? `<span class="text-success">Yayınlandı</span>`
              : `<span class="text-secondary font-weight-bold">Yayınlanmadı</span>`;
          },
        },
        {
          targets: 6,
          title: "Tarih",
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
                                       <a href="javascript:;" class="nav-link btnReadComment"   data-id='${full.id}'>
                                            <i class="nav-icon mdi mdi-eye-circle-outline" ></i>
                                            <span class="nav-text">İncele </span>
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

  $("body").on("click", ".btnReadComment", function () {
    const comment_id = $(this).data("id");
    $.get(BASE_URL + "api/comments/get/" + comment_id, function (response) {
      console.log(response);
      let html = `
        <ul class="list-group">
          <li class="list-group-item">
          <div class="row">
            <div class="col-md-6">
                <h6> Müşteri: </h6>
                <div> ${response.user_name} </div>
                <a href="mailto:${response.user_mail}"> ${
        response.user_mail
      } </a>
            </div>
            
             <div class="col-md-6">
                <h6> Ürün: </h6>
                <p> ${JSON.parse(response.product_name)["tr"]} </p> 
            </div>
          </div>
          </li> 
          <li class="list-group-item">
          <div class="row">
            <div class="col-md-6">
               <h6>Başlık:</h6>
                ${response.comment_title}
            </div>
            
              <div class="col-md-6">
               <h6>Yorum Değeri:</h6>
               ${response.comment_stars} / 5
            </div>
          </div> 
          </li>
          
           <li class="list-group-item">
             <h6>Yorum:</h6>
             ${response.comment_text}
            </li>
            
             <li class="list-group-item">
                <div class="form-group">
                    <label> İşlem: </label>
                    <select class="form-control" id="commentStatus">
                        <option value="0" ${
                          response.comment_status === "0" ? "selected" : ""
                        } >Yayınlama</option>
                        <option value="1" ${
                          response.comment_status === "1" ? "selected" : ""
                        } >Yayınla</option>
                    </select>
                    <div class="text-right mt-2">
                        <button class="btn btn-success" id="btnStatusSave">Kaydet</button>
                    </div>
                </div>  
            </li>
           
        </ul>
      `;
      $("#commentArea").html(html);
      $(".CommentReadModal").modal("show");
    });

    $("body").on("click", "#btnStatusSave", function () {
      const status = $("#commentArea").find("#commentStatus").val();
      $.post(
        BASE_URL + "api/comments/status-change",
        { status, comment_id },
        function (response) {
          console.log(response);
          if (response.status) {
            alertify.success(response.message);
          } else {
            alertify.error(response.message);
          }

          $("#commentArea").html("");
          $(".CommentReadModal").modal("hide");
          tableF();
        }
      );
    });
  });
});
