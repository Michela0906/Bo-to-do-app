const myAppElement = document.getElementById('app')
let activeFilter = 'all'


buildFilter()

function buildFilter() {
    let filterHTML = `<section id="filterContainer"><button onclick="filterCallback('all')">all</button></section>`
    myAppElement.innerHTML = filterHTML
}

function filterCallback(type) {
    console.log(type);

}