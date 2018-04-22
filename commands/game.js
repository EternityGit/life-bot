const Command = require('./command')

module.exports = class Game extends Command {
    static match(message) {
        return message.content.startsWith('!jeu')
    }

    static action(message) {
        if (message.content.split(' ').length == 1) {            
            message.channel.send('J\'adore jouer surtout avec ma petite souris, mais quelque fois j\'ai besoin qu\'on me laisse jouer toute seule ! :smirk_cat:')
        } else {
            let username = message.content.split(' ')
            username.shift()
            message.channel.send(username.join('%20') + 'J\'adore jouer surtout avec ma petite souris, mais quelque fois j\'ai besoin qu\'on me laisse jouer toute seule ! :smirk_cat:')
        }
    }
}