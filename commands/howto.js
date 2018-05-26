const Command = require('./command')
const Discord = require('discord.js')


module.exports = class Howto extends Command {
    static match(message) {
        return message.content.startsWith('!howto')
    }

    static action(message) {
        if (message.content.split(' ').length == 2) {
            let splitted = message.content.split(' ');
            if (splitted[1] == "Broadline") {
                this.getSteps(message)
                message.channel.send("_**Chargement du tutoriel...**_")
            }

        } else {
            message.channel.send("Précise la commande (ex: \"!howto Broadline\")")
        }
    }


    static wait2seconds(index, embed) {
        return new Promise(resolve => {
            setTimeout( () => {
                resolve(embed);
            }, 10 * 1000)
        })
    }

    static async getSteps(message) {
        for (let index = 1; index <= 4; index++) {
            const embed = new Discord.RichEmbed()
            switch (index) {
                case 1:
                    embed
                    .setTitle("Étape 1")
                    .addField('Que faire ?', 'Découper l\'emballage à l\'endroit indiqué, puis retirer la languette en plastique.')
                    .addField('Conseil', 'À faire discrètement car quand j\'entend ce bruit je me cache.')
                    .setThumbnail("https://i.imgur.com/dbxPYyL.png")
                    .setColor(0x00CC66)
                    .setImage("https://i.imgur.com/CB2SeaR.png")                    
                    break;
                case 2:
                    embed
                    .setTitle("Étapes 2 & 3")
                    .addBlankField()
                    .addField('Étape 2')
                    .addField('Que faire ?', 'Enlever le petit bouchon gris foncé en le dévissant.')
                    .addField('Conseil', 'Utiliser 2 mains pour dévisser le bouchon.')
                    .addBlankField()
                    .addField('Étape 3')
                    .addField('Que faire ?', 'Pousser légèrement le piston pour "dégripper" la pipette et préparer le produit à être expulsé.')
                    .addField('Conseil', 'Utiliser 1 main pour appuyer sur le piston.')
                    .setThumbnail("https://i.imgur.com/dbxPYyL.png")
                    .setColor(0x00CC66)
                    .setImage("https://i.imgur.com/hV2ycbp.png")                   
                    break;
                case 3:
                    embed      
                    .setTitle("Étape 4")  
                    .addField('Que faire ?', 'Dégager les poils à la base de la nuque entre les 2 omoplates pour apercevoir la peau.')
                    .addField('Conseil', 'Me tenir d\'une main (entre les jambes pour plus de maintien) et l\'autre main pose le produit en poussant le piston de la pipette.')
                    .setThumbnail("https://i.imgur.com/dbxPYyL.png")
                    .setColor(0x00CC66)
                    .setImage("https://i.imgur.com/srYKYzi.png")
                    .setFooter('N\'oublies pas de me réconforter car je n\'aime pas du tout que l\'on me mette ce produit.')
                    break;    
                case 4:
                    embed
                    .setTitle("Étape 5")
                    .addField('ATTENTION', 'Surtout pas d\'**aiguilles** !! Ce n\'est pas une seringue mais une pipette.')
                    .addField('Conseil', 'Une fois fini je pars me cacher et que je reçois ma friandise pour me réconforter.')
                    .setThumbnail("https://i.imgur.com/dbxPYyL.png")
                    .setColor(0xFF3300)
                    .setImage("https://i.imgur.com/R0GQ5vf.png")
                    .setFooter("1 friandise de base, mais je peux en avoir 2 si j'ai eu du mal.")
                    break;       
                default:
                    break;
            }
            var result = await this.wait2seconds(index, embed)
            message.channel.send(result)
        }
        /*
        for (let index = 0; index < 4; index++) {
            try {
                var waiting = await wait2seconds()
                message.channel.send("message " + index + " après 3 sec.")
            } catch (error) {
                message.channel.send("ERROR: **" + error + "**.")
            }
        }*/
    }
}