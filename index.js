const Discord = require('discord.js')
const fs = require('fs')
const csv = require('csv')

const Sleep = require('./commands/sleep.js')
const Game = require('./commands/game.js')
const Care = require('./commands/care.js')
const Windows = require('./commands/windows.js')
const Help = require('./commands/help.js')
const Reward = require('./commands/reward.js')
const Emergency = require('./commands/emergency.js')
const Schedule = require('./commands/schedule.js')
const Purge = require('./commands/purge.js')
const Food = require('./needs/food.js')
const Treatment = require('./needs/treatment.js')

const bot = new Discord.Client()
const embed = new Discord.RichEmbed()

bot.on('ready', () => {
    let guild = bot.guilds.get('435771750408650753')

    // server available
    if (guild.available) {
        let today
        /* ---------- FOOD ---------- */
        // Check every minute (60 seconds * 1000 ms)
        setInterval(function() {
            today = new Date()

            // Morning portion 6:30 am
            if (today.getHours() == "4" && today.getMinutes() == "15") {
                guild.channels.find("name", "nourriture").send(Food.getAmMessage(embed))
            // Evening portion 6:30 pm   
            } else if(today.getHours() == "16" && today.getMinutes() == "30") {
                guild.channels.find("name", "nourriture").send(Food.getPmMessage(embed))            
            }
        }, 60 * 1000)        

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
                    guild.channels.find("name", "suivi").send(Treatment.getFleaTreatmentMessage(embed, product))
                }
            })         
        }, 60 * 60 * 1000)
    }
})

bot.on('guildMemberAdd', (member) => {
    member.createDM().then( (channel) => {
        let welcome =   'Bonjour ' + member.displayName + ' ! :smiley_cat: \n'
                        'J\'espère que tu trouveras toutes les infomartions nécessaires pour prendre soin de moi !\n'
                        'Sans mon maître je suis déboussolé et ce serveur te permettra de m\'apporter confort et compagnie :smirk_cat:'
        return channel.send(welcome)
    })
})

bot.on('message', (message) => {
    let commandUsed = Sleep.parse(message) 
        || Game.parse(message) 
        || Care.parse(message) 
        || Windows.parse(message)
        || Help.parse(message) 
        || Emergency.parse(message)     
        || Reward.parse(message)  
        || Schedule.parse(message)
        || Purge.parse(message)
})


bot.login('NDM3MjEzOTQ3OTUxODQxMjkw.DbyzNQ.-djAyorVzLruGC4h1c4zhGNS_IQ')