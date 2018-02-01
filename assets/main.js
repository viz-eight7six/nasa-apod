$(function(){

// Get the modal and html tags
  var modal = document.getElementById('img-modal');
  var imgTitle = document.getElementById('img-title');
  var imgDes = document.getElementById('img-des');
  var image = document.getElementById('image');
  var hdImage = document.getElementById('hd-image');
  var dateInput = document.getElementById('date');
  
  //get current Date and parse to usable date for NASA YYYY-MM-DD
  var d = new Date();
  var day = d.getDate();
  var year = d.getFullYear();
  var month = d.getMonth() + 1;
  
  //put date with some padding using ternaries
  var date = `${year}-${month > 9 ? month : '0'+month}-${day > 9 ? day : '0'+day}`;
  
  //set current date and max date limiting furture requests
  dateInput.setAttribute('value', date);
  dateInput.setAttribute('max', date);
  
  //event listener to refetch when date is changed on the calendar
  dateInput.onchange = function(){
    date = dateInput.value;
    fetchImage(date);
  };
  
  //our parameters for our ajax request
  var APOD = {
    url: 'https://api.nasa.gov/planetary/apod',
    type: 'GET',
    dataType: 'json',
    data: {
      api_key: '8tKXFJvk4bzxmNizdRyj62p8ouqTEIo4LCoJO7FP',
      hd: true,
      date: null //we leave this as null just incase date failed, since default is current date in UTC
    }
  };
  
  //function to fetch image from NASA using ajax
  var fetchImage = function(dateVar){
    if(dateVar){
      APOD.data.date = dateVar;
    }
    $.ajax(APOD).done(function(res){
      imgTitle.innerHTML = (res.title);
      imgDes.innerHTML = (res.explanation);
      image.setAttribute("src", res.url);
      hdImage.setAttribute("src", res.hdurl);
    });
  };
  
  //initial fetch
  fetchImage(date);

  // When the user clicks on the image, open the modal 
  image.onclick = function() {
    modal.style.display = "block";
  };

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
  };
  
});