const Discord = require('discord.js');

exports.run = async (client, message, args, tools) => {

    message.channel.send(`Server IP - validhc.com \nTeamspeak IP - ts.validhc.com`)

} 
module.exports.help = {
  name: "ip"
}
