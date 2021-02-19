// Dropzone.options = {
//   url: "siduhashdas",
//   paramName: "file",
//   maxFilesize: 2,
//   accept: function (file, done) {
//     if (!file.name.startsWith("StreamingHistory")) {
//       done("Naha, you don't.");
//     } else {
//       done();
//     }
//   },
//   previewTemplate: `
//         <h2 class="auth-first">Authenticate first</h2>
//   `,
// };

// var myDropzone = new Dropzone("#dropzone", {
//   url: "siduhashdas",
//   paramName: "file",
//   maxFilesize: 2,
//   parallelUploads: 2,
//   uploadMultiple: true,
//   acceptedFiles: ["application/JSON"],
//   accept: function (file, done) {
//     if (!file.name.startsWith("StreamingHistory")) {
//       done("Naha, you don't.");
//     } else {
//       done();
//     }
//   },
//   previewTemplate: `
//             <h2 class="auth-first">Authenticate first</h2>
//       `,
// });

// Dropzone.options.dropzone = {
//   url: "siduhashdas",
//   paramName: "file",
//   maxFilesize: 2,
//   parallelUploads: 2,
//   uploadMultiple: true,
//   acceptedFiles: ["application/JSON"],
//   accept: function (file, done) {
//     if (!file.name.startsWith("StreamingHistory")) {
//       done("Naha, you don't.");
//     } else {
//       done();
//     }
//   },
//   previewTemplate: `
//               <h2 class="auth-first">Authenticate first</h2>
//         `,
// };

$(document).ready(function () {
  $("#submit").click(function () {
    var form_data = new FormData();
    form_data.append("uid", "sjoerdgaatwakawaka");

    // Read selected files
    var totalfiles = document.getElementById("files").files.length;
    for (var index = 0; index < totalfiles; index++) {
      form_data.append(
        "files[]",
        document.getElementById("files").files[index]
      );
    }

    // AJAX request
    $.ajax({
      url: "../upload",
      type: "post",
      data: form_data,
      dataType: "json",
      contentType: false,
      processData: false,
      success: function (response) {
        // for (var index = 0; index < response.length; index++) {
        //   var src = response[index];
        //   // Add img element in <div id='preview'>
        //   $("#preview").append(
        //     '<img src="' + src + '" width="200px;" height="200px">'
        //   );
        // }
      },
    });
  });
});

function getCodeBoxElement(index) {
  return document.getElementById("codeBox" + index);
}

function onKeyUpEvent(index, event) {
  const eventCode = event.which || event.keyCode;
  if (getCodeBoxElement(index).value.length === 1) {
    if (index !== 4) {
      getCodeBoxElement(index + 1).focus();
    } else {
      getCodeBoxElement(index).blur();
      // Submit code
      alert(getCode());
    }
  }
  if (eventCode === 8 && index !== 1) {
    getCodeBoxElement(index - 1).focus();
  }
}

function onFocusEvent(index) {
  for (item = 1; item < index; item++) {
    const currentElement = getCodeBoxElement(item);
    if (!currentElement.value) {
      currentElement.focus();
      break;
    }
  }
}

function getCode() {
  let code = "";
  for (let i = 0; i < 4; i++) {
    code += getCodeBoxElement(i).value;
  }
  return code;
}
