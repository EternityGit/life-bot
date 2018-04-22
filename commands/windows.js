const Command = require('./command')

module.exports = class Windows extends Command {
    static match(message) {
        return message.content.startsWith('!fenetre')
    }

    static action(message) {
        let windows = 'Attention quand tu ouvres les fenêtres car je serais tenté de monter sur le rebord et de tomber.' +
        'Il faut toujours me surveiller surtout quand je vois certains animaux (:spider: :beetle: :bee: :bird:) volants je ne me contrôle plus. '

        if (message.content.split(' ').length == 1) {
            message.channel.send(windows)
        } else {
            let username = message.content.split(' ')
            username.shift()
            message.channel.send(username.join('%20') + windows)
        }
    }
}