document.addEventListener('DOMContentLoaded', async () => {
  const bookmarksList = document.getElementById('bookmarksList');

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

  const bookmarks = await getAllBookmarks();
  populateBookmarks(bookmarks, bookmarksList);

  function populateBookmarks(bookmarkNodes, parentElement) {
    bookmarkNodes.forEach((node) => {
      const li = document.createElement('li');
      if (node.url) {
        const a = document.createElement('a');
        a.href = node.url;
        a.textContent = node.title;
        a.target = "_blank";
        li.appendChild(a);
      } else {
        li.textContent = node.title;
        if (node.children && node.children.length > 0) {
          const ul = document.createElement('ul');
          populateBookmarks(node.children, ul);
          li.appendChild(ul);
        }
      }
      parentElement.appendChild(li);
    });
  }
});
