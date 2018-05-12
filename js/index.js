document.onreadystatechange=function(){
    //console.log(document.readyState);
    if(document.readyState=="complete"){
        $(".loading").fadeOut();
        $("#second").hide();
        $(".satisfaction").hide();
    }
}

$("#next1").click(function(){
    $(".scroll").addClass("scroll1");
})

// function hashChange (url){
//     window.history.replaceState(null,0,url);
// }

function getQuestion (qtype){
    $.ajax({
        type:"POST",
        url:"./backend/get_question.php",
        data:{
            data : JSON.stringify({type : qtype}),
        },
        success:function(data){
            $(".question1").show();
            var obj = JSON.parse(data);
            var questions = obj["question"];
            if(obj["errcode"]==0){
                $(".scroll").removeClass("scroll1");
                $(".scroll").addClass("scroll2"); 
                for(var i = 0; i<=5; i++){
                    var txt = questions[i].text;
                    var div = $("<div></div>").text(txt);
                    $(".question1").append(div);
                    var x1 = 12; var y1 = 24;
                    var z1 = parseInt(Math.random()*(x1 - y1 + 1) + y1) + "px";

                    var x2 = 4; var y2 = 26;
                    var z2 = parseInt(Math.random()*(x2 - y2 + 1) + y2) + "vw";

                    div.css({
                        "font-size" : z1,
                        "margin-left" : z2,
                    });

                    div.addClass("questions");
                };
                $(".questions").click(function(){
                    var id = questions[i].id;
                    $(".scroll").removeClass("scroll2");
                    $(".scroll").addClass("scroll3");
                    var selectValue = "";
                    selectValue = $(this).text();
                    getAnswer(id);
                });
            }else{
                var text = "";
                text = obj["errmsg"];
                alert(text);
                return;
            }
        },
        error:function(){
            alert("网络连接失败");
            return;
        },
    })
}

function getAnswer(id){
    var id = parseInt(id);
    $.ajax({
        type:"POST",
        url:"./backend/get_answer.php",
        data:{
            data : JSON.stringify({id : id}),
        },
        success:function(data){
            var obj = JSON.parse(data);
            var answer = obj["answer"];
            $("#answer").text(answer);
        },
        error:function(){
            alert("网络连接失败");
            return;
        }
    })
};

$("#option1").click(function(){
    getQuestion(0);
})

$("#option2").click(function(){
    getQuestion(1);
})

$("#option3").click(function(){
    getQuestion(2);
})

$("#yes").click(function(){
    $(".scroll").removeClass("scroll3");
    $(".scroll").addClass("scroll4");
})

$("#no").click(function(){
    context.drawImage(img,25,18,279,186);
    getAnswer(0);
    $("#first").hide();
    $("#second").fadeIn();
})





// window.addEventListener("popstate", function() {
//     var hushLocation = window.location.hash;
//     console.log(hushLocation)
//     if(hushLocation == "#panel-1" ||hushLocation == ""){
//         $(".scroll").removeClass("scroll1").removeClass("scroll2").removeClass("scroll3").removeClass("scroll4").addClass("scroll0");
//     }
//     if(hushLocation == "#panel-2"){
//         $(".scroll").removeClass("scroll1").removeClass("scroll0").removeClass("scroll3").removeClass("scroll4").addClass("scroll1");
//     }
//     if(hushLocation == "#panel-3"){
//         $(".scroll").removeClass("scroll1").removeClass("scroll2").removeClass("scroll0").removeClass("scroll4").addClass("scroll2");
//     }
//     if(hushLocation == "#panel-4"){
//         $(".scroll").removeClass("scroll1").removeClass("scroll2").removeClass("scroll3").removeClass("scroll0").addClass("scroll3");
//     }
//     if(hushLocation == "#panel-5"){
//         $(".scroll").removeClass("scroll1").removeClass("scroll2").removeClass("scroll3").removeClass("scroll0").addClass("scroll4");
//     }
// })x`x