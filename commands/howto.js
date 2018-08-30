const Discord = require('discord.js')

module.exports = class Howto {
    
    static action(message) {
        var state = false;

        if (message.content.split(' ').length == 2) {
            let splitted = message.content.split(' ');

            if (splitted[1] == "Broadline") {
                state = this.getBroadlineSteps(message)
            }

        } else {
            message.channel.send("Précise la commande (ex: \"!howto Broadline\")")
        }
        return state;
    }

    static getBroadlineSteps(message) {
        const embed = new Discord.RichEmbed();
        embed
        .setTitle("TUTORIEL")
        .setDescription("Comment me déposer le produit **Broadline** :smirk_cat:.")
        .setThumbnail("https://i.imgur.com/dbxPYyL.png")
        .addField('Étape 1', 'Découper l\'emballage à l\'endroit indiqué, puis retirer la languette en plastique.\n_*À faire discrètement car quand j\'entend ce bruit je me cache.*_') 
        .addField('Étape 2', 'Enlever le petit bouchon gris foncé en le dévissant.\n_*Utiliser 2 mains pour dévisser le bouchon.*_')
        .addField('Étape 3', 'Pousser légèrement le piston pour "dégripper" la pipette et préparer le produit à être expulsé.\n_*Utiliser 1 main pour appuyer sur le piston.*_')
        .addField('Étape 4','Dégager les poils à la base de la nuque entre les 2 omoplates pour apercevoir la peau.\n_*Me tenir d\'une main (entre les jambes pour plus de maintien) et l\'autre main pose le produit en poussant le piston de la pipette.*_')
        .addField('Étape 5', 'ATTENTION ! Surtout pas d\'**aiguilles** !! Ce n\'est pas une seringue mais une pipette.\n_*Une fois fini je pars me cacher et que je reçois ma friandise pour me réconforter.*_')
        .setColor(0x00CC66)
        .setImage("https://i.imgur.com/CB2SeaR.png");

        message.channel.send(embed);

        return true;
    }
}