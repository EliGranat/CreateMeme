'use strict'
const elImagesGrid = document.querySelector('.container-images')
var gElCanvas;
var gCtx;
// var gCurrShape = 'triangle';
window.onload = init


function init() {
    gElCanvas = document.querySelector('.container-canvas')
    gCtx = gElCanvas.getContext('2d')
    randerGridImg()
    addListeners()


}

function onFilterBy(filter) {
    changeFilter(filter)
    randerGridImg()

}

function randerGridImg() {
    var imgs = gettImages()
    var elGridImgHtml = ''
    imgs.forEach(img => {
        elGridImgHtml += ` <img src="${img.url}" onclick="onEditIncanvas(${img.id},event)">`
    })
    elImagesGrid.innerHTML = elGridImgHtml
}


function onEditIncanvas(id) {
    if (id) {
        gMeme.selectedImgId = id
    }
    make_base(`./img/meme-imgs/${gMeme.selectedImgId}.jpg`)
    document.querySelector('.gallery-container').style.display = 'none'
    document.querySelector('.editor-gallery-container').style.display = 'flex'
}




function make_base(imgEdit) {
    var base_image = new Image()
    base_image.src = imgEdit
    base_image.onload = function() {
        gCtx.drawImage(base_image, 0, 0);
        randerTxtInCanvas()
    }

}



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
    if (line === 0) {
        y = 40
    }
    if (line === 1) {
        y = 192
    }
    if (line === 2) {
        y = 340
    }
    // gCtx.font = '48px serif';
    // gCtx.fillText(text, x, y);

    gCtx.lineWidth = 1;
    gCtx.strokeStyle = 'white'
    gCtx.fillStyle = color
    gCtx.font = `${size}px ${font} `
    gCtx.fillText(txt, x, y)
    gCtx.strokeText(txt, x, y)
}
var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [{
        txt: 'hallo',
        size: 20,
        align: 'left',
        color: 'red',
        font: 'Impact'
    }]
}


function randerTxtInCanvas() {

    gMeme.lines.forEach((line, idx) => {
        drawText(line.txt, line.size, line.color, 10, 44, line.align, idx, line.font)
        console.log(line.color);
    })

}
// var gTxtUser = [{185,24}]
function onChangeTxt(txt) {
    onEditIncanvas()
    gMeme.lines[gMeme.selectedLineIdx].txt = txt

}


function changeLine() {
    if (gMeme.selectedLineIdx === 0) {
        gMeme.selectedLineIdx = 2
    } else if (gMeme.selectedLineIdx === 2) {
        gMeme.selectedLineIdx = 1
    } else if (gMeme.selectedLineIdx === 1) {
        gMeme.selectedLineIdx = 0
    }
    // randerTxtInCanvas()
}

function addLine() {
    if (gMeme.selectedLineIdx >= 2) {
        return
    }
    gMeme.lines.push({
        txt: 'hallo',
        size: 20,
        align: 'left',
        color: 'red',
        font: 'Impact'
    })
    gMeme.selectedLineIdx++
        console.log(gMeme.selectedLineIdx);
    onEditIncanvas()
}

function deleteLine() {
    gMeme.lines.splice(gMeme.selectedLineIdx, 1)
    gMeme.selectedLineIdx--
        onEditIncanvas()
}

function incDecLetters(get) {
    if (get) {
        gMeme.lines[gMeme.selectedLineIdx].size++
    } else {
        gMeme.lines[gMeme.selectedLineIdx].size--
    }
    onEditIncanvas()
}

function alignLetters(align) {
    gMeme.lines[gMeme.selectedLineIdx].align = align
    onEditIncanvas()
}

function changeColor(color) {
    gMeme.lines[gMeme.selectedLineIdx].color = color
    onEditIncanvas()
}

function onChangeFont(font) {

    gMeme.lines[gMeme.selectedLineIdx].font = font
    onEditIncanvas()

}

function downloadCanvas(elLink) {
    const data = gElCanvas.toDataURL();
    elLink.href = data;
}

function addListeners() {
    addMouseListeners()
    addTouchListeners()
        // window.addEventListener('resize', () => {
        //     resizeCanvas()
        // })
}

function addMouseListeners() {
    // gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mousedown', onDown)
        // gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    // gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchstart', onDown)
        // gElCanvas.addEventListener('touchend', onUp)
}

function onDown(ev) {
    // gStartPos = getEvPos(ev)
    // gisDrag = true
    document.body.style.cursor = 'grabbing'
    console.log(ev.offsetX, ev.offsetY);
}

// function onMove(ev) {
// if (gisDrag) {
// drawShape(getEvPos(ev), gStartPos.x, gStartPos.y)
// }
// }

// function onUp() {
//     gisDrag = false
//     document.body.style.cursor = 'grab'
// }

// function getEvPos(ev) {
//     var pos = {
//         x: ev.offsetX,
//         y: ev.offsetY
//     }

//     if (gTouchEvs.includes(ev.type)) {
//         ev.preventDefault()
//         ev = ev.changedTouches[0]
//         pos = {
//             x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
//             y: ev.pageY - ev.target.offsetTop - ev.target.clientTop
//         }
//     }
//     return pos
// }
