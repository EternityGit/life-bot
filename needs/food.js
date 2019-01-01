module.exports = class Food {
    static action(message, embed, guild, fs, csv) {
        if (message == null) {
            this.sendAutoRefillMessage(embed, guild, fs, csv);
        } else if (message.content.split(' ').length == 2) {
            let splitted = message.content.split(' ');

            if (splitted[1] == "refill") {
                this.sendRefillMessage(message, embed, guild, fs, csv);
            }
        } else {
            message.channel.send("Précise la commande (ex: \"!food refill\")")
        }
    }
    /*
    static getAmMessage(embed) {        
        let morning_message = embed
            .addField('Feeding time!', 'Miaou c\'est l\'heure de ma ration de croquette du **matin**. :smirk_cat:')
            .addField('Dose', '1 pot', true)
            .addField('Quantité', '18 grammes', true)
            .addField('Emplacement', 'Dans la cuisine', true)
            .addField('Bonus', '10-12 croquettes dans la gamelle à tubes')
            .addField('Délai', 'Après 1 heure (habitude donnée par le maître)', true)
            .addField('Emplacement', 'Dans la chambre de mon maître', true)
            .setColor(0xFF9933)
            .setDescription('RATION BI-QUOTIDIENNE (MATIN)')
            .setThumbnail("https://i.imgur.com/pfDj8p8.png")
            .setImage("https://i.imgur.com/UAcmbPp.jpg")
            .setFooter('Pour plus d\'informations sur le remplissage des pots, contact mon propriétaire @Entropy#0559.');
        return morning_message;
    }*/

    /*
    static getPmMessage(embed) {
        let evening_message = embed
            .setTitle('Feeding time!')
            .setDescription('Miaou c\'est l\'heure de ma ration de croquette du **soir**. :smirk_cat:')
            .addField('Dose', '1 pot', true)
            .addField('Emplacement', 'Dans la cuisine', true)
            .addField('Bonus', '10-12 croquettes dans la gamelle à tubes')
            .addField('Emplacement', 'Dans la chambre de mon maître', true)
            .setColor(0xFF9933)
            .setThumbnail("https://i.imgur.com/3fr7bPQ.png")
            .setImage("https://i.imgur.com/UAcmbPp.jpg")
            .setFooter('Pour plus d\'informations sur le remplissage des pots, contact mon propriétaire @Entropy#0559.');
        return evening_message;
    }*/

    static sendRefillMessage(message, embed, guild, fs, csv) {
        let stream = fs.createReadStream("./file/food_planning.csv"); // The CSV file
        let today = new Date(); // The current day
        let product, day, month, year, dateTemp, dateUTC, refill_message, number, color, time = 0;
        let nextFirstDate, nextFirstDiff;
        let nextSecondDate, nextSecondDiff;
        let nextThirdDate, nextThirdDiff;
        let nextFourthDate, nextFourthDiff;
        stream
        .pipe(csv.parse({
            delimiter: ';'
        }))
        .on("data", (data) => {
            // get the name of the product
            product = data[0];
            // separate days, months and years
            day = data[1][0] + data[1][1];
            month = data[1][3] + data[1][4];
            year = data[1][6] + data[1][7] + data[1][8] + data[1][9];
            // reverse the date (ex: 2018-05-06)
            dateTemp = year + "-" + month + "-" + day;
            
            // UTC format
            dateUTC = new Date(dateTemp);
            
             // 2 next refill with their names and dates then send the message  
            if (dateUTC.getDate() >= today.getDate() && 
                dateUTC.getMonth() >= today.getMonth() && 
                dateUTC.getFullYear() >= today.getFullYear()) {
                    switch (time) {
                        case 0: number = Math.ceil((dateUTC - today)/(1000 * 3600 * 24));
                                color = this.getColor(number);
                                nextFirstDiff = this.getProperGrammar(number);
                                nextFirstDate = '(le **' + this.getNameDay(dateUTC.getDay()) + ' ' + dateUTC.getDate() + '** ' + this.getNameMonth(dateUTC.getMonth()) + ' ' + dateUTC.getFullYear() + ')';break;
                        case 1: number = Math.ceil((dateUTC - today)/(1000 * 3600 * 24));
                                nextSecondDiff = this.getProperGrammar(number);
                                nextSecondDate = '(le **' + this.getNameDay(dateUTC.getDay()) + ' ' + dateUTC.getDate() + '** ' + this.getNameMonth(dateUTC.getMonth()) + ' ' + dateUTC.getFullYear() + ')';break;
                        case 2: number = Math.ceil((dateUTC - today)/(1000 * 3600 * 24));
                                nextThirdDiff = this.getProperGrammar(number);
                                nextThirdDate = '(le **' + this.getNameDay(dateUTC.getDay()) + ' ' + dateUTC.getDate() + '** ' + this.getNameMonth(dateUTC.getMonth()) + ' ' + dateUTC.getFullYear() + ')';break;
                        case 3: number = Math.ceil((dateUTC - today)/(1000 * 3600 * 24));
                                nextFourthDiff = this.getProperGrammar(number);
                                nextFourthDate = '(le **' + this.getNameDay(dateUTC.getDay()) + ' ' + dateUTC.getDate() + '** ' + this.getNameMonth(dateUTC.getMonth()) + ' ' + dateUTC.getFullYear() + ')';break;
                        case 4: refill_message = embed.setTitle('REMPLISSAGE DES POTS')
                                                      .setDescription('_*Refill time!*_  18 pots à remplir. ±19g par pot. :smirk_cat:')
                                                      .addField(nextFirstDiff, nextFirstDate, true)
                                                      .addField(nextSecondDiff, nextSecondDate, true)
                                                      .addField(nextThirdDiff, nextThirdDate, true)
                                                      .addField(nextFourthDiff, nextFourthDate, true)
                                                      .setColor(color)
                                                      .setThumbnail("https://i.imgur.com/fpFrKTO.png")
                                                      .setFooter('Requested by @' + message.author.tag + ' | Powered by Entropy®.');   
                        
                                guild.channels.find("name", "🍣nourriture").send('<@' + message.author.id + '>');
                                guild.channels.find("name", "🍣nourriture").send(refill_message).then(embedMessage => {
                                    embedMessage.react("✅");
                                });
                                /* TEST*//*
                                guild.channels.find("name", "test").send(refill_message).then(embedMessage => {
                                    embedMessage.react("✅");
                                }); */
                                break;
                        default:break;
                    }
                    time++;
            }
        });
    }

    static sendAutoRefillMessage(embed, guild, fs, csv) {
        let stream = fs.createReadStream("./file/food_planning.csv"); // The CSV file
        let today = new Date(); // The current day
        let product, day, month, year, dateTemp, dateUTC, refill_message, nextDate, nextDiff, number, color, time = 0;

        stream
        .pipe(csv.parse({
            delimiter: ';'
        }))
        .on("data", (data) => {
            // get the name of the product
            product = data[0];
            // separate days, months and years
            day = data[1][0] + data[1][1];
            month = data[1][3] + data[1][4];
            year = data[1][6] + data[1][7] + data[1][8] + data[1][9];
            // reverse the date (ex: 2018-05-06)
            dateTemp = year + "-" + month + "-" + day;
            
            // UTC format
            dateUTC = new Date(dateTemp);
            /*
            console.log("today" + today.getDate());
            console.log("date" + dateUTC.getDate());
            console.log("date - 1 " + dateUTC.getDate() - 1);
            */
            // 2 next refill with their names and dates then send the message  
            if (dateUTC.getDate() >= today.getDate() && 
                dateUTC.getMonth() >= today.getMonth() && 
                dateUTC.getFullYear() >= today.getFullYear() &&
                today.getHours() == 16) {
                    today.getDay
                    number = Math.ceil((dateUTC - today)/(1000 * 3600 * 24));

                    if (time == 0 && (number == 0 || number == 1)) {
                        nextDiff = this.getProperGrammar(number);
                        nextDate = '(le **' + this.getNameDay(dateUTC.getDay()) + ' ' + dateUTC.getDate() + '** ' + this.getNameMonth(dateUTC.getMonth()) + ' ' + dateUTC.getFullYear() + ')';
                        refill_message = embed.setTitle('REMPLISSAGE DES POTS')
                                              .setDescription('_*Refill time coming soon!*_ :smirk_cat:')
                                              .addField(nextDiff, nextDate, true)
                                              .setColor(0x39AC39)
                                              .setThumbnail("https://i.imgur.com/fpFrKTO.png")
                                              .setFooter('Automated message.');
                        
                        guild.channels.find("name", "🍣nourriture").send(refill_message).then(embedMessage => {
                            embedMessage.react("✅");
                        });
                        /* TEST
                        guild.channels.find("name", "test").send(refill_message).then(embedMessage => {
                            embedMessage.react("✅");
                        });*/
                    }
                    time++; // Only one line
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
            'décembre'
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
            return 'Dans ' + number + ' jours.';
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
}


