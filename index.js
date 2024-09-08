const { Client, Events, GatewayIntentBits } = require("discord.js");
const keepAlive = require('./keep_alive.js');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

const prefix = "#";

keepAlive();

client.once(Events.ClientReady, c => {
    console.log(`Logged in as ${c.user.tag}`);
});


client.on(Events.MessageCreate, message => {
    
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

   
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
});

client.login(process.env.token);
