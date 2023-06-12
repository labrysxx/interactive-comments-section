const MAIN = document.getElementById('content')
let db

fetch('./data.json')
.then(response => {return response.json()})
.then(data => {
  db = data.comments
  db.sort(ordenaDb)
  criaSessao()
})
.catch(error => {
  // Trate qualquer erro que ocorrer durante a requisição
  console.log('Ocorreu um erro:', error);
});

function criaSessao() {
  db.forEach(el => {
    const SESSAO = `
      <section>
        <div class='up-down-vote'>
          <button class="upvote-btn">+</button>
          <span class="score">${el.score}</span>
          <button class="downvote-btn">-</button>
        </div>
        <header class='cabecalho'>
          <img src='${el.user.image.png}'>
          <span class='username'>${el.user.username}</span>
          <span class='createdAt'>${el.createdAt}</span>
          <span class='reply_field'>
            <svg width="14" height="13" xmlns="http://www.w3.org/2000/svg"><path d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z" fill="#5357B6"/></svg>
            Reply
          </span>
        </header>
        <main class='main-content'>
          <p class='comment'>${el.content}</p>
        </main>
      </section>
      <div class='respostas'></div>
    `
    MAIN.insertAdjacentHTML('afterbegin', SESSAO)

    if(el.replies.length !== 0) {
      console.log(el.replies)
      const RESPOSTAS_FIELD = document.querySelectorAll('.respostas')
  
      el.replies.forEach((resposta) => {
        for(let j = 0; j < RESPOSTAS_FIELD.length; j++) {
          const RESPOSTA_DIV = document.createElement('div')
          RESPOSTA_DIV.classList.add('resposta')
          RESPOSTA_DIV.textContent = resposta.content
          RESPOSTAS_FIELD[j].appendChild(RESPOSTA_DIV)
        }
      })
    }

  })
}

function ordenaDb(a, b) {
  return a.score - b.score
}

function adicionaComentario() {

}