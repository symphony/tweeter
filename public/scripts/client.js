const { distanceInWordsToNow } = dateFns;

// == helpers ==
const createTweetElement = ({user, content, created_at}) => {
  const timeAgo = distanceInWordsToNow(new Date(created_at), new Date(), { addSuffix: true }) + ' ago';
  const htmlStructure = // need to create escape function for xss vulnerabilities
`
<article class="flex column feed-card">
  <header class="flex user-info">
    <div class="flex user-avatar">
      <img src="${user.avatars}" class="avatar"></img>
      <span class="username">${user.name}</span>
    </div>
      <span class="handle"><strong>${user.handle}</strong></span>
  </header>

  <span class="tweet-content">${content.text}</span>
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

  if (htmlStructure.includes('script>')) throw
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
      window.history.pushState({}, null, url);
      $('#text-area').focus();
    }, 10)
  });

  $('.alert-close').click(function() {
    $(this).parent().addClass('closed');
  });

  // Compose tweet submission
  $('#compose-tweet').submit((event) => {
    event.preventDefault();
    const $textarea = $('#text-area');
    const $counter = $('#counter');
    const charLimit = 140;
    const textSerialized = $textarea.serialize();
    const textPlain = $textarea.val().trim();
    $textarea.focus();
    console.log('trimmed?', textSerialized.replace(/%20+/g, '%20'));


    // form validation
    if (textPlain.length > charLimit) return alert("Not submitted. No content in input field."); // todo replace with non intrusive alert
    // reset input field
    $textarea.val('');
    $counter.removeClass('text-orange').removeClass('text-red').val(charLimit);
    if (!textPlain) return;

    // success
    console.log("Tweet submitted succesfully", "\nserialized:", textSerialized, "\nplain:", textPlain); // for testing

    // post request
    submitTweet(textSerialized, loadTweets);
  });

  // == initial page load behaviour ==
  loadTweets();
});

