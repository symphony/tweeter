$(() => {
  const { user, content, created_at: timestamp } = { "user": { "name": "Descartes", "avatars": "https://i.imgur.com/nlhLi3I.png", "handle": "@rd" }, "content": { "text": "Je pense , donc je suis" }, "created_at": 1650934142888 };
});

<article class="feed-card rounded">
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
</article>