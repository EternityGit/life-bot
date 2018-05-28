module.exports = class Care {

    static action(message) {
        let care = 'J\'ai besoin qu\'on m\'administre 2 produits :\n' +
        ' **Dermoscent :** Pour avoir un pelage soyeux, à déposer sur la peau entre mes omoplates (1 fois par mois). \n' +
        ' **Broadline :** Pour m\'aider contre les puces & les tiques, à déposer sur la peau entre les omoplates (1 fois par mois aussi).\n' +
        '_*Je dois avoir 1 produit sur 2 tous les 15 jours (alternativement).\n' +
        'Je n\'aime pas du tout ces produits donc si tu ne sais pas comment faire pour me les mettre sans que je panique trop, prends contact avec mon maître avec la commande !maitre*_'

        if (message.content.split(' ').length == 1) {
            message.channel.send(care)
        } else {
            let args = message.content.split(' ')
            username.shift()    
            message.channel.send(username.join('%20') + '\n' + care)
        }
    }
}