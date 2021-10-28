'use strict'
const elImagesGrid = document.querySelector('.container-images')
const gTouchEvs = ['touchmove', 'touchstart', 'touchend']
var gElCanvas;
var gCtx;
var gisDrag = false
var gStartPos
var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [{
        txt: 'hallo',
        size: 20,
        align: 'left',
        color: 'red',
        font: 'Impact',
        pos: { x: 10, y: 40 }
    }]
}

window.onload = init

function init() {
    gElCanvas = document.querySelector('.container-canvas')
    gCtx = gElCanvas.getContext('2d')

    randerGridImg()
    addListeners()
    elImagesGrid.scrollIntoView()
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
        gMeme.selectedImgId = id
    }
    make_base(`./img/meme-imgs/${gMeme.selectedImgId}.jpg`, pos.x, pos.y)
    document.querySelector('.gallery-container').style.display = 'none'
    document.querySelector('.editor-gallery-container').style.display = 'flex'
}

function make_base(imgEdit, posX, posY) {
    var base_image = new Image()
    base_image.src = imgEdit
    base_image.onload = function() {
        gCtx.drawImage(base_image, 0, 0);
        ceangeLoc(posX, posY)
        randerTxtInCanvas(posX, posY)
    }
}
////////////////// rander txt on canvas /////////////////////

function randerTxtInCanvas() {

    gMeme.lines.forEach((line, idx) => {
        drawText(line.txt, line.size, line.color, line.pos.x, line.pos.y, line.align, idx, line.font)
    })
}
////////////////// draw text and line focus /////////////////////

function drawText(txt, size, color, x, y, align, line, font) {
    if (align === 'left') {
        x = 15
    }
    if (align === 'right') {
        x = 383
    }
    if (align === 'center') {
        x = 200
    }
    if (line === gMeme.selectedLineIdx) {
        drawFocus(x, y)
    }
    gCtx.lineWidth = 1;
    gCtx.strokeStyle = 'white'
    gCtx.fillStyle = color
    gCtx.font = `${size}px ${font} `
    gCtx.fillText(txt, x, y)
    gCtx.strokeText(txt, x, y)
}

function drawFocus(x, y) {
    gCtx.beginPath();
    gCtx.lineWidth = 2
    gCtx.moveTo(x - 10, y - 20);
    gCtx.lineTo(x + 470, y - 20);
    gCtx.moveTo(x - 10, y - 20);
    gCtx.lineTo(x - 10, y + 80);
    gCtx.moveTo(x - 10, y + 80);
    gCtx.lineTo(x + 470, y + 80);
    gCtx.moveTo(x + 470, y + 80);
    gCtx.lineTo(x + 470, y - 20);
    gCtx.strokeStyle = '#ffffff';
    gCtx.stroke()
}

// ////////////////btn nav/////////////////////////

function goToGalleryBtn() {
    document.querySelector('.gallery-container').style.display = 'flex'
    document.querySelector('.editor-gallery-container').style.display = 'none'
    document.body.classList.remove('menu-open')
}

function toggleMenu() {
    document.body.classList.toggle('menu-open')
}
////////////////// on change TXT LINE... /////////////////////

function onChangeTxt(txt) {
    gMeme.lines[gMeme.selectedLineIdx].txt = txt
    onEditInCanvas()
}

function onChangeLine() {
    if (gMeme.selectedLineIdx === 0 && gMeme.lines.length === 1) {
        gMeme.selectedLineIdx = 0
    } else if (gMeme.selectedLineIdx === 0 && gMeme.lines.length === 2) {
        gMeme.selectedLineIdx = 1
    } else if (gMeme.selectedLineIdx === 0 && gMeme.lines.length === 3) {
        gMeme.selectedLineIdx = 2
    } else if (gMeme.selectedLineIdx === 2) {
        gMeme.selectedLineIdx = 1
    } else if (gMeme.selectedLineIdx === 1) {
        gMeme.selectedLineIdx = 0
    }
    //need to chack if is goo to rander
    onEditInCanvas()
}

function onAddLine() {
    var x = 40;
    var y;
    if (gMeme.lines.length === 0) {
        y = 40
    } else if (gMeme.lines.length === 1) {
        y = 192
    } else if (gMeme.lines.length === 2) {
        y = 340
    }
    if (gMeme.lines.length > 2) {
        return
    }
    gMeme.lines.push({
        txt: 'hallo',
        size: 20,
        align: 'left',
        color: 'red',
        font: 'Impact',
        pos: { x: x, y: y }
    })
    onEditInCanvas(false, { x: x, y: y })
}

function onDeleteLine() {
    gMeme.lines.splice(gMeme.selectedLineIdx, 1)
        //CHACK IF DELETE ===0 
    if (gMeme.selectedLineIdx > 0) {
        gMeme.selectedLineIdx--
    }
    onEditInCanvas()
}

function incDecLetters(get) {
    if (get) {
        gMeme.lines[gMeme.selectedLineIdx].size++
    } else {
        gMeme.lines[gMeme.selectedLineIdx].size--
    }
    onEditInCanvas()
}

function alignLetters(align) {
    gMeme.lines[gMeme.selectedLineIdx].align = align
    onEditInCanvas()
}

function changeColor(color) {
    gMeme.lines[gMeme.selectedLineIdx].color = color
    onEditInCanvas()
}

function onChangeFont(font) {
    gMeme.lines[gMeme.selectedLineIdx].font = font
    onEditInCanvas()
}

function downloadCanvas(elLink) {
    const data = gElCanvas.toDataURL();
    elLink.href = data;
}


////////////////// location onMove /////////////////////

function ceangeLoc(x, y) {
    gMeme.lines.forEach((line, idx) => {
        if (x >= line.pos.x && x <= line.pos.x + 460 &&
            y >= line.pos.y && y <= line.pos.y + 110
        ) {
            gMeme.lines[idx].pos.y = y
            gMeme.lines[idx].pos.x = x
        }
    })
}

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
    gStartPos = getEvPos(ev)
    gisDrag = true
    document.body.style.cursor = 'grabbing'
}

function onMove(ev) {
    if (gisDrag) {
        onEditInCanvas(null, getEvPos(ev))
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