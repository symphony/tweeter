(() => {
  $(document).ready(() => {
    // == events ==
    // Reset (any) button state on click
    $('button').on('click', function() {
      $(this).blur();
    });

    $('#nav-cta').on('click', goToComposeTweet);

    $('.alert-close').click(function() {
      $(this).closest('#alert-box').slideUp();
    });

    $('#compose-tweet').on('submit', onSubmit);

    // == initial page load behaviour ==
    loadTweets();
  });


  // =============
  // == helpers ==
  // =============
  const onSubmit = function(event) {
    event.preventDefault();
    const $textarea = $(this).find('textarea');
    const $counter = $(this).find('output');
    const textSerialized = $textarea.serialize();
    const textPlain = $textarea.val().trimStart(); // we'll ignore leading whitespace, but not trailing
    const charLimit = 140;
    $textarea.focus();

    // form validation
    if (textPlain.length > charLimit) return showAlert("Tweet exceeds character limit");
    // reset input field
    $textarea.val('');
    $counter.removeClass('text-orange text-red').text(charLimit);
    if (!textPlain) return showAlert("Tweet cannot be empty");

    // success
    submitTweet(textSerialized, loadTweets);
  };

  const submitTweet = (textSerialized, loadTweets) => {
    $.post('/tweets', textSerialized)
      .then(loadTweets)
      .catch((error) => {
        alert("Error fetching. See console log.");
        console.log(error);
      });
  };

  const goToComposeTweet = () => {
    // removes extra text in url bar
    const url = window.location.href.split(/[?#]/)[0];
    setTimeout(() => {
      $('#text-area').focus();
      window.history.pushState({}, null, url);
    }, 10)
  }

  const safeText = (text) => {
    const safe = document.createElement("div");
    safe.appendChild(document.createTextNode(text));
    return safe.innerHTML;
  };

  const createTweetElement = ({user, content, created_at}) => {
    const timeAgo = dateFns.distanceInWordsToNow(new Date(created_at), new Date(), { addSuffix: true }) + ' ago';
    const htmlStructure =
  `
  <article class="flex column tweet">
    <header class="flex">
      <span class="flex">
        <img src="${user.avatars}"></img>
        <span class=>${safeText(user.name)}</span>
      </span>
      <span><strong>${safeText(user.handle)}</strong></span>
    </header>
    <p>${safeText(content.text)}</p>
      <footer class="flex">
        <span class="timestamp">${timeAgo}</span>
        <span class="socials">
          <i class="social fa-solid fa-flag"></i>
          <i class="social fa-solid fa-retweet"></i>
          <i class="social fa-solid fa-heart"></i>
        </span>
      </footer>
  </article>
  `;
    return htmlStructure;
  };

  const renderTweets = (tweets) => {
    const $feedContainer = $('#feed-container');
    $feedContainer.html('');
    for (const tweet of tweets) {
      $feedContainer.prepend(createTweetElement(tweet));
    }
  };

  const loadTweets = () => {
    $.get('/tweets')
    .then((data) => {
      renderTweets(data);
    })
    .catch((error) => {
      alert("Error fetching. See console log.");
      console.log(error);
    });
  };

  const showAlert = (message) => {
    const $alert = $('#alert-box');
    $alert.find('.alert-text').text(message);
    $alert.slideDown();
    setTimeout(() => {
      $alert.slideUp();
    }, 6000);
  };
})();