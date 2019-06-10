const Discord = require("discord.js");

module.exports.run = async (bot, message, args, messages) => {

  const deleteCount = parseInt(args[0], 10);
  if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("No no no.");
    if (!args[0] || args[0 == "help"]) return message.reply(`Please Usage: !prefix <new prefix here>"`);
    
    if(!deleteCount || deleteCount < 1 || deleteCount > 100)
      return message.reply("Please provide a number between 1 and 100 for the number of messages to delete.");
   
    const fetched = await message.channel.fetchMessages({limit: deleteCount});
    message.channel.bulkDelete(fetched)
      .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
  
  let purgeEmbed = new Discord.RichEmbed()
    .setAuthor("Purge Report")
    .setColor("RED")
    .addField("User", `<@${message.author.id}>`)
    .addField("Channel", message.channel)
    .addField("Messages", `${args[0]} Messages`)
    .addField("Time", message.createdAt)
    .setFooter("Bot Version 1.1.0", bot.user.displayAvatarURL);

    let purgeChannel = message.guild.channels.find(c => c.name === "bot-log");
    if(!purgeChannel) return message.channel.send("Can't find mod-logs channel.");

    purgeChannel.send(purgeEmbed);

}

module.exports.help = {
  name:"purge"
}
