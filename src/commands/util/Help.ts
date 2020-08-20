import Command from "../../bot/Command";
import Bot from "../../bot/Bot";
import {Message, MessageEmbed} from "discord.js";

export default class extends Command {
    constructor(bot: Bot) {
        super(bot, {
            name: "help",
            alias: ["commands"]
        });
    }

    run(msg: Message, args: string[]) {
        if(!msg.member) return;

        let emb = new MessageEmbed()
            .setTitle("Hashnode Bot's Commands")
            //.setDescription(`You can run \`?help <name>\` to get additional information about a command`)
            .setColor("#3366FF");

        this.bot.modules.forEach((v,k) => {
            if(v.commands.length >= 1) {
                let name = k.charAt(0).toUpperCase() + k.slice(1);
                let cmds:string[] = [];
                v.commands.forEach(cmd => {
                    cmds.push(`\`${cmd}\``);
                });
                emb.addField(`${name} (module ${v.enabled === true ? "enabled" : "disabled"})`, cmds.join(", "), true);
            }
        });

        msg.channel.send(emb);
    }
}