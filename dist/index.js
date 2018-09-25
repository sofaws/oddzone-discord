"use strict";

var _Party = require("./Party");

var _Party2 = _interopRequireDefault(_Party);

var _StringUtils = require("src/utils/StringUtils");

var _StringUtils2 = _interopRequireDefault(_StringUtils);

var _string = require("src/constants/string");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Discord = require("discord.js");
var client = new Discord.Client();

client.on('ready', function () {
    console.log("Logged in as " + client.user.tag + "!");
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
        var party = new _Party2.default(msg.author.id, msg.mentions.users.values().next().value.id, msg.content.split("<@" + msg.mentions.users.values().next().value.id + ">")[1], msg.channel.id);
        if (party.ifAlreadyOnParty(AllParty)) {
            msg.reply(_StringUtils2.default.format(_StringUtils2.default.random(_string.BEGIN_PARTY.ALREADY_IN_GAME), { adversary: party.adversary }));
        } else if (!party.defi) {
            msg.reply(_StringUtils2.default.random(_string.BEGIN_PARTY.WITHOUT_DEFI));
        } else {
            AllParty.push(party);
            msg.reply(_StringUtils2.default.format(_StringUtils2.default.random(_string.BEGIN_PARTY.GIVE_NUMBER), { adversary: party.adversary }));
        }
    } else {
        msg.reply(_StringUtils2.default.random(_string.BEGIN_PARTY.IMPOSSIBLE));
    }
}

function waitFirstNumber(msg) {
    var party = AllParty[_Party2.default.waitFirstNumberOf(AllParty, msg.author.id)];
    var enjeu = _StringUtils2.default.format(_StringUtils2.default.random(_string.WAIT_FIRST_NUMBER.ENJEU), { defi: party.defi });
    if (isNaN(msg.content)) {
        msg.reply(_StringUtils2.default.random(_string.COMMONS.A_NUMBER));
    } else if (msg.content > 10) {
        party.number = msg.content;
        party.state = "WAIT_NUMBERS";
        msg.reply(_StringUtils2.default.random(_string.WAIT_FIRST_NUMBER.NOT_LITTLE_NUMBER) + enjeu);
    } else {
        party.number = msg.content;
        party.state = "WAIT_NUMBERS";
        msg.reply(_string.WAIT_FIRST_NUMBER.LITTLE_NUMBER + enjeu);
    }
}

function waitNumbers(msg) {
    var party = AllParty[_Party2.default.waitNumbers(AllParty, msg.author.id)];
    console.log(party.number);
    console.log(msg.content);
    if (isNaN(msg.content)) {
        msg.reply(_StringUtils2.default.random(_string.COMMONS.A_NUMBER));
    } else if (parseInt(msg.content) > parseInt(party.number)) {
        client.channels.get(party.channel).send(_StringUtils2.default.format(_StringUtils2.default.random(_string.COMMONS.CHEAT), { author: msg.author.id }));
    } else if (!party.response) {
        party.response = msg.content;
        client.channels.get(party.channel).send(_StringUtils2.default.random(_string.WAIT_NUMBERS.ONE_NUMBER_GIVE));
    } else {
        if (party.response === msg.content) {
            client.channels.get(party.channel).send(_StringUtils2.default.format(_StringUtils2.default.random(_string.WAIT_NUMBERS.WIN), { adversary: party.adversary, defi: party.defi }));
            party.state = "END";
            AllParty.splice(_Party2.default.waitNumbers(AllParty, msg.author.id), 1);
        } else {
            if (party.number <= 10) {
                party.state = "COUNTER";
                client.channels.get(party.channel).send(_StringUtils2.default.format(_StringUtils2.default.random(_string.WAIT_NUMBERS.LOSE_BUT_COUNTER), { content: msg.content, response: party.response, adversary: party.adversary }));
                party.response = null;
            } else {
                party.state = "END";
                AllParty.splice(_Party2.default.waitNumbers(AllParty, msg.author.id), 1);
                client.channels.get(party.channel).send(_StringUtils2.default.format(_StringUtils2.default.random(_string.WAIT_NUMBERS.LOSE), { content: msg.content, response: party.response, adversary: party.adversary }));
            }
        }
    }
}

function waitNumbersInCounter(msg) {
    var party = AllParty[_Party2.default.waitNumbersInCounter(AllParty, msg.author.id)];
    if (isNaN(msg.content)) {
        msg.reply(_StringUtils2.default.random(_string.COMMONS.A_NUMBER));
    } else if (parseInt(msg.content) > parseInt(party.number)) {
        client.channels.get(party.channel).send(_StringUtils2.default.format(_StringUtils2.default.random(_string.COMMONS.CHEAT), { author: msg.author.id }));
    } else if (!party.response) {
        party.response = msg.content;
        client.channels.get(party.channel).send(_StringUtils2.default.random(_string.WAIT_NUMBERS_COUNTER.ONE_NUMBER_GIVE));
    } else {
        if (party.response === msg.content) {
            client.channels.get(party.channel).send(_StringUtils2.default.format(_StringUtils2.default.random(_string.WAIT_NUMBERS_COUNTER.WIN), { content: msg.content, owner: party.owner, defi: party.defi }));
            party.state = "END";
            AllParty.splice(_Party2.default.waitNumbers(AllParty, msg.author.id), 1);
        } else {
            party.state = "END";
            AllParty.splice(_Party2.default.waitNumbers(AllParty, msg.author.id), 1);
            client.channels.get(party.channel).send(_StringUtils2.default.format(_StringUtils2.default.random(_string.WAIT_NUMBERS_COUNTER.LOSE), { content: msg.content, owner: party.owner, response: party.response }));
        }
    }
}
client.login('NDkxOTQ3NDA1NTM3ODM3MDU2.DoPRgA.jrHROt9tsZl60ez3rgjvtDzsVNo');