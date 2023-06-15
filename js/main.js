const main = document.getElementById('content')
let db

fetch('./data.json')
.then(response => {return response.json()})
.then(data => {
  db = data.comments
  createSection()
})
.catch(error => {
  // Trate qualquer erro que ocorrer durante a requisição
  console.log('Ocorreu um erro:', error);
});

function createSection() {
  db.sort(ordenaDb)
  db.forEach(el => {
    const section = `
      <section class='main-comment comment'>
        <div class='up-down-vote'>
          <button class="upvote-btn">+</button>
          <span class="score">${el.score}</span>
          <button class="downvote-btn">-</button>
        </div>
        <header class='cabecalho'>
          <div>
            <img src='${el.user.image.png}'>
            <span class='username'>${el.user.username}</span>
            <span class='createdAt'>${el.createdAt}</span>
          </div>
          <span class='reply_field' data-name='${el.user.username}'>
            <svg width="14" height="13" xmlns="http://www.w3.org/2000/svg"><path d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z" fill="#5357B6"/></svg>
            Reply
          </span>
        </header>
        <main class='main-content'>
          <p class='comment'>${el.content}</p>
        </main>
      </section>
    `
    main.insertAdjacentHTML('afterbegin', section)

    if (el.replies && el.replies.length > 0) {
      el.replies.forEach((answer) => {
        const answerElement = `
          <section class='sub-comment comment'>
            <div class='up-down-vote'>
              <button class="upvote-btn">+</button>
              <span class="score">${answer.score}</span>
              <button class="downvote-btn">-</button>
            </div>
            <header class='cabecalho'>
              <div>
                <img src='${answer.user.image.png}'>
                <span class='username'>${answer.user.username}</span>
                <span class='createdAt'>${answer.createdAt}</span>
              </div>
              <span class='reply_field' data-name='${answer.user.username}'>
                <svg width="14" height="13" xmlns="http://www.w3.org/2000/svg"><path d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z" fill="#5357B6"/></svg>
                Reply
              </span>
            </header>
            <main class='main-content'>
              <p class='comment-text'><span class='replying-to'>${answer.replyingTo}</span> ${answer.content}</p>
            </main>
          </section>
        `;
        const mainComment = document.querySelector('.main-comment');
        mainComment.insertAdjacentHTML('afterend', answerElement);
      });
    }
  })
}

function ordenaDb(a, b) {
  return a.score - b.score
}