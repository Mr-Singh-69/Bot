const { Client, Events, GatewayIntentBits, SlashCommandBuilder } = require("discord.js");
const keepAlive = require('./keep_alive.js');

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});

const prefix = "#";

keepAlive();


const createCommands = () => {
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
        .setDescription('Who is he??');

    const coinflip = new SlashCommandBuilder()
        .setName('coinflip')
        .setDescription('Flips a coin and returns Heads or Tails');

    const joke = new SlashCommandBuilder()
        .setName('joke')
        .setDescription('Tells a random joke');

    const roast = new SlashCommandBuilder()
        .setName('roast')
        .setDescription('Roast someone!')
        .addUserOption(option =>
            option
                .setName('user')
                .setDescription('The user to roast')
                .setRequired(false)
        );

    const rps = new SlashCommandBuilder()
        .setName('rps')
        .setDescription('Play Rock, Paper, Scissors with the bot')
        .addStringOption(option =>
            option
                .setName('choice')
                .setDescription('Your move: rock, paper, or scissors')
                .setRequired(true)
        );

  
    const guilds = ["1148943596993658890", "1262989720993005710"];
    guilds.forEach(guildId => {
        client.application.commands.create(ping, guildId);
        client.application.commands.create(hello, guildId);
        client.application.commands.create(coinflip, guildId);
        client.application.commands.create(about_me, guildId);
        client.application.commands.create(joke, guildId);
        client.application.commands.create(roast, guildId);
        client.application.commands.create(rps, guildId);
    });
};

client.once(Events.ClientReady, c => {
    console.log(`Logged in as ${c.user.tag}`);
    createCommands();
});


client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const { commandName } = interaction;

    if (commandName === "ping") {
        await interaction.reply(`Pong! Latency is ${client.ws.ping}ms.`);
    }

    if (commandName === "hello") {
        let user = interaction.options.getUser('user');
        if (!user) user = interaction.user;
        await interaction.reply(`Hello! ${user.username}, how may I help?`);
    }

    if (commandName === "coinflip") {
        const result = Math.random() < 0.5 ? 'Heads' : 'Tails';
        await interaction.reply(`The coin landed on: ${result}`);
    }

    if (commandName === "about") {
        await interaction.reply("Ehsan Quddusi is an Indian politician known for his involvement in various controversies, particularly relating to corruption. He has served as a judge and was a former Orissa High Court judge.");
    }

    if (commandName === "joke") {
        const jokes = [
            "Why don't skeletons fight each other? They don't have the guts!",
            "I told my wife she was drawing her eyebrows too high. She looked surprised.",
            "Why don't scientists trust atoms? Because they make up everything!"
        ];
        const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
        await interaction.reply(randomJoke);
    }

    if (commandName === "roast") {
        const roasts = [
            "You're like a cloud. When you disappear, it's a beautiful day.",
            "I'd agree with you but then we’d both be wrong.",
            "You're proof that even a bad haircut can grow back."
        ];
        let user = interaction.options.getUser('user') || interaction.user;
        const randomRoast = roasts[Math.floor(Math.random() * roasts.length)];
        await interaction.reply(`${user.username}, ${randomRoast}`);
    }

    if (commandName === "rps") {
        const choices = ["rock", "paper", "scissors"];
        const userChoice = interaction.options.getString('choice').toLowerCase();
        const botChoice = choices[Math.floor(Math.random() * choices.length)];

        if (!choices.includes(userChoice)) {
            await interaction.reply("Invalid choice! Choose rock, paper, or scissors.");
        } else if (userChoice === botChoice) {
            await interaction.reply(`It's a tie! We both chose ${botChoice}.`);
        } else if (
            (userChoice === "rock" && botChoice === "scissors") ||
            (userChoice === "paper" && botChoice === "rock") ||
            (userChoice === "scissors" && botChoice === "paper")
        ) {
            await interaction.reply(`You win! I chose ${botChoice}.`);
        } else {
            await interaction.reply(`I win! I chose ${botChoice}.`);
        }
    }
});

client.on(Events.MessageCreate, message => {
    if (message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift()?.toLowerCase();

    if (message.content.toLowerCase().startsWith("who is ehs")) {
        message.channel.send("Ehsan Quddusi is an Indian politician known for his involvement in various controversies, particularly relating to corruption. He has served as a judge and was a former Orissa High Court judge.");
        return;
    }

    if (message.content.startsWith(prefix)) {
        if (command === "ping") {
            message.channel.send(`Pong! Latency is ${client.ws.ping}ms.`);
        }

        if (command === "hello") {
            let user = message.mentions.users.first() || message.author;
            message.channel.send(`Hello! ${user.username}, how may I help?`);
        }

        if (command === "coinflip") {
            const result = Math.random() < 0.5 ? 'Heads' : 'Tails';
            message.channel.send(`The coin landed on: ${result}`);
        }

        if (command === "about") {
            message.channel.send("Ehsan Quddusi is an Indian politician known for his involvement in various controversies, particularly relating to corruption. He has served as a judge and was a former Orissa High Court judge.");
        }

        if (command === "joke") {
            const jokes = [
                "Why don't skeletons fight each other? They don't have the guts!",
                "I told my wife she was drawing her eyebrows too high. She looked surprised.",
                "Why don't scientists trust atoms? Because they make up everything!"
            ];
            const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
            message.channel.send(randomJoke);
        }

        if (command === "roast") {
            const roasts = [
                "You're like a cloud. When you disappear, it's a beautiful day.",
                "I'd agree with you but then we’d both be wrong.",
                "You're proof that even a bad haircut can grow back."
            ];
            let user = message.mentions.users.first() || message.author;
            const randomRoast = roasts[Math.floor(Math.random() * roasts.length)];
            message.channel.send(`${user.username}, ${randomRoast}`);
        }

        if (command === "rps") {
            const choices = ["rock", "paper", "scissors"];
            const userChoice = args[0]?.toLowerCase();

            if (!userChoice || !choices.includes(userChoice)) {
                message.channel.send("Invalid choice! Choose rock, paper, or scissors.");
                return;
            }

            const botChoice = choices[Math.floor(Math.random() * choices.length)];

            if (userChoice === botChoice) {
                message.channel.send(`It's a tie! We both chose ${botChoice}.`);
            } else if (
                (userChoice === "rock" && botChoice === "scissors") ||
                (userChoice === "paper" && botChoice === "rock") ||
                (userChoice === "scissors" && botChoice === "paper")
            ) {
                message.channel.send(`You win! I chose ${botChoice}.`);
            } else {
                message.channel.send(`I win! I chose ${botChoice}.`);
            }
        }
    }
});

client.login(process.env.token);
