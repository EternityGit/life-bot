const Discord = require('discord.js')

const Sleep = require('./commands/sleep.js')
const Game = require('./commands/game.js')
const Care = require('./commands/care.js')
const Windows = require('./commands/windows.js')
const Help = require('./commands/help.js')
const Emergency = require('./commands/emergency.js')
const Food = require('./needs/food.js')
const Treatment = require('./needs/treatment.js')

const bot = new Discord.Client()
const guild = new Discord.Guild()


bot.on('guildMemberAdd', (member) => {
    member.createDM().then( (channel) => {
        let welcome =   'Bonjour ' + member.displayName + ' ! :smiley_cat: \n'
                        'J\'espère que tu trouveras toutes les infomartions nécessaires pour prendre soin de moi !'
                        'Sans mon maître je suis déboussolé et ce serveur te permettra de m\'apporter confort et compagnie :smirk_cat:'
        return channel.send(welcome)
    })
})

bot.on('message', (message) => {
    let commandUsed = Sleep.parse(message) || Game.parse(message) || Care.parse(message) || Windows.parse(message) || Help.parse(message) || Emergency.parse(message)
})
bot.on('ready', () => {
    if (guild.available == ("Life's Family")) {
        setInterval(function () {
            guild.channels.find("name", "nourriture").send(Food.getMorningFoodMessage())
        }, 24*60*60*1000)
        setInterval(function () {
            guild.channels.find("name", "nourriture").send(Food.getEveningFoodMessage())
        }, 24*60*60*1000)
        setInterval(function () {
            guild.channels.find("name", "suivi").send(Treatment.getFleaTreatmentMessage())
        }, 15*24*60*60*1000)
        setInterval(function () {
            guild.channels.find("name", "suivi").send(Treatment.getOilTreatmentMessage())
        }, 15*24*60*60*1000)
    }
})
bot.login('NDM3MjEzOTQ3OTUxODQxMjkw.DbyzNQ.-djAyorVzLruGC4h1c4zhGNS_IQ')
