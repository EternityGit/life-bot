module.exports = class Treatment {
    static getFleaTreatmentMessage(embed, product) {
        var message;

        if (product == "Broadline") {
            message = embed
                .addField('Traitement anti-puces ' + product, 'Miaou @everyone, c\'est le moment de me mettre le traitement anti-puce **' + product + '**.:smirk_cat:')
                .addField('Dose', '1 pipette', true)
                .addField('Emplacement', 'Entre les omoplates', true)
                .setColor(0x51E530)
                .setDescription('TRAITEMENT BI-HEBDOMADAIRE')
                .setThumbnail("https://i.imgur.com/dbxPYyL.png")
                .setImage("https://i.imgur.com/VOC0cBq.png")
                .setFooter("Consulte !planning pour les prochains traitement !")
            return message;
        }
        message = embed
            .addField('Soin hygiénique ' + product, 'Miaou @everyone, c\'est l\'heure de me mettre l\'huile essentiel **' + product + '**.:smirk_cat:')
            .addField('Dose', '1 pipette', true)
            .addField('Emplacement', 'Entre les omoplates', true)
            .setColor(0x51E530)
            .setDescription('TRAITEMENT BI-HEBDOMADAIRE')
            .setThumbnail("https://i.imgur.com/lcqR325.png")
            .setImage("https://i.imgur.com/rMgyigz.png")
            .setFooter("Consulte !planning pour les prochains traitement !")
        return message;
    }
}