module.exports = {
  name: "remove",
  aliases: ["r"],
  description: "Remove song from the queue!",
  cooldown: 2,
  enabled: true,
  execute: (client, message, args) => {
    const queue = client.distube.getQueue(message);
    if (!queue) return message.reply("ලබ්බද අයින් කරන්න කියන්නේ?");
    if (!queue.playing)
      return message.reply("ඇයි අයින් කරන්න උබට සින්දුවක් ඇහෙනවද? ප්ලෑන් යන්න");
    const index = args[0] - 1;
    const track = queue.songs[index];
    if (!track) return message.reply("නැති ලබ්බක් අයින් කරන්න කියන්නේ දොදුද?");
    queue.songs = [];
    message.reply({
      embeds: [
        {
          title: "මෙන්න ඔබේ පෝලිම",
          description: songs,
        },
      ],
    });
  },
};
