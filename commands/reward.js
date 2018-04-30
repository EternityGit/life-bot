const Command = require('./command')

module.exports = class Reward extends Command {

    static match(message) {
        return message.content.startsWith('!friandise')
    }

    static action(message) {
        let reward =   'J\'aime beaucoup les friandises mais c\'est pas ça qu\'il faut m\'en donner fréquemment.'+
                    ' En général j\'en reçois **une** après le coupage des griffes et **une** après mes soins (**deux** si j\'ai vraiment eu du mal).'
        message.channel.send(reward)
    }
}