'use strict'
var gFilterBy = 'all'
var gFilterImg = []
var gFilters = ['women', 'smile', 'animal', 'funny', 'comic', 'men', 'all']
var gImgs = [];
createImg()

function createImg() {
    for (var i = 0; i < 17; i++) {
        gImgs.push({
            id: `${i+1}`,
            url: `./img/meme-imgs/${i+1}.jpg`,
            keyword: [`${getRandomFilter()}`, `${getRandomFilter()}`, `${getRandomFilter()} `, 'all']
        })
    }
}

function getRandomFilter() {
    var numRandom = getRandomInt(1, 7)
    return gFilters[numRandom - 1]
}

function filterBy() {
    gFilterImg = []
    gImgs.map(img => {
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