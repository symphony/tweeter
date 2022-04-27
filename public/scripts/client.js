import { formatDistance, subDays } from 'date-fns'

const buildTweetCard= ({user, content, created_at}) => {
  const timeAgo = formatDistance(subDays(new Date(created_at), 3), new Date(), { addSuffix: true });
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

$(document).ready(() => {
  $('#nav-cta').on('click', () => {
    setTimeout(() => {
      $('#text-area').focus();
    }, 10)

    const newTweet = $.ajax('/tweets').slice(-1)[0];
    $('#feed-container').prepend(buildTweetCard(newTweet))


  });
});

$(() => {
  const { user, content, created_at: timestamp } = { "user": { "name": "Descartes", "avatars": "https://i.imgur.com/nlhLi3I.png", "handle": "@rd" }, "content": { "text": "Je pense , donc je suis" }, "created_at": 1650934142888 };
});

`<article class="feed-card rounded">
  <div class="user">
    <span>
      <div>
        <img src="user.avatars" class="avatar"></img>
        <p class="username">user.name</p>
      </div>
      <p class="handle">user.handle</p>
    </span>
  </div>

  <div class="content">content.text</div>
  <div>
    <span>
      <p class="timestamp">new Date(timestamp)</p>
      <div class="socials">
        <i class="fa-duotone fa-camera-retro"></i>
        <i class="fa-duotone fa-camera-retro"></i>
        <i class="fa-duotone fa-camera-retro"></i>
      </div>
    </span>
  </div>
</article>`