let token;
let uploadSucces = false;

function on() {
  document.getElementById("overlay").style.display = "block";
}

function off() {
  document.getElementById("overlay").style.display = "none";
}

$(document).ready(function () {
  $("#submit").click(function () {
    on();
    var form_data = new FormData();
    form_data.append("token", token);

    var totalfiles = document.getElementById("files").files.length;
    for (var index = 0; index < totalfiles; index++) {
      form_data.append(
        "files[]",
        document.getElementById("files").files[index]
      );
    }

    $.ajax({
      url: "../upload",
      type: "post",
      data: form_data,
      dataType: "text",
      contentType: false,
      processData: false,
      error: (response) => {
        alert(JSON.parse(response.responseText).message);
      },
      success: (response) => {
        uploadSucces = true;
        $("#streams-imported").text(JSON.parse(response).message);
        nextStep();
      },
    });
  });
});

$("#authcode-check").on("click", () => {
  on();
  const w = window.open(
    "http://localhost:3000/v1/auth/redirect",
    "_blank",
    "toolbar=yes,scrollbars=yes,resizable=yes,width=600,height=800"
  );
  w.onblur = w.focus;
  const i = setInterval(() => {
    if (w.location.href.indexOf("#complete?token=") > 5) {
      token = w.location.href.substring(
        w.location.href.indexOf("#complete?token=") + 16
      );
      w.close();
      clearInterval(i);
      nextStep();
    }
  }, 100);
});

function nextStep() {
  off();
  if (uploadSucces) {
    $("#auth-check").addClass("step-hidden");
    $("#auth-check").removeClass("step-current");

    $("#upload-files").addClass("step-hidden");
    $("#upload-files").removeClass("step-current");

    $("#complete").addClass("step-current");
    $("#complete").removeClass("step-hidden");
    return;
  }

  if (token != null && token.startsWith("ey")) {
    $("#auth-check").addClass("step-hidden");
    $("#auth-check").removeClass("step-current");

    $("#upload-files").addClass("step-current");
    $("#upload-files").removeClass("step-hidden");
  }
}
