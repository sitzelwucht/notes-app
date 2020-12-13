
const newContainer = document.querySelector('#new-note-container')
const save = document.createElement('button')

const subjectArea = document.createElement('textarea')
const entryArea = document.createElement('textarea')
const writeEntry = document.createElement('div')  // opens the entry composing fields
const clearAll = document.createElement('button')

const blueBtn = document.createElement('button')
const yellowBtn = document.createElement('button')
const redBtn = document.createElement('button')
const greyBtn = document.createElement('button')
const greenBtn = document.createElement('button')
const colorBar = document.createElement('div')
let buttonArray = [blueBtn, yellowBtn, redBtn, greyBtn, greenBtn]

let storageArr = localStorage.getItem('localItems') ? 
JSON.parse(localStorage.getItem('localItems')) : []

const data = JSON.parse(localStorage.getItem('localItems'))


// EVENT LISTENERS

document.querySelector('#addEntry').addEventListener('click', () => {
    composeNote()
})

save.addEventListener('click', () => {
    addEntryContent()
    newContainer.classList.add('hidden')
    entryArea.value = ''
    location.reload()
})

createEntryList()

// FUNCTIONS

// open composing view for writing an entry

function composeNote() {
    
    writeEntry.setAttribute('id', 'writeNewNote')
    colorBar.setAttribute('id', 'colorBarDiv')      // adds color options
    writeEntry.appendChild(colorBar)

    const createColorBtn = (name, color) => {  
        name.innerHTML = ' '
        name.style.backgroundColor = color
        name.setAttribute('class', 'colorButton')
        colorBar.appendChild(name)
        name.addEventListener('click', () => {
            for (item of buttonArray) {
                if (item == name) {
                    item.classList.add('selected')
                }
                else 
                item.classList.remove('selected')
            }
        })
    }

    // TODO: come up with a better way
     createColorBtn(blueBtn, 'rgb(214, 227, 240)')
     createColorBtn(yellowBtn, 'rgb(247, 240, 204)')
     createColorBtn(redBtn, 'rgb(240, 217, 217)')
     createColorBtn(greyBtn, 'rgb(80, 80, 80)')
     createColorBtn(greenBtn, 'rgb(214, 240, 234)')

    // text area creation
    const textareaContainer = document.createElement('div')
    textareaContainer.setAttribute('id', 'textareaContainer')
    subjectArea.placeholder = 'subject'
    subjectArea.setAttribute('id', 'subjectArea')

    entryArea.placeholder = 'note goes here'
    entryArea.setAttribute('id', 'entryArea')

    newContainer.appendChild(writeEntry)

    writeEntry.appendChild(textareaContainer)
    textareaContainer.appendChild(subjectArea)
    textareaContainer.appendChild(entryArea)
    

    // create button to save entry
    
    save.setAttribute('id', 'send')
    save.textContent = 'Save'
    writeEntry.appendChild(save)
    newContainer.classList.remove('hidden')
}

// add selected bg color, text content, add to storage array

function addEntryContent() {
    let bg;

    if (redBtn.classList.contains('selected')) {
        bg = 'rgb(240, 217, 217)'
    }
    else if (blueBtn.classList.contains('selected')) {
        bg = 'rgb(214, 227, 240)'
    }
    else if (yellowBtn.classList.contains('selected')) {
        bg =  'rgb(247, 240, 204)'
    }
    else if (greyBtn.classList.contains('selected')) {
        bg =  'rgb(80, 80, 80)'
    }
    else if (greenBtn.classList.contains('selected')) {
        bg =  'rgb(214, 240, 234)'
    }

    storageArr.push({subject: subjectArea.value, text: entryArea.value, time: new Date().toLocaleString(), color: bg})
    localStorage.setItem('localItems', JSON.stringify(storageArr))    
}

// create DOM content based on storage data

function createEntryList() {

    for (let i = 0; i < data.length; i++) {
        const newEntryDiv = document.createElement('div')
        if (redBtn.classList.contains('selected')) {
            newEntryDiv.style.backgroundColor = 'rgb(240, 217, 217)'
        }
        else if (blueBtn.classList.contains('selected')) {
            newEntryDiv.style.backgroundColor = 'rgb(214, 227, 240)'
        }
        else if (yellowBtn.classList.contains('selected')) {
            newEntryDiv.style.backgroundColor = 'rgb(247, 240, 204)'
        }
        else if (greyBtn.classList.contains('selected')) {
            newEntryDiv.style.backgroundColor = 'rgb(80, 80, 80)'
        }
        else if (greenBtn.classList.contains('selected')) {
            newEntryDiv.style.backgroundColor = 'rgb(214, 240, 234)'
        }

        newEntryDiv.innerHTML = `<p><b><span>${storageArr[i].subject}</span></b></p><br><p>${storageArr[i].text}</p> <br> <span>${storageArr[i].time}</span>`
        newEntryDiv.style.backgroundColor = storageArr[i].color
        if(storageArr[i].color == 'rgb(80, 80, 80)') {
            newEntryDiv.style.color = 'white'
            }
        document.querySelector('#notes-container').appendChild(newEntryDiv)
        addDelBtn(newEntryDiv, i)
    }

    // 'clear all' button

    clearAll.textContent = 'clear all'
    clearAll.classList.add('clear')
    document.querySelector('#clearDiv').appendChild(clearAll)
    clearAll.addEventListener('click', () => {
    localStorage.clear()
    location.reload()
    })
}

// HELPER FUNCTIONS

 function addDelBtn(item, index) {

    const delBtn = document.createElement('button')
    delBtn.setAttribute('id', 'delBtn')
    item.appendChild(delBtn)
    delBtn.textContent = 'x'

    delBtn.addEventListener('click', () => {
        item.parentElement.removeChild(item);
        removeFromLocalStrg(index)
    })
    
  }
  
  // delete items based on index, remove empty items from array, returns updated array
  
function removeFromLocalStrg(index) {

    let i = 0;
    while (i < storageArr.length) {
    if(storageArr[i] == storageArr[index]) {
          delete storageArr[i]
          break;
          }
        else { ++i; }
      }
      storageArr = storageArr.filter(item => item != null && item != '');
      localStorage.setItem('localItems', JSON.stringify(storageArr))
  }



