const Discord = require("discord.js");
const client = new Discord.Client();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

let waitFirstNumber = [];
let waitNumbers = [];
let numberChoose = [];
let inCounter = [];

client.on('message', msg => {
    if(msg.channel.type === 'dm') {
            if(waitNumbers[msg.author.id] ) {
                if (isNaN(msg.content)) {
                    client.channels.get(waitNumbers[msg.author.id].channel).send(`<@${msg.author.id}> Incapable de donner un nombre ce couillon, on attends tous qu'il recommence...!`);
                } else if (msg.content >= waitNumbers[msg.author.id].number) {
                    client.channels.get(waitNumbers[msg.author.id].channel).send(`<@${msg.author.id}> essaie de tricher et donne un chiffre hors limite :O, on attends tous qu'il recommence...!`);
                }else {
                    if(numberChoose[waitNumbers[msg.author.id].partyId]) {
                        if(msg.content === numberChoose[waitNumbers[msg.author.id].partyId].number) {
                            client.channels.get(waitNumbers[msg.author.id].channel).send(`<@${waitNumbers[msg.author.id].loser}> a perdu ! Pour rappel il doit : ${waitNumbers[msg.author.id].defi}`);
                            waitNumbers[numberChoose[waitNumbers[msg.author.id].partyId].author] = null;
                            numberChoose[waitNumbers[msg.author.id].partyId] = null;
                            waitNumbers[msg.author.id] = null;
                        } else if(waitNumbers[msg.author.id].number <= 10) {
                            inCounter[numberChoose[waitNumbers[msg.author.id].partyId].author] = { defi: waitNumbers[msg.author.id].defi, channel: waitNumbers[msg.author.id].channel, partyId: waitNumbers[msg.author.id].partyId, number: waitNumbers[msg.author.id].number, loser: waitNumbers[msg.author.id].winner};
                            inCounter[msg.author.id] = {defi: waitNumbers[msg.author.id].defi, channel: waitNumbers[msg.author.id].channel,  partyId: waitNumbers[msg.author.id].partyId, number: waitNumbers[msg.author.id].number, loser: waitNumbers[msg.author.id].winner};
                            client.channels.get(waitNumbers[msg.author.id].channel).send(`Avec un ${numberChoose[waitNumbers[msg.author.id].partyId].number} et un ${msg.content}, <@${waitNumbers[msg.author.id].loser}> peut se venger ! Renvoyez un mp pour le contre ! `);
                            waitNumbers[numberChoose[waitNumbers[msg.author.id].partyId].author] = null;
                            numberChoose[waitNumbers[msg.author.id].partyId] = null;
                            waitNumbers[msg.author.id] = null;
                        } else {
                            client.channels.get(waitNumbers[msg.author.id].channel).send(`Avec un ${numberChoose[waitNumbers[msg.author.id].partyId].number} et un ${msg.content}, <@${waitNumbers[msg.author.id].loser}> s'en sort bien ! `);
                            waitNumbers[numberChoose[waitNumbers[msg.author.id].partyId].author] = null;
                            numberChoose[waitNumbers[msg.author.id].partyId] = null;
                            waitNumbers[msg.author.id] = null;
                        }
                    } else {
                        numberChoose[waitNumbers[msg.author.id].partyId] = { author: msg.author.id, number: msg.content };
                        client.channels.get(waitNumbers[msg.author.id].channel).send('et de 1! On attends le choix du deuxième !');
                    }
                }
            } else if( inCounter[msg.author.id]) {
                console.log("ca rigole plus");
                if (isNaN(msg.content)) {
                    client.channels.get(inCounter[msg.author.id].channel).send(`<@${msg.author.id}> Incapable de donner un nombre ce couillon, on attends tous qu'il recommence...!`);
                } else if (msg.content >= inCounter[msg.author.id].number) {
                    client.channels.get(inCounter[msg.author.id].channel).send(`<@${msg.author.id}> essaie de tricher et donne un chiffre hors limite :O, on attends tous qu'il recommence...!`);
                }else {
                    if(numberChoose[inCounter[msg.author.id].partyId]) {
                        if(msg.content === numberChoose[inCounter[msg.author.id].partyId].number) {
                            client.channels.get(inCounter[msg.author.id].channel).send(`<@${inCounter[msg.author.id].loser}> a perdu son contre :O ! Pour rappel il doit : ${inCounter[msg.author.id].defi}`);
                        } else {
                            client.channels.get(waitNumbers[msg.author.id].channel).send(`Avec un ${numberChoose[inCounter[msg.author.id].partyId].number} et un ${msg.content} le contre n'est pas passé, <@${inCounter[msg.author.id].loser}> s'en sort bien ! `);
                        }
                        inCounter[numberChoose[waitNumbers[msg.author.id].partyId].author] = null;
                        inCounter[msg.author.id] = null;
                        waitNumbers[numberChoose[waitNumbers[msg.author.id].partyId].author] = null;
                        waitNumbers[msg.author.id] = null;
                    } else {
                        numberChoose[inCounter[msg.author.id].partyId] = { author: msg.author.id, number: msg.content };
                        client.channels.get(inCounter[msg.author.id].channel).send('et de 1! On attends le choix du deuxième !');
                    }
                }
            }
    }
    //Lancement d'une partie
    else if (msg.content.includes('oddzone start')) {
        if(msg.mentions.users.size === 1 && !msg.mentions.everyone) {
            const adversary = msg.mentions.users.values().next().value;
            const owner = msg.author.id;
            if(waitFirstNumber[adversary] || waitNumbers[adversary] || inCounter[adversary]) {
                msg.reply(`Ton adversaire a déja une partie en cours ! <@${adversary.id}>`);
            } else if(waitFirstNumber[owner] || waitNumbers[owner] || inCounter[adversary]) {
                msg.reply(`Tu as déja une partie en cours ! `);
            } else {
                const defi = msg.content.split(`<@${adversary.id}>`)[1];
                if(defi) {
                    waitFirstNumber[adversary.id] = {
                        owner,
                        defi,
                        channel: msg.channel.id
                    };
                    msg.reply(`La partie commence ! Donne un chiffre <@${adversary.id}>`);
                } else {
                    msg.reply(`C'est courageux de jouer, avec un defi c'est mieux ;)`);
                }
            }
        } else {
            msg.reply('Impossible de jouer avec ce joueur !');
        }
    } else if(waitFirstNumber[msg.author.id]) {
        const enjeu = `On rappelle l'enjeu en cas de défaite: ${waitFirstNumber[msg.author.id].defi} :O`
        if (isNaN(msg.content)) {
            msg.reply( 'Un nombre petit con! ' + enjeu);
        } else if(msg.content > 10) {
            party.number
            msg.reply('Pas de grosse ball mais ça se joue! Envoyez moi votre chiffre par mp ;) ' + enjeu);
        } else {
            waitNumbers[msg.author.id] = { winner: waitFirstNumber[msg.author.id].owner,loser: msg.author.id, defi: waitFirstNumber[msg.author.id].defi, channel: waitFirstNumber[msg.author.id].channel, number: msg.content, partyId: msg.author.id + waitFirstNumber[msg.author.id].owner};
            waitNumbers[waitFirstNumber[msg.author.id].owner] = { winner: waitFirstNumber[msg.author.id].owner, loser: msg.author.id, defi: waitFirstNumber[msg.author.id].defi, channel: waitFirstNumber[msg.author.id].channel, number: msg.content, partyId: msg.author.id + waitFirstNumber[msg.author.id].owner};
            waitFirstNumber[msg.author.id] = null;
            msg.reply('Le courage à l\'état pur ! Envoyez moi votre chiffre par mp ;) ' + enjeu);
        }
    }
});

client.login('NDkxOTQ3NDA1NTM3ODM3MDU2.DoPRgA.jrHROt9tsZl60ez3rgjvtDzsVNo');