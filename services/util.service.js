export const utilService = {
    makeId,
    makeLorem,
    getRandomIntInclusive,
    loadFromStorage,
    saveToStorage,
    animateCSS,
    getRandomDate,
    getTimeAgo,
}

export const SECOND = 1000
export const MINUTE = 60 * SECOND
export const HOUR = 60 * MINUTE
export const DAY = 24 * HOUR
export const WEEK = 7 * DAY

function getRandomDate(timeSpan) {
    return Date.now() - getRandomIntInclusive(0, timeSpan)
}

function getTimeAgo(time) {
    const timeDiff = Date.now() - time
    const seconds = Math.floor(timeDiff / SECOND)
    const minutes = Math.floor(timeDiff / MINUTE)
    const hours = Math.floor(timeDiff / HOUR)
    const days = Math.floor(timeDiff / DAY)
    const weeks = Math.floor(timeDiff / WEEK)
    if (timeDiff < MINUTE) return seconds + ` second${seconds === 1 ? '' : 's'} ago`
    if (timeDiff < HOUR) return minutes + ` minute${minutes === 1 ? '' : 's'} ago`
    if (timeDiff < DAY) return hours + ` hour${hours === 1 ? '' : 's'} ago`
    if (timeDiff < WEEK) return days + ` day${days === 1 ? '' : 's'} ago`
    return weeks + ` week${weeks === 1 ? '' : 's'} ago`
}

function makeId(length = 6) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return txt
}

function makeLorem(size = 100) {
    var words = ['The sky', 'above', 'the port', 'was', 'the color of television', 'tuned', 'to', 'a dead channel', '.', 'All', 'this happened', 'more or less', '.', 'I', 'had', 'the story', 'bit by bit', 'from various people', 'and', 'as generally', 'happens', 'in such cases', 'each time', 'it', 'was', 'a different story', '.', 'It', 'was', 'a pleasure', 'to', 'burn']
    var txt = ''
    while (size > 0) {
        size--
        txt += words[Math.floor(Math.random() * words.length)] + ' '
    }
    return txt
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive 
}

function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}

function loadFromStorage(key) {
    const data = localStorage.getItem(key)
    return (data) ? JSON.parse(data) : undefined
}

// In our utilService
function animateCSS(el, animation) {
    const prefix = 'animate__'
    return new Promise((resolve, reject) => {
        const animationName = `${prefix}${animation}`

        el.classList.add(`${prefix}animated`, animationName)

        // When the animation ends, we clean the classes and resolve the Promise
        function handleAnimationEnd(event) {
            event.stopPropagation()
            el.classList.remove(`${prefix}animated`, animationName)
            resolve('Animation ended')
        }
        el.addEventListener('animationend', handleAnimationEnd, { once: true })
    })
}