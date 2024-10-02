MathJax = {
    tex: {inlineMath: [['$','$']]}
}

$(function(){
    var $select = $(".problem-amount");
    for (i=1;i<=20;i++){
        $select.append($('<option></option>').val(i).html(i))
    }
});

var problems = document.querySelectorAll('.problem');

$('.generate-button').click(function(){
    $('.problem-list').html("");
    var category = $('.problem-type').find(":selected").val();
    var amount = parseInt($('.problem-amount').find(":selected").val());
    var type;
    switch(category) {
        case "vec-add":
            type = vecAdd;
            break;
        case "mat-vec-pro":
            type = matVecPro;
            break;
        default:
            type=null;
            break;
    }
    if (type){
        createProblems(type,amount);
    }
});

function createProblems(type,amount){
    for (let n=1;n<amount+1;n++){
        $('.problem-list').append("<div class=\"problem\" id=\"p" + n + "\"><div class=\"question\" id=\"q" + n + "\"></div><div class=\"solution\" id=\"s" + n + "\"><p>REVEAL</p></div></div>");
        const problem = type();
        $('#q'+n).html(problem[0]);
        $('#s'+n).click(function(){
            $('#s'+n).html(problem[1]);
            $('#s'+n).css("color","black");
            $('#s'+n).css("background-color","transparent");
            $('#s'+n+':hover').css("transform","none");
            var questions = document.querySelectorAll('.solution');
            MathJax.typesetPromise(questions)
        });
    }
    var questions = document.querySelectorAll('.question');
    MathJax.typesetPromise(questions)
    .catch((err) => console.error('Error typesetting MathJax:', err));
}

function vecAdd(){
    var x = getRand(3,6);
    const vec1 = getMat(x,1,1,30);
    const vec2 = getMat(x,1,1,30);
    const sol = [];
    for (let i=0;i<x;i++){
        sol.push([parseInt(vec1[i])+parseInt(vec2[i])]);
    }
    return ["$" + toStr(vec1) + "+" + toStr(vec2) + "=$", "$" + toStr(sol) + "$"];
}

function matVecPro(){
    var x = getRand(3,6);
    var y = getRand(3,6);
    const mat = getMat(x,y,1,6);
    const vec = getMat(y,1,1,6);
    const sol = [];
    for (let i=0;i<x;i++){
        var n = 0;
        for (let j=0;j<y;j++){
            console.log(mat[i][j], vec[0][j])
            n += parseInt(mat[i][j]) * parseInt(vec[j][0]);
        }
        sol.push([n]);
    }
    return ["$" + toStr(mat) + toStr(vec) + "=$", "$" + toStr(sol) + "$"];
}

function toStr(mat){
    var pmat = "\\begin{bmatrix}"
    var tmat = [];
    mat.forEach(element => {
        tmat.push(element.join('&'));
    });
    pmat += tmat.join("\\\\");
    pmat += "\\end{bmatrix}";
    return pmat;
}

function getMat(x, y, a, b){
    var mat = [];
    for (let i=0;i<x;i++){
        var row = [];
        for (let i=0;i<y;i++){
            row.push(getRand(a,b));
        }
        mat.push(row)
    }
    return mat;
}

function getRand(a, b){
    return Math.floor(Math.random() * (b-a+1)) + a;
}