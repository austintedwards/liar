$(function(){
  $("#fire").click(function(){
    if ($(".fire").attr("src")==='fire.png'){
      $(".fire").attr("src",'log.png');
    }else{
      $(".fire").attr("src",'fire.png');
    }

  });
});
