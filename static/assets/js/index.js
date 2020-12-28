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

var myDropzone = new Dropzone("dropzone", {
  url: "siduhashdas",
  paramName: "file",
  maxFilesize: 2,
  accept: function (file, done) {
    if (!file.name.startsWith("StreamingHistory")) {
      done("Naha, you don't.");
    } else {
      done();
    }
  },
  previewTemplate: `
            <h2 class="auth-first">Authenticate first</h2>
      `,
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
