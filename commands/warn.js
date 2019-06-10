const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));

module.exports.run = async (bot, message, args) => {

  if(!message.member.hasPermission("MANAGE_NICKNAMES")) return message.reply("No can do pal!");
  let wUser = message.mentions.members.first();
  if(!wUser) return message.reply("Can not find that a user with that name.");
  if(wUser.hasPermission("MANAGE_MESSAGES")) return message.reply("You are not able to warn them as they have the same or higher rank then you.");
  let reason = args.slice(1).join(" ");

  if(!warns[wUser.id]) warns[wUser.id] = {
    warns: 0
  };

  warns[wUser.id].warns++;

  fs.writeFile("./warnings.json", JSON.stringify(warns), (err) => {
    if (err) console.log(err)
  });

  let warnEmbed = new Discord.RichEmbed()
  .setDescription("Warns")
  .setAuthor(message.author.username)
  .setColor("RED")
  .addField("Warned User", `<@${wUser.id}>`)
  .addField("Warned In", message.channel)
  .addField("Number of Warnings", warns[wUser.id].warns)
  .addField("Reason", reason);

  let warnchannel = message.guild.channels.find(c => c.name === "557418986417946635");
  if(!warnchannel) return message.reply("Couldn't find channel named 'bot-log'");

  wUser.message.send("You have been warned in ValidHC Discord for: ('reason')");
  warnchannel.send(warnEmbed);

  if(warns[wUser.id].warns == 2){
    let muterole = message.guild.roles.find(r => r.name === "muted");
    if(!muterole) return message.reply("You should create that role dude.");

    let mutetime = "10s";
    await(wUser.addRole(muterole.id));
    message.channel.send(`<@${wUser.id}> has been temporarily muted`);

    setTimeout(function(){
      wUser.removeRole(muterole.id)
      message.reply(`<@${wUser.id}> has been unmuted.`)
    }, ms(mutetime))
  }
  if(warns[wUser.id].warns == 3){
    message.guild.member(wUser).ban(reason);
    message.reply(`<@${wUser.id}> has been banned.`)
  }

}

module.exports.help = {
  name: "warn"
}
