'use strict'
const elImagesGrid = document.querySelector('.container-images')
const gTouchEvs = ['touchmove', 'touchstart', 'touchend']
var gElCanvas;
var gCtx;
var gisDrag = false
var gStartPos
var gShowFocus = true
var meme = gettGmeme()

window.onload = init

function init() {
    document.body.classList.add('selected-btn-gallery')
    gElCanvas = document.querySelector('.container-canvas')
    gCtx = gElCanvas.getContext('2d')
    randerGridImg()
    addListeners()
}

////////////////// filter by /////////////////////

function onFilterBy(filter) {
    changeFilter(filter)
    randerGridImg()
    var elFilter = document.querySelector(`.${filter}`)
    var fontSizeFilterA = '15px'
    var fontSizeFilterB = '22px'
    var fontSizeFilterC = '30px'
    if (elFilter.style.fontSize !== '15px' && elFilter.style.fontSize !== '22px' && elFilter.style.fontSize !== '30px') {
        elFilter.style.fontSize = fontSizeFilterA
    } else if (elFilter.style.fontSize !== '22px' && elFilter.style.fontSize !== '30px') {
        elFilter.style.fontSize = fontSizeFilterB
    } else if (elFilter !== '30px') {
        elFilter.style.fontSize = fontSizeFilterC
    }
}

////////////////// render grid imgs /////////////////////

function randerGridImg() {
    var imgs = gettImages()
    var elGridImgHtml = ''
    imgs.forEach(img => {
        elGridImgHtml += ` <img src="${img.url}" onclick="onEditInCanvas(${img.id})">`
    })
    elImagesGrid.innerHTML = elGridImgHtml
}

////////////////// on click update on canvas first img after txt /////////////////////

function onEditInCanvas(id, pos = { x: 10, y: 40 }) {
    if (id) {
        meme.selectedImgId = id
        document.querySelector('.gallery-container').style.display = 'none'
        document.querySelector('.editor-gallery-container').style.display = 'flex'
    }
    make_base(`./img/meme-imgs/${meme.selectedImgId}.jpg`, pos.x, pos.y)
}

function make_base(imgEdit, posX, posY) {
    var base_image = new Image()
    base_image.src = imgEdit
    base_image.onload = function() {
        gCtx.drawImage(base_image, 0, 0);
        // ceangeLoc(posX, posY)
        randerTxtInCanvas(posX, posY)
    }
}

////////////////// rander txt on canvas /////////////////////

function randerTxtInCanvas() {

    meme.lines.forEach((line, idx) => {
        drawText(line.txt, line.size, line.color, line.pos.x, line.pos.y, line.align, idx, line.font)
    })
}

////////////////// draw text and line focus /////////////////////

function drawText(txt, size, color, x, y, align, line, font) {
    if (align === ' right') {
        x = x + 180
    } else if (align === 'left') {
        x = x - 180
    } else if (align === 'center') {
        x = 45
    }
    if (line === gettSelected() && gShowFocus) {
        drawFocus(x, y)
        drewLineMove()
    }

    gCtx.lineWidth = 1;
    gCtx.strokeStyle = 'white'
    gCtx.fillStyle = color
    gCtx.font = `${size}px ${font} `
    gCtx.fillText(txt, x + 190, y + 30)
    gCtx.strokeText(txt, x + 190, y + 30)
}

function drawFocus(x, y) {
    gCtx.strokeStyle = '#000000';
    gCtx.strokeRect(x - 300, y - 20, 1000, 80);
}

function drewLineMove() {
    gCtx.strokeStyle = '#000000';
    gCtx.lineWidth = 12;

    gCtx.beginPath();
    gCtx.moveTo(8, 0);
    gCtx.lineTo(8, 498);
    gCtx.stroke();
    gCtx.closePath();
}

// ////////////////btn nav/////////////////////////

function goToGalleryBtn() {
    document.querySelector('.gallery-container').style.display = 'flex'
    document.querySelector('.editor-gallery-container').style.display = 'none'
    document.body.classList.remove('selected-btn-memes')
    document.body.classList.add('selected-btn-gallery')
    document.body.classList.remove('menu-open')
    showMyMemes(false)
    randerGridImg()

}

function toggleMenu() {
    document.body.classList.toggle('menu-open')
}

////////////////// ON EVENT FUNCTION /////////////////////

function onMyMemesBtn() {
    showMyMemes(true)
    randerGridImg()
    document.querySelector('.gallery-container').style.display = 'flex'
    document.querySelector('.editor-gallery-container').style.display = 'none'
    document.body.classList.remove('selected-btn-gallery')
    document.body.classList.add('selected-btn-memes')
}

function onSaveMeme() {
    saveMeme()
}

function onSearch() {
    var searchVal = document.getElementById('search')
    search(searchVal.value.toLowerCase())
    searchVal.value = ''
    randerGridImg()
}

function showMoreFilter() {
    document.body.classList.toggle('show-more-filter')

}

function hideFocus() {
    gShowFocus = !gShowFocus
    onEditInCanvas()
}

function onAddSmiley(Smiley) {
    addLine(Smiley)
    onEditInCanvas()
}

function onChangeTxt(newTxt) {
    changeTxt(newTxt)
    onEditInCanvas()
}


function onChangeLine() {
    changeLine()
    onEditInCanvas()
}

function onAddLine() {
    var newLine = addLine()
    if (newLine) {
        onEditInCanvas(false, { x: newLine.x, y: newLine.y })
    }
}

function onDeleteLine() {
    deleteLine()
    onEditInCanvas()
}

function incDecLetters(get) {
    changeFontSize(get)
    onEditInCanvas()
}

function onAlignLetters(align) {
    alignLetters(align)
    onEditInCanvas()
}

function onChangeColor(newColor) {
    changeColor(newColor)
    onEditInCanvas()
}

function onChangeFont(newFont) {
    changeFont(newFont)
    onEditInCanvas()
}

function onDownloadCanvas(elLink) {
    downloadCanvas(elLink)


}

////////////////// location onMove /////////////////////

function addListeners() {
    addMouseListeners()
    addTouchListeners()
}

function addMouseListeners() {
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchend', onUp)
}

function onDown(ev) {
    const pos = getEvPos(ev)
    if (!isInLine(pos)) return
    gisDrag = true
    gStartPos = pos
    document.body.style.cursor = 'grabbing'
}

function onMove(ev) {
    if (gisDrag) {
        const pos = getEvPos(ev)
        const dy = pos.y - gStartPos.y
        gStartPos = pos
        moveLine(pos)
        onEditInCanvas(null, pos)
    }
}

function onUp() {
    gisDrag = false
    document.body.style.cursor = 'grab'
}

function getEvPos(ev) {
    var pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }

    if (gTouchEvs.includes(ev.type)) {
        ev.preventDefault()
        ev = ev.changedTouches[0]
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop
        }
    }
    return pos
}