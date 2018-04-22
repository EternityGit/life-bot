const Discord = require('discord.js');
const Sleep = require('./commands/sleep.js');
const Game = require('./commands/game.js');
const Care = require('./commands/care.js');
const Windows = require('./commands/windows.js');
const Help = require('./commands/help.js');
const Emergency = require('./commands/emergency.js');
const bot = new Discord.Client();


bot.on('guildMemberAdd', (member) => {
    member.createDM().then( (channel) => {
        let welcome =   'Bonjour ' + member.displayName + ' ! :smiley_cat: \n'+
                        'J\'espère que tu trouveras toutes les infomartions nécessaires pour prendre soin de moi !'+
                        'Sans mon maître je suis déboussolé et cet endroit te permettra de m\'apporter confort et compagnie :smirk_cat:';
        return channel.send(welcome);
    })
})

bot.on('message', (message) => {
    let commandUsed = Sleep.parse(message) || Game.parse(message) || Care.parse(message) || Windows.parse(message) || Help.parse(message) || Emergency.parse(message);
})

bot.login(process.env.BOT_TAKEN);
