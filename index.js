require('dotenv').config();
const token = "ODM5NDk0MTk3MjEyMjE3Mzc1.YJKd5Q.8VBE_kbrRPsHW-0vZmWpVzus7YI"

const { CommandoClient } = require('discord.js-commando'),
    client = new CommandoClient({
        commandPrefix: "-",
        owner: process.env.owner,
        invite: 'https://dsc.gg/zews-bypasser',
    }),
    path = require('path');
let status = 1;
function statusSwitch() {
    if (status == 1) {
        status = 2;
        client.user.setActivity(`${process.env.prefix}bypass`, {type: "LISTENING"});
    } else if (status == 2) {
        status = 1;
        client.user.setActivity(client.guilds.cache.size + " guilds", {
            type: "WATCHING"
        });
    }
}

client.once("ready", () => {
    console.log("Ready!");
    statusSwitch()
    setInterval(() => statusSwitch(), 60000)
});

client.on('error', error => {
    console.warn('bot crashed due to ' + error)
});

client.registry
    .registerDefaultTypes()
    .registerDefaultGroups()
    .registerDefaultCommands({
        help: false,
        ping: false
    })
    .registerGroups([
        ['info', 'Information about the bot.'],
        ['bypass', 'The command to bypass links.']
    ])
    .registerCommandsIn(path.join(__dirname, 'commands'));

client.login(token);