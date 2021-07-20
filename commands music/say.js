// client.channels.cache.get('CHANNEL ID').send('Hello here!')

const Discord = module.require("discord.js");
const fs = require("fs");

module.exports.run = async (client,message,args) => {

	if (message.member.hasPermission('MANAGE_MESSAGES')){ // Делаем проверку, что-бы не все могли использовать эту команду, смогут только те, кто может удалять сообщения на сервере
		let sms = args.join(" "); // Считываем то, что хотим отправить!
	    message.channel.bulkDelete(1); // Удаляем сообщение с командой
		message.channel.send(sms); // Отправляем сообщение
		console.log(`Пользователь ${message.author.username} отправил через say: ${args.join(" ")}`); // Пишем в консоль о том, что кто-то написал сообщение через бота)
	}else {
		const adminerr2 = new Discord.MessageEmbed() // Если права нет, то пишем это
            .setColor('#fc5184')
            .setTitle(`${message.author.username}, вы не имеете прав на эту команду!`)
            .setAuthor(message.guild.name)
            .setFooter('Ваш бот bot © 2021')
        message.channel.send(adminerr2) // Отправка ошибки
	}
};

module.exports.help = {
    name: "го" // Название команды
};