const fs = require("node:fs");
const { Collection, ActivityType } = require("discord.js");

const TOKEN = process.env.TOKEN;

const escape_regex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

module.exports = (client) => {
  console.log("Loading commands");
  client.commands = new Collection();
  fs.readdirSync("./commands/")
    .filter((file) => file.endsWith(".js"))
    .map((file) => {
      const path = `../commands/${file}`;
      const command = require(path);
      const name = command.name.toLowerCase();
      console.log(`Command loaded: ${name}`);
      client.commands.set(name, command);
      delete require.cache[require.resolve(path)];
    });
  client.once("ready", () => {
    console.log(`🔥 ${client.user.username} is ready to go!`);
    client.user.setPresence({
      activities: [
        {
          name: `${client.guilds.cache.size} servers!`,
          type: ActivityType.Watching,
        },
      ],
    });
  });
  client.on("error", (error) => console.error(error));
  client.on("messageCreate", async (message) => {
    if (message.author.bot || !message.guild) return;
    const prefix_regex = new RegExp(
      `^(<@!?${client.user.id}>|${escape_regex(client.prefix)})\\s*`
    );
    if (!prefix_regex.test(message.content)) return;
    const matched_prefix = message.content.match(prefix_regex)[1];
    const args = message.content
      .slice(matched_prefix.length)
      .trim()
      .split(/ +/);
    const cmd = args.shift().toLowerCase();
    const command =
      client.commands.get(cmd) ||
      client.commands.find((c) => c.aliases?.includes(cmd));
    if (!command) return;
    command.execute(client, message, args);
  });
  client.distube.on("playSong", (queue, track) => {
    queue.textChannel.send({
      embeds: [
        {
          color: 0x2c2c2c,
          title: "Playing Song",
          description: "මගේ යාලුවෝ! ඔබ මට කතා කළාද?",
        },
      ],
    });
  });
  client.login(TOKEN);
};
