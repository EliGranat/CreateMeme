'use strict'
var gFilterBy = 'funny'
var gFilterImg = []
var gImgs = [
    { id: 1, url: './img/meme-imgs/1.jpg', keyword: ['women', 'smile', 'animal', 'funny', 'comic', 'men', 'all'] },
    { id: 2, url: './img/meme-imgs/2.jpg', keyword: ['women', 'smile', 'animal', 'funny', 'comic', 'men'] },
    { id: 3, url: './img/meme-imgs/3.jpg', keyword: ['women', 'smile', 'animal', 'funny', 'comic', 'men'] },
    { id: 4, url: './img/meme-imgs/4.jpg', keyword: ['women', 'smile', 'animal', 'funny', 'comic', 'men'] },
    { id: 5, url: './img/meme-imgs/5.jpg', keyword: ['women', 'smile', 'animal', 'funny', 'comic', 'men'] },
    { id: 6, url: './img/meme-imgs/6.jpg', keyword: ['women', 'smile', 'animal', 'funny', 'comic', 'men'] },
    { id: 7, url: './img/meme-imgs/7.jpg', keyword: ['women', 'smile', 'animal', 'funny', 'comic', 'men'] },
    { id: 8, url: './img/meme-imgs/8.jpg', keyword: ['women', 'smile', 'animal', 'funny', 'comic', 'men'] },
    { id: 9, url: './img/meme-imgs/9.jpg', keyword: ['women', 'smile', 'animal', 'funny', 'comic', 'men'] },
    { id: 10, url: './img/meme-imgs/10.jpg', keyword: ['women', 'smile', 'animal', 'funny', 'comic', 'men'] },
    { id: 11, url: './img/meme-imgs/11.jpg', keyword: ['women', 'smile', 'animal', 'funny', 'comic', 'men'] },
    { id: 12, url: './img/meme-imgs/12.jpg', keyword: ['women', 'smile', 'animal', 'funny', 'comic', 'men'] },
    { id: 13, url: './img/meme-imgs/13.jpg', keyword: ['women', 'smile', 'animal', 'funny', 'comic', 'men'] },
    { id: 14, url: './img/meme-imgs/14.jpg', keyword: ['women', 'smile', 'animal', 'funny', 'comic', 'men'] },
    { id: 15, url: './img/meme-imgs/15.jpg', keyword: ['women', 'smile', 'animal', 'funny', 'comic', 'men'] },
    { id: 16, url: './img/meme-imgs/16.jpg', keyword: ['women', 'smile', 'animal', 'funny', 'comic', 'men'] },
    { id: 17, url: './img/meme-imgs/17.jpg', keyword: ['women', 'smile', 'animal', 'funny', 'comic', 'men'] },
    { id: 18, url: './img/meme-imgs/18.jpg', keyword: ['women', 'smile', 'animal', 'funny', 'comic', 'men'] },

    { id: 14, url: './img/meme-imgs/14.jpg', keyword: ['women', 'smile', 'men'] },
    { id: 15, url: './img/meme-imgs/15.jpg', keyword: ['funny', 'comic', 'men'] },
    { id: 16, url: './img/meme-imgs/16.jpg', keyword: ['women', 'smile', 'animal'] },
    { id: 17, url: './img/meme-imgs/17.jpg', keyword: ['women', 'smile', 'animal', 'funny', 'comic', 'men'] },
    { id: 18, url: './img/meme-imgs/18.jpg', keyword: ['animal', 'funny', 'comic', 'men'] }
]



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

// 'Women', 'smile', 'Animal', 'Funny', 'comic', 'Men'