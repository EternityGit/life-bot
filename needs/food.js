module.exports = class Food {
    static action(message, embed, guild, fs, csv) {

        if (message.content.split(' ').length == 2) {
            let splitted = message.content.split(' ');

            if (splitted[1] == "refill") {
                this.sendRefillMessage(message, embed, guild, fs, csv);
            }

        } else {
            message.channel.send("Précise la commande (ex: \"!howto Broadline\")")
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
        let product, day, month, year, dateTemp, dateUTC, refill_message, nextDate, nextDiff, afterDate, afterDiff, number, time = 0;

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
                 if (time == 0) {
                     number = Math.ceil((dateUTC - today)/(1000 * 3600 * 24));
                     nextDiff = this.getProperGrammar(number);
                     nextDate = '(le **' + dateUTC.getDate() + '** ' + this.getNameMonth(dateUTC.getMonth()) + ' ' + dateUTC.getFullYear() + ')';
                 } else if (time == 1) {
                     number = Math.ceil((dateUTC - today)/(1000 * 3600 * 24));
                     afterDiff = this.getProperGrammar(number);
                     afterDate = '(le **' + dateUTC.getDate() + '** ' + this.getNameMonth(dateUTC.getMonth()) + ' ' + dateUTC.getFullYear() + ')'; 
                 }
                 else if (time == 2) {
                     refill_message = embed
                     .setTitle('REMPLISSAGE DES POTS')
                     .setDescription('_*Refill time!*_  18 pots à remplir. ±19g par pot. :smirk_cat:')
                     .addField(nextDiff, nextDate, true)
                     .addField(afterDiff, afterDate, true)
                     .setColor(0xFF9933)
                     .setThumbnail("https://i.imgur.com/fpFrKTO.png")
                     .setFooter('Requested by @' + message.author.tag + ' | Powered by Entropy®.');

                     
                     guild.channels.find("name", "🍣nourriture").send('<@' + message.author.id + '>');
                     guild.channels.find("name", "🍣nourriture").send(refill_message).then(embedMessage => {
                         embedMessage.react("✅");
                     });
                     /* TEST
                     guild.channels.find("name", "test").send(refill_message).then(embedMessage => {
                         embedMessage.react("✅");
                     }); */
                 }
                 time++;
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
}


