/**
 * Created by LIN on 2016/1/29 0029.
 */

var canvasWidth = window.innerWidth
var canvasHeight = window.innerHeight

var canvas = document.getElementById("canvas")
var context = canvas.getContext("2d")

canvas.width = canvasWidth
canvas.height = canvasHeight

var image = new Image()
var radius = 50
var clippingRegion = {x: -1 , y: -1 , r: radius}
var leftMargin = 0, topMargin = 0

image.src = "echo.jpg"
image.onload = function(e){

    $("#blur-div").css("width",canvasWidth+"px")
    $("#blur-div").css("height",canvasHeight+"px")

    $("#blur-image").css("width",image.width+"px")
    $("#blur-image").css("height",image.height+"px")

    leftMargin = (image.width - canvas.width)/2
    topMargin = (image.height - canvas.height)/2

    $("#blur-image").css("top",String(-topMargin)+"px")
    $("#blur-image").css("left",String(-leftMargin)+"px")

    initCanvas()
}


function initCanvas() {

    var theLeft = leftMargin<0?-leftMargin:0
    var theTop = topMargin<0?-topMargin:0
    clippingRegion = {  x: Math.random()*(canvas.width-2*radius-2*theLeft)+radius+theLeft ,
                        y: Math.random()*(canvas.height-2*radius-2*theTop)+radius+theTop , r: radius}
    draw(image, clippingRegion)

}


function setClippingRegion( clippingRegion ){

    context.beginPath()
    context.arc ( clippingRegion.x , clippingRegion.y , clippingRegion.r , 0 , Math.PI*2, false )
    context.clip()
}

function draw(image , clippingRegion){

    context.clearRect( 0 , 0 , canvas.width , canvas.height )

    context.save()
    setClippingRegion( clippingRegion)
    context.drawImage(image,
        Math.max(leftMargin, 0) , Math.max(topMargin,0),
        Math.min(canvas.width,image.width), Math.min(canvas.height,image.height),
        leftMargin<0?-leftMargin:0, topMargin<0?-topMargin:0,
        Math.min(canvas.width,image.width), Math.min(canvas.height,image.height))
    context.restore()
}

function reset(){

    initCanvas()
}

function show(){


    var theAnimation = setInterval(
        function(){
            console.log("animation")
            clippingRegion.r += 20
            if( clippingRegion.r > 2*Math.max(canvas.width,canvas.height) ){
                clearInterval(theAnimation)
            }
            draw( image , clippingRegion )
        },
        30
    )
}

//��ֹ�ƶ��˻�������
canvas.addEventListener("touchstart",function(e){
    e.preventDefault()
});

