
const text = document.querySelector('textarea');
const formComment = document.querySelector('#make-comment')

let comments = Array();
let replyingTo

formComment.addEventListener('submit', (e) => {
  e.preventDefault()
  addComment()
  cleanComments()
  loadComment()
})

class Comment {
  constructor(content, createdAt, replyingTo, score, user, replies, image) {
    this.content = content;
    this.createdAt = createdAt;
    this.replyingTo = replyingTo
    this.score = score;
    this.user = user;
    this.replies = replies;
    this.image = image
  }
}

function addComment() {
  if (text.value.length === 0) {
    return alert('Digite seu comentário');
  } else {
    const new_comment = new Comment(text.value, new Date(), 'everybody', 0, 'juliusomo', [], "./images/avatars/image-juliusomo.png");
    comments.push(new_comment);

    updateLocalStorage();
  }
}

function updateLocalStorage() {
  localStorage.setItem('comments', JSON.stringify(comments))
}

function cleanComments() {
  text.value = ''
  const your_comment = document.querySelectorAll('.your-comment')
  for(let i = 0; i < your_comment.length; i++) {
    your_comment[i].remove()
  }
}

function checkLocalStorage() {
  if(localStorage.getItem('comments')) {
    comments = JSON.parse(localStorage.getItem('comments'))
  }
}

function loadComment() {
  checkLocalStorage()
  comments.forEach((comment) => {
    const htmlComment = `
    <section class='main-comment your-comment comment'>
      <div class='up-down-vote'>
        <button class="upvote-btn">+</button>
        <span class="score">${comment.score}</span>
        <button class="downvote-btn">-</button>
      </div>
      <header class='cabecalho'>
        <div>
          <img src='${comment.image}'>
          <span class='username'>${comment.user}</span>
          <span class='createdAt'>${comment.createdAt}</span>
        </div>
        <span data-name='${comment.user}'>  
          <button class="edit-button">Edit</button>
          <button class="delete-button">Delete</button>
        </span>
      </header>
        <main class='main-content'>
          <p class='comment'>${comment.content}</p>
        </main>
    </section>
    `;
    main.insertAdjacentHTML("beforeend", htmlComment);
  })
}

loadComment()