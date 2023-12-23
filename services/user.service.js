import { storageService } from "./async-storage.service.js"
import { WEEK, utilService } from "./util.service.js"

const STORAGE_KEY_USERS = 'userDB'
const STORAGE_KEY_LOGGED_IN_USER = 'loggedInUser'

export const userService = {
    signup,
    login,
    logout,
    get,
    getLoggedInUser,
    getNewUser,
}

function query() {
    return storageService.query(STORAGE_KEY_USERS)
        .then(users => {
            if (! users) users = []
            if (! users.length) {
                users = _createUsers()
                utilService.saveToStorage(STORAGE_KEY_USERS, users)
            }
            return users
        })
}

function signup(user) {
    return query()
        .then(users => {
            if (users.find(_user => _user.username === user.username)) return Promise.reject('User already exists')
            if (! user.password) return Promise.reject('Missing password')
            if (! user.fullName) return Promise.reject('Missing fullName')
            return storageService.post(STORAGE_KEY_USERS, user)
                .then(_setLoggedInUser)
        })
}

function login(user) {
    return query()
        .then(users => {
            const userToLogin = users.find(_user => _user.username === user.username)
            if (! userToLogin) return Promise.reject(`No such user '${user.username}'`)
            if (user.password !== userToLogin.password) return Promise.reject('Wrong password!')
            return _setLoggedInUser(userToLogin)
        })
}

function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGED_IN_USER)
    return Promise.resolve()
}

function get(userId) {
    return storageService.get(STORAGE_KEY_USERS, userId)
}

function _setLoggedInUser(user) {
    const loggedInUser = { ...user }
    delete loggedInUser.password
    const strLoggedInUser = JSON.stringify(loggedInUser)
    sessionStorage.setItem(STORAGE_KEY_LOGGED_IN_USER, strLoggedInUser)
    return loggedInUser
}

function getLoggedInUser() {
    const strLoggedInUser = sessionStorage.getItem(STORAGE_KEY_LOGGED_IN_USER)
    const loggedInUser = JSON.parse(strLoggedInUser)
    return loggedInUser
}

function getNewUser() {
    const newUser = {
        _id: '',
        fullName: '',
        username: '',
        password: '',
        createdAt: NaN,
        isAdmin: false,
    }
    return newUser
}

function _createUsers() {
    const newUsers = [
        {
            _id: '6a454fef54a4',
            fullName: 'Coffee Connoisseur',
            username: 'caffeineQueen95',
            password: 'espressoLove123', // Don't worry, it's triple-shot encrypted! 
            bio: "Fueled by caffeine and sarcasm, I code faster than my anxiety attacks.",
            createdAt: utilService.getRandomDate(5 * WEEK) - WEEK, // Joined for a late-night caffeine fix
            isAdmin: false,
        },
        {
            _id: '2b54a985g754',
            fullName: 'Lord of the Procrastinators',
            username: 'dueTomorrow',
            password: 'illDoItLater456', // Procrastinated on creating a strong password too 
            bio: "Deadlines? Never heard of her. My motto: Why do today what you can panic about tomorrow?",
            createdAt: utilService.getRandomDate(5 * WEEK) - WEEK, // Just under the deadline, of course
            isAdmin: false,
        },
        {
            _id: '54h54h54a454',
            fullName: 'Admin McCryptic',
            username: 'iamdefinitelynotadmin',
            password: 'hunter2', //  (Shhh, don't tell anyone)
            bio: "I exist in the shadows, silently fixing your typos and existential dread... maybe.",
            createdAt: utilService.getRandomDate(5 * WEEK) - WEEK, // Here since the beginning of time...or at least 2023
            isAdmin: true,
        },
        {
            _id: 'c4t50n1735d6',
            fullName: 'Meme Magician',
            username: 'gifMasterX',
            password: 'laughtrack.mp3', // Don't ask how they know that sound
            bio: "I speak fluent meme and can turn any awkward silence into a viral sensation. Beware my dad jokes.",
            createdAt: utilService.getRandomDate(5 * WEEK) - WEEK, // Joined during a particularly hilarious cat video binge
            isAdmin: false,
        },
        {
            _id: '00f100f110f1',
            fullName: 'Bug Whisperer',
            username: 'codeSamurai',
            password: 'semicolonWarrior', // They live dangerously
            bio: "I hunt down bugs with the precision of a ninja and the patience of a saint. Don't break anything, I'm caffeinated enough.",
            createdAt: utilService.getRandomDate(5 * WEEK) - WEEK, // Joined after slaying a particularly nasty server error
            isAdmin: false,
        },
        {
            _id: 'b313371337b3',
            fullName: 'Design Dynamo',
            username: 'pixelPicasso',
            password: 'CMYKforever', // True to their color-loving heart
            bio: "I bend pixels to my will, crafting interfaces that are as sleek as they are functional. Prepare to be dazzled.",
            createdAt: utilService.getRandomDate(5 * WEEK) - WEEK, // Joined after creating a website so beautiful it wept glitter
            isAdmin: false,
        },
        {
            _id: 'd10d010010d0',
            fullName: 'Data Detective',
            username: 'spreadsheetSherlock',
            password: 'pivotTablePower', // Don't underestimate their Excel skills
            bio: "Numbers whisper secrets to me. I can predict your coffee order and track down any typo lurking in a database. You can't hide from the truth.",
            createdAt: utilService.getRandomDate(5 * WEEK) - WEEK, // Joined after unearthing a hidden pattern in a million lines of code
            isAdmin: false,
        },
        {
            _id: '1234567890ab',
            fullName: 'Social Butterfly',
            username: 'hashtagQueen',
            password: 'followMeFriday', // They know the algorithm's game
            bio: "I speak the language of likes and shares. Follow me for cat memes, motivational quotes, and behind-the-scenes glimpses of this glorious chaos.",
            createdAt: utilService.getRandomDate(5 * WEEK) - WEEK, // Joined after their cat video went viral overnight
            isAdmin: false,
        },
    ]
    return newUsers
}