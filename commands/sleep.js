const Command = require('./command')

module.exports = class Sleep extends Command {
    static match(message) {
        return message.content.startsWith('!sommeil')
    }

    static action(message) {
        if (message.content.split(' ').length == 1) {
            message.channel.send('Je dors environ **16h par jour** ! Si je dors moins c\'est que quelquechose m\'a dérangé. :pouting_cat:')
        } else {
            let username = message.content.split(' ')
            username.shift()
            message.channel.send(username.join('%20') + ' Je dors environ **16h par jour** ! Si je dors moins c\'est que quelquechose m\'a dérangé. :pouting_cat:')
        }
    }
}