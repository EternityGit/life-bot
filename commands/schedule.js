module.exports = class Scedule {
    static action(message, embed, guild, fs, csv) {

        if (message.content.split(' ').length == 2) {
            let splitted = message.content.split(' ');

            if (splitted[1].toLowerCase() == "broadline") {
                this.sendPlanning(message, embed, guild, fs, csv, 'Broadline');
            }
            else if (splitted[1].toLowerCase() == "dermoscent") {
                this.sendPlanning(message, embed, guild, fs, csv, 'Dermoscent');
            }
        } else if (message.content.split(' ').length == 1) {
            this.sendPlanning(message, embed, guild, fs, csv, true);
        }
    }

    static sendPlanning(message, embed, guild, fs, csv, choice) {
        let stream = fs.createReadStream("./file/life_planning.csv");
        let today = new Date();
        let planning, product, day, month, year, rest, dateTemp, dateUTC, planning_message, number, color;
        let firstDate, firstDiff, firstRest, secondDate, secondDiff, secondRest;
        let time = 0;
        let thumbnail = '';

        stream.
        pipe(csv.parse({
            delimiter: ';'
        }))
        .on("data", (data) => {
            // get the name of the product
            product = data[0];
            // separate days, months and years
            day = data[1][0] + data[1][1];
            month = data[1][3] + data[1][4];
            year = data[1][6] + data[1][7] + data[1][8] + data[1][9];
            // get the rest of the stock
            rest = data[2];
            // reverse the date (ex: 2018-05-06)
            dateTemp = year + "-" + month + "-" + day;
            // UTC format
            dateUTC = new Date(dateTemp);

                // 2 next products with their names and dates then send the message
                if (dateUTC > today || (dateUTC.getDate() == today.getDate() && dateUTC.getMonth() == today.getMonth() && dateUTC.getFullYear() == today.getFullYear())) {      
                    if (choice == product || choice == true) {
                        if (time == 0) {                        
                            // The 1st next product
                            number = Math.ceil((dateUTC - today)/(1000 * 3600 * 24));
                            firstDiff = product  + '\nLe ' + this.getNameDay(dateUTC.getDay()) + ' **' + dateUTC.getDate() + '** ' + this.getNameMonth(dateUTC.getMonth()) + ' ' + dateUTC.getFullYear();
                            firstDate = this.getProperGrammar(number);
                            firstRest = this.getRest(rest);
                            color = this.getColor(rest);
                        }
                        else if (time == 1) {                        
                            // The 2nd next product
                            number = Math.ceil((dateUTC - today)/(1000 * 3600 * 24));
                            secondDiff = product + '\nLe ' + this.getNameDay(dateUTC.getDay()) + ' **' + dateUTC.getDate() + '** ' + this.getNameMonth(dateUTC.getMonth()) + ' ' + dateUTC.getFullYear();
                            secondDate = this.getProperGrammar(number);
                            secondRest = this.getRest(rest);
                        }
                        else if (time == 2) {
                            planning_message = embed
                            .setTitle(':hospital: PLANNING ' + (choice == true ? 'DES SOINS' : product + '™') + ' :hospital:')
                            .setDescription('Nous sommes le **' + today.getDate() + ' ' + this.getNameMonth(today.getMonth()) + ' ' + today.getFullYear() + '** et les 2 prochains produits ' + (choice == true ? '' : '**' + product + '**') + ' sont :')
                            .addField(firstDiff, firstDate + firstRest,  true)
                            .addField(secondDiff, secondDate + secondRest, true)
                            .setColor(color)
                            .setThumbnail("https://i.imgur.com/fpFrKTO.png")
                            .setFooter('Requested by @' + message.author.tag + ' | Powered by Entropy®.');
                            
                            guild.channels.find("name", "🏥suivi").send('<@' + message.author.id + '>');
                            guild.channels.find("name", "🏥suivi").send(planning_message).then(embedMessage => {
                                embedMessage.react("✅");
                            });
                            /*// TEST
                            guild.channels.find("name", "test").send(planning_message).then(embedMessage => {
                                embedMessage.react("✅");
                            });*/
                        }
                        time++;
                    }
                    
                }
                
        });
    }
    
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
        ];
        return months[month];
    }
    static getNameDay(day) {
        let days = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
        return days[day];
    }
    static getProperGrammar(number) {
        if (number == 0) {
            return '**Aujourd\'hui !**';
        }
        else if (number == 1) {
            return '**Demain !**';
        } 
        else {
            return 'Dans **' + number + '** jours.';
        }
    }
    static getColor(number) {
        if (number == 0) {
            return 0xFF0000;
        }
        else if (number == 1) {
            return 0xFF4400;
        } 
        else {
            return 0x0055DD;
        }
    }

    static getRest(rest) {
        if (rest > 1) {
            return '\nStock : **' + rest + '** produits.';
        }
        else if (rest == 1) {
            return '\nStock : **1** produit.';
        }
        else {
            return '\nStock : **VIDE**.';
        }
    }
}