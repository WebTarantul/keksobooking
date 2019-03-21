'use strict';

(function () {

  function setDragDropFile(dropZone, input, renderFunction) {
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(function (eventName) {
      dropZone.addEventListener(eventName, preventDefaults);
    });
    function preventDefaults(evt) {
      evt.preventDefault();
      evt.stopPropagation();
    }
    ['dragenter', 'dragover'].forEach(function (eventName) {
      dropZone.addEventListener(eventName, highlight);
    });
    ['dragleave', 'drop'].forEach(function (eventName) {
      dropZone.addEventListener(eventName, unhighlight);
    });

    function highlight() {
      dropZone.classList.add('drag');
    }

    function unhighlight() {
      dropZone.classList.remove('drag');
    }
    dropZone.addEventListener('drop', onChangeFiles);
    input.addEventListener('change', onChangeFiles);
    function onChangeFiles(evt) {
      var files = evt.target.files || evt.dataTransfer.files;
      var filesArr = [];

      for (var i = 0; i < files.length; i++) {
        var fileItem = files[i];
        if (fileItem.type.startsWith('image')) {
          filesArr.push(fileItem);
        }
      }
      renderFunction(filesArr);
    }
    window.resetDragDropFile = resetDragDropFile;
    function resetDragDropFile(unrenderFunction) {
      unrenderFunction();

      ['dragenter', 'dragover'].forEach(function (eventName) {
        dropZone.removeEventListener(eventName, highlight);
      });
      ['dragleave', 'drop'].forEach(function (eventName) {
        dropZone.removeEventListener(eventName, unhighlight);
      });
      ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(function (eventName) {
        dropZone.removeEventListener(eventName, preventDefaults);
      });

      dropZone.removeEventListener('drop', onChangeFiles);
      input.removeEventListener('change', onChangeFiles);
    }
  }
  window.setDragDropFile = setDragDropFile;
})();
