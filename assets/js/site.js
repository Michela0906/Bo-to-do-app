// write cool JS hwere!!
let myData = [] // array der indeholder alle list descriptions
let myCurrentList = 0  // index of current list

// element hvor min app skal leve
const myAppElement = document.getElementById('app')



//Controller kode. aplication start funktion
readMyData()


// Controller kode. den spørger om data og handler udfra hvad den får tilbage.
function readMyData() {
    // kald ReadObject og sæt min data array til det der kommer tilbage
    myData = ReadObject()

    if (myData) {
        // sætter den aktive liste til første liste i data
        myCurrentList = 0
    } else {
        // hvis vi ikke har data 
        console.log('we have no data');
        myData = [] // opretter en tom data liste
        myCurrentList = -1 // sætter current list til -1 som betyder ingen liste
    }

    buildStatics()
    showList()
}



// View code. bygger statiske elementer
function buildStatics() {
    // header
    let myHtml = `<header><img src="assets/img/list.svg" onclick="toggleList()"><h2 id="listTilte"></h2></header>`
    // menu element
    myHtml += `<section id="myMenu" class="hidden"></section>`
    // content section
    myHtml += `<section id="content"></section>`
    // footer
    myHtml += `<footer><img src="assets/img/add.svg" onclick="newListView()"><img src="assets/img/trash.svg" onclick="removeListCallback()"></footer>`

    myAppElement.innerHTML = myHtml
    createListMenu()
}


// View code. bygger en liste med navnene på mine todo lists i data
function createListMenu() {
    let menuElement = document.getElementById('myMenu')

    let myMenuHtml = '<ul>'

    myData.forEach((listItem, index) => {
        myMenuHtml += `<li onclick="listMenuCallBack(${index})">${listItem.name}</li>`
    });

    myMenuHtml += `</ul>`
    menuElement.innerHTML = myMenuHtml

}


// Controller kode. callback til vis meny icon i header
function toggleList() {
    let menuElement = document.getElementById('myMenu')
    menuElement.classList.toggle('hidden')
}

// Controller kode. callback til menu list. modtager index fra listen
function listMenuCallBack(indexClicked) {
    myCurrentList = indexClicked
    toggleList()
    showList()
}






//View kode. viser den aktive liste i content
function showList() {

    // dom elementer
    let myListElement = document.getElementById('content')
    let menyTitleElement = document.getElementById('listTilte')

    // data
    let myListData = myData[myCurrentList]


    let MyHtml = '' // variabel der skal fyldes med HTML kode

    if (myListData) {
        // vi har data til en liste
        menyTitleElement.innerText = myListData.name

        // tømmer dom elementet
        myListElement.innerHTML = ''
        MyHtml = `<ul>`

        myListData.listItems.forEach((listItem, index) => {
            MyHtml += `<li onclick="itemCallBack(${index})">${listItem.name}</li>`
        });

        MyHtml += `<li onclick="newItemView()">+</li>`
        MyHtml += `</ul>`
    } else {
        // vi har ikke data til en liste
        MyHtml = ''
        menyTitleElement.innerText = 'lav en ny liste'
    }

    myListElement.innerHTML = MyHtml
}

// Controller kode. modtager index fra klik på list elementer
function itemCallBack(indexClicked) {

    if (confirm("Vil du slette mig?")) {
        removeItem(myCurrentList, indexClicked)
        showList()
    }
}

// View kode. opretter view hvor man kan oprette ny liste
function newListView() {
    let myViewElement = document.getElementById('content')
    myViewElement.innerHTML = ""

    let myHtml = ` <input type="text" id="listName" name="listName"><button onclick="newListViewCallback('ok')">ok</button><button onclick="newListViewCallback('cancel')">cancel</button>`

    myViewElement.innerHTML = myHtml
}

// controller kode. reagerer på ok i newListview
function newListViewCallback(myresult) {
    if (myresult == 'ok') {
        let myName = document.getElementById('listName').value
        makeList(myName)
        createListMenu()

    }
    showList()

}

// View kode. opretter view hvor man kan oprette en ny task i en liste
function newItemView() {
    let myViewElement = document.getElementById('content')
    myViewElement.innerHTML = ""

    let myHtml = ` <input type="text" id="Name" name="listName"><button onclick="newItemViewCallback('ok')">ok</button><button onclick="newItemViewCallback('cancel')">cancel</button>`

    myViewElement.innerHTML = myHtml


}

// controller kode. reagerer på ok i newItemView
function newItemViewCallback(myresult) {
    if (myresult == 'ok') {
        let myName = document.getElementById('Name').value
        console.log(myName);
        createListMenu()
        makeItem(myName)

    }
    showList()

}

// controller kode. reagerer på klik på delete icon i footer 
function removeListCallback() {
    removeList()
    createListMenu()
    showList()
}


//----------------------------------------------------------------------
// Model kode. gemmer data tilsendt i local storage
function SaveObject(toDoData) {
    let mySerializedData = JSON.stringify(toDoData)//konverterer modtaget data til string
    localStorage.setItem('savedData', mySerializedData)// gemmer i localStorage
}



function ReadObject() {
    // læser data i local storage
    let myfoundData = localStorage.getItem('savedData')
    return JSON.parse(myfoundData) // konverterer det læste data til array og objekter og sender det tilbage til hvor funktionen er kaldt
}

//Model kode.  modtager et navn,string og skaber et ny liste dataobjekt og gemmer det i myData
function makeList(myName) {
    console.log('make list');

    let myList = {
        name: myName,//key value pair
        listItems: []
    }

    myData.push(myList)
    myCurrentList = myData.length - 1

    SaveObject(myData)

}

//Model kode. fjerner den aktive liste fra data
function removeList() {

    if (myData.length > 0) {
        // hvis der er lister at fjerne
        myData.splice(myCurrentList, 1)
        myCurrentList = myData.length - 1
    } else {
        //hvis der ikke er flere lister at fjerne
        myCurrentList = -1
    }
    SaveObject(myData)

}


//Model kode. modtager et navn og opretter list item i første to do list

function makeItem(myName) {

    // data struktur for liste data
    let myListItem = {
        name: myName,
        status: true
    }

    myData[myCurrentList].listItems.push(myListItem)

    SaveObject(myData)
}



//Model kode. modtager et index for listen, og et index for item, og fjerner dette item fra listen.

function removeItem(listIndex, itemIndex) {
    let myList = myData[listIndex]
    myList.listItems.splice(itemIndex, 1)
}


