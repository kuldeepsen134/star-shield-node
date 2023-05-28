const auths = require('./auth')
const users = require('./user')


const comments = require('./comment')
const replies = require('./reply')
const groups = require('./group')

module.exports = {
    auths,
    users,
    groups,
    
    comments,
    replies,
}