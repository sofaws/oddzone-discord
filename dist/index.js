'use strict';

var _Party = require('./Party');

var _Party2 = _interopRequireDefault(_Party);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Discord = require("discord.js");
var client = new Discord.Client();

client.on('ready', function () {
    console.log('Logged in as ' + client.user.tag + '!');
});

var AllParty = [];

client.on('message', function (msg) {
    if (msg.channel.type === 'dm') {
        if (_Party2.default.waitNumbers(AllParty, msg.author.id) !== -1) {
            waitNumbers(msg);
        } else if (_Party2.default.waitNumbersInCounter(AllParty, msg.author.id) !== -1) {
            waitNumbersInCounter(msg);
        }
    } else if (msg.content.includes('oddzone start')) {
        beginParty(msg);
    } else if (_Party2.default.waitFirstNumberOf(AllParty, msg.author.id) !== -1) {
        waitFirstNumber(msg);
    }
});

function beginParty(msg) {
    if (_Party2.default.VerifyAdversary(msg.mentions)) {
        var party = new _Party2.default(msg.author.id, msg.mentions.users.values().next().value.id, msg.content.split('<@' + msg.mentions.users.values().next().value.id + '>')[1], msg.channel.id);
        if (party.ifAlreadyOnParty(AllParty)) {
            msg.reply('Toi ou/et ton adversaire avez d\xE9ja une partie en cours ! <@' + party.adversary + '>');
        } else if (!party.defi) {
            msg.reply('C\'est courageux de jouer, avec un defi c\'est mieux ;)');
        } else {
            AllParty.push(party);
            msg.reply('La partie commence ! Donne un chiffre <@' + party.adversary + '>');
        }
    } else {
        msg.reply('Impossible de jouer avec ce joueur !');
    }
}

function waitFirstNumber(msg) {
    var party = AllParty[_Party2.default.waitFirstNumberOf(AllParty, msg.author.id)];
    var enjeu = 'On rappelle l\'enjeu en cas de d\xE9faite: ' + party.defi + ' :O';
    if (isNaN(msg.content)) {
        msg.reply('Un nombre petit con!');
    } else if (msg.content > 10) {
        party.number = msg.content;
        party.state = "WAIT_NUMBERS";
        msg.reply('Pas de grosse ball mais ça se joue! Envoyez moi votre chiffre par mp ;) ' + enjeu);
    } else {
        party.number = msg.content;
        party.state = "WAIT_NUMBERS";
        msg.reply('Le courage à l\'état pur ! Envoyez moi votre chiffre par mp ;) ' + enjeu);
    }
}

function waitNumbers(msg) {
    var party = AllParty[_Party2.default.waitNumbers(AllParty, msg.author.id)];
    if (isNaN(msg.content)) {
        msg.reply('Un nombre petit con!');
    } else if (msg.content > party.number) {
        client.channels.get(party.channel).send('<@' + msg.author.id + '> essaie de tricher et donne un chiffre hors limite :O, on attends tous qu\'il recommence...!');
    } else if (!party.response) {
        party.response = msg.content;
        client.channels.get(party.channel).send('Et de un !');
    } else {
        if (party.response === msg.content) {
            client.channels.get(party.channel).send('<@' + party.adversary + '> est dans le mal, les deux ont donn\xE9 un ' + msg.content + '. Il doit respecter le d\xE9fi : ' + party.defi + ' ');
            party.state = "END";
        } else {
            if (party.number <= 10) {
                party.state = "COUNTER";
                party.response = null;
                client.channels.get(party.channel).send(' un ' + msg.content + ' et un ' + party.response + ' \xE7a ne colle pas ! Mais <@' + party.adversary + '> a le droit \xE0 un contre car il a port\xE9 ses couilles !! J\'attends vos nouveaux nombres en MP!');
            } else {
                party.state = "END";
                client.channels.get(party.channel).send('<@' + party.adversary + '> s\'en sort bien ! un ' + msg.content + ' et un ' + party.response + ' \xE7a ne colle pas ! ');
            }
        }
    }
}

function waitNumbersInCounter(msg) {
    var party = AllParty[_Party2.default.waitNumbersInCounter(AllParty, msg.author.id)];
    if (isNaN(msg.content)) {
        msg.reply('Un nombre petit con!');
    } else if (msg.content > party.number) {
        client.channels.get(party.channel).send('<@' + msg.author.id + '> essaie de tricher et donne un chiffre hors limite :O, on attends tous qu\'il recommence...!');
    } else if (!party.response) {
        party.response = msg.content;
        client.channels.get(party.channel).send('Et de un pour le contre!');
    } else {
        if (party.response === msg.content) {
            client.channels.get(party.channel).send('<@' + party.owner + '> est dans le mal, les deux ont donn\xE9 un ' + msg.content + ' lors du contre. Il doit respecter le d\xE9fi : ' + party.defi + ' ');
            party.state = "END";
        } else {
            party.state = "END";
            client.channels.get(party.channel).send('<@' + party.owner + '> s\'en sort bien, le contre aurait pu faire mal ! un ' + msg.content + ' et un ' + party.response + ' \xE7a ne colle pas ! ');
        }
    }
}
client.login('NDkxOTQ3NDA1NTM3ODM3MDU2.DoPRgA.jrHROt9tsZl60ez3rgjvtDzsVNo');