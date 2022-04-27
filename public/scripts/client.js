$(document).ready(() => {
  $('#nav-cta').on('click', () => {
    setTimeout(() => {
      $('#text-area').focus();
    }, 10)
  });
});