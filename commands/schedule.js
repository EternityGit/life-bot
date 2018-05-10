const Command = require('./command')
const fs = require('fs')
const csv = require('csv')

module.exports = class Scedule extends Command{

    static getNameMonth(month) {
        let months = [
            'janvier',
            'février',
            'mars',
            'avril',
            'mai',
            'juin',
            'juillet',
            'août',
            'septembre',
            'octobre',
            'novembre',
            'decembre'
        ]
        return months[month]
    }

    static match(message) {
        return message.content.startsWith('!planning')
    }

    static action(message) {
        let stream = fs.createReadStream("./file/life_planning.csv")
        let today = new Date()
        let planning, product, day, month, year, dateTemp, dateUTC, time = 0;

        stream.
        pipe(csv.parse({
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

                // 2 next products with their names and dates then send the message
                if (dateUTC > today) {
                    if (time == 0) {                        
                        // The 1st next product
                        planning =  'Nous somme le _*' + today.getDate() + ' ' + this.getNameMonth(today.getMonth()) + ' ' + today.getFullYear() + '*_ et les 2 prochains produits sont :' +
                                    '\n\n     - **' + product + '** dans **' + Math.ceil((dateUTC - today)/(1000 * 3600 * 24)) + '** jours. (le '+ dateUTC.getDate() + ' ' + this.getNameMonth(dateUTC.getMonth()) + ' ' + dateUTC.getFullYear() + ')'
                    } else if (time == 1) {                        
                        // The 2nd next product
                        planning += '\n\n     - **' + product + '** dans **' + Math.ceil((dateUTC - today)/(1000 * 3600 * 24)) + '** jours. (le '+ dateUTC.getDate() + ' ' + this.getNameMonth(dateUTC.getMonth()) + ' ' + dateUTC.getFullYear() + ')'
                    }
                    else if (time == 2) {
                        //Send the message to the channel
                        message.channel.send(planning)  
                    }
                    time++
                }
                
        })
    }
}