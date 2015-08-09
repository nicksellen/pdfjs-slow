
PDFJS.workerSrc = '/pdf.worker.js';

var isFontSubpixelAAEnabledCount = 0;
window.calledIsFontSubpixelAAEnabled = function() {
  isFontSubpixelAAEnabledCount++;
};

var el = document.getElementById('container');
var statusEl = document.getElementById('status');

function status(text) {
  var txt = statusEl.innerHTML ? statusEl.innerHTML + '\n' : '';
  statusEl.innerHTML = txt + Date.now() + ' - ' + text;
}

document.getElementById('file').addEventListener('change', function(evt){
  var files = evt.target.files;
  if (!files || files.length === 0) return;
  var file = files[0];
  loadDocument({ url: URL.createObjectURL(file) });
});

var currentCanvas = null;
var currentDoc = null;

function loadDocument(params) {
  if (currentCanvas) {
    delete currentCanvas;
    currentCanvas = null;
  }
  if (currentDoc) {
    currentDoc.destroy();
    delete currentDoc;
    currentDoc = null;
  }
  while (el.firstChild) {
    el.removeChild(el.firstChild);
  }
  var start = Date.now();
  status('loading document');
  isFontSubpixelAAEnabledCount = 0;
  PDFJS.getDocument(params).then(function(doc) {
    currentDoc = doc;
    renderPage(doc, function(canvas, page){
      status('rendering took ' + (Date.now() - start) + 'ms' +
        ' called isFontSubpixelAAEnabled ' + isFontSubpixelAAEnabledCount + ' times');
      currentCanvas = canvas;
    });
  });
}

function renderPage(doc, callback) {
  doc.getPage(1).then(function(page) {
    var scale = 1;
    var viewport = page.getViewport(scale);
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    canvas.height = viewport.height;
    canvas.width = viewport.width;
    el.appendChild(canvas);
    status('starting render task');
    var renderTask = page.render({
      canvasContext: ctx,
      viewport: viewport
    });
    renderTask.promise.then(function() {
      status('render task finished');
      callback(canvas, page);
    });
  });
}