
 var size=0;
var myAPIKey="AIzaSyAaljk6lCARUKHv2eDVst8P403T0lNhfLs";
// var $ = require('jQuery');

var show_book =function(book) {
  clearingVariable();
  console.log(book+"  the book  ")

  $('#picBook').empty();
  if(book.volumeInfo.title!=undefined)
  $('#titleBook').text(book.volumeInfo.title)
  else
  $('#titleBook').text("no title")

  if(book.volumeInfo.description!=undefined)
  $('#description').text(book.volumeInfo.description)
  else 
  $('#description').text("no description")

  if(book.volumeInfo.authors!=undefined)
  $('#writter').text("written by: "+book.volumeInfo.authors)
  else
  $('#writter').text("no authors")
  
  
  if(book.volumeInfo.imageLinks!=undefined)
  {
    if(book.volumeInfo.imageLinks.smallThumbnail!=undefined)
    $('#picBook').append('<img src='+book.volumeInfo.imageLinks.smallThumbnail+' class="img-responsive" alt="image book">' )
    else
    $('#picBook').append('<img src="nopic.jpg" class="img-responsive" alt="image book">' )  }
  else
  $('#picBook').append('<img src="nopic.jpg" class="img-responsive" alt="image book">' )
}


 var listBook=function(size,items){
   
       $('#my-list').empty();
       $('#my-list').append('<span id="bookList"> Book list for   '+$('#item').val()+'</span>')
       $('#my-list').append('<ol id="list">')
       for(var i=0;i<size;i++){
         $('#list').append('<li id="'+i+'">'+items[i].volumeInfo.title+'</li>')
        }
        $('#my-list').append('</ol>')
        $('li').click(function (event) {
        show_book(items[event.target.id])
     });
  } 


var fetch = function (toFind) {
  clearingVariable();
  $.ajax({
   method: "GET",
   //url: 'https://www.googleapis.com/books/v1/volumes?q=isbn:0439023521',
   url: 'https://www.googleapis.com/books/v1/volumes?q=isbn:'+toFind+'',
      success: function(data) {
        console.log(data)
       if(data.totalItems!=0)
       {
        if (data.items.length>10)
        size=10;
        else
        size=data.items.length;
        listBook(size,data.items)
        show_book(data.items[0])
       }
       else
       $('#titleBook').text("no book")
       },
       error: function(jqXHR, textStatus, errorThrown) {
       console.log(textStatus);
     }
   }); 
  };



var inTitle = function (toFind) {
  clearingVariable();
    $.ajax({
    method: "GET",
    url: 'https://www.googleapis.com/books/v1/volumes?q=intitle:'+toFind+'',
    success: function(data) {
      console.log(data)
     if(data.totalItems!=0)
     {
      if (data.items.length>10)
      size=10;
      else
      size=data.items.length;
      listBook(size,data.items)
      show_book(data.items[0])
     }
     else
     $('#titleBook').text("no book")
     },
     error: function(jqXHR, textStatus, errorThrown) {
     console.log(textStatus);
   }
 }); 
};

var inAuthor = function (toFind) {
  clearingVariable();
 // alert('https://www.googleapis.com/books/v1/volumes?q='+toFind+'+intitle')
//alert('https://www.googleapis.com/books/v1/volumes?q='+toFind+'+inauthor:keyes&key='+myAPIKey+'')
  $.ajax({
    method: "GET",
  //  url: 'https://www.googleapis.com/books/v1/volumes?q='+toFind+'+inauthor:keyes&key='+myAPIKey+'',
  url: 'https://www.googleapis.com/books/v1/volumes?q=inauthor:'+toFind+'',

    success: function(data) {
      console.log(data)
     if(data.totalItems!=0)
     {
      if (data.items.length>10)
      size=10;
      else
      size=data.items.length;
      listBook(size,data.items)
      show_book(data.items[0])
     }
     else
     $('#titleBook').text("no book")
     },
     error: function(jqXHR, textStatus, errorThrown) {
     console.log(textStatus);
   }
 }); 
};

$('#s-ISBN').click(function(){
if($('#item').val().length>5)
   fetch($('#item').val());
   else
   $('#titleBook').text("isbn short")
})
$('#s-title').click(function(){

  inTitle($('#item').val());
})
$('#s-author').click(function(){

  inAuthor($('#item').val());
})
//0439023521


//https://www.googleapis.com/books/v1/volumes?q=flowers+inauthor:keyes&key=yourAPIKey
// https://www.googleapis.com/books/v1/volumes?q=The Hunger Games+intitle:keyes&key=AIzaSyAaljk6lCARUKHv2eDVst8P403T0lNhfLs
//https://www.googleapis.com/books/v1/volumes?q=TheHungerGames+intitle



function clearingVariable(){
  $('#titleBook').text("")
  $('#description').text("");
  $('#writter').text("");
  $('#picBook').empty();
}


$(document).ajaxStart(function(){
  $('#Loading').show();
});

$(document).ajaxComplete(function(){
  $('#Loading').hide();
});
