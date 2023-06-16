
const text = document.querySelector('textarea');
const formComment = document.querySelector('#make-comment')

let comments = Array();
let replyButtons
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

function closest(element, selector) {
  while (element && !element.matches(selector)) {
    element = element.parentElement;
  }
  return element;
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
          <button class="edit-button">Editar</button>
            <button class="delete-button">Excluir</button>
          </span>
          </header>
        <main class='main-content'>
          <p class='comment'>${comment.content}</p>
        </main>
      </section>
    `;
    main.insertAdjacentHTML("beforeend", htmlComment);
    replyButtons = document.querySelectorAll('.reply_field');
    addReplyFieldClickListeners();
  })
}

function addReplyFieldClickListeners() {
  replyButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const parentComment = closest(button, '.comment');
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

        form.classList.add('make-answer');
        replySection.classList.add('reply_section');
        textarea.placeholder = 'Digite a resposta...';
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
    });
  });
}

loadComment()