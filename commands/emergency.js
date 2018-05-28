module.exports = class Emergency {

    static action(message) {
        let emergency =   '@everyone CONTACT :\n\nLe maître : **@Entropy#0559**\n\n' +
                            'La clinique vétérinaire actuelle :\n' +
                            '**Clinique Vétérinaire de la Vallée**\n86 Rue du Général Leclerc, 95120 Ermont\n01 34 14 40 40\n\n' +
                            '**=========== EN CAS D\'URGENCES ===========**\n' +
                            'https://www.vetoadom.com/veterinaire-de-garde/95\n' +
                            '**=======================================**'
        message.channel.send(emergency)
    }
}