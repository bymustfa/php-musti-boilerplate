$(document).ready(function () {
  $("#productForm").parsley();

  $(".productDescription").summernote({
    placeholder: "Ürün Açıklaması",
    height: 300,
    minHeight: null,
    maxHeight: null,
    callbacks: {
      onImageUpload: function (file) {
        let reader = new FileReader();
        reader.onloadend = function () {
          let image = $("<img>").attr("src", reader.result);
          $(".productDescription").summernote("insertNode", image[0]);
        };
        reader.readAsDataURL(file[0]);
      },
    },
  });

  getCategories();

  function getCategories(selectted = null) {
    const values = $("#categories").data("values");

    $.get(BASE_URL + "api/categories/all", function (datas) {
      $("#categories").empty();
      if (datas.status) {
        datas.data.map((data) => {
          let select = selectted && selectted === data.id ? "selected" : "";
          if (values && values.find((x) => x == data.id)) {
            select = "selected";
          }
          $("#categories").append(
            `<option value="${data.id}" ${select}>${data.category_name}</option>`
          );
        });
      }
    });
  }

  getTags();

  function getTags(selectted = null) {
    const values = $("#categories").data("values");
    $.get(BASE_URL + "api/tags/all", function (datas) {
      $("#tags").empty();
      if (datas.status) {
        datas.data.map((data) => {
          let select = selectted && selectted === data.id ? "selected" : "";
          if (values && values.find((x) => x == data.id)) {
            select = "selected";
          }
          $("#tags").append(
            `<option value="${data.id}" ${select}>${data.tag_name}</option>`
          );
        });
      }
    });
  }

  $(".CategorySpeedModal").on("hidden.bs.modal", function (e) {
    $(".CategorySpeedModal").find("form").trigger("reset");
  });
  $(".TagSpeedModal").on("hidden.bs.modal", function (e) {
    $(".TagSpeedModal").find("form").trigger("reset");
  });

  $("#CategorySpeedForm").submit(function (e) {
    e.preventDefault();
    let formElement = $(this);
    const datas = {};
    formElement.serializeArray().map((data) => {
      datas[data.name] = data.value;
    });
    $.post(formElement.attr("action"), datas, function (msg) {
      if (msg.status) {
        alertify.success(msg.message);
        getCategories();
        $(".CategorySpeedModal").modal("hide");
      } else {
        alertify.error(msg.message);
      }
    });
  });

  let delete_images = [];
  getImages();
  function getImages() {
    $.get(
      BASE_URL + "/api/products/getImages/" + PRODUCT_ID,
      function (response) {
        if (response.status && response.data.length > 0) {
          const { data } = response;
          let html = "";
          data.map((img) => {
            html += ` <div class="img-item ${
              img.image_showcase === "1" ? "active" : ""
            }" title="Vitrin Görseli">
                        <button class="btnImageDel btnTmpImgDel" 
                        data-id="${img.id}"  type="button" title="Sil">
                          <i class="far fa-trash-alt"></i>
                        </button>
                        <input name="showcase" ${
                          img.image_showcase === "1" ? "checked" : ""
                        } type="radio" value="${img.id}">
                        <img src="${
                          BASE_URL + img.image_dir + "/" + img.image_small
                        }" class="img-thumbnail">
                     </div> `;
          });
          $("#imageMessage").hide();
          $(".imageGallery").append(html);
        }
      }
    );
  }

  let inputFile = $("<input>", {
    type: "file",
    name: "images[]",
    multiple: true,
    style: "display:none",
  }).appendTo("#tempImgElement");
  let dataTransfer = new DataTransfer();

  $("#images")
    .find("input")
    .change(function () {
      const files = $(this).prop("files");

      if (files.length > 0) {
        $("#imageMessage").hide();
        $(files).each(function (i, file) {
          let control = $('[name="showcase"]').filter(
            (x, e) => $(e).val() === file.name
          );

          if (!Array.from(control).length) {
            let reader = new FileReader();
            reader.onloadend = function () {
              dataTransfer.items.add(file);

              let div = $("<div>", {
                class: "img-item",
                title: "Vitrin Görseli",
              }).appendTo(".imageGallery");

              inputFile.prop("files", dataTransfer.files);

              let deleteBtn = $("<button>", {
                class: "btnImageDel",
                type: "button",
                title: "Sil",
              }).appendTo(div);
              $("<i>", { class: "far fa-trash-alt" }).appendTo(deleteBtn);

              $("<input>", {
                name: "showcase",
                type: "radio",
                value: i,
              }).appendTo(div);
              $("<img>", {
                src: reader.result,
                class: "img-thumbnail",
              }).appendTo(div);
            };
            reader.readAsDataURL(file);
          } else {
            alertify.error("Aynı görselden yükleyemezsiniz");
          }
        });
      } else {
        $("#imageMessage").show();
      }
    });

  $("body").on("change", '[name="showcase"]', function () {
    $(".img-item").each((i, element) => {
      $(element)
        .find('[name="showcase"]')
        .prop("checked", false)
        .css({ opacity: 0 });
      $(element).find("img").removeClass("active");
      $(element).removeClass("active");
    });

    $("#showcase_image_index_input").val($(this).val());
    $(this).next("img").addClass("active");
    $(this).parent().addClass("active");
    $(this).prop("checked", true).css({ opacity: 1 });
  });

  $("body").on("click", ".btnImageDel", function () {
    $(this).parent().remove();
    if (!Array.from($(".img-item")).length) {
      $("#imageMessage").show();
    }
    if ($(this).hasClass("btnTmpImgDel")) {
      const id = $(this).data("id");
      delete_images.push(id);
    }
  });

  $(".productName").on("input", function () {
    const value = $(this).val();
    const lang = $(this).data("lang");
    $(`.productMetaName[data-lang="${lang}"]`).val(value);
  });

  $("#TagSpeedForm").submit(function (e) {
    e.preventDefault();
    let formElement = $(this);
    const datas = {};
    formElement.serializeArray().map((data) => {
      datas[data.name] = data.value;
    });
    $.post(formElement.attr("action"), datas, function (msg) {
      if (msg.status) {
        alertify.success(msg.message);
        getTags();
        $(".TagSpeedModal").modal("hide");
      } else {
        alertify.error(msg.message);
      }
    });
  });

  $.get(BASE_URL + "api/options/all", function (msg) {
    msg.map((data) => {
      $("#optionsList").append(
        `<option value="${data.id}">${data.option_name}</option>`
      );
    });
  });

  $("#optionsList").change(function () {
    if ($("#optionsList").val().trim().length > 0) {
      $.get(
        BASE_URL + "api/options/get-values/" + $("#optionsList").val(),
        function (msg) {
          $("#valuesList").empty();
          $("#valuesList").append(`<option value="">Seçiniz</option>`);
          msg.map((data) => {
            $("#valuesList").append(
              `<option value="${data.id}">${data.value_name}</option>`
            );
          });
        }
      );
    } else {
      $("#valuesList").empty();
      $("#valuesList").append(`<option value="">Seçiniz</option>`);
    }
  });

  // option list begin

  let options = [];
  $("#optionAdd").click(function () {
    if (
      $("#optionsList").val().trim().length &&
      $("#valuesList").val().trim().length
    ) {
      options.push({
        id: Math.ceil(Math.random() * 9999),
        option_id: parseInt($("#optionsList").val()),
        value_id: parseInt($("#valuesList").val()),
        option_text: $("#optionsList option:selected").text(),
        value_text: $("#valuesList option:selected").text(),
        drop_from_stock: 1,
        requre: 1,
        new_stock: 0,
        peice_status: 0,
        peice: 0,
      });

      optionsDraw();
    } else {
      alertify.error("Seçenek veya değer seçiniz");
    }
  });

  function optionsDraw() {
    let html = ``;

    options.map((option) => {
      html += `
       <div class="col-md-12 p-2 optionAreaItem" data-id="${option.id}">
            <div class="border rounded bg-light">
                <table class="table table-sm">
                    <thead>
                    <tr>
                        <th  class="text-center border-right">${
                          option.option_text
                        }</th>
                        <th  class="text-center border-right">${
                          option.value_text
                        }</th>
                        <th colspan="2" class="text-center "></th>
                        <th class=" text-right">                          
                            <button type="button" class="btn btn-sm btn-danger optionAreaItemDelete"
                            data-id="${option.id}">
                                <i class="fa fa-trash-alt"></i>
                            </button>
                        </th> 
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td class="form-group">
                            <label>Stoktan Düş:</label>
                            <select class="form-control drop_from_stock" >
                                <option value="1" 
                                        ${
                                          option.drop_from_stock === 1
                                            ? "selected"
                                            : ""
                                        }> Evet
                                </option>
                                    <option value="0" 
                                        ${
                                          option.drop_from_stock === 0
                                            ? "selected"
                                            : ""
                                        }> Hayır
                                </option>
                            </select>
                        </td>
                        
                             <td class="form-group">
                            <label>Stok <small>(Eğer 0 kalırsa orijinal stok kullanılır)</small> :</label>
                            <input type="number" value="${
                              option.new_stock
                            }" class="form-control new_stock" step="0.01"  max="999999">
                        </td>

                        <td class="form-group">
                            <label>Zorunlu Alan:</label>
                            <select class="form-control requre">
                                <option value="1" 
                                        ${
                                          option.requre === 1 ? "selected" : ""
                                        }> Evet
                                </option>
                                    <option value="0" 
                                        ${
                                          option.requre === 0 ? "selected" : ""
                                        }> Hayır
                                </option>
                            </select>
                        </td>

                        <td class="form-group">
                            <label>Fiyat Durumu:</label>
                            <select  class="form-control peice_status">
                                <option value="0" 
                                ${option.peice_status === 0 ? "selected" : ""}
                                >Fiyatı Değiştirme</option>
                                <option value="1" 
                                ${option.peice_status === 1 ? "selected" : ""}
                                >Fiyata Ekle (+)</option>
                                <option value="2" 
                                ${option.peice_status === 2 ? "selected" : ""}
                                >Fiyatan Çıkar (-) </option>
                            </select>
                        </td>

                        <td class="form-group">
                            <label>Fiyat Değişiklik Değeri:</label>
                            <input value="${
                              option.peice_status !== 0 ? option.peice : ""
                            }" type="number" min="0" max="9999999" step="0.01" disabled class="form-control peice" placeholder="Fiyat Değişiklik Değeri">
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
      `;
    });

    $("#optionsListArea").html(html);
  }

  $("body").on("click", ".optionAreaItemDelete", function () {
    let id = $(this).data("id");
    options = options.filter((x) => x.id !== id);
    optionsDraw();
  });

  $("body").on("change, input", ".optionAreaItem", function () {
    let optionAreaItem = $(this);
    const id = optionAreaItem.data("id");

    options.map((data) => {
      if (data.id === id) {
        data.drop_from_stock = parseInt(
          optionAreaItem.find(".drop_from_stock").val()
        );
        data.requre = parseInt(optionAreaItem.find(".requre").val());
        data.peice_status = parseInt(
          optionAreaItem.find(".peice_status").val()
        );
        data.peice = parseFloat(optionAreaItem.find(".peice").val() || 0);
        data.new_stock = parseFloat(
          optionAreaItem.find(".new_stock").val() || 0
        );
      }

      return data;
    });
  });

  $("#taxCalcArea input").on("change, input", function () {
    tax_calc($(this).data("type"));
  });

  function tax_calc(type) {
    let tax_free = parseFloat($("#tax_free_price").val());
    let tax_value = parseFloat($("#tax_value").val());
    let tax_added_price = parseFloat($("#tax_added_price").val());

    switch (type) {
      case "tax-free":
        $("#tax_added_price").val(
          parseFloat(tax_free + (tax_free * tax_value) / 100).toFixed(2)
        );
        break;

      case "tax":
        $("#tax_added_price").val(
          parseFloat(tax_free + (tax_free * tax_value) / 100).toFixed(2)
        );

        break;

      case "tax-added":
        $("#tax_free_price").val(
          parseFloat(tax_added_price / (1 + tax_value / 100)).toFixed(2)
        );
        break;
    }
  }

  $("body").on("change", ".peice_status", function () {
    let val =
      $(this).val() === "0"
        ? 0
        : $(this).parent().parent().find(".peice").val();

    $(this)
      .parent()
      .parent()
      .find(".peice")
      .prop("disabled", $(this).val() === "0")
      .val(val);
  });
  // option list end

  //Similar begin

  $("#productSearchBtn").click(function () {
    if ($("#productSearchInput").val().trim().length > 2) {
      let val = $("#productSearchInput").val();
      let url = BASE_URL + `api/products/similar/${val}/${val}/${val}`;
      $.get(url, function (msg) {
        console.log(msg);

        let html = "";
        msg.map((data) => {
          html += `
           <a href="javascript:;" 
           data-id="${data.id}" 
           data-text="${
             data.product_uniq + " " + JSON.parse(data.product_name)["tr"]
           }" 
           class="list-group-item list-group-item-action p-0 similarItem">
              <div class="row p-0 py-2">
                  <div class="col-2 border-right pl-4">${data.id}</div>
                  <div class="col-4 border-right">${data.product_uniq}</div>
                  <div class="col-6 pr-4">${
                    JSON.parse(data.product_name)["tr"]
                  }</div>
              </div>
          </a> `;
        });

        $("#productListArea").empty().append(html).show();
      });
    } else {
      $("#productListArea").hide();
      alertify.error("Minimum 3 karakter girmelisiniz");
    }
  });

  similarDraw();

  function similarDraw() {
    let html = "";
    similarProducts.map((data) => {
      html += `<li class="list-group-item">
                <div class="row">
                    <div class="col-md-11">${data.text}</div>
                    <div class="col-md-1">
                        <button type="button" class="btn btn-danger btn-sm col-12 similarItemDelete" data-id="${data.id}">
                           <i class="fa fa-trash-alt"></i>
                        </button>
                    </div>
                </div>
            </li>`;
    });
    $("#productListArea").html(html).show();
  }

  $("body").on("click", ".similarItemDelete", function () {
    similarProducts = similarProducts.filter(
      (x) => x.id !== $(this).data("id")
    );
    similarDraw();
  });

  $("body").on("click", ".similarItem", function () {
    if (!similarProducts.find((x) => x.id === $(this).data("id"))) {
      similarProducts.push({
        id: $(this).data("id"),
        text: $(this).data("text"),
      });
    }
    $("#productListArea").empty().hide();
    similarDraw();
  });

  //Similar end

  //   form save begin
  $("#productForm").submit(function (e) {
    e.preventDefault();

    let showcae = false;
    $("body")
      .find('[name="showcase"]')
      .each((i, e) => {
        if ($(e).is(":checked")) {
          showcae = true;
          return false;
        }
      });
    if (showcae) {
      const formElement = $(this);
      const formData = new FormData(this);

      const name = {};
      const meta_title = {};
      const descriptions = [];
      const meta_description = {};
      langs.map((lang) => {
        name[lang] = $(`.productName[data-lang="${lang}"]`).val();
        meta_title[lang] = $(`.productMetaName[data-lang="${lang}"]`).val();
        descriptions.push({
          lang: lang,
          description: $(`.productDescription[data-lang="${lang}"]`).val(),
        });
        meta_description[lang] = $(
          `.meta_description[data-lang="${lang}"]`
        ).val();
      });

      formData.append("name", JSON.stringify(name));
      formData.append("meta_title", JSON.stringify(meta_title));
      formData.append("descriptions", JSON.stringify(descriptions));
      formData.append("meta_description", JSON.stringify(meta_description));

      const simi = similarProducts.map((x) => x.id);

      formData.append("options", JSON.stringify(options));
      formData.append("categories", JSON.stringify($("#categories").val()));
      formData.append("tags", JSON.stringify($("#tags").val()));
      formData.append("similarProducts", JSON.stringify(simi));
      formData.append("delete_images", JSON.stringify(delete_images));

      formElement
        .find('button[type="submit"]')
        .prop("disabled", true)
        .text("Lütfen Bekleyin");

      let url = formElement.attr("action");

      $.ajax({
        url: url,
        type: "POST",
        data: formData,
        success: function (response) {
          console.log(response);
          if (response.status) {
            alertify.success(response.message);
            setTimeout(() => {
              window.location = BASE_URL + "admin/urunler";
            }, 2000);
          } else {
            alertify.error(response.message);
            formElement
              .find('button[type="submit"]')
              .prop("disabled", false)
              .text("Kaydet");
          }
        },
        cache: false,
        contentType: false,
        processData: false,
      });
    } else {
      alertify.error("Lütfen resim sekmesinden 1 tane vitrin görseli seçiniz");
    }
  });

  //   form save end
});
