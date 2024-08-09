chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension installed.");
});

function getAllBookmarks() {
  return new Promise((resolve, reject) => {
    chrome.bookmarks.getTree((bookmarkTreeNodes) => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        resolve(bookmarkTreeNodes);
      }
    });
  });
}

chrome.action.onClicked.addListener(async () => {
  const bookmarks = await getAllBookmarks();
  chrome.storage.local.set({ bookmarks: bookmarks });
});
