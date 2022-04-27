$(document).ready(() => {
  const $input = $('#text-area');
  const $counter = $('#counter');
  const maxChar = 140;

  $('button').on('click', ({target}) => {
    target.blur();
  });

  $('#compose-tweet').on('submit', (event) => {
    event.preventDefault();
    $input.val('');
    $input.focus();
  });

  let charCount = 0;
  $input.bind('input propertychange', () => {
    charCount = $input.val().length;
    $counter.text(maxChar - charCount);
    if (charCount >= 100) $counter.addClass('text-orange');
    if (charCount <= 99) $counter.removeClass('text-orange');
    if (charCount >= 141) $counter.addClass('text-red');
    if (charCount <= 140) $counter.removeClass('text-red');
  });
});