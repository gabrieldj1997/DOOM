//Script de algoritimo fogo - DOOM
const width = 50
const height = 50
const firePixelsArray = []
const fireColorsPalette = [{"r":7,"g":7,"b":7},{"r":31,"g":7,"b":7},{"r":47,"g":15,"b":7},{"r":71,"g":15,"b":7},{"r":87,"g":23,"b":7},{"r":103,"g":31,"b":7},{"r":119,"g":31,"b":7},{"r":143,"g":39,"b":7},{"r":159,"g":47,"b":7},{"r":175,"g":63,"b":7},{"r":191,"g":71,"b":7},{"r":199,"g":71,"b":7},{"r":223,"g":79,"b":7},{"r":223,"g":87,"b":7},{"r":223,"g":87,"b":7},{"r":215,"g":95,"b":7},{"r":215,"g":95,"b":7},{"r":215,"g":103,"b":15},{"r":207,"g":111,"b":15},{"r":207,"g":119,"b":15},{"r":207,"g":127,"b":15},{"r":207,"g":135,"b":23},{"r":199,"g":135,"b":23},{"r":199,"g":143,"b":23},{"r":199,"g":151,"b":31},{"r":191,"g":159,"b":31},{"r":191,"g":159,"b":31},{"r":191,"g":167,"b":39},{"r":191,"g":167,"b":39},{"r":191,"g":175,"b":47},{"r":183,"g":175,"b":47},{"r":183,"g":183,"b":47},{"r":183,"g":183,"b":55},{"r":207,"g":207,"b":111},{"r":223,"g":223,"b":159},{"r":239,"g":239,"b":199},{"r":255,"g":255,"b":255}]

start()

function start() {
    document.querySelector('body').innerHTML = '<div id="fire"></div>'
    createFireDataStruct()
    setFire()
    setInterval(updateFire, 50)
}
//Criar os indices com valores zerados
function createFireDataStruct(){
    const numberOfPixels = width * height
    for(let i = 0; i < numberOfPixels; i++){
        firePixelsArray[i] = 0
    }
}
//Setar o valor maximo para a ultima fileira
function setFire(){ 
    for(let i = 0; i < width; i++){
        const pixel = width * height - 1 - i
        firePixelsArray[pixel] = 36
    }
}
//Update dos valores dos indices
function updateFire(){
    for(let col = 0; col < width; col++){
        for(let row = 0; row < height; row++){
            const pixel = col + (row * width)
            calculateFirePropagation(pixel)
        }
    }
    renderFire()
}
//Calculo dos valores para propagação do fogo
function calculateFirePropagation(currentPixel){
    const belowPixel = currentPixel + width
    if(belowPixel >= width * height){
        return
    }
    const decay = Math.floor(Math.random()*3)
    const belowPixelFireIntensity = firePixelsArray[belowPixel]
    const newIntensity = belowPixelFireIntensity - decay > 0 ? belowPixelFireIntensity - decay : 0
    firePixelsArray[currentPixel - decay] = newIntensity
}
//Renderizar a tabela dentro da div
function renderFire(){
    let html = '<table cellspacing=0 style="border:1px solid black;">'
    let debug = false
    for(row = 0; row < height; row++){
        html += '<tr>'
        for(col = 0; col < width; col++){
            const pixelIndex = col + (row * width)
            const fireIntensity = firePixelsArray[pixelIndex]

            if(debug === true){
                html += '<td>'
                html += `<div class="pixel-index">${pixelIndex}</div>`
                html += fireIntensity
                html += '</td>'
            }else{
                const color = fireColorsPalette[fireIntensity]
                const colorString = `${color.r},${color.g},${color.b}`
                html += `<td class="pixel" style="background-color: rgb(${colorString})">` 
                html += '</td>'
            }
            
            
        }
        html += '</tr>'
    }
    html += '</table>'
    document.querySelector('#fire').innerHTML = html
}