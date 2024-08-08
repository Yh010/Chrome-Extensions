const tweets = document.querySelectorAll('article div[data-testid="tweetText"] span[class="css-1jxf684 r-bcqeeo r-1ttztb7 r-qvutc0 r-poiln3"]');

tweets.forEach(tweet => {
  if (tweet) {
    const text = tweet.textContent;
    const wordMatchRegExp = /[^\s]+/g;
    const words = text.matchAll(wordMatchRegExp);
    const wordCount = [...words].length;
    const readingTime = Math.round(wordCount / 200);
    const badge = document.createElement("p");
    badge.classList.add("color-secondary-text", "type--caption");
    badge.textContent = `⏱️ ${readingTime} min read`;

    const tweetContainer = tweet.closest('article');
    if (tweetContainer) {
      tweetContainer.insertAdjacentElement("beforeend", badge);
    }
  }
});
