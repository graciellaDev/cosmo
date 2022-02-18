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
    container = document.querySelector('.container'),
    rows,
    Cards,
    closeCards,
    keyTimeOut,
    keyRun,
    wonDisplay = document.querySelector('.winner__you-winn').style.display,
    loseDisplay = document.querySelector('.winner__you-lose').style.display

// counter
function counterTime(element) {
  console.log('el=' + element)
  let time = Number(element.textContent),
  wrapper = document.querySelector('.cards__wrapper')
  keyRun = setTimeout(function run() {
    if(time > 0) {
      keyRed = setTimeout(() => {
        element.textContent = --time
        if(!element.classList.contains('count_red') && time < 10) {
          element.classList.add('count_red')
        }
        run()
      }, 1000)
    }
    else {
      while (wrapper.firstChild) {
        wrapper.removeChild(wrapper.firstChild);
        wrapper.classList.remove(`cards__wrapper_col-${rows}`)
        wrapper.style.display = 'none'
      }
      clearTimeout(keyRun)
      clearTimeout(keyRed)
      container.querySelector('.count').remove()
      if(document.querySelector('.winner').classList.contains('form-hidden')) {
        document.querySelector('.winner').classList.remove('form-hidden')
      }
        document.querySelector('.winner__you-winn').style.display = 'none'
        wonDisplay == 'none'
        document.querySelector('.winner__you-lose').style.display = 'block'
        loseDisplay == 'block'
    }
  }, 1000)
}

formSubmit.addEventListener('click', function(e) {
  if(keyTimeOut) {
    clearTimeout(keyTimeOut)
  }
  e.preventDefault()
  let wrapper = document.querySelector('.cards__wrapper')
  rows = Number(document.querySelector('.form-input__input').value)
  Cards = rows * rows
  closeCards = Cards
  form.classList.add('form-hidden')
  wrapper.classList.add(`cards__wrapper_col-${rows}`)
  wrapper.style.display = 'grid'
  let divCounter = document.createElement('div')
  divCounter.classList.add('count')
  switch(rows) {
    case 2:
        divCounter.textContent = 15;
        break;
    case 4:
        divCounter.textContent = 45;
        break;
    case 6:
        divCounter.textContent = 60;
        break;
    case 8:
        divCounter.textContent = 120;
        break;
    case 10:
        divCounter.textContent = 180;
        break;
    default:
        divCounter.textContent = 60;
  }
  container.insertBefore(divCounter, wrapper)
  let timer = document.querySelector('.count')

  createCards(elementWrapper, rows, arrayImages)
  counterTime(timer)

  let openCards = 0,
      keyTime,
      keyActive
  document.querySelectorAll('.col').forEach((event) => {
    event.addEventListener('click', () => {
      if(Number(closeCards + openCards) == Cards && !event.classList.contains('reverse')){
        event.classList.add('reverse')
        closeCards--
        openCards++
        console.log('close = ' + closeCards + '; open = ' + openCards)
        if(document.querySelector('.reverse')) {
          let activeCard = document.querySelector('.active-card')
          if(!activeCard) {
            event.classList.add('active-card')
          }
          else {
            let dataActive = activeCard.querySelector('.col__back').getAttribute('data-card'),
                data = event.querySelector('.col__back').getAttribute('data-card')
            if(data == dataActive) {
              keyTime = setTimeout(() => {
                event.classList.add('active-card')
                keyActive = setTimeout(() => {
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
          if(document.querySelector('.count')) {
            container.querySelector('.count').remove()
          }
            document.querySelector('.winner__you-winn').style.display = 'block'
            wonDisplay = 'block'
            document.querySelector('.winner__you-lose').style.display = 'none'
            loseDisplay = 'none'
          clearTimeout(keyRun)
          clearTimeout(keyRed)
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


