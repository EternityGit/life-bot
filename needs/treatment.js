module.exports = class Treatment {
    static getFleaTreatmentMessage(product) {
        if (product == "Broadline") {
            return 'Hey @everyone, c\'est l\'heure de me donner mon traitement anti-puce.\n\t**' + product + '**\n:smirk_cat:'
        }
        return 'Hey @everyone, c\'est l\'heure de me donner mon soin d\'huile essentiel\n\t**' + product + '**.\n:smirk_cat:'
    }
}
