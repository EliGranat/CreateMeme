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
    randerFilter()
    addListeners()
}

////////////////// filter by /////////////////////



function onFilterBy(filter, idx) {
    changeFilter(filter)
    const filters = gettFilters()
    filters[idx].size += 10
    randerGridImg()
    randerFilter()
}

function randerFilter() {
    const elFilters = document.querySelector('.opt-search-gallery')
    const filters = gettFilters()
    var elHTML = ''
    filters.forEach((filter, idx) => {
        elHTML += `<div onclick="onFilterBy('${filter.name}',${idx})" style="font-size: ${filter.size}px">${filter.txt} </div>`
    })
    elFilters.innerHTML = elHTML
}
////////////////// render grid imgs /////////////////////

function randerGridImg() {
    var imgs = gettImagesF()
    console.log(imgs);
    var elGridImgHtml = ''
    imgs.forEach(img => {
        elGridImgHtml += ` <img src="${img.url}" onclick="onEditInCanvas(${img.id})">`
    })
    elImagesGrid.innerHTML = elGridImgHtml
}

////////////////// on click update on canvas first img after txt /////////////////////

function onEditInCanvas(id) {
    if (id) {
        meme.selectedImgId = id
        document.querySelector('.gallery-container').style.display = 'none'
        document.querySelector('.editor-canvas-container').style.display = 'flex'
    } else if (isInput()) {
        make_base(gettImgInput().src)
        return
    }
    var imgs = gettAllImgs()
    make_base(imgs[meme.selectedImgId - 1].url)
}

function make_base(imgEdit) {
    var base_image = new Image()
    base_image.src = imgEdit
    base_image.onload = function() {
        gCtx.drawImage(base_image, 0, 0, gElCanvas.width, gElCanvas.height);
        randerTxtInCanvas()
    }
}

////////////////// rander txt on canvas /////////////////////

function randerTxtInCanvas() {
    console.log(meme);
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

    gCtx.lineWidth = 1.8;
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
    document.querySelector('.editor-canvas-container').style.display = 'none'
    document.body.classList.remove('selected-btn-memes')
    document.body.classList.add('selected-btn-gallery')
    document.body.classList.remove('menu-open')
    showMyMemes(false)
    isInput(false)
    randerGridImg()

}

function toggleMenu() {
    document.body.classList.toggle('menu-open')
}

////////////////// ON EVENT FUNCTION /////////////////////
function moreOptionMobile() {
    document.body.classList.toggle('open-more-tools')
}

function onMyMemesBtn() {
    showMyMemes(true)
    randerGridImg()
    document.querySelector('.gallery-container').style.display = 'flex'
    document.querySelector('.editor-canvas-container').style.display = 'none'
    document.body.classList.remove('selected-btn-gallery')
    document.body.classList.add('selected-btn-memes')
    document.body.classList.remove('menu-open')
    isInput(false)


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
        onEditInCanvas()
    }
}

function onDeleteLine() {
    deleteLine()
    onEditInCanvas()
}

function onFontSize(get) {
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
        gStartPos = pos
        moveLine(pos)
        onEditInCanvas()
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