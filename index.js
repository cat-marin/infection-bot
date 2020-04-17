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
    if (message.guild.members.cache.get(author).roles.cache.get(infection)) return;
    if (message.guild.members.cache.get(member.id).roles.cache.get(infection)) {
        let chance = Math.random() * 100;
        if (chance <= 100) {
              await(message.guild.members.cache.get(author).roles.add(infection));
              message.channel.send(`<@${author}> has been infected!`);
        };
    }
}

async function giveInfectionFunction(message) {
    let pingee = message.mentions.users.first();
    if(!pingee) return;
    let infection = config.infectionRoleID;
    if(message.guild.members.cache.get(pingee.id).roles.cache.get(infection)) return;
    if(message.member.roles.cache.get(infection)) {
        let chance = Math.random() * 100;
        if (chance <= 100) {
            await(message.guild.members.cache.get(pingee.id).roles.add(infection));
            message.channel.send(`<@${pingee.id}> has been infected by <@${message.author.id}>!`);
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
