const TelegramApi = require("node-telegram-bot-api");
require("dotenv").config();

const token = process.env.TOKEN;
const audio = './audio/sog-bolasiz.ogg';
const umidxonId = process.env.MY_CHAT_ID;
const bot = new TelegramApi(token, { polling: true });

bot.setMyCommands([
  { command: "/start", description: "Launch the bot" },
  { command: "/admin", description: "Show the admin" },
  { command: "/commands", description: "All commands" },
  { command: "/stop", description: "Stop the bot" },
]);

  bot.on("message", async (msg) => {
    const text = msg.text;
    const chatId = msg.chat.id;
    // "/start" command event
    if (text === "/start") {
      await bot.sendMessage(
        chatId,
        `Salom ${msg.chat.first_name} 👋 \n @Umidxon_Blog kanali bo'yicha fikr, taklif va mulohazalar bo'lsa bemalol yozishingiz mumkin`
      ),
        bot.sendMessage(
          umidxonId,
          `@${msg.chat.username} follow your bot\n Time: ${msg.date}`
        ),
        console.log(msg);
    } else if (text === "Salom" || text === "Assalomu alaykum") {
        bot.sendMessage(
            chatId,
            `Salom ${msg.chat.first_name}`
        )
    }

    else if (text === "/admin") {
      await bot.sendMessage(
        chatId,
        `Ushbu bot @umidkhan_pulatkhanov tomonidan yaratilgan`
      );
    } else if (text === "/commands") {
      await bot.sendMessage(
        chatId,
        `All commands: \n /start - Start the bot \n /admin - Show the admin`
      );
    } else {
      await bot.sendMessage(
        chatId,
        `Fikr-mulohazangiz uchun tashakkur ${msg.chat.first_name} 🤗`
      ),
        bot.sendVoice(chatId, audio),
        bot.sendMessage(umidxonId, `@${msg.chat.username} wrote ${msg.text}`);
    }
  });
