const { MessageEmbed } = require("discord.js");
const { TrackUtils } = require("erela.js");

module.exports = {
    name: "volume",
    description: "Chỉnh âm lượng nhạc",
    usage: "<volume>",
    permissions: {
        channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
        member: [],
    },
    aliases: ["vol", "v"],
    /**
     *
     * @param {import("../structures/DiscordMusicBot")} client
     * @param {import("discord.js").Message} message
     * @param {string[]} args
     * @param {*} param3
     */
    run: async (client, message, args, { GuildDB }) => {
        let player = await client.Manager.get(message.guild.id);
        if (!player) return client.sendTime(message.channel, "\n<:crosscac:881208339227344966> | **Hiện tại không có bài nhạc nào được phát...**");
        if (!args[0]) return client.sendTime(message.channel, `🔉 | Âm lượng hiện tại \`${player.volume}\`.`);
        if (!message.member.voice.channel) return client.sendTime(message.channel, "\n<:crosscac:881208339227344966> | **Bạn cần vào 1 kênh thoại để sử dụng lệnh này***");
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return client.sendTime(message.channel, "\n<:crosscac:881208339227344966> | **Bạn cần vào cùng 1 kênh thoại với tôi để sử dụng lệnh nà**");
        if (!parseInt(args[0])) return client.sendTime(message.channel, `**Please choose a number between** \`1 - 100\``);
        let vol = parseInt(args[0]);
        if(vol < 0 || vol > 100){
          return  client.sendTime(message.channel, "❌ | **Please Choose A Number Between `1-100`**");
        }
        else{
        player.setVolume(vol);
        client.sendTime(message.channel, `🔉 | **Volume set to** \`${player.volume}\``);
        }
    },
    SlashCommand: {
        options: [
            {
                name: "amount",
                value: "amount",
                type: 4,
                required: false,
                description: "Điều khiển âm lượng từ 1-100. Mặc định 100.",
            },
        ],
    /**
     *
     * @param {import("../structures/DiscordMusicBot")} client
     * @param {import("discord.js").Message} message
     * @param {string[]} args
     * @param {*} param3
     */
        run: async (client, interaction, args, { GuildDB }) => {
            const guild = client.guilds.cache.get(interaction.guild_id);
            const member = guild.members.cache.get(interaction.member.user.id);

            if (!member.voice.channel) return client.sendTime(interaction, "\n<:crosscac:881208339227344966> | **Bạn cần vào 1 kênh thoại để sử dụng lệnh này");
            if (guild.me.voice.channel && !guild.me.voice.channel.equals(member.voice.channel)) return client.sendTime(interaction, "\n<:crosscac:881208339227344966> | **Bạn cần vào cùng 1 kênh thoại với tôi để sử dụng lệnh nà**");
            let player = await client.Manager.get(interaction.guild_id);
            if (!player) return client.sendTime(interaction, "\n<:crosscac:881208339227344966> | **Hiện tại không có bài nhạc nào được phát...**");
            if (!args[0].value) return client.sendTime(interaction, `🔉 | Âm lượng hiện tại \`${player.volume}\`.`);
            let vol = parseInt(args[0].value);
            if (!vol || vol < 1 || vol > 100) return client.sendTime(interaction, `**Vui lòng chọn số từ** \`1 - 100\``);
            player.setVolume(vol);
            client.sendTime(interaction, `🔉 | Âm lượng đã chỉnh thành: \`${player.volume}\``);
        },
    },
};
