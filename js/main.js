const main = document.getElementById('content')
let db
let comments = Array();

window.addEventListener('DOMContentLoaded', () => {
  fetch('./data.json')
  .then(response => {return response.json()})
  .then(data => {
    db = data.comments
    comments = db
    console.log(comments)
    createComment()
    
    const reply_btns = document.querySelectorAll('.reply_field')
    addReplyFieldClickListeners(reply_btns)
  })
  .catch(error => {
    // Trate qualquer erro que ocorrer durante a requisição
    console.log('Ocorreu um erro:', error);
  });
})

class Comment {
  constructor(content, createdAt, replyingTo, score, user, replies, image) {
    this.content = content,
    this.createdAt = createdAt,
    this.score = score,
    this.replyingTo = replyingTo
    this.user = user,
    this.replies = replies,
    this.image = image
  }
}

function addComment(text) {
  const new_comment = new Comment(text, new Date(), 'everybody', 0, 'juliusomo', [], "./images/avatars/image-juliusomo.png");
  comments.push(new_comment);

  updateLocalStorage();
}

function updateLocalStorage() {
  localStorage.setItem('comments', JSON.stringify(comments))
}

function checkLocalStorage() {
  if(localStorage.getItem('comments')) {
    comments = JSON.parse(localStorage.getItem('comments'))
  }
}

// function cleanComments() {
//   text.value = ''
//   const your_comment = document.querySelectorAll('.your-comment')
//   for(let i = 0; i < your_comment.length; i++) {
//     your_comment[i].remove()
//   }
// }

function createComment() {
  checkLocalStorage()
  comments.sort(ordenaDb)
  for(let i = 0; i < comments.length; i++) {
    const section = `
      <section class='main-comment comment'>
        <div class='up-down-vote'>
          <button class="upvote-btn">+</button>
          <span class="score">${comments[i].score}</span>
          <button class="downvote-btn">-</button>
        </div>
        <header class='cabecalho'>
          <div>
            <img src='${comments[i].image}'>
            <span class='username'>${comments[i].user}</span>
            <span class='createdAt'>${comments[i].createdAt}</span>
          </div>
          <span class='reply_field' data-name='${comments[i].user}'>
            <svg width="14" height="13" xmlns="http://www.w3.org/2000/svg"><path d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z" fill="#5357B6"/></svg>
            Reply
          </span>
        </header>
        <main class='main-content'>
          <p class='comment'>${comments[i].content}</p>
        </main>
      </section>
    `
    main.insertAdjacentHTML('afterbegin', section)
    if (comments[i].replies && comments[i].replies.length > 0) {
      createAnswer(comments[i])
    }
  }
}

function createAnswer(el) {
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
            <img src='${answer.image}'>
            <span class='username'>${answer.user}</span>
            <span class='createdAt'>${answer.createdAt}</span>
          </div>
          <span class='reply_field' data-name='${answer.user}'>
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

function ordenaDb(a, b) {
  return a.score - b.score
}

function addReplyFieldClickListeners(reply_btns) {
  console.log(reply_btns)
  reply_btns.forEach((button) => {
    button.addEventListener('click', () => {
      const parentComment = button.closest('.comment');
      let replySection = parentComment.nextElementSibling;
       // salva o nome da pessoa a ser respondida
      replyingTo = parentComment.children[1].children[1].dataset.name
       if (replySection && replySection.classList.contains('reply_section')) {
        // A seção de resposta já existe, então remova-a
        replySection.remove();
      } else {
        // cria a caixa de resposta
        replySection = document.createElement('section');
        const form = document.createElement('form');
        const image = document.createElement('img');
        const textarea = document.createElement('textarea');
        const submitButton = document.createElement('input');

        image.src = './images/avatars/image-juliusomo.png';
        textarea.classList.add('text-content')
        form.classList.add('make-answer');
        replySection.classList.add('reply_section');
        textarea.placeholder = 'Digite a resposta...';
        submitButton.classList.add('send-btn')
        submitButton.value = 'REPLY';
        submitButton.type = 'submit';
        textarea.value = `@${replyingTo} `

        // igualar a largura da caiza de resposta à largura do comentário a ser respondido
        if (parentComment.classList.contains('sub-comment')) {
          replySection.classList.add('sub-comment');
        }
        
        form.appendChild(image);
        form.appendChild(textarea);
        form.appendChild(submitButton);
        replySection.appendChild(form);

        // Inserir a nova seção abaixo do comentário
        parentComment.insertAdjacentElement('afterend', replySection);
      }
      const forms = document.querySelectorAll('.make-answer')
      sendAnswer(forms)
    });
  });
}

function sendAnswer(data) {
  for(let i = 0; i < data.length; i++) {
    data[i].addEventListener('submit', (e) => {
      e.preventDefault()
      const content = e.target.children[1].value
      console.log(content, data[i], data)
      addComment(content)
      main.innerHTML = ''
      createComment()
    })
  }
}