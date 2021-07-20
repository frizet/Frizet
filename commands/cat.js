const Discord = require('discord.js') // подключение discord.js к файлу
const fetch = require('node-fetch')

module.exports.run = (client, message, args) => {
    let res = fetch('https://some-random-api.ml/img/cat/') //Извлекаем json от сайта
        .then(res => res.json()) // Просматриваем текст
        .then(json => {
            const embed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setTitle(`${message.guild.name}, лисички :)`)
                .setImage(json.link) // Ставим лисичку картинкой!
            message.channel.send(embed); // Отсылаем сообщение
        });
}
module.exports.help = {
    name: 'cat' // название команды
}
