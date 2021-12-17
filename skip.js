const { MessageEmbed } = require("discord.js");
const { TrackUtils } = require("erela.js");

module.exports = {
    name: "skip",
    description: "Skip bài hát",
    usage: "",
    permissions: {
        channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
        member: [],
    },
    aliases: ["s", "next"],
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
        if (!message.member.voice.channel) return client.sendTime(message.channel, "\n<:crosscac:881208339227344966> | **Bạn cần vào 1 kênh thoại để sử dụng lệnh này**");
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return client.sendTime(message.channel, "\n<:crosscac:881208339227344966> | **Bạn cần vào cùng 1 kênh thoại với tôi để sử dụng lệnh này**");
        player.stop();
        await message.react("✅");
    },
    SlashCommand: {
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

            if (!member.voice.channel) return client.sendTime(interaction, "\n<:crosscac:881208339227344966> | **Bạn cần vào 1 kênh thoại để sử dụng lệnh này**");
            if (guild.me.voice.channel && !guild.me.voice.channel.equals(member.voice.channel)) return client.sendTime(interaction, "\n<:crosscac:881208339227344966> | **Bạn cần vào cùng 1 kênh thoại với tôi để sử dụng lệnh này**");

            const skipTo = interaction.data.options ? interaction.data.options[0].value : null;

            let player = await client.Manager.get(interaction.guild_id);

            if (!player) return client.sendTime(interaction, "\n<:crosscac:881208339227344966> | **Hiện tại không có bài nhạc nào được phát...**");
            console.log(interaction.data);
            if (skipTo !== null && (isNaN(skipTo) || skipTo < 1 || skipTo > player.queue.length)) return client.sendTime(interaction, "\n<:crosscac:881208339227344966> | **Số bạn vừa điền không hợp lệ**");
            player.stop(skipTo);
            client.sendTime(interaction, "\n<:tic:881208570325131284> | **Skip**");
        },
    },
};
