'use strict'
var gFilterBy = 'all'
var gFilterImg = []
const gFilters = ['women', 'smile', 'animal', 'funny', 'comic', 'men', 'all']
var gImgs = []
var gSelectedLineIdx = 0;
var gMemesUser = []
var gIsUserMeme = false
const KEY = 'memeUser'
var gMeme = {
    selectedImgId: 5,
    lines: [{
        txt: 'hallo im new line',
        size: 50,
        align: 'left',
        color: 'red',
        font: 'Impact',
        pos: { x: 10, y: 40 },
        selected: true
    }]
}
createImgs()

function gettSelected() {
    return gSelectedLineIdx
}

function gettGmeme() {
    return gMeme
}
/////////////////// MEMES ON STORAGE ////////////////////
function showMyMemes(show) {
    if (show) {
        loadMemes()
        gIsUserMeme = true;
    } else {
        gIsUserMeme = false
    }
}

function loadMemes() {
    gMemesUser = loadFromStorage(KEY)
    if (!gMemesUser) {
        gMemesUser = []
    }
}

function saveMeme() {
    loadMemes()
    var isExists = gMemesUser.find(img => img.id === gImgs[gMeme.selectedImgId].id)
    if (!isExists) {
        gMemesUser.push(gImgs[gMeme.selectedImgId])
        _saveBooksToStorage()
        alert('Saved successfully')
    } else {
        alert('You already have the picture')
    }
}

function _saveBooksToStorage() {
    saveToStorage(KEY, gMemesUser)
}

///////////////////// CHANGE ARAAY BEFORE DO RENDER CANVAS ///////////////////////

function changeTxt(newTxt) {
    gMeme.lines[gSelectedLineIdx].txt = newTxt
}

function changeFontSize(get) {
    if (get) {
        gMeme.lines[gSelectedLineIdx].size += 5
        console.log(gMeme.lines[gSelectedLineIdx].size);
    } else {
        if (gMeme.lines[gSelectedLineIdx].size > 5) {
            gMeme.lines[gSelectedLineIdx].size -= 5
            console.log(gMeme.lines[gSelectedLineIdx].size);

        }
    }
}

function alignLetters(align) {
    gMeme.lines[gSelectedLineIdx].align = align
}

function changeColor(newColor) {
    gMeme.lines[gSelectedLineIdx].color = newColor
}

function changeFont(newFont) {
    gMeme.lines[gSelectedLineIdx].font = newFont
}

function deleteLine() {
    gMeme.lines.splice(gSelectedLineIdx, 1)
    if (gSelectedLineIdx > 0) {
        gSelectedLineIdx--
    }
}

function changeLine(newLine) {
    gMeme.lines[gSelectedLineIdx].selected = false
    if (newLine) {
        gSelectedLineIdx = gMeme.lines.length - 1
    } else if (gSelectedLineIdx < gMeme.lines.length - 1) {
        gSelectedLineIdx++
    } else {
        gSelectedLineIdx = 0
    }
    gMeme.lines[gSelectedLineIdx].selected = true

}

function addLine(Smiley = 'new line') {
    var x = 40;
    var y = getRandomInt(150, 350);
    if (gMeme.lines.length === 0) {
        y = 40
    } else if (gMeme.lines.length === 1) {

        y = 380
    } else if (gMeme.lines.length === 2) {
        y = 192
    }
    gMeme.lines.push({
        txt: Smiley,
        size: 50,
        align: 'left',
        color: 'red',
        font: 'Impact',
        pos: { x: x, y: y },
        selected: true

    })
    changeLine(true)
    return { x, y }
}

function isInLine(startPos) {
    const line = gMeme.lines[gSelectedLineIdx]
    if (line) {
        return (startPos.y - line.pos.y <= line.size)
    }
}

function moveLine({ x, y }) {
    gMeme.lines[gSelectedLineIdx].pos.y = y
    gMeme.lines[gSelectedLineIdx].pos.x = x

}

///////////////CREATE ARAAY IMGS ////////////////

function createImgs() {
    for (var i = 0; i < 17; i++) {
        gImgs.push({
            id: `${i+1}`,
            url: `./img/meme-imgs/${i+1}.jpg`,
            keyword: [`${getRandomFilter()}`, `${getRandomFilter()}`, `${getRandomFilter()} `, 'all']
        })
    }
}

////////////// FILTER ////////////////

function search(value) {
    const searchBy = gFilters.find(filter => value === filter)
    if (searchBy) {
        changeFilter(searchBy)
    }
}

function getRandomFilter() {
    var numRandom = getRandomInt(1, 7)
    return gFilters[numRandom - 1]
}

function filterBy() {
    gFilterImg = []
    var imgs = !gIsUserMeme ? gImgs : gMemesUser
    imgs.map(img => {
        var tagTrue = img.keyword.find(tag => {
            return tag === gFilterBy
        })
        if (tagTrue) {
            gFilterImg.push(img)
        }
    })


}

function changeFilter(filter) {
    gFilterBy = filter
}

function gettImages() {
    filterBy()
    return gFilterImg

}