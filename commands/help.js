module.exports = {
  name: "help",
  aliases: ["h"],
  cooldown: 10,
  description: "Show all commands",
  enabled: true,
  execute: (client, message) => {
    const commands = client.commands.filter((command) => command.enabled);
    message.reply({
      embeds: [
        {
          color: 0xab93b4,
          title: "Rhyme Help",
          description: "List of all commands",
          thumbnail: {
            url: client.user.displayAvatarURL({ dynamic: true }),
          },
          fields: commands.map((command) => ({
            name: `**${client.prefix}${command.name}**`,
            value: command.description,
            inline: true,
          })),
        },
      ],
    });
  },
};
