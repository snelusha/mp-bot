module.exports = {
  name: "leave",
  aliases: ["l"],
  description: "Leave from the channel",
  enabled: true,
  cooldown: 2, 
  execute: (client, message) => {
    try {
      const result = client.distube.voices.get(message).leave();
      console.log(result);
      message.reply("හරි එහෙනම් මම ගියා!")
    } catch {
      message.reply("සමාවෙන්න සහෝදරයා! මට මේ හඬ නාලිකාවෙන් යන්න බැහැ!")
    }
  }
}