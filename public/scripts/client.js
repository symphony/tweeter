const { distanceInWordsToNow } = dateFns;

// == helpers ==
const createTweetElement = ({user, content, created_at}) => {
  const timeAgo = distanceInWordsToNow(new Date(created_at), new Date(), { addSuffix: true }) + ' ago';
  const htmlStructure =
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

  return htmlStructure;
};

const renderTweets = (tweets) => {
  let tweetContainer = '';
  for (const tweet of tweets) {
    tweetContainer = createTweetElement(tweet) + tweetContainer;
  }
  return tweetContainer;
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


  // Compose tweet submission
  $('#compose-tweet').submit((event) => {
    event.preventDefault();
    const $textarea = $('#text-area');
    const $counter = $('#counter');
    const charLimit = 140;
    const textSerialized = $textarea.serialize();
    const textPlain = $textarea.val().trim();
    $textarea.focus();

    // errors - exceeds char limit
    if (textPlain.length > charLimit) return alert("Not submitted. No content in input field."); // todo replace with non intrusive alert

    // reset input field
    $textarea.val('');
    $counter.removeClass('text-orange').removeClass('text-red').val(charLimit);
    if (!textPlain) return;

    // success
    console.log("Tweet submitted succesfully", "\nencoded:", textSerialized, "\nplain:", textPlain); // for testing

    // will replace ajax request with form contents soon
    $.ajax('/tweets/')
    .then((data) => {
      const newTweet = data.slice(-1)[0]; // using old tweet as template for now
      newTweet.content.text = textPlain;
      $('#feed-container').prepend(createTweetElement(newTweet));
    })
    .catch((error) => {
      alert("Error fetching. See console log.");
      console.log(error);
    });
  });


  // == initial page load behaviour ==
  // Render store tweets
  $.ajax('/tweets/')
  .then((data) => {
    $('#feed-container').prepend(renderTweets(data));
  })
  .catch((error) => {
    alert("Error fetching. See console log.");
    console.log(error);
  });
});