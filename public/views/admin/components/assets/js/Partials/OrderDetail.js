$(document).ready(function () {
  $("#statusSave").click(function () {
    const status_id = $("#orderStatus").val();
    switch (status_id) {
      case "4":
        $(".CargoNoMoldal").modal("show");
        $("#cargoNoSaveBtn").click(function () {
          if ($("#cargo_no").val().trim().length === 0) {
            alertify.error("Kargo No Girin");
          } else {
            statusSave(status_id, $("#cargo_no").val().trim());
          }
        });

        break;
      default:
        statusSave(status_id);
    }
  });

  function statusSave(status_id, cargo_no = "") {
    if (!(status_id == "4" && cargo_no.length == 0)) {
      $.post(
        BASE_URL + "api/order/status-change",
        {
          id: order_id,
          cargo_link: cargo_no,
          status_id,
        },
        function (response) {
          if (response.status) {
            alertify.success(response.message);
          } else {
            alertify.error(response.message);
          }
          $(".CargoNoMoldal").modal("hide");
        }
      );
    } else {
      console.log("nooo");
    }
  }
});
