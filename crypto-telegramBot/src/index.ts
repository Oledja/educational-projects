/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-misused-promises */
import TelegramBot from "node-telegram-bot-api";
import * as dotenv from "dotenv";
import CurrencyService from "./services/CurrencyService";
import { prepareFullInfo, prepareListRecent } from "./utill/utill";
import { greatings, help } from "./utill/messages";

dotenv.config();

const currencyService = new CurrencyService();

const bot: TelegramBot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, {
  polling: true,
});

bot.onText(/\/start/, async (msg: TelegramBot.Message) => {
  bot.sendMessage(msg.chat.id, `Привет ${msg.from?.first_name}! ${greatings}`);
});

bot.onText(/\/help/, async (msg: TelegramBot.Message) => {
  bot.sendMessage(msg.chat.id, help);
});

bot.onText(/\/listRecent/, async (msg: TelegramBot.Message) => {
  const {
    chat: { id: chatId },
  } = msg;
  const currencies = await currencyService.getRecentList();
  const resp = prepareListRecent(currencies);
  bot.sendMessage(chatId, resp);
});

bot.onText(/\/*/, async (msg: TelegramBot.Message) => {
  const {
    chat: { id: chatId },
  } = msg;
  const { text } = msg;
  const fullInfo = await currencyService.getFullInfo(text!);

  if (fullInfo) {
    const addToFollowing = {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "Add to following",
              callback_data: `add ${fullInfo.symbol}`,
            },
          ],
        ],
      },
    };

    const removeFromFollowing = {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "Remove from following",
              callback_data: `delete ${fullInfo.symbol}`,
            },
          ],
        ],
      },
    };
    const resp = prepareFullInfo(fullInfo);
    const symbolExistsInFavorite = await currencyService.existsInFavorite(
      chatId,
      fullInfo.symbol
    );
    if (symbolExistsInFavorite) {
      bot.sendMessage(chatId, resp, removeFromFollowing);
    } else {
      bot.sendMessage(chatId, resp, addToFollowing);
    }
  }
});

bot.onText(/\/addToFavourite+( \w+)/, (msg: TelegramBot.Message) => {
  const {
    chat: { id: chatId },
  } = msg;
  const { text } = msg;
  currencyService.addToFavoriteList(chatId, text!);
});

bot.onText(/\/listFavourite/, async (msg: TelegramBot.Message) => {
  const {
    chat: { id: chatId },
  } = msg;
  const currencies = await currencyService.getFavoriteList(chatId);
  const resp = prepareListRecent(currencies);
  bot.sendMessage(chatId, resp);
});

bot.onText(/\/deleteFavourite+( \w+)/, (msg: TelegramBot.Message) => {
  const {
    chat: { id: chatId },
  } = msg;
  const { text } = msg;
  currencyService.deleteFromFavoriteList(chatId, text!);
});

bot.on("callback_query", (query: TelegramBot.CallbackQuery) => {
  const { data: text } = query;
  const {
    from: { id: chatId },
  } = query;
  if (text) {
    const action = text.split(" ")[0];
    if (action === "add") {
      currencyService.addToFavoriteList(chatId, text);
    } else {
      currencyService.deleteFromFavoriteList(chatId, text);
    }
  }
});
