document.addEventListener('DOMContentLoaded', () => {
  const text = document.querySelector('textarea');
  const form = document.querySelector('form')
  let comments = Array();
  let replyButtons
  
  form.addEventListener('submit', (e) => {
    e.preventDefault()
    addComment()
    cleanComments()
    loadComment()
    addReplyFieldClickListeners()
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
      const new_comment = new Comment(text.value, new Date(), 0, 'juliusomo', [], "./images/avatars/image-juliusomo.png");
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

  function addReplyFieldClickListeners() {
    replyButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const parentComment = button.closest('.comment');
        let replySection = parentComment.nextElementSibling;
        if (replySection && replySection.classList.contains('reply_section')) {
          // A seção de resposta já existe, então remova-a
          replySection.remove();
        } else {
          replySection = document.createElement('section');
          const image = document.createElement('img')
          const textarea = document.createElement('textarea');
          const submitButton = document.createElement('button');
          
          image.src = './images/avatars/image-juliusomo.png'
          
          replySection.classList.add('reply_section');
          textarea.placeholder = 'Digite a resposta...';
          submitButton.textContent = 'REPLY';

          if(parentComment.classList.contains('sub-comment')) {
            replySection.classList.add('sub-comment')
          }
          
          replySection.appendChild(image)
          replySection.appendChild(textarea);
          replySection.appendChild(submitButton);
          
          // Inserir a nova seção abaixo do comentário
          parentComment.insertAdjacentElement('afterend', replySection);
        }
      });
    });
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
    })
    replyButtons = document.querySelectorAll('.reply_field');
    addReplyFieldClickListeners();
  }
  
  loadComment()
});