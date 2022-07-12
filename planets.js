// /\//\+/-//\/\/

function resize() {
  gbl.ctx.canvas.width = window.innerWidth - 20;
  gbl.ctx.canvas.height = window.innerHeight - 20;
  gbl.width = gbl.ctx.canvas.width;
  gbl.height = gbl.ctx.canvas.height;
}

function initAll() {
  const canvas = document.getElementById('planet');
  var ctx = canvas.getContext('2d');
  gbl = {
    ctx,
  };
  resize();
  window.addEventListener('resize', resize, false);
}

function drawSine(d, w, h) {
  for (var dy = 0; dy < h / 2; dy++) {
    for (var dx = 0; dx < w; dx++) {
      var theta = 2 * Math.PI * (dx / w);
      var a = (((Math.cos(theta) * 0.5 + 0.5) * 0.85) + 0.15) * (h / 2);
      if (dy - a < 0.9 && dy - a > -0.9) {
        var offD = dy * w * 4 + dx * 4;
        d.data[offD + 0] = 255;
        d.data[offD + 1] = 255;
        d.data[offD + 2] = 255;
        d.data[offD + 3] = 255;
      }
    }
  }
}

function eye(ctx, x, y, w, h) {
  // ctx.strokeStyle = '#fff';
  // ctx.strokeRect(x, y, w, h);
  var s = ctx.getImageData(x, y, w, h);
  var d = ctx.createImageData(w, h);
  for (var dy = 0; dy < h / 2; dy++) {
    for (var dx = 0; dx < w; dx++) {
      var theta = 2 * Math.PI * (dx / w);

      var a = (((Math.cos(theta) * 0.5 + 0.5) * 0.85) + 0.15) * (h / 2);
      var dp = dy / a;

      var sx = dx;
      var sy = Math.floor(dp * (h / 2));

      if (sy < h / 2) {
        var offS = sy * w * 4 + sx * 4;
        var offD = dy * w * 4 + dx * 4;
        d.data[offD + 0] = s.data[offS + 0];
        d.data[offD + 1] = s.data[offS + 1];
        d.data[offD + 2] = s.data[offS + 2];
        d.data[offD + 3] = s.data[offS + 3];
      }
    }
  }
  for (var dy = h / 2; dy < h; dy++) {
    for (var dx = 0; dx < w; dx++) {
      var theta = 2 * Math.PI * (dx / w);

      var a = (((Math.cos(theta) * 0.5 + 0.5) * 0.85) + 0.15) * (h / 2);
      var dp = (h - dy) / a; // change

      var sx = dx;
      var sy = Math.floor(h - dp * (h / 2)); // change

      if (sy >= h / 2) { // change
        var offS = sy * w * 4 + sx * 4;
        var offD = dy * w * 4 + dx * 4;
        d.data[offD + 0] = s.data[offS + 0];
        d.data[offD + 1] = s.data[offS + 1];
        d.data[offD + 2] = s.data[offS + 2];
        d.data[offD + 3] = s.data[offS + 3];
      }
    }
  }
  // drawSine(d, w, h);
  ctx.putImageData(d, x, y);
}

function drawLine(ctx, y, height, fill) {
  ctx.fillStyle = fill;
  ctx.fillRect(0, y, gbl.width, height);
}

function drawLines(ctx) {

  var r = Math.floor(Math.random() * 256);
  var g = Math.floor(Math.random() * 256);
  var b = Math.floor(Math.random() * 256);
  ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
  ctx.fillRect(0, 0, gbl.width, gbl.height);

  var y = 0;
  var minHeight = Math.floor(Math.random() * 30) + 2;
  while (y < gbl.height) {
    var height = Math.random() * 10 + minHeight;
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    var alpha = Math.random() * 0.3 + 0.1;
    drawLine(ctx, y, height, `rgba(${r}, ${g}, ${b}, ${alpha})`);
    y += height;
  }
}

function gasGiant(ctx) {
  drawLines(ctx);
  eye(ctx, 100, 100, 1000, 500);
  eye(ctx, 1200, 50, 500, 250);
  eye(ctx, 1500, 500, 300, 150);
}

var gbl = {};
initAll();
gasGiant(gbl.ctx);

