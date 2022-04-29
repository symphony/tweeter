(() => {
  $(document).ready(() => {
    const $counter = $('#counter');
    const charLimit = 140;
    let charCount = 0;

    $('#text-area').on('input propertychange', function() {
      charCount = $(this).val().trimStart().length;
      $counter.text(charLimit - charCount);
      if (charCount >= 100) $counter.addClass('text-orange');
      if (charCount <= 99) $counter.removeClass('text-orange');
      if (charCount > charLimit) $counter.addClass('text-red');
      if (charCount <= charLimit) $counter.removeClass('text-red');
    });
  });
})();