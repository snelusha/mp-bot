module.exports = {
  name: "queue",
  aliases: ["q"],
  description: "Get the current songs queue",
  cooldown: 2,
  enabled: true,
  execute: (client, message) => {
    const queue = client.distube.getQueue(message);
    if (!queue) return message.reply("මොනවද හොයන්නේ ආහ් පෝලිමක්වත් නෑ");
    const songs = queue.songs
      .map(
        (song, i) =>
          `${i === 0 ? "**Playing:**" : `${i}.`} [\`${song.name}\`](${
            song.url
          }) - \`${song.formattedDuration}\``
      )
      .join("\n");
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
