const { distanceInWordsToNow } = dateFns;

// == helpers ==
const safeText = (text) => {
  const safe = document.createElement("div");
  safe.appendChild(document.createTextNode(text));
  console.log('safe', safe);
  return safe.innerHTML;
};

const createTweetElement = ({user, content, created_at}) => {
  const timeAgo = distanceInWordsToNow(new Date(created_at), new Date(), { addSuffix: true }) + ' ago';
  const htmlStructure = // need to create escape function for xss vulnerabilities
`
<article class="flex column feed-card">
  <header class="flex user-info">
    <div class="flex user-avatar">
      <img src="${user.avatars}" class="avatar"></img>
      <span class="username">${safeText(user.name)}</span>
    </div>
      <span class="handle"><strong>${safeText(user.handle)}</strong></span>
  </header>

  <span class="tweet-content">${safeText(content.text)}</span>
    <div class="flex footer">
      <span class="timestamp">${timeAgo}</span>
      <span class="socials">
        <i class="social fa-solid fa-flag"></i>
        <i class="social fa-solid fa-retweet"></i>
        <i class="social fa-solid fa-heart"></i>
      </span>
    </div>
</article>
`;
  return htmlStructure;
};

const renderTweets = (tweets) => {
  $('#feed-container').html('');
  for (const tweet of tweets) {
    $('#feed-container').prepend(createTweetElement(tweet));
  }
};

const loadTweets = () => {
  $.ajax('/tweets')
  .then((data) => {
    renderTweets(data);
  })
  .catch((error) => {
    alert("Error fetching. See console log.");
    console.log(error);
  });
}

const submitTweet = (textSerialized, loadTweets) => {
  $.ajax({
    url: '/tweets',
    method: 'post',
    data: textSerialized
  })
    .then((data) => {
      loadTweets();
    })
    .catch((error) => {
      alert("Error fetching. See console log.");
      console.log(error);
    });
};

const showAlert = (message) => {
  const $alert = $('#alert-box');
  $alert.children('.alert').children('.alert-text').text(message);
  $alert.slideDown();
  setTimeout(() => {
    $('#alert-box').slideUp();
  }, 6000);
};

// =================
// == page loaded ==
// =================
$(document).ready(() => {
  // Reset (any) button state on click
  $('button').on('click', ({target}) => {
    target.blur();
  });

  $('#nav-cta').on('click', () => {
    // removes extra text in url bar
    const url = window.location.href.split(/[?#]/)[0];
    setTimeout(() => {
      $('#text-area').focus();
      window.history.pushState({}, null, url);
    }, 10)
  });

  $('.alert-close').click(function() {
    $(this).parent().parent().slideUp();
  });

  // Compose tweet submission
  $('#compose-tweet').submit((event) => {
    event.preventDefault();
    const $textarea = $('#text-area');
    const $counter = $('#counter');
    const charLimit = 140;
    const textSerialized = $textarea.serialize();
    const textPlain = $textarea.val().trimStart(); // we'll ignore leading whitespace, but not trailing
    $textarea.focus();

    // form validation
    if (textPlain.length > charLimit) return showAlert("Tweet exceeds character limit");
    // reset input field
    $textarea.val('');
    $counter.removeClass('text-orange').removeClass('text-red').val(charLimit);
    if (!textPlain) return showAlert("Tweet cannot be empty");

    // success
    console.log("Tweet submitted succesfully", "\nserialized:", textSerialized, "\nplain:", textPlain); // for testing

    // post request
    submitTweet(textSerialized, loadTweets);
  });

  // == initial page load behaviour ==
  loadTweets();
});