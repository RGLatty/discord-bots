const Discord = require('discord.js');

exports.run = async (client, message, args, tools) => {

    if (!message.member.roles.find(r => r.name === 'Manager', 'Owner')) return message.channel.send('This requires the role: roleName');
    if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('This requires the permission: ADMINISTRATOR');
    if (!args[0]) return message.channel.send('Proper Usage: !poll <question>');

    const embed = new Discord.RichEmbed()
        .setColor("BLUE")
        .setFooter(`Poll created by ${message.author.username}`)
        .setDescription(args.join(' '))
        .setTitle('Poll');

    let everyone = message.channel.send("@everyone");
    let msg = await message.channel.send(embed);

    await msg.react('✅'); 
    await msg.react('❌');

    message.delete({timeout: 1000}); // This waits 1000 milliseconds before deleting (1 second)

} 
module.exports.help = {
  name: "poll"
}
