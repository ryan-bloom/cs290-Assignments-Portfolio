//Get images from json file into their allocated div boxes

$(document).ready(function(){
  var json_doc = "image_gal.json";
  $.getJSON(json_doc, function(pics){
    var imgList_water = "";
    var imgList_mountain = "";
    var imgList_canyon = "";
    var slideshow_slides = "";

    $.each(pics.pictures, function(){
      var img = "";
      if (this.type==="water") {
        img = $('<img class = "water_pic" src= "'+this.imgPath+'" width= 33.3% height= 350 alt="'+this.name+'">');
        //imgList_water.append(img);//'<img class = "water_pic" src= "'+this.imgPath+'" width= 33.3% height= 350>';
        img.appendTo("#water_pics");

        if (this.name === "water_2"){
          slideshow_slides += '<img id= "water_slide" class = "slide" src= "'+this.imgPath+'" width = 100% height = 200 display>';
        };
      };

      if(this.type==="mountain"){
        img = $('<img class = "mountain_pic" src="'+ this.imgPath +'" width= 33.3% height= 350 alt="'+this.name+'">');
        img.appendTo("#mountain_pics");//'<img class = "mountain_pic" src="'+ this.imgPath +'" width= 33.3% height= 350>';
        if (this.name === "mountain_2"){
          slideshow_slides += '<img id= "mountain_slide" class = "slide" src= "'+this.imgPath+'" width = 100% height = 200>'
        };
      };

      if(this.type==="canyon"){
        img = $('<img class = "canyon_pic" src="'+ this.imgPath +'" width= 33.3% height= 350 alt="'+this.name+'">');
        img.appendTo("#canyon_pics");//imgList_canyon += img;//'<img class = "canyon_pic" src="'+ this.imgPath +'" width= 33.3% height= 350>';
        if (this.name === "canyon_1"){
          slideshow_slides += '<img id= "canyon_slide" class = "slide" src= "'+this.imgPath+'" width = 100% height = 200>'
        };
      };

      //var img = $('<img src="'+this.imgPath+'" alt="'+this.name+'">');
      var modal = $("#myModel");
      var modalImg = $("#img01");
      var captionTxt = $("#caption");

      $(img).click(function(){
        $(modal).css("display","block");
        $(modalImg).attr("src", this.src);
        $(captionTxt).html(this.alt);
      });

      var span = $(".close")[0];
      $(span).click(function(){
        $(modal).css("display","none");
      });
    });

    // Add the pictures to the div boxes in html
    //$("#water_pics").append(imgList_water);
    //$("#mountain_pics").append(imgList_mountain);
    //$("#canyon_pics").append(imgList_canyon);
    $("#slideshow").append(slideshow_slides);


    //Function to only display the images on the category based on clicking slide show image
    $("#water_slide").click(function(){
      $("#water_check").prop("checked", true);
      $("#water_pics").fadeIn("slow");
      $("#mountain_check").prop("checked", false);
      $("#mountain_pics").fadeOut("slow");
      $("#canyon_check").prop("checked", false);
      $("#canyon_pics").fadeOut("slow");
    });
    $("#mountain_slide").click(function(){
      $("#water_check").prop("checked", false);
      $("#water_pics").fadeOut("slow");
      $("#mountain_check").prop("checked", true);
      $("#mountain_pics").fadeIn("slow");
      $("#canyon_check").prop("checked", false);
      $("#canyon_pics").fadeOut("slow");
    });
    $("#canyon_slide").click(function(){
      $("#water_check").prop("checked", false);
      $("#water_pics").fadeOut("slow");
      $("#mountain_check").prop("checked", false);
      $("#mountain_pics").fadeOut("slow");
      $("#canyon_check").prop("checked", true);
      $("#canyon_pics").fadeIn("slow");
    });

    window.onload = showDivs(1);
  });

//Upon checking or unchecking the boxes, display or hide the images in that category
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
});




//Functions to create the slide show at the top of the screen and make the show controlable by users
var slide_dex = 1;

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
