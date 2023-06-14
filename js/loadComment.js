const text = document.querySelector('textarea')
let comments = Array()

const FORM = document.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault()
  addComment()
  cleanComments()
  loadComment()
})

class Comment {
  static idCounter = 1
  constructor(content, createdAt, score, user, replies, image) {
    this.id = Comment.idCounter++
    this.content = content;
    this.createdAt = createdAt;
    this.score = score;
    this.user = user;
    this.replies = replies;
    this.image = image
  }
}

function addComment() {
  if(text.value.length === 0) {
    return alert('Digite seu comentário')
  } else {
    const new_comment = new Comment(text.value, 'now', 0, 'juliusomo', [], "./images/avatars/image-juliusomo.png")
    comments.push(new_comment)

    updateLocalStorage()
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
          <span class='reply_field' data-name='${comment.user}'>
            <svg width="14" height="13" xmlns="http://www.w3.org/2000/svg"><path d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z" fill="#5357B6"/></svg>
            Reply
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

function addReplyFieldClickListeners() {
  const reply = document.querySelectorAll('.reply_field');

  for (let i = 0; i < reply.length; i++) {
    reply[i].addEventListener('click', (e) => {
      console.log(e)
      const parentSection = e.currentTarget.closest('.comment');
      let newSectionComment = parentSection.nextElementSibling;

      if (newSectionComment && newSectionComment.classList.contains('new-comment')) {
        // A nova seção já existe, então remova-a
        newSectionComment.remove();
      } else {
        newSectionComment = document.createElement('section');
        const textarea = document.createElement('textarea');
        const btn = document.createElement('button');
        newSectionComment.classList.add('new-comment');
        btn.classList.add('btn-new-comment');
        btn.innerHTML = 'SEND';

        newSectionComment.appendChild(textarea);
        newSectionComment.appendChild(btn);

        // Inserir a nova seção como um novo filho do elemento pai
        parentSection.insertAdjacentElement('afterend', newSectionComment);
      }
    });
  }
}

addReplyFieldClickListeners()

function sendAnswer() {
  console.log(btn_resposta)

  for(let i = 0; i < btn_resposta.length; i++) {
    btn_resposta[i].addEventListener('click', () => {
      console.log('enviou')
    })
  }
}