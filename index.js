const Discord = require('discord.js')
const fs = require('fs')
const csv = require('csv')
const Cryptr = require('cryptr');

const config = require('./config.json')

const Sleep = require('./commands/sleep.js')
const Game = require('./commands/game.js')
const Care = require('./commands/care.js')
const Windows = require('./commands/windows.js')
const Help = require('./commands/help.js')
const Reward = require('./commands/reward.js')
const Emergency = require('./commands/emergency.js')
const Schedule = require('./commands/schedule.js')
const Purge = require('./commands/purge.js')
const Howto = require('./commands/howto.js')
const Food = require('./needs/food.js')
const Treatment = require('./needs/treatment.js')

const bot = new Discord.Client()
const cryptr = new Cryptr('myTotalySecretKey');
 
// const encryptedServer = cryptr.encrypt('The server');
// const encryptedToken = cryptr.encrypt('The token');

const serverCrypt = cryptr.decrypt(config.serverID);
const tokenCrypt = cryptr.decrypt(config.token);

bot.on('ready', () => {
    let guild = bot.guilds.get(serverCrypt);

    // server available
    if (guild.available) {
        let today;
        /* ======== FOOD ======== */
        /* ---- PORTION FOOD ---- */
        // Check every minute (60 seconds * 1000 ms)
        setInterval(function() {
            today = new Date();

            // Morning portion 6:30 am
            if (today.getHours() == "4" && today.getMinutes() == "15") {
                let embed = new Discord.RichEmbed();
                guild.channels.find("name", "🍣nourriture").send(Food.getAmMessage(embed))
            // Evening portion 6:30 pm   
            } else if(today.getHours() == "16" && today.getMinutes() == "30") {
                let embed = new Discord.RichEmbed();
                guild.channels.find("name", "🍣nourriture").send(Food.getPmMessage(embed))            
            }
        }, 60 * 1000);

        /* ----- REFILL CROQUETTE POTS ---- */
        setInterval(function () {
            // get the CSV file
            let stream = fs.createReadStream("./file/food_planning.csv")
            let product, day, month, year, dateTemp, dateUTC;
            
            // get the date of the current day
            today = new Date()
    
            stream
            .pipe(csv.parse({
                delimiter: ';'
            }))
            .on("data", (data) => {
                // get the name of the product
                product = data[0]
                // separate days, months and years
                day = data[1][0] + data[1][1]
                month = data[1][3] + data[1][4]
                year = data[1][6] + data[1][7] + data[1][8] + data[1][9]
                // reverse the date (ex: 2018-05-06)
                dateTemp = year + "-" + month + "-" + day
                // UTC format
                dateUTC = new Date(dateTemp)
                // today is on the planning, display a message with the name of the product
                if (dateUTC.getDate() == today.getDate() && dateUTC.getMonth() == today.getMonth() && dateUTC.getFullYear() == today.getFullYear()
                && today.getHours() == "16") {                         
                        let embed = new Discord.RichEmbed();
                        guild.channels.find("name", "🍣nourriture").send(Food.getRefillMessage(embed));
                }
            })         
        }, 2 * 1000);

        /* ---------- TREATMENT ---------- */
        // check every hour (60 minutes * (60 seconds * 1000 ms))
        setInterval(function () {
            // get the CSV file
            let stream = fs.createReadStream("./file/life_planning.csv")
            let product, day, month, year, dateTemp, dateUTC;
            
            // get the date of the current day
            today = new Date()
    
            stream
            .pipe(csv.parse({
                delimiter: ';'
            }))
            .on("data", (data) => {
                // get the name of the product
                product = data[0]
                // separate days, months and years
                day = data[1][0] + data[1][1]
                month = data[1][3] + data[1][4]
                year = data[1][6] + data[1][7] + data[1][8] + data[1][9]
                // reverse the date (ex: 2018-05-06)
                dateTemp = year + "-" + month + "-" + day
                // UTC format
                dateUTC = new Date(dateTemp)
                // today is on the planning, display a message with the name of the product
                if (dateUTC.getDate() == today.getDate() && dateUTC.getMonth() == today.getMonth() && dateUTC.getFullYear() == today.getFullYear()
                    && today.getHours() == "6") {                        
                        let embed = new Discord.RichEmbed()
                        guild.channels.find("name", "suivi").send(Treatment.getFleaTreatmentMessage(embed, product))
                }
            })         
        }, 1 * 1000);
    }
    
})

bot.on('guildMemberAdd', (member) => {
    member.createDM().then( (channel) => {
        let welcome =   'Bonjour ' + member.displayName + ' ! :smiley_cat: \n'
                        'Je te souhaite la bienvenue sur mon serveur discord principalement dédié à mon bien être mais tu peux trouver d\'autres salons sympas !\n'
        return channel.send(welcome)
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
        case '!planning': Schedule.action(message); break;
        case '!sommeil': Sleep.action(message); break;
        case '!fenêtre': Windows.action(message); break; 
        case '!food': Food.action(message, embed, guild, fs, csv);break;
        default: break;
    }        
})


bot.login(tokenCrypt)