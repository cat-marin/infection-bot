#!/usr/bin/env node
const Discord = require("discord.js");
const bot = new Discord.Client();
var token = require("./token.json");
var config = require("./config.json");

async function getInfectedFunction(message) {
    let author = message.author.id;
    let member = message.mentions.users.first();
    if(!member) return;
    let infection = config.infectionRoleID;
    if (message.guild.members.get(author).roles.has(infection)) return;
    if (message.guild.members.get(member.id).roles.has(infection)) {
        let chance = Math.random() * 100;
        if (chance <= 100) {
              await(message.member.addRole(infection));
              message.channel.send(`This user is now infected!`);
        };
    }
}

async function giveInfectionFunction(message) {
    let pingee = message.mentions.users.first();
    if(!pingee) return;
    let infection = config.infectionRoleID;
    if(message.guild.members.get(pingee.id).roles.has(infection)) return;
    if(message.member.roles.has(infection)) {
        let chance = Math.random() * 100;
        if (chance <= 100) {
            await(message.guild.members.get(pingee.id).addRole(infection));
            message.channel.send(`You infected another user!`);
        };
    }
}

bot.on("ready", () => {
    console.log(`logged in as ${bot.user.tag}`);
    console.log(`https://discordapp.com/api/oauth2/authorize?client_id=${bot.user.id}&permissions=0&scope=bot`);
});

bot.on("message", message => {
  if (message.channel.type === "dm") return;
  if (message.author.type === "bot") return;
  giveInfectionFunction(message);
  getInfectedFunction(message);
});

bot.on("error", console.error);

bot.login(`${token.token}`);
