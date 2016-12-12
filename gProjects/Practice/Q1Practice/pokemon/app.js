$(function(){
//event listener for the form
  $('form').on('submit',function(event){
    event.preventDefault();
    var name = $("input[name=pokemon]").val();
    getPokemon(name);
  });


function getPokemon(pokemonName){
  $.get("http://pokeapi.co/api/v2/pokemon/"+pokemonName,function(poke){
    displayPokemon(poke);
    });
  }

  //create an img tag
  function displayPokemon(pokemon){
  var $img = $('<img>');
  $img.attr('src',pokemon.sprites.front_default);
  $('body').append($img);

  }
  //give it the image url

  //append it to the body



});
