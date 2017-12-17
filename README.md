# practica_movies
cordova practice using external API to display a list of movies and use Jquery Mobile for navigation

## Setup process

Fist of all I started creating a folder and navigating to it using comand line in Node.js and created a project with the following code
```
cordova create movies com.roger.www movies
```

After that I replaced the WWW folder with one with a working version of JqueryMobile and Jquery
Following it I started to develop the navigation Pages. 
In this case I use 3 main pages:
  - Main page consisting of an empty <ul> element where I append info from the external API used using Jquery requests.
  - Details page with an image and <p> tag that shows the info of the selected item from the Main page item selected.
  - Favorites page with a list of our favorite selection from the main page.
For navigation I use the # for navigation
```
location.hash="#destinationIDofPage"
```
This code uses the hash to navigate between the 3 pages, each one consisting on a diferent ID.

## The Main page

for the main page I use a function called when the enviroment is ready to respond to javascript calls. In this initialization i call the Movies API database requesting for the most popular movies. The response is a Json format object with the information of the Movies.
```
function getMoviesListAndDrawList(){
     var theList = $("#mylist");
     var request = $.ajax({
          url: "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=APIKEY",
          method: "GET"
        });
```
The request needs an API key not shown here in the example cause of legal requirements of hte API. 
Upon geting the response from the web database in Json format I append the information to the main page.

```
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
```

This method creates a <li> element wich is appended to the main page <ul>.
Also in the same process i catch an instance of the element created and add an event listener to add the click functionality and adding its unike ID collecteds from the API
  
````
function alertName(id){
  console.log(id.target.id);
  location.hash="#detail"
  getMovieAndDrawDetail(id.target.id);
}
````

The alertName function gets the target id of thee element itself and its called upon clicking on the <li> element.
it navigates to the details page and then updates the information of the page passing the ID to the getMoviesAndDrawDetails function.
````
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
````
