const Command = require('./command')

module.exports = class Help extends Command{
    static match(message) {
        return message.content.startsWith('!help')
    }

    static action(message) {
        let help = 'Les commandes :\n!sommeil\n!jeu\n!soin\n!fenetre\n!friandise\n!planning\n!urgence'
        message.reply(help)
    }
}