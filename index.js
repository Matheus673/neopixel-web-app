require('dotenv').config();
const Discord = require('discord.js');
const bot = new Discord.Client();
bot.commands = new Discord.Collection();
const botCommands = require('./commands');

const five = require('johnny-five');
const pixel = require('node-pixel');

const opts = {};

const board = new five.Board(opts);
let strip = null;

board.on('ready', function() {
    console.log('Board is ready.')

    strip = new pixel.Strip({
      data: 6,
      length: 216, // number of pixels in the strip.
      board: this,
      controller: 'FIRMATA'
    });

    strip.on('ready', function() {
      console.log('Strip ready.');
    });

  });

Object.keys(botCommands).map(key => {
    bot.commands.set(botCommands[key].name, botCommands[key]);
});

const TOKEN = process.env.TOKEN;

bot.login(TOKEN);
bot.on('ready', () => {
    console.info(`Logged in as ${bot.user.tag}!`);
});

bot.on('message', msg => {
    const args = msg.content.split(/ +/);
    const command = args.shift();
    console.info(`Called command: ${command}`);

    if (!bot.commands.has(command)) return;

    try {
        bot.commands.get(command).execute(msg, args, strip);
    } catch (error) {
        console.error(error);
        msg.reply('there was an error trying to execute that command!');
    }
});