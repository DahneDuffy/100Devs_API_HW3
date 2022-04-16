import {apiKey} from './config.js';


document.querySelector('button').addEventListener('click',getFetch)

function getFetch(){
  //initialize search parameters and clear previous list from DOM
  document.querySelector('ul').innerText = null
  const genre = document.querySelector('select').value;
  const date = document.querySelector('input').value;

  fetch(`https://api.nytimes.com/svc/books/v3/lists/${date}/${genre}.json?api-key=${apiKey}`)
    .then(res => res.json())
    .then(data => {

      //initialize i for appending descriptions to ul/li elements dynamically
      let i = 1;

      data.results.books.forEach(element => {

        //append titles to <ul> in DOM, create 'book${i}' class for further appendages
        const li = document.createElement('li');
        li.textContent = element.title;
        li.className = `book${i}`
        document.querySelector('ul').appendChild(li)

        //append description under each new <li> in the dom
        const p = document.createElement('p');
        p.textContent = element.description;
        document.querySelector(`.book${i}`).appendChild(p);

        //append image under each new <li> in the DOM
        const img = document.createElement('img');
        img.src = element.book_image;
        document.querySelector(`.book${i}`).appendChild(img);
        i++;
      });
    })
    .catch(error=>console.log('error',error))
}