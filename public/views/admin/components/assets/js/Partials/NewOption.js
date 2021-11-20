$(document).ready(function () {
  $("#productForm").parsley();

  $("#option-type").on("change", function () {
    let type = $(this).find("option:selected").data("type");

    if (type && type === "multi") {
      $("#values").show();

      $("#rows").find(".valueInput").prop("required", true);
    } else {
      $("#values").hide();
      $("#rows").find(".valueInput").prop("required", false);
    }
  });

  $("#addRow").click(function () {
    $("#rows").append(
      `<tr> <td> <input type="text" name="values" required class="form-control valueInput" placeholder="Değer" > </td> <td> <button type="button" class="btn btn-sm btn-danger col-12 btnRowDelete"> <i class="fa fa-trash-alt"></i> </button> </td> </tr>`
    );
  });

  $("body").on("click", ".btnRowDelete", function () {
    $(this).parent().parent().remove();
  });

  $("#optionForm").submit(function (e) {
    e.preventDefault();

    let formElement = $(this);

    let datas = {};
    formElement.serializeArray().map((data) => {
      datas[data.name] = data.value;
    });
    datas["values"] = [];
    $("#rows")
      .find(".valueInput")
      .each((i, element) => {
        datas.values.push($(element).val());
      });
    datas.values = $.post(formElement.attr("action"), datas, function (msg) {
      if (msg.status) {
        alertify.success(msg.message);
        setTimeout(() => {
          window.location = BASE_URL + "admin/secenekler";
        }, 2500);
      } else {
        alertify.error(msg.message);
      }
    });
  });
});
