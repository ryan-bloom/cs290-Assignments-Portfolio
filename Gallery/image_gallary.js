//Get images from json file into their allocated div boxes

$(document).ready(function(){
  var json_doc = "image_gal.json";
  $.getJSON(json_doc, function(pics){
    var imgList_water = "";
    var imgList_mountain = "";
    var imgList_canyon = "";
    var slideshow_slides = "";
    $.each(pics.pictures, function(){
      if (this.type==="water") {
        imgList_water += '<img src= "'+this.imgPath+'" width= 33.3% height= 350>';
        if (this.name === "water_2"){
          slideshow_slides += '<img id= "water_slide" class = "slide" src= "'+this.imgPath+'" width = 100% height = 200>'
        };
      };
      if(this.type==="mountain"){
        imgList_mountain += '<img src="'+ this.imgPath +'" width= 33.3% height= 350>';
        if (this.name === "mountain_2"){
          slideshow_slides += '<img id= "mountain_slide" class = "slide" src= "'+this.imgPath+'" width = 100% height = 200>'
        };
      };
      if(this.type==="canyon"){
        imgList_canyon += '<img src="'+ this.imgPath +'" width= 33.3% height= 350>';
        if (this.name === "canyon_1"){
          slideshow_slides += '<img id= "canyon_slide" class = "slide" src= "'+this.imgPath+'" width = 100% height = 200>'
        };
      };
    });

/***** Try to only display 1 slide show image at start
    $(slideshow_slides).each(function(){
      if(this.id == "water_slide"){
        $(this).css("display", "block");
      }
      else {
        $(this).css("display", "none");
      };
    });
*******/
    $("#water_pics").append(imgList_water);
    $("#mountain_pics").append(imgList_mountain);
    $("#canyon_pics").append(imgList_canyon);
    $("#slideshow").append(slideshow_slides);
  });

  $("#water_check").change(function(){
    if (this.checked){
      $("#water_pics").fadeIn("slow");
    }
    else $("#water_pics").fadeOut("slow");
  });

  $("#mountain_check").change(function(){
    if (this.checked){
      $("#mountain_pics").fadeIn("slow");
    }
    else $("#mountain_pics").fadeOut("slow");
  });

  $("#canyon_check").change(function(){
    if (this.checked){
      $("#canyon_pics").fadeIn("slow");
    }
    else $("#canyon_pics").fadeOut("slow");
  });

  $("#water_slide").click(function(){
    $("#water_check").checked = true;
    $("#mountain_check").checked = false;
    $("#canyon_check").checked = false;
  });

  $("#mountain_slide").click(function(){
    $("#water_check").checked = false;
    $("#mountain_check").checked = true;
    $("#canyon_check").checked = false;
  });

  $("#canyon_slide").click(function(){
    $("#water_check").checked = false;
    $("#mountain_check").checked = false;
    $("#canyon_check").checked = true;
  });
});


//Functions to create the slide show at the top of the screen and make the show controlable by users
var slide_dex = 1;
window.onload = showDivs(slide_dex);

function plusDivs(n){
  showDivs(slide_dex += n);
};
function showDivs(n){
  var pics = $(".slide");
  if (n>pics.length) {
    slide_dex = 1;
  }
  if (n<1) {
    slide_dex = pics.length;
  }
  for (var m = 0; m < pics.length; m++) {
    $(pics[m]).css("display","none");
  }
  $(pics[slide_dex-1]).css("display", "block");
};
