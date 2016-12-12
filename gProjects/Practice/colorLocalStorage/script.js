$(function(){

 $("#color_chooser").val(localStorage.getItem("color"));


  $("#save_button").click(function(){
    var my_color = $("#color_chooser").val();
    console.log("you have chosen "+my_color);

    localStorage.setItem("color", my_color);
  });
});
