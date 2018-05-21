module.exports = class Food {
    static getAmMessage(embed) {
        let message = embed
            .addField('Feeding time!', 'Miaou @everyone, c\'est l\'heure de ma ration de croquette du matin. :smirk_cat:')
            .addField('Dose', '1 pot', true)
            .addField('Quantité', '~20 grammes', true)
            .addField('Emplacement', 'Dans la cuisine', true)
            .addField('Bonus', '10-12 croquettes dans la gamelle à tubes')
            .addField('Délai', 'Après 1 heure (habitude donnée par le maître)', true)
            .addField('Emplacement', 'Dans la chambre de mon maître', true)
            .setColor(0xFF9933)
            .setDescription('RATION BI-QUOTIDIENNE')
            .setThumbnail("https://i.imgur.com/3fr7bPQ.png")
            .setImage("https://i.imgur.com/UAcmbPp.jpg")
            .setFooter('Pour plus d\'informations sur le remplissage des pots, contact mon maître @Entropy#0559.')
        return message;
    }

    static getPmMessage(embed) {
        let message = embed
            .addField('Feeding time!', 'Miaou @everyone, c\'est l\'heure de ma ration de croquette du soir. :smirk_cat:')
            .addField('Dose', '1 pot', true)
            .addField('Quantité', '~20 grammes', true)
            .addField('Emplacement', 'Dans la cuisine', true)
            .addField('Bonus', '10-12 croquettes dans la gamelle à tubes')
            .addField('Délai', 'Pas de délai', true)
            .addField('Emplacement', 'Dans la chambre de mon maître', true)
            .setColor(0xFF9933)
            .setDescription('RATION BI-QUOTIDIENNE')
            .setThumbnail("https://i.imgur.com/3fr7bPQ.png")
            .setImage("https://i.imgur.com/UAcmbPp.jpg")
            .setFooter('Pour plus d\'informations sur le remplissage des pots, contact mon maître @Entropy#0559.')
        return message;
    }
}


