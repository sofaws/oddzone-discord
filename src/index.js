import Party from './Party';
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
            msg.reply(`Toi ou/et ton adversaire avez déja une partie en cours ! <@${party.adversary}>`);
        } else if(!party.defi) {
            msg.reply(`C'est courageux de jouer, avec un defi c'est mieux ;)`);
        }
        else {
            AllParty.push(party);
            msg.reply(`La partie commence ! Donne un chiffre <@${party.adversary}>`);
        }
    }
    else {
        msg.reply('Impossible de jouer avec ce joueur !');
    }
}

function waitFirstNumber(msg) {
    const party = AllParty[Party.waitFirstNumberOf(AllParty, msg.author.id)];
    const enjeu = `On rappelle l'enjeu en cas de défaite: ${party.defi} :O`;
    if (isNaN(msg.content)) {
        msg.reply( 'Un nombre petit con!');
    } else if(msg.content > 10) {
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
    const party = AllParty[Party.waitNumbers(AllParty, msg.author.id)];
    console.log(party.number);
    console.log(msg.content);
    if (isNaN(msg.content)) {
        msg.reply('Un nombre petit con!');
    }
    else if (parseInt(msg.content) > parseInt(party.number)) {
        client.channels.get(party.channel).send(`<@${msg.author.id}> essaie de tricher et donne un chiffre hors limite :O, on attends tous qu'il recommence...!`);
    } else if(!party.response) {
        party.response = msg.content;
        client.channels.get(party.channel).send(`Et de un !`);
    } else {
        if(party.response === msg.content) {
            client.channels.get(party.channel).send(`<@${party.adversary}> est dans le mal, les deux ont donné un ${msg.content}. Il doit respecter le défi : ${party.defi} `);
            party.state = "END";
            AllParty.splice(Party.waitNumbers(AllParty, msg.author.id), 1);
        } else {
            if(party.number <= 10) {
                party.state = "COUNTER";
                client.channels.get(party.channel).send(` un ${msg.content} et un ${party.response} ça ne colle pas ! Mais <@${party.adversary}> a le droit à un contre car il a porté ses couilles !! J'attends vos nouveaux nombres en MP!`);
                party.response = null;
            } else {
                party.state = "END";
                AllParty.splice(Party.waitNumbers(AllParty, msg.author.id), 1);
                client.channels.get(party.channel).send(`<@${party.adversary}> s'en sort bien ! un ${msg.content} et un ${party.response} ça ne colle pas ! `);
            }
        }
    }
}


function waitNumbersInCounter(msg) {
    const party = AllParty[Party.waitNumbersInCounter(AllParty, msg.author.id)];
    if (isNaN(msg.content)) {
        msg.reply('Un nombre petit con!');
    }
    else if (parseInt(msg.content) > parseInt(party.number)) {
        client.channels.get(party.channel).send(`<@${msg.author.id}> essaie de tricher et donne un chiffre hors limite :O, on attends tous qu'il recommence...!`);
    } else if(!party.response) {
        party.response = msg.content;
        client.channels.get(party.channel).send(`Et de un pour le contre!`);
    } else {
        if(party.response === msg.content) {
            client.channels.get(party.channel).send(`<@${party.owner}> est dans le mal, les deux ont donné un ${msg.content} lors du contre. Il doit respecter le défi : ${party.defi} `);
            party.state = "END";
            AllParty.splice(Party.waitNumbers(AllParty, msg.author.id), 1);
        } else {
                party.state = "END";
            AllParty.splice(Party.waitNumbers(AllParty, msg.author.id), 1);
            client.channels.get(party.channel).send(`<@${party.owner}> s'en sort bien, le contre aurait pu faire mal ! un ${msg.content} et un ${party.response} ça ne colle pas ! `);
        }
    }
}
client.login('NDkxOTQ3NDA1NTM3ODM3MDU2.DoPRgA.jrHROt9tsZl60ez3rgjvtDzsVNo');