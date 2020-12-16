
const newContainer = document.querySelector('#new-note-container')
const save = document.createElement('button')

const subjectArea = document.createElement('textarea')
const entryArea = document.createElement('textarea')
const writeEntry = document.createElement('div')  // opens the entry composing fields

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

const empty = document.createElement('p')
empty.setAttribute('id', 'empty')
empty.innerHTML = 'No notes yet'
document.querySelector('#notes-container').appendChild(empty)


// FUNCTIONS

// open composing view for writing an entry

document.querySelector('#addEntry').addEventListener('click', function composeNote() {
    
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
    writeEntry.appendChild(save)
    newContainer.classList.remove('hidden')

    this.removeEventListener('click', composeNote)
})


save.addEventListener('click', () => {
    addEntryContent()
    newContainer.classList.add('hidden')
    entryArea.value = ''
    location.reload()
})

createEntryList()


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
        const subjectEl = document.createElement('p')
        const entryEl = document.createElement('p')
        const dateEl = document.createElement('p')
        subjectEl.setAttribute('id', 'subjectEl')
        entryEl.setAttribute('id', 'entryEl')
        dateEl.setAttribute('id', 'dateEl')
        newEntryDiv.appendChild(subjectEl)
        newEntryDiv.appendChild(entryEl)
        newEntryDiv.appendChild(dateEl)


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

        function hyperlinkMaker(text) {
            let urlRegex = /(https?:\/\/[^\s]+)/g;
            return text.replace(urlRegex, function(url) {
            return `<a href="${url}" target="_blank">${url}</a>`;
            })
                
        } 

        subjectEl.innerText = storageArr[i].subject
        entryEl.innerHTML = hyperlinkMaker(storageArr[i].text)
        dateEl.innerText = storageArr[i].time

        newEntryDiv.style.backgroundColor = storageArr[i].color
        if(storageArr[i].color == 'rgb(80, 80, 80)') {
            newEntryDiv.style.color = 'white'
            }
        document.querySelector('#notes-container').appendChild(newEntryDiv)
        addDelBtn(newEntryDiv, i)
        addEditBtn(newEntryDiv, i)
    
    }

    empty.classList.add('hidden')

    // 'clear all' button

    document.getElementById('trash').classList.remove('hidden')
    document.getElementById('trash').addEventListener('click', clearPage)
    
}


if(storageArr.length === 1) {
    delBtn.addEventListener('click', () => {
        clearPage()
    })
}

// HELPER FUNCTIONS

 function addDelBtn(item, index) {

    const delBtn = document.createElement('button')
    delBtn.setAttribute('id', 'delBtn')
    delBtn.setAttribute('title', 'delete note')
    item.appendChild(delBtn)
    delBtn.textContent = '✕'

    delBtn.addEventListener('click', function removeEntry() {
        item.parentElement.removeChild(item)
        removeFromLocalStrg(index)
        this.removeEventListener('click', removeEntry)
        location.reload()
    })


}


function addEditBtn(item, index) {

    const editBtn = document.createElement('button')
    editBtn.setAttribute('id', 'editBtn')
    editBtn.setAttribute('title', 'edit note')
    item.appendChild(editBtn)
    editBtn.textContent = '✎'

    editBtn.addEventListener('click', function makeEditable() {
        
        item.classList.add('zoom')
        item.children[1].contentEditable = true
        item.children[1].style.fontFamily = 'monospace'
        const saveEditBtn = document.createElement('button')
        saveEditBtn.setAttribute('id', 'saveEditBtn')
        saveEditBtn.innerHTML = 'save'
        item.appendChild(saveEditBtn)
        this.removeEventListener('click', makeEditable)
        
        saveEditBtn.addEventListener('click', function saveEdit() {
            item.children[1].contentEditable = false
            item.children[1].style.fontFamily = 'Philosopher'
            saveEditBtn.style.backgroundColor = 'rgb(190, 190, 190)'
            saveEditBtn.style.color = 'grey'
            item.classList.remove('zoom')
            storageArr[index].text = item.children[1].innerText
            localStorage.setItem('localItems', JSON.stringify(storageArr))    
            this.removeEventListener('click', saveEdit)
            saveEditBtn.remove(saveEditBtn)

        })
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

function clearPage() {
    localStorage.clear()
    location.reload()
}







