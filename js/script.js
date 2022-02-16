// get a number random
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

let elementWrapper = document.querySelector('.cards__wrapper'),
    cardActive = null,
    numberRows = document.querySelector('.form-input__input').value,
    arrayImages = ['Sun', 'Mercury', 'Venus', 'Earth', 'Moon', 'Mars', 'Saturn', 'Uranus', 'Neptune', 'Comet']

// Fisher-Yates shuffle
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

//creating columns with cards
function createColumns(container, arrayElements) {
  for (let i = 0; i < arrayElements.length; i++ ) {
    let column = document.createElement('div')
    column.classList.add('col', 'flex')
    container.append(column)

    let frontImage = document.createElement('img')
    frontImage.classList.add('col__front')
    frontImage.setAttribute('src', 'img/front-card.svg')
    frontImage.setAttribute('alt', 'front card')
    column.append(frontImage)
  }
}

// create front card
function createFrontCard(arrayElements, indexArray, elementAdd) {
  let updatedWrapper = document.querySelector('.cards__wrapper'),
      arrayChildWrapper = updatedWrapper.querySelectorAll('.col')
  let columnBack = document.createElement('div')
  columnBack.classList.add('col__back')
  columnBack.setAttribute('data-card', elementAdd)
  let el = arrayChildWrapper[arrayElements[indexArray]]
  el.append(columnBack)

  let imageBack = document.createElement('img')
  imageBack.setAttribute('src', `img/${elementAdd}.svg`)
  imageBack.setAttribute('alt', elementAdd)
  columnBack.append(imageBack)
}

// add cards
function createCards(wrapper, number, arrayElements) {
  let lengthImages = arrayImages.length,
      numberCards = number * number,
      arrayAllIndexes = []
  for(let i = 0; i < numberCards ; i++) {
    arrayAllIndexes.push(i)
  }

  shuffleArray(arrayImages)
  shuffleArray(arrayAllIndexes)
  createColumns(wrapper, arrayAllIndexes)

  let indexAll = 0,
      indexArrayImages = 0
  while(indexAll < arrayAllIndexes.length) {
    if(indexArrayImages >= arrayElements.length) {
      indexArrayImages = 0
    }
    createFrontCard(arrayAllIndexes, indexAll++, arrayElements[indexArrayImages])
    createFrontCard(arrayAllIndexes, indexAll++, arrayElements[indexArrayImages])
    indexArrayImages++
  }
}

let form = document.querySelector('.form-input'),
    formSubmit = document.querySelector('.form-input__submit'),
    rows,
    Cards,
    closeCards,
    keyTimeOut

formSubmit.addEventListener('click', function(e) {
  if(keyTimeOut) {
    clearTimeout(keyTimeOut)
  }
  e.preventDefault()
  let wrapper = document.querySelector('.cards__wrapper')
  rows = document.querySelector('.form-input__input').value
  Cards = rows * rows
  closeCards = Cards
  form.classList.add('form-hidden')
  wrapper.classList.add(`cards__wrapper_col-${rows}`)
  wrapper.style.display = 'grid'
  createCards(elementWrapper, rows, arrayImages)

  let openCards = 0
  document.querySelectorAll('.col').forEach(function(event) {
    event.addEventListener('click', () => {
      console.log('ddd=' + closeCards)
      if(Number(closeCards + openCards) == Cards){
        event.classList.add('reverse')
        closeCards--
        openCards++
        console.log('sum=' + Number(closeCards + openCards))
        console.log('close=' + closeCards + ' open=' + openCards)
        if(document.querySelector('.reverse')) {
          let activeCard = document.querySelector('.active-card')
          if(!activeCard) {
            event.classList.add('active-card')
          }
          else {
            let dataActive = activeCard.querySelector('.col__back').getAttribute('data-card'),
                data = event.querySelector('.col__back').getAttribute('data-card')
            if(data == dataActive) {
              setTimeout(() => {
                event.classList.add('active-card')
                setTimeout(() => {
                  activeCard.classList.remove('active-card')
                  event.classList.remove('active-card')
                }, 500)
              }, 500)
            }
            else {
              setTimeout(() => {
                event.classList.remove('reverse')
                closeCards++
                openCards--
              }, 500)
            }
          }
        }
      }
      if(openCards == Cards) {
        setTimeout(() => {
          while (wrapper.firstChild) {
              wrapper.removeChild(wrapper.firstChild);
              wrapper.classList.remove(`cards__wrapper_col-${rows}`)
              wrapper.style.display = 'none'
          }
          document.querySelector('.winner').classList.remove('form-hidden')
        }, 1500)
      }
    })
  })
})

document.querySelector('.winner__again').addEventListener('click', () => {
  document.querySelector('.winner').classList.add('form-hidden')
  form.classList.remove('form-hidden')
})

// form input field validation
function validInputForm(elTarget, key) {
  const VALUE = Number(elTarget.value)
  if(key) {
    clearTimeout(key)
  }
  if(VALUE > 10 || VALUE < 2 || VALUE % 2 != 0) {
      elTarget.value = 4
    }
}

document.querySelector('.form-input__input').addEventListener('input', function() {
  keyTimeOut = setTimeout(validInputForm, 500, this, keyTimeOut)
})


