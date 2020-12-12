
const newContainer = document.querySelector('#new-note-container')
const send = document.createElement('button')
const textArea = document.createElement('textarea')
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




document.querySelector('#addEntry').addEventListener('click', () => {
    createNew()
})

send.addEventListener('click', () => {
    
    makeColorfulEntry()
    newContainer.classList.add('hidden')
    textArea.value = ''
    
})



data.forEach((item) => {
    const newEntryDiv = document.createElement('div')
    if (redBtn.classList.contains('selected')) {
        newEntryDiv.style.backgroundColor = 'rgb(236, 195, 199)'
    }
    else if (blueBtn.classList.contains('selected')) {
        newEntryDiv.style.backgroundColor = 'rgb(204, 224, 247)'
    }
    else if (yellowBtn.classList.contains('selected')) {
        newEntryDiv.style.backgroundColor = 'rgb(247, 240, 204)'
    }
    else if (greyBtn.classList.contains('selected')) {
        newEntryDiv.style.backgroundColor = 'rgb(244, 244, 244)'
    }
    else if (greenBtn.classList.contains('selected')) {
        newEntryDiv.style.backgroundColor = 'rgb(199, 238, 205)'
    }
    
    newEntryDiv.innerHTML = `<p>${item.text}</p> <br> <span>${item.time}</span>`
    newEntryDiv.style.backgrouColor = item.color
    document.querySelector('#notes-container').appendChild(newEntryDiv)
  })


// open composing view for writing an entry

function createNew() {
    
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
     createColorBtn(blueBtn, 'rgb(204, 224, 247)')
     createColorBtn(yellowBtn, 'rgb(247, 240, 204)')
     createColorBtn(redBtn, 'rgb(236, 195, 199)')
     createColorBtn(greyBtn, 'rgb(244, 244, 244)')
     createColorBtn(greenBtn, 'rgb(199, 238, 205)')

    // text area
    
    textArea.placeholder = 'note goes here'
    newContainer.appendChild(writeEntry)
    writeEntry.appendChild(textArea)
    // button to send
    
    send.setAttribute('id', 'send')
    send.textContent = 'Save'
    writeEntry.appendChild(send)
    newContainer.classList.remove('hidden')

    
}



// creates a div for entry, adds styling

function makeColorfulEntry() {
    let bg;
    const newEntryDiv = document.createElement('div')
    if (redBtn.classList.contains('selected')) {
        newEntryDiv.style.backgroundColor = 'rgb(236, 195, 199)'
        bg = 'rgb(236, 195, 199)'
    }
    else if (blueBtn.classList.contains('selected')) {
        newEntryDiv.style.backgroundColor = 'rgb(204, 224, 247)'
        bg = 'rgb(204, 224, 247)'
    }
    else if (yellowBtn.classList.contains('selected')) {
        newEntryDiv.style.backgroundColor = 'rgb(247, 240, 204)'
        bg =  'rgb(247, 240, 204)'
    }
    else if (greyBtn.classList.contains('selected')) {
        newEntryDiv.style.backgroundColor = 'rgb(244, 244, 244)'
        bg =  'rgb(244, 244, 244)'
    }
    else if (greenBtn.classList.contains('selected')) {
        newEntryDiv.style.backgroundColor = 'rgb(199, 238, 205)'
        bg =  'rgb(199, 238, 205)'
    }

    newEntryDiv.innerHTML = `<p>${textArea.value}</p> <br> <span>${new Date().toLocaleString()}</span>`
    document.querySelector('#notes-container').appendChild(newEntryDiv)

    storageArr.push({text: textArea.value, time: new Date().toLocaleString(), color: bg})
    localStorage.setItem('localItems', JSON.stringify(storageArr))    

    
}




