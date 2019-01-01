const Discord = require('discord.js');
const fs = require('fs');
const csv = require('csv');
const Cryptr = require('cryptr');

const config = require('./config.json');

const Sleep = require('./commands/sleep.js');
const Game = require('./commands/game.js');
const Care = require('./commands/care.js');
const Windows = require('./commands/windows.js');
const Help = require('./commands/help.js');
const Reward = require('./commands/reward.js');
const Emergency = require('./commands/emergency.js');
const Schedule = require('./commands/schedule.js');
const Purge = require('./commands/purge.js');
const Howto = require('./commands/howto.js');
const Food = require('./needs/food.js');
const Treatment = require('./needs/treatment.js');

const bot = new Discord.Client();
const cryptr = new Cryptr('myTotalySecretKey');
 
// const encryptedServer = cryptr.encrypt('The server');
// const encryptedToken = cryptr.encrypt('The token');

const serverCrypt = cryptr.decrypt(config.serverID);
const tokenCrypt = cryptr.decrypt(config.token);

bot.on('ready', () => {
    let guild = bot.guilds.get(serverCrypt); 
    
    // server available
    if (guild.available) {
        setInterval(function () {
            let embed = new Discord.RichEmbed();
            Food.action(null, embed, guild, fs, csv);
        }, 60 * 60 * 1000);
    }
    
})

bot.on('guildMemberAdd', (member) => {
    member.createDM().then( (channel) => {
        let welcome =   'Bonjour ' + member.displayName + ' ! :smiley_cat: \n'
                        'Je te souhaite la bienvenue sur mon serveur discord principalement dédié à mon bien être mais tu peux trouver d\'autres salons sympas !\n';
        return channel.send(welcome);
    })
})

bot.on('message', (message) => {
    
    let guild = bot.guilds.get(serverCrypt);   
    let embed = new Discord.RichEmbed();
    
    var commandUsed = message.content.split(' ');

    switch (commandUsed[0]) {

        case '!soin': Care.action(message); break;
        case '!urgence': Emergency.action(message); break;
        case '!jeu': Game.action(message); break;
        case '!help': Help.action(message); break;
        case '!howto': Howto.action(message); break;
        case '!purge': Purge.action(message); break;
        case '!friandise': Reward.action(message); break;
        case '!balance': Scale.action(message); break;
        case '!sommeil': Sleep.action(message); break;
        case '!fenêtre': Windows.action(message); break; 
        case '!planning': Schedule.action(message, embed, guild, fs, csv); break;
        case '!food': Food.action(message, embed, guild, fs, csv);break;
        default: break;
    }        
});


bot.login(tokenCrypt);