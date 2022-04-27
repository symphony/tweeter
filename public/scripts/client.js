const { distanceInWordsToNow } = dateFns;

const buildTweetCard = ({user, content, created_at}) => {
  const timeAgo = distanceInWordsToNow(new Date(created_at), new Date(), { addSuffix: true });
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
  let container = '';
  for (const tweet of tweets) {
    container += buildTweetCard(tweet);
  }
  return container;
};

$(document).ready(() => {
  const $input = $('#text-area');
  const $counter = $('#counter');
  const maxChar = 140;

  // Reset button state on click
  $('button').on('click', ({target}) => {
    target.blur();
  });

  $('#nav-cta').on('click', () => {
    setTimeout(() => {
      $('#text-area').focus();
    }, 10)
  });

  $('#compose-tweet').submit((event) => {
    event.preventDefault();
    $input.val('');
    $input.focus();
    $counter.val(maxChar);
    $.ajax('/tweets/')
    .then((data) => {
      $('#feed-container').prepend(renderTweets(data));
    })
    .catch((error) => {
      alert("Error fetching. See console log.");
      console.log(error);
    });
  });
});