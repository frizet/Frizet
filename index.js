const Discord = require('discord.js')
const fs = require('fs') // подключаем fs к файлу
const client = new Discord.Client()
const config = require('./config.json')
const fetch = require('node-fetch')
client.commands = new Discord.Collection() // создаём коллекцию для команд



fs.readdir('./commands', (err, files) => { // чтение файлов в папке commands
    if (err) console.log(err)

    let jsfile = files.filter(f => f.split('.').pop() === 'js') // файлы не имеющие расширение .js игнорируются
    if (jsfile.length <= 0) return console.log('Команды не найдены!') // если нет ни одного файла с расширением .js

    console.log(`Загружено ${jsfile.length} команд`)
    jsfile.forEach((f, i) => { // добавляем каждый файл в коллекцию команд
        let props = require(`./commands/${f}`)
        client.commands.set(props.help.name, props)
    })
})



fs.readdir('./commands music', (err, files) => { // чтение файлов в папке commands
    if (err) console.log(err)

    let jsfile = files.filter(f => f.split('.').pop() === 'js') // файлы не имеющие расширение .js игнорируются
    if (jsfile.length <= 0) return console.log('Команды не найдены!') // если нет ни одного файла с расширением .js

    console.log(`Загружено ${jsfile.length} команд`)
    jsfile.forEach((f, i) => { // добавляем каждый файл в коллекцию команд
        let props = require(`./commands music/${f}`)
        client.commands.set(props.help.name, props)
    })
})




client.on('ready', () => {
    const umnie = 'Бот готов!'
    console.log(umnie)
  const dbOptions = {
    keepAlive: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    }
    .setMongoPath(process.env.MONGO_URI)
})



client.on('ready', () => {
    console.log(`Бот ${client.user.username} запустился`);
})

client.on('message', message => {
    let prefix = config.prefix
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    let messageArray = message.content.split(' ') // разделение пробелами
    let command = messageArray[0] // команда после префикса
    let args = messageArray.slice(1) // аргументы после команды

    let command_file = client.commands.get(command.slice(prefix.length)) // получение команды из коллекции
    if (command_file) command_file.run(client, message, args, prefix)
})

const distube = require('distube');
client.distube = new distube(client, { searchSongs: false, emitNewSongOnly: true })
client.distube
    .on('playSong', (message, queue, song) => message.channel.send(
        `Playing \`${song.name}\` - \`${song.formattedDuration}\`\nRequested by: ${song.user}`,
    ))
    .on('addSong', (message, queue, song) => message.channel.send(
        `Added ${song.name} - \`${song.formattedDuration}\` to the queue by ${song.user}`,
    ))
    .on('error', (message, e) => {
        //console.error(e)
        message.channel.send(`An error encountered: ${e}`)
    })

client.on('ready', () => {
    console.log(`Bot is ready`);
    client.user.setPresence({
        status: 'idle',
        activity: {
            type: 'PLAYING',
            name: '%помощь',
        },
    });
});




client.login(config.token)



