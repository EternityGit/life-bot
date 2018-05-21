const Command = require('./command')

module.exports = class Purge extends Command {
    static match(message) {     
        return message.content.startsWith('!purge')
    } 

    static action(message) {        
        let args = message.content.split(' ')
        
        console.log("Le args 0 est " + args[0])
        console.log("Le args 1 est " + args[1])

        if (!isNaN(args[1]) && args[1] > 100) {
            message.reply('Peux pas supprimer plus de 100 messages d\'un coup. :/');

        } else if (!isNaN(args[1]) && args[1] <= 100) {
            message.channel.bulkDelete(args[1])
                .then(message.channel.send(args[1] + " messages supprimés."))
                .catch(error => message.channel.send(`ERROR: **${error.message}**`))
        } else {
            message.reply("Ce n'est pas un nombre.")
        }
    }   

}