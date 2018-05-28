module.exports = class Help {

    static action(message) {
        let help = 'Les commandes :\n!sommeil\n!jeu\n!soin\n!fenetre\n!friandise\n!planning\n!urgence'
        message.reply(help)
    }
}