$(document).ready(()=> {
  $('#tweet-form').on('submit', (event) => {
    event.preventDefault();
    alert('submitted');
  });

  $('#tweet-button').on('click', ({target}) => {
    setTimeout(() => {
      target.blur();
    }, 200);


  });



});