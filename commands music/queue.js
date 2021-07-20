const Discord = require('discord.js');

module.exports = {


    async run (bot, message, args) {
        if(!message.member.voice.channel) return message.reply('Please join a voice channel!'); //optional

        const queue = bot.distube.getQueue(message);

        await message.channel.send(`Current queue:\n${queue.songs.map((song, id) => `**${id + 1}**. ${song.name} - \`${song.formattedDuration}\``).slice(0, 10).join('\n')}`);
    }
}
module.exports.help = {
    name: "queue",
    aliases: ['q'],
    description: "check queue",
};