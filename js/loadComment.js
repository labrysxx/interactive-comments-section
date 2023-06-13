const COMMENT = document.querySelector('textarea')
let comentarios = Array()

const FORM = document.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault()
  adicionaComentario()
  limpaForm()
  carregaComentario()
})

class Comentario {
  static idCounter = 1
  constructor(content, createdAt, score, user, replies, image) {
    this.id = Comentario.idCounter++
    this.content = content;
    this.createdAt = createdAt;
    this.score = score;
    this.user = user;
    this.replies = replies;
    this.image = image
  }
}

function adicionaComentario() {
  if(COMMENT.value.length === 0) {
    return alert('Digite seu comentário')
  } else {
    const NOVO_COMENTARIO = new Comentario(COMMENT.value, 'now', 0, 'juliusomo', [], "./images/avatars/image-juliusomo.png")
    comentarios.push(NOVO_COMENTARIO)

    atualizaLocalStorage()
  }
}

function atualizaLocalStorage() {
  localStorage.setItem('comentarios', JSON.stringify(comentarios))
}

function limpaForm() {
  COMMENT.value = ''
  const your_comment = document.querySelectorAll('.your-comment')
  for(let i = 0; i < your_comment.length; i++) {
    your_comment[i].remove()
  }
}

function checaLocalStorage() {
  if(localStorage.getItem('comentarios')) {
    comentarios = JSON.parse(localStorage.getItem('comentarios'))
  }
}

function carregaComentario() {
  checaLocalStorage()
  comentarios.forEach((comentario) => {
    const htmlComment = `
      <section class='main-comment your-comment'>
        <div class='up-down-vote'>
          <button class="upvote-btn">+</button>
          <span class="score">${comentario.score}</span>
          <button class="downvote-btn">-</button>
        </div>
        <header class='cabecalho'>
          <img src='${comentario.image}'>
          <span class='username'>${comentario.user}</span>
          <span class='createdAt'>${comentario.createdAt}</span>
          <span class='reply_field' data-name='${comentario.user}'>
            <svg width="14" height="13" xmlns="http://www.w3.org/2000/svg"><path d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z" fill="#5357B6"/></svg>
            Reply
          </span>
        </header>
        <main class='main-content'>
          <p class='comment'>${comentario.content}</p>
        </main>
      </section>
    `;
    MAIN.insertAdjacentHTML("beforeend", htmlComment);
  })
}

carregaComentario()

const REPLY = document.querySelectorAll('.reply_field')
for(let i = 0; i < REPLY.length; i++) {
  REPLY[i].addEventListener('click', (e) => {
    console.log(e.currentTarget.dataset.name)
  })
}