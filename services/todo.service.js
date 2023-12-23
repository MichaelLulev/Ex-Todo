import { utilService, WEEK } from "./util.service.js"
import { storageService } from "./async-storage.service.js"
import { userService } from "./user.service.js"

const STORAGE_KEY_TODOS = 'todoDB'

export const todoService = {
    query,
    save,
    get,
    remove,
    getNewTodo,
    getDefaultFilter,
    getDefaultSortBy,
}

function query(filterBy={}, sortBy={}, pageInfo={}) {
    return storageService.query(STORAGE_KEY_TODOS)
        .then(todos => {
            if (! todos) todos = []
            if (! todos.length) {
                todos = _createTodos()
                utilService.saveToStorage(STORAGE_KEY_TODOS, todos)
            }
            return todos
        })
        .then(todos => filter(todos, filterBy))
        .then(todos => sort(todos, sortBy))
        .then(todos => getPage(todos, pageInfo))
        .catch(err => console.error(err))
}

function filter(todos, filterBy) {
    const search = RegExp(filterBy.search, 'i')
    if (filterBy.search) todos = todos.filter(todo => search.test(todo.title) || search.test(todo.text))
    if (filterBy.status === 'done') todos = todos.filter(todo => todo.isDone)
    else if (filterBy.status === 'active') todos = todos.filter(todo => ! todo.isDone)
    if (filterBy.creator) {
        todos = todos.filter(todo => todo.creator.fullName === filterBy.creator)
    }
    return todos
}

function sort(todos, sortBy) {
    const dirMult = sortBy.isAscending ? 1 : -1
    if (['title', 'text'].includes(sortBy.field)) {
        todos = todos.sort((todo1, todo2) => todo1[sortBy.field].localeCompare(todo2[sortBy.field]) * dirMult)
    } else if (sortBy.field === 'creator') {
        todos = todos.sort((todo1, todo2) => todo1.creator.fullName.localeCompare(todo2.creator.fullName) * dirMult)
    } else if (sortBy.field === 'createdAt') {
        todos = todos.sort((todo1, todo2) => (todo1.createdAt - todo2.createdAt) * dirMult)
    }
    return todos

}

function getPage(todos, pageInfo) {
    return todos
}

function get(todoId) {
    return storageService.get(STORAGE_KEY_TODOS, todoId)
}

function remove(todo) {
    const loggedInUser = userService.getLoggedInUser()
    if (! loggedInUser) return Promise.reject('Not logged in')
    if (! loggedInUser.isAdmin && todo.creator._id !== loggedInUser._id) return Promise.reject('Not your todo to remove!')
    return storageService.remove(STORAGE_KEY_TODOS, todo._id)
}

function save(todo) {
    const loggedInUser = userService.getLoggedInUser()
    if (! loggedInUser) return Promise.reject('Not logged in')
    if (todo._id) {
        if (! loggedInUser.isAdmin && todo.creator._id !== loggedInUser._id) return Promise.reject('Not your todo to change!')
        return storageService.put(STORAGE_KEY_TODOS, todo)
    } else {
        todo.createdAt = Date.now()
        todo.creator = loggedInUser
        return storageService.post(STORAGE_KEY_TODOS, todo)
    }
}

function getNewTodo() {
    const newTodo = {
        _id: '',
        title: '',
        text: '',
        isDone: false,
        createdAt: NaN,
        creator: null,
    }
    return newTodo
}

function getDefaultFilter() {
    const defaultFilter = {
        search: '',
        status: 'all',
        creator: '',
    }
    return defaultFilter
}

function getDefaultSortBy() {
    const defaultSortBy = {
        field: 'createdAt',
        isAscending: false,
    }
    return defaultSortBy
}

function _createTodos() {
    const newTodos = [
        {
            _id: 'caffeineOverflow',
            title: 'Code a Coffee Tracker',
            text: 'Develop an app to track Coffee Connoisseur’s coffee intake. Warning: Numbers might be off the charts!',
            createdAt: utilService.getRandomDate(5 * WEEK),
            isDone: true,
            creator: {
                _id: '6a454fef54a4',
                fullName: 'Coffee Connoisseur',
                username: 'caffeineQueen95',
                isAdmin: false,
            },
        },
        {
            _id: 'procrastinationParadox',
            title: 'Design a Perpetual Calendar',
            text: 'Lord of the Procrastinators needs to create a calendar where it’s always the day before the deadline.',
            createdAt: utilService.getRandomDate(5 * WEEK),
            isDone: false,
            creator: {
                _id: '2b54a985g754',
                fullName: 'Lord of the Procrastinators',
                username: 'dueTomorrow',
                isAdmin: false,
            },
        },
        {
            _id: 'shadowRealmFixes',
            title: 'Host a Mystery Typo Hunt',
            text: 'Admin McCryptic to create a scavenger hunt for hidden typos in the codebase. Spoiler: They’re everywhere!',
            createdAt: utilService.getRandomDate(5 * WEEK),
            isDone: false,
            creator: {
                _id: '54h54h54a454',
                fullName: 'Admin McCryptic',
                username: 'iamdefinitelynotadmin',
                isAdmin: true,
            },
        },
        {
            _id: 'memeMagic',
            title: 'Invent a Meme Generator',
            text: 'Meme Magician to create an AI that turns office incidents into instant memes. Disclaimer: Dad jokes included.',
            createdAt: utilService.getRandomDate(5 * WEEK),
            isDone: true,
            creator: {
                _id: 'c4t50n1735d6',
                fullName: 'Meme Magician',
                username: 'gifMasterX',
                isAdmin: false,
            },
        },
        {
            _id: 'bugBashBonanza',
            title: 'Organize a Bug Bash Event',
            text: 'Bug Whisperer to lead a bug-finding marathon. Prizes include unlimited coffee and bragging rights.',
            createdAt: utilService.getRandomDate(5 * WEEK),
            isDone: true,
            creator: {
                _id: '00f100f110f1',
                fullName: 'Bug Whisperer',
                username: 'codeSamurai',
                isAdmin: false,
            },
        },
        {
            _id: 'glitterGalore',
            title: 'Revamp the Break Room',
            text: 'Design Dynamo’s mission: Transform the break room into an art gallery. Expect an explosion of colors and creativity!',
            createdAt: utilService.getRandomDate(5 * WEEK),
            isDone: false,
            creator: {
                _id: 'b313371337b3',
                fullName: 'Design Dynamo',
                username: 'pixelPicasso',
                isAdmin: false,
            },
        },
        {
            _id: 'dataDetectiveDiaries',
            title: 'Solve the Mystery of Missing Snacks',
            text: 'Data Detective to use analytics to find out who’s been sneaking extra snacks from the kitchen.',
            createdAt: utilService.getRandomDate(5 * WEEK),
            isDone: true,
            creator: {
                _id: 'd10d010010d0',
                fullName: 'Data Detective',
                username: 'spreadsheetSherlock',
                isAdmin: false,
            },
        },
        {
            _id: 'hashtagHijinks',
            title: 'Launch a Viral Office Campaign',
            text: 'Social Butterfly to start an office challenge on social media. Goal: Make #OfficeLife the next big trend.',
            createdAt: utilService.getRandomDate(5 * WEEK),
            isDone: false,
            creator: {
                _id: '1234567890ab',
                fullName: 'Social Butterfly',
                username: 'hashtagQueen',
                isAdmin: false,
            },
        },
        {
            _id: 'pixelPerfection',
            title: 'Design a Digital Zen Garden',
            text: 'Pixel Picasso to create a calming, digital space where everyone can relax their eyes after hours of coding.',
            createdAt: utilService.getRandomDate(5 * WEEK),
            isDone: false,
            creator: {
                _id: 'b313371337b3',
                fullName: 'Design Dynamo',
                username: 'pixelPicasso',
                isAdmin: false,
            },
        },
        {
            _id: 'spreadsheetSaga',
            title: 'Host an Excel Esports Event',
            text: 'Spreadsheet Sherlock to organize an Excel championship. May the best function win!',
            createdAt: utilService.getRandomDate(5 * WEEK),
            isDone: true,
            creator: {
                _id: 'd10d010010d0',
                fullName: 'Data Detective',
                username: 'spreadsheetSherlock',
                isAdmin: false,
            },
        },
        {
            _id: 'codeConundrum',
            title: 'Organize a Mystery Hackathon',
            text: 'Code Samurai to host a surprise coding challenge. Theme revealed on the day. Bring your samurai spirit!',
            createdAt: utilService.getRandomDate(5 * WEEK),
            isDone: false,
            creator: {
                _id: '00f100f110f1',
                fullName: 'Bug Whisperer',
                username: 'codeSamurai',
                isAdmin: false,
            },
        },
        {
            _id: 'socialSymphony',
            title: 'Compose a Social Media Opera',
            text: 'Hashtag Queen to orchestrate a week-long social media event with dramatic twists and turns.',
            createdAt: utilService.getRandomDate(5 * WEEK),
            isDone: false,
            creator: {
                _id: '1234567890ab',
                fullName: 'Social Butterfly',
                username: 'hashtagQueen',
                isAdmin: false,
            },
        },
        {
            _id: 'caffeineCraze',
            title: 'Brew the Ultimate Coffee',
            text: 'Coffee Connoisseur to experiment with different beans to find the ultimate coffee blend.',
            createdAt: utilService.getRandomDate(5 * WEEK),
            isDone: false,
            creator: {
                _id: '6a454fef54a4',
                fullName: 'Coffee Connoisseur',
                username: 'caffeineQueen95',
                isAdmin: false,
            },
        },
        {
            _id: 'memeMania',
            title: 'Curate an Office Meme Gallery',
            text: 'Meme Magician to collect and display the funniest office memes in a digital gallery.',
            createdAt: utilService.getRandomDate(5 * WEEK),
            isDone: true,
            creator: {
                _id: 'c4t50n1735d6',
                fullName: 'Meme Magician',
                username: 'gifMasterX',
                isAdmin: false,
            },
        }
    ]
    return newTodos
}