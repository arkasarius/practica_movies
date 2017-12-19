

function init(){
    getMoviesListAndDrawList();
}


function getMovieAndDrawDetail(num){
     var request = $.ajax({
          url: "https://api.themoviedb.org/3/movie/"+num+"?api_key=80865681c4ccae7b47ffebc8b71952d8",//num should be poster_path
          method: "GET"
        });
        request.done(function( result ) {
          //return result;
          //alert(result.original_title);
          var  a=document.getElementById("imagenPeli");
          a.src="http://image.tmdb.org/t/p/w500/"+result.poster_path;
          a=document.getElementById("descripcionPeli");
          a.innerHTML=result.overview;
        });
        request.fail(function( jqXHR, textStatus ) {
          alert( "Request failed: " + textStatus );
    });
}

function getMoviesListAndDrawList(){
     var theList = $("#mylist");
     var request = $.ajax({
          url: "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=80865681c4ccae7b47ffebc8b71952d8",
          method: "GET"
        });
        request.done(function( moviesList ) {
            for (i=0;i<moviesList.results.length;i++){
                  theList.append( "<li id ="+ moviesList.results[i].id + ">" + moviesList.results[i].original_title + "</li>");
                }
            theList.listview("refresh");
            for (i=0;i<moviesList.results.length;i++){
                var  a=document.getElementById(moviesList.results[i].id);
                a.addEventListener("click", function(){
                  //console.log(event);
                    alertName(event);
                  });

                }
            });
        request.fail(function( jqXHR, textStatus ) {
          alert( "Request failed: " + textStatus );
    });
}
function alertName(id){
  console.log(id.target.id);
  location.hash="#detail"
  getMovieAndDrawDetail(id.target.id);
}
