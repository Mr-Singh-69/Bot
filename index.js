const { Client, Events, GatewayIntentBits, SlashCommandBuilder } = require("discord.js");

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, c => {
    console.log(`Logged in as ${c.user.tag}`);

    const ping = new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong!');

    const hello = new SlashCommandBuilder()
        .setName('hello')
        .setDescription('Says hello to someone?')
        .addUserOption(option => 
            option
                .setName('user')
                .setDescription('The user to say hi to')
                .setRequired(false)
        );
    const about_me = new SlashCommandBuilder()
        .setName('about')
        .setDescription('Who is he??') 
   
    const coinflip = new SlashCommandBuilder()
        .setName('coinflip')
        .setDescription('Flips a coin and returns Heads or Tails');

    //my server
    client.application.commands.create(ping, "1148943596993658890");
    client.application.commands.create(hello, "1148943596993658890");
    client.application.commands.create(coinflip, "1148943596993658890");
    client.application.commands.create(about_me, "1148943596993658890");
    // titan shuhabe server
    client.application.commands.create(ping, "1262989720993005710");
    client.application.commands.create(hello, "1262989720993005710");
    client.application.commands.create(coinflip, "1262989720993005710");
    client.application.commands.create(about_me, "1262989720993005710");
});

client.on(Events.InteractionCreate, interaction => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === "ping") {
        interaction.reply(`Pong! Latency is ${client.ws.ping}ms.`);
    }

    if (interaction.commandName === "hello") {
        let user = interaction.options.getUser('user');
        if (!user) user = interaction.user;
        interaction.reply(`Hello! ${user.username}, how may I help?`);
    }

    if (interaction.commandName === "coinflip") {
        const result = Math.random() < 0.5 ? 'Heads' : 'Tails';
        interaction.reply(`The coin landed on: ${result}`);
    }

    if (interaction.commandName === "about"){
        interaction.reply("Ehsan Quddusi is an Indian politician who has been involved in various controversies, particularly relating to corruption. He has served as a judge and was a former Orissa High Court judge. Quddusi's name became widely known in connection with a corruption scandal involving medical colleges in India, where he was accused of facilitating a bribe to influence a judicial decision related to the de-recognition of certain medical institutions. The case, which involved allegations of corruption at high levels of the judiciary, attracted significant media attention in India.");

    }

});

client.login(token);
