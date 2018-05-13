window.history.replaceState({}, 0, "#page1"); //

$(window).on("hashchange", (function () {
    var load = [false, false], i, j;
    return function () {
        switch (window.location.hash) {
            case "#page1":
                $(".scroll").attr("class", "scroll");
                break;
            case "#page2":
                if (!load[0]) {
                    for (i in $(".img-page4-lazy")) {
                        j = $(".img-page4-lazy").eq(i);
                        j.attr("src", j.attr("src-lazy"));
                    }
                    load[0] = true;
                }
                $(".scroll").attr("class", "scroll scroll1");
                break;
            case "#page3":
                if (!load[1]) {
                    for (i in $(".img-page5-lazy")) {
                        j = $(".img-page5-lazy").eq(i);
                        j.attr("src", j.attr("src-lazy"));
                    }
                    //$(".img-page5-lazy").attr("src", this.attr("src-lazy"));
                    $("#panel-5").css({
                        background: "url(res/page5/background.png)",
                        backgroundSize: "cover",
                        backgroundPosition: "bottom"
                    });
                    load[1] = true;
                }
                $(".scroll").attr("class", "scroll scroll2");
                break;
            case "#page4":
                $(".scroll").attr("class", "scroll scroll3");
                break;
            case "#page5":
                $(".scroll").attr("class", "scroll scroll4");
        }
    };
})());

document.onreadystatechange = function () {
    //console.log(document.readyState);
    if (document.readyState == "complete") {
        $(".loading").fadeOut();
        $("#second").hide();
        $(".satisfaction").hide();
    }
}

$("#next1").click(function () {
    window.location.hash = "#page2"; //
    $(".scroll").attr("class", "scroll scroll1");
})

function getQuestion(qtype) {
    $.ajax({
        type: "POST",
        url: "./backend/get_question.php",
        data: {
            data: JSON.stringify({
                type: qtype
            }),
        },
        success: function (data) {
            $(".questions").remove(); //
            $("#change").remove(); //
            $(".question1").show();
            var obj = JSON.parse(data);
            var questions = obj["question"];
            if (obj["errcode"] == 0) {
                window.location.hash = "#page3"; //
                for (var i = 0; i <= 5; i++) {
                    var txt = questions[i].text;
                    var div = $("<div></div>").text(txt);
                    $(".question1").append(div);
                    if (txt.length < 10) {
                        var x1 = 12;
                        var y1 = 20;
                        var z1 = parseInt(Math.random() * (x1 - y1 + 1) + y1) + "px";

                        var x2 = 25;
                        var y2 = 30;
                        var z2 = parseInt(Math.random() * (x2 - y2 + 1) + y2) + "vw";

                        var x3 = 1;
                        var y3 = 8;
                        var z3 = parseInt(Math.random() * (x2 - y2 + 1) + y2) * 100;

                        div.css({
                            "font-size": z1,
                            "margin-left": z2,
                            "font-weight": z3,
                            "width": "50vw"
                        });
                    } else if (txt.length < 15) {
                        var x1 = 12;
                        var y1 = 20;
                        var z1 = parseInt(Math.random() * (x1 - y1 + 1) + y1) + "px";

                        var x2 = 6;
                        var y2 = 25;
                        var z2 = parseInt(Math.random() * (x2 - y2 + 1) + y2) + "vw";

                        var x3 = 1;
                        var y3 = 8;
                        var z3 = parseInt(Math.random() * (x2 - y2 + 1) + y2) * 100;

                        div.css({
                            "font-size": z1,
                            "margin-left": z2,
                            "font-weight": z3,
                            "width": "60vw"
                        });
                    } else {
                        var x1 = 12;
                        var y1 = 20;
                        var z1 = parseInt(Math.random() * (x1 - y1 + 1) + y1) + "px";

                        var x2 = 8;
                        var y2 = 9;
                        var z2 = parseInt(Math.random() * (x2 - y2 + 1) + y2) + "vw";

                        var x3 = 1;
                        var y3 = 4;
                        var z3 = parseInt(Math.random() * (x2 - y2 + 1) + y2) * 100;

                        div.css({
                            "font-size": z1,
                            "margin-left": z2,
                            "font-weight": z3,
                            "width": "75vw"
                        });
                    }

                    div.addClass("questions");
                };

                $(".question1").append('<div id="change"><img class="change" src="./res/page3/2.png" alt=""></div>');
                $("#change").click(function () {
                    $(".questions").remove();
                    this.remove();
                    getQuestion(type);
                });

                $(".questions").click(function () {
                    var id = questions[i].id;
                    window.location.hash = "#page4";
                    var selectValue = "";
                    selectValue = $(this).text();
                    getAnswer(id);
                });
            } else {
                var text = "";
                text = obj["errmsg"];
                alert(text);
                return;
            }
        },
        error: function () {
            alert("网络连接失败");
            return;
        },
    })
}

function getAnswer(id) {
    context.drawImage(img, 25, 18, 279, 186);
    $(".satisfaction").fadeOut();
    if (id != 0) {
        $("#second").fadeOut(20, function () {
            $("#first").fadeIn(200);
        });
    }
    var id = parseInt(id);
    $.ajax({
        type: "POST",
        url: "./backend/get_answer.php",
        data: {
            data: JSON.stringify({
                id: id
            }),
        },
        success: function (data) {
            var obj = JSON.parse(data);
            var answer = obj["answer"];
            $("#answer").text(answer);
        },
        error: function () {
            alert("网络连接失败");
            return;
        }
    })
};

var type = "";
$("#option1").click(function () {
    type = 0;
    getQuestion(type);
})

$("#option2").click(function () {
    type = 1;
    getQuestion(type);
})

$("#option3").click(function () {
    type = 2;
    getQuestion(type);
})

$("#yes").click(function () {
    window.history.replaceState({}, 0, "#page5"); //
    $(".scroll").attr("class", "scroll scroll4"); //
})

$("#no").click(function () {
    context.drawImage(img, 25, 18, 279, 186);
    getAnswer(0);
    $("#first").fadeOut(20, function () {
        $("#second").fadeIn(200);
    });
    $(".satisfaction").fadeOut();
})


var canvas = document.getElementById("canvas"),
    context = canvas.getContext("2d"),
    eraser = 35,
    img = new Image();

img.src = "./res/page4/cover.png";
var dragging = false;

window.onload = function () {
    context.save();
    context.drawImage(img, 25, 18, 279, 186);
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