module.exports = {
  name: "play",
  aliases: ["p"],
  cooldown: 10,
  description: "Play a track",
  enabled: true,
  execute: (client, message, args) => {
    const voice = message.member.voice;
    if (!voice)
      return message.reply({
        embeds: [
          {
            color: 0x2c2c2c,
            description: "මෝඩයෙක්! පළමුව හඬ නාලිකාවකට සම්බන්ධ වන්න!",
          },
        ],
      });
    const query = args.join(" ");
    if (!query) return message.reply("No query found!");
    client.distube.play(voice.channel, query, {
      member: message.member,
      textChannel: message.channel,
      message,
    });
  },
};
