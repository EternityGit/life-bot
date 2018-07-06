module.exports = class Food {
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
            .setFooter('Pour plus d\'informations sur le remplissage des pots, contact mon propriétaire @Entropy#0559.')
        return morning_message;
    }

    static getPmMessage(embed) {
        let evening_message = embed
            .addField('Feeding time!', 'Miaou c\'est l\'heure de ma ration de croquette du **soir**. :smirk_cat:')
            .addField('Dose', '1 pot', true)
            .addField('Quantité', '18 grammes', true)
            .addField('Emplacement', 'Dans la cuisine', true)
            .addField('Bonus', '10-12 croquettes dans la gamelle à tubes')
            .addField('Délai', 'Pas de délai', true)
            .addField('Emplacement', 'Dans la chambre de mon maître', true)
            .setColor(0xFF9933)
            .setDescription('RATION BI-QUOTIDIENNE (SOIR)')
            .setThumbnail("https://i.imgur.com/3fr7bPQ.png")
            .setImage("https://i.imgur.com/UAcmbPp.jpg")
            .setFooter('Pour plus d\'informations sur le remplissage des pots, contact mon propriétaire @Entropy#0559.')
        return evening_message;
    }

    static getRefillMessage(embed) {
        let refill_message = embed
            .addField('Refill time!', 'Miaou, il faut refaire les pots de croquettes. :smirk_cat:')
            .addField('Dose', '18 pots', true)
            .addField('Quantité', '18 grammes', true)
            .addField('Emplacement', 'Dans la cuisine', true)
            .setColor(0xFF9933)
            .setDescription('REMPLISSAGE DES POTS')
            .setThumbnail("https://i.imgur.com/fpFrKTO.png")
            .setFooter('Pour plus d\'informations sur le remplissage des pots, contact mon maître @Entropy#0559.')
        return refill_message;
    }
}


