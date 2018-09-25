import Party from './Party';
import S from "./utils/StringUtils";
import {BEGIN_PARTY, COMMONS, WAIT_FIRST_NUMBER, WAIT_NUMBERS, WAIT_NUMBERS_COUNTER} from "./constants/string";
const Discord = require("discord.js");
const client = new Discord.Client();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

const AllParty = [];

client.on('message', msg => {
    if(msg.channel.type === 'dm') {
        if(Party.waitNumbers(AllParty, msg.author.id) !== -1) {
            waitNumbers(msg);
        } else if(Party.waitNumbersInCounter(AllParty, msg.author.id) !== -1) {
            waitNumbersInCounter(msg);
        }
    }
    else if (msg.content.includes('oddzone start')) {
        beginParty(msg);
    } else if(Party.waitFirstNumberOf(AllParty, msg.author.id) !== -1) {
      waitFirstNumber(msg);
    }
});


function beginParty(msg) {
    if (Party.VerifyAdversary(msg.mentions)) {
        const party = new Party(msg.author.id, msg.mentions.users.values().next().value.id, msg.content.split(`<@${msg.mentions.users.values().next().value.id}>`)[1], msg.channel.id);
        if (party.ifAlreadyOnParty(AllParty)) {
            msg.reply(S.format(S.random(BEGIN_PARTY.ALREADY_IN_GAME), { adversary: party.adversary }));
        } else if(!party.defi) {
            msg.reply(S.random(BEGIN_PARTY.WITHOUT_DEFI));
        }
        else {
            AllParty.push(party);
            msg.reply(S.format(S.random(BEGIN_PARTY.GIVE_NUMBER), { adversary: party.adversary }));
        }
    }
    else {
        msg.reply(S.random(BEGIN_PARTY.IMPOSSIBLE));
    }
}

function waitFirstNumber(msg) {
    const party = AllParty[Party.waitFirstNumberOf(AllParty, msg.author.id)];
    const enjeu = S.format(S.random(WAIT_FIRST_NUMBER.ENJEU), { defi: party.defi });
    if (isNaN(msg.content)) {
        msg.reply(S.random(COMMONS.A_NUMBER));
    } else if(msg.content > 10) {
        party.number = msg.content;
        party.state = "WAIT_NUMBERS";
        msg.reply(S.random(WAIT_FIRST_NUMBER.NOT_LITTLE_NUMBER) + enjeu);
    } else {
        party.number = msg.content;
        party.state = "WAIT_NUMBERS";
        msg.reply(WAIT_FIRST_NUMBER.LITTLE_NUMBER + enjeu);
    }
}

function waitNumbers(msg) {
    const party = AllParty[Party.waitNumbers(AllParty, msg.author.id)];
    console.log(party.number);
    console.log(msg.content);
    if (isNaN(msg.content)) {
        msg.reply(S.random(COMMONS.A_NUMBER));
    }
    else if (parseInt(msg.content) > parseInt(party.number)) {
        client.channels.get(party.channel).send( S.format(S.random(COMMONS.CHEAT), { author: msg.author.id }));
    } else if(!party.response) {
        party.response = msg.content;
        client.channels.get(party.channel).send(S.random(WAIT_NUMBERS.ONE_NUMBER_GIVE));
    } else {
        if(party.response === msg.content) {
            client.channels.get(party.channel).send(S.format(S.random(WAIT_NUMBERS.WIN), { adversary: party.adversary, defi: party.defi }));
            party.state = "END";
            AllParty.splice(Party.waitNumbers(AllParty, msg.author.id), 1);
        } else {
            if(party.number <= 10) {
                party.state = "COUNTER";
                client.channels.get(party.channel).send(S.format(S.random(WAIT_NUMBERS.LOSE_BUT_COUNTER), { content: msg.content, response: party.response, adversary: party.adversary }));
                party.response = null;
            } else {
                party.state = "END";
                AllParty.splice(Party.waitNumbers(AllParty, msg.author.id), 1);
                client.channels.get(party.channel).send(S.format(S.random(WAIT_NUMBERS.LOSE), { content: msg.content, response: party.response, adversary: party.adversary }));
            }
        }
    }
}


function waitNumbersInCounter(msg) {
    const party = AllParty[Party.waitNumbersInCounter(AllParty, msg.author.id)];
    if (isNaN(msg.content)) {
        msg.reply(S.random(COMMONS.A_NUMBER));
    }
    else if (parseInt(msg.content) > parseInt(party.number)) {
        client.channels.get(party.channel).send( S.format(S.random(COMMONS.CHEAT), { author: msg.author.id }));
    } else if(!party.response) {
        party.response = msg.content;
        client.channels.get(party.channel).send(S.random(WAIT_NUMBERS_COUNTER.ONE_NUMBER_GIVE));
    } else {
        if(party.response === msg.content) {
            client.channels.get(party.channel).send(S.format(S.random(WAIT_NUMBERS_COUNTER.WIN), { content: msg.content, owner: party.owner, defi: party.defi }));
            party.state = "END";
            AllParty.splice(Party.waitNumbers(AllParty, msg.author.id), 1);
        } else {
             party.state = "END";
            AllParty.splice(Party.waitNumbers(AllParty, msg.author.id), 1);
            client.channels.get(party.channel).send(S.format(S.random(WAIT_NUMBERS_COUNTER.LOSE), { content: msg.content, owner: party.owner, response: party.response }));
        }
    }
}
client.login('NDkxOTQ3NDA1NTM3ODM3MDU2.DoPRgA.jrHROt9tsZl60ez3rgjvtDzsVNo');