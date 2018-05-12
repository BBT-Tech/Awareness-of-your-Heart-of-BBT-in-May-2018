var canvas = document.getElementById("canvas"),
context = canvas.getContext("2d"),
eraser = 35,// 橡皮擦的大小 
img = new Image();

img.src = "./res/page4/cover.png"
dragging = false;

window.onload = function () {
    context.save();
    context.drawImage(img,25,18,279,186);
    context.beginPath();
    context.restore();
}

function windowToCanvas(e) {
    let x = e.targetTouches[0].clientX,
        y = e.targetTouches[0].clientY,
        borderbox = canvas.getBoundingClientRect();

    return {
        x: x - borderbox.left,
        y: y - borderbox.top
    }
}

function drawEraser(loc) {
    context.save();
    context.beginPath();
    context.arc(loc.x, loc.y, eraser, 0, Math.PI * 2, false);
    context.clip();
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.restore();
}

canvas.addEventListener("touchstart", function (e) {
    var loc = windowToCanvas(e);
    dragging = true;
    drawEraser(loc);
})

canvas.addEventListener("touchmove", function (e) {
    var loc;
    if (dragging) {
        loc = windowToCanvas(e);
        drawEraser(loc);
    }
})

canvas.addEventListener("touchend", function (e) {
    dragging = false;
    $(".satisfaction").fadeIn();
})