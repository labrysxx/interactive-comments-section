# Frontend Mentor - Interactive comments section solution

This is a solution to the [Interactive comments section challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/interactive-comments-section-iG1RugEG9).

![Badge em Desenvolvimento](http://img.shields.io/static/v1?label=STATUS&message=EM%20DESENVOLVIMENTO&color=GREEN&style=for-the-badge)

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
- [Author](#author)


## Overview

### The challenge

Users should be able to:

- [x] View the optimal layout for the app depending on their device's screen size :heavy_check_mark:
- [x] See hover states for all interactive elements on the page :heavy_check_mark:
- [ ] Create, Read, Update, and Delete comments and replies :construction:
- [ ] Upvote and downvote comments :construction:
- [x] **Bonus**: If you're building a purely front-end project, use `localStorage` to save the current state in the browser that persists when the browser is refreshed. :heavy_check_mark:
- [x] **Bonus**: Instead of using the `createdAt` strings from the `data.json` file, try using timestamps and dynamically track the time since the comment or reply was posted. :heavy_check_mark:

### GIF

![Animação](https://github.com/labrysxx/interactive-comments-section/assets/101073597/fdd2220d-54c4-49f7-aa80-9cde64ebf4d7)

### Links

- Solution URL: [solution here](https://github.com/labrysxx/interactive-comments-section)
- Live Site URL: [live site URL here](https://labrysxx.github.io/interactive-comments-section/)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid

### What I learned

I enjoyed dealing with methods and properties that were previously unknown to me, such as ```closest()```, ```nextElementSibling```, ```previousElementSibling```, ```includes()```, ```contains()```, ```children```, and ```dataset```.

I take pride in creating this function because it was the first major challenge I encountered. I needed to make the reply box appear right below the clicked comment:

```js
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
```

### Continued development

I believe that in my future projects, I would like to continue consuming APIs and extracting data from JSON files.

## Author

- GitHub - [@labrysxx](https://github.com/labrysxx)
- LinkedIn - [Caroline Faria](https://www.linkedin.com/in/carolinegfaria/)
