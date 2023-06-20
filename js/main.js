const default_data = {
  "comments": [
    {
      "id": 1,
      "content": "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
      "createdAt": "1 month ago",
      "score": 12,
      "user": "amyrobson",
      "image": "./images/avatars/image-amyrobson.png",
      "replies": []
    },
    {
      "id": 2,
      "content": "Woah, your project looks awesome! How long have you been coding for? I'm still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!",
      "createdAt": "2 weeks ago",
      "score": 5,
      "user": "maxblagun",
      "image": "./images/avatars/image-maxblagun.png", 
      "replies": [
        {
          "id": 3,
          "content": "If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.",
          "createdAt": "1 week ago",
          "score": 4,
          "replyingTo": "maxblagun",
          "user": "ramsesmiron",
          "image": "./images/avatars/image-ramsesmiron.png",
          "replies": []
        },
        {
          "id": 4,
          "content": "I couldn't agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant.",
          "createdAt": "2 days ago",
          "score": 2,
          "replyingTo": "ramsesmiron",
          "user": "juliusomo",
          "image": "./images/avatars/image-juliusomo.png"
        }
      ]
    }
  ]
}

const main = document.getElementById('content')
let comments = Array();
let reply_btns

window.addEventListener('DOMContentLoaded', () => {
  createComment()
  createReplyReply()
})

function createComment() {
  checkLocalStorage();
  main.innerHTML = '';
  comments.sort(ordenaDb);
  comments.forEach((comment) => {
    const section = `
      <section class='main-comment comment'>
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
          ${
            comment.user === 'juliusomo'
              ? `
                <div class='edit-delete-buttons'>
                  <button class='edit-btn btn'><svg width="14" height="14" xmlns="http://www.w3.org/2000/svg"><path d="M13.479 2.872 11.08.474a1.75 1.75 0 0 0-2.327-.06L.879 8.287a1.75 1.75 0 0 0-.5 1.06l-.375 3.648a.875.875 0 0 0 .875.954h.078l3.65-.333c.399-.04.773-.216 1.058-.499l7.875-7.875a1.68 1.68 0 0 0-.061-2.371Zm-2.975 2.923L8.159 3.449 9.865 1.7l2.389 2.39-1.75 1.706Z" fill="#5357B6"/></svg>Edit</button>
                  <button class='delete-btn btn'><svg width="12" height="14" xmlns="http://www.w3.org/2000/svg"><path d="M1.167 12.448c0 .854.7 1.552 1.555 1.552h6.222c.856 0 1.556-.698 1.556-1.552V3.5H1.167v8.948Zm10.5-11.281H8.75L7.773 0h-3.88l-.976 1.167H0v1.166h11.667V1.167Z" fill="#ED6368"/></svg>Delete</button>
                </div>
              `
              : `
                <span class='reply_field' data-name='${comment.user}'>
                  <svg width="14" height="13" xmlns="http://www.w3.org/2000/svg"><path d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z" fill="#5357B6"/></svg>
                  Reply
                </span>
              `
          }
        </header>
        <main class='main-content'>
          <p class='comment-text'>${comment.content}</p>
        </main>
      </section>
    `;
    main.insertAdjacentHTML('afterbegin', section);
    if (comment.replies && comment.replies.length > 0) {
      createAnswer(comment.replies);
    }
    addReplyFieldClickListeners();
  });
}


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

function updateLocalStorage() {
  localStorage.setItem('comments', JSON.stringify(comments))
}

function checkLocalStorage() {
  if(localStorage.getItem('comments')) {
    comments = JSON.parse(localStorage.getItem('comments'))
  } else {
    comments = default_data.comments
  }
}

function createAnswer(el) {
  checkLocalStorage()
  el.forEach((answer) => {
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
          ${
            answer.user === 'juliusomo'
              ? `
                <div class='edit-delete-buttons'>
                  <button class='edit-btn btn'><svg width="14" height="14" xmlns="http://www.w3.org/2000/svg"><path d="M13.479 2.872 11.08.474a1.75 1.75 0 0 0-2.327-.06L.879 8.287a1.75 1.75 0 0 0-.5 1.06l-.375 3.648a.875.875 0 0 0 .875.954h.078l3.65-.333c.399-.04.773-.216 1.058-.499l7.875-7.875a1.68 1.68 0 0 0-.061-2.371Zm-2.975 2.923L8.159 3.449 9.865 1.7l2.389 2.39-1.75 1.706Z" fill="#5357B6"/></svg>Edit</button>
                  <button class='delete-btn btn'><svg width="12" height="14" xmlns="http://www.w3.org/2000/svg"><path d="M1.167 12.448c0 .854.7 1.552 1.555 1.552h6.222c.856 0 1.556-.698 1.556-1.552V3.5H1.167v8.948Zm10.5-11.281H8.75L7.773 0h-3.88l-.976 1.167H0v1.166h11.667V1.167Z" fill="#ED6368"/></svg>Delete</button>
                </div>
              `
              : `
                <span class='reply_field' data-name='${answer.user}'>
                  <svg width="14" height="13" xmlns="http://www.w3.org/2000/svg"><path d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z" fill="#5357B6"/></svg>
                  Reply
                </span>
              `
          }
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

function addReplyFieldClickListeners() {
  reply_btns = document.querySelectorAll('.reply_field');
  reply_btns.forEach((button) => {
    button.removeEventListener('click', replyFieldClickHandler);
    button.addEventListener('click', replyFieldClickHandler);
  });
}

function replyFieldClickHandler() {
  const parentComment = this.closest('.comment');
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
    textarea.placeholder = 'Type your answer...';
    submitButton.classList.add('send-btn')
    submitButton.value = 'REPLY';
    submitButton.type = 'submit';
  
    // igualar a largura da caixa de resposta à largura do comentário a ser respondido
    if (parentComment.classList.contains('sub-comment')) {
      replySection.classList.add('sub-comment');
    }
    
    form.appendChild(image);
    form.appendChild(textarea);
    form.appendChild(submitButton);
    replySection.appendChild(form);
  
    // Inserir a nova seção abaixo do comentário
    parentComment.insertAdjacentElement('afterend', replySection);
    sendAnswer();
  }
}

// imprime na tela a resposta feita a algum comentário
function sendAnswer() {
  const forms = document.querySelectorAll('.make-answer')
  for (let i = 0; i < forms.length; i++) {
    forms[i].addEventListener('submit', (e) => {
      e.preventDefault();
      if(e.target.children[1].value.length === 0) {
        alert('Answer field is empty, type something!')
        return
      }

      // Encontre o comentário ao qual estamos respondendo
      const replyingTo = e.target.parentNode.previousElementSibling.children[1].children[1].dataset.name;
      let parentComment = comments.find(comment => comment.user === replyingTo);

      // verifica se o comentário respondido já é uma resposta
      if(e.target.parentNode.previousElementSibling.classList.contains('sub-comment')) {
        saveReplyReply(e)
      }

      if (parentComment) {
        const content = e.target.children[1].value;
        // Crie um novo objeto Comment para a resposta
        const newAnswer = new Comment(content, new Date(), parentComment.user, 0, 'juliusomo', [], "./images/avatars/image-juliusomo.png");

        // Adicione a resposta ao array de replies do comentário pai
        parentComment.replies.push(newAnswer);

        // Atualize o armazenamento local
        updateLocalStorage();

        // Crie novamente os comentários na tela, incluindo as respostas atualizadas
        createComment(comments);
        
        // Limpe o campo de resposta
        e.target.children[1].value = '';
      }
      createReplyReply()
    });
  }
}

// faz um comentário geral
function makeComment() {
  document.querySelector('.make-comment').addEventListener('submit', (e) => {
    e.preventDefault()
    const content = e.target.children[1].value;
    if(content.length === 0) {
      alert('Type your comment!')
      return
    }
    const newComment = new Comment(content, new Date(), 'everybody', 0, 'juliusomo', [], "./images/avatars/image-juliusomo.png");

    // Adicione a resposta ao array de replies do comentário pai
    comments.push(newComment);

    // Atualize o armazenamento local
    updateLocalStorage();

    // Crie novamente os comentários na tela, incluindo as respostas atualizadas
    createComment(comments);

    e.target.children[1].value = '';
    createReplyReply()
  })
}

makeComment()

// salva o comentário feito à uma resposta nos replies dela 
function saveReplyReply(info) {
  const replyingTo = info.target.parentNode.previousElementSibling.children[1].children[1].dataset.name;
  let parentComment;

  comments.forEach((comment) => {
    if (comment.replies && comment.replies.length > 0) {
      comment.replies.forEach((reply) => {
        if (reply.user === replyingTo) {
          parentComment = reply;
        }
      });
    }
  });

  if (parentComment) {
    const content = info.target.children[1].value;
    const newReply = new Comment(content, new Date(), replyingTo, 0, 'juliusomo', [], "./images/avatars/image-juliusomo.png")

    parentComment.replies.push(newReply);
    updateLocalStorage();
    info.target.children[1].value = '';
    createComment();
  }
}

// adiciona o replie do replie abaixo da resposta respectiva
function createReplyReply() {
  const parentCommentElements = document.querySelectorAll('.comment');
  
  for (let i = 0; i < comments.length; i++) {
    if (comments[i].replies && comments[i].replies.length > 0) {
      for (let j = 0; j < comments[i].replies.length; j++) {
        const reply = comments[i].replies[j];
        if (reply.replies && reply.replies.length > 0) {
          for (let k = 0; k < reply.replies.length; k++) {
            const answer = reply.replies[k];
            const parentCommentElement = findParentCommentElement(parentCommentElements, reply.user);
            if (parentCommentElement) {
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
                    ${
                      answer.user === 'juliusomo'
                        ? `
                          <div class='edit-delete-buttons'>
                            <button class='edit-btn btn'><svg width="14" height="14" xmlns="http://www.w3.org/2000/svg"><path d="M13.479 2.872 11.08.474a1.75 1.75 0 0 0-2.327-.06L.879 8.287a1.75 1.75 0 0 0-.5 1.06l-.375 3.648a.875.875 0 0 0 .875.954h.078l3.65-.333c.399-.04.773-.216 1.058-.499l7.875-7.875a1.68 1.68 0 0 0-.061-2.371Zm-2.975 2.923L8.159 3.449 9.865 1.7l2.389 2.39-1.75 1.706Z" fill="#5357B6"/></svg>Edit</button>
                            <button class='delete-btn btn'><svg width="12" height="14" xmlns="http://www.w3.org/2000/svg"><path d="M1.167 12.448c0 .854.7 1.552 1.555 1.552h6.222c.856 0 1.556-.698 1.556-1.552V3.5H1.167v8.948Zm10.5-11.281H8.75L7.773 0h-3.88l-.976 1.167H0v1.166h11.667V1.167Z" fill="#ED6368"/></svg>Delete</button>
                          </div>
                        `
                        : `
                          <span class='reply_field' data-name='${answer.user}'>
                            <svg width="14" height="13" xmlns="http://www.w3.org/2000/svg"><path d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z" fill="#5357B6"/></svg>
                            Reply
                          </span>
                        `
                    }
                  </header>
                  <main class='main-content'>
                    <p class='comment-text'><span class='replying-to'>${answer.replyingTo}</span> ${answer.content}</p>
                  </main>
                </section>
              `;
              parentCommentElement.insertAdjacentHTML('afterend', answerElement);
            }
          }
        }
      }
    }
  }
}

// verifica se o nome do usuário sendo respondido corresponde a algum dos comentários dispostos na tela. Se houver correspondência, o elemento HTML do comentário pai é retornado. 
function findParentCommentElement(parentCommentElements, replyingTo) {
  for (let i = 0; i < parentCommentElements.length; i++) {
    const parentCommentElement = parentCommentElements[i];
    const replyingToElement = parentCommentElement.querySelector('.username');
    if (replyingToElement && replyingToElement.textContent === replyingTo) {
      return parentCommentElement;
    }
  }
  return null;
}





