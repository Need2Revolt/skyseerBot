const TelegramBot = require('node-telegram-bot-api');

//set an evironment variable with your bot token.
// i.e. for Linux: export SKYSEER_TOKEN='YOUR_BOT_TOKEN'
const skyseerBot = new TelegramBot(process.env.SKYSEER_TOKEN, {polling: true});

//Main welcome message with menu
skyseerBot.onText(/\/start/, (msg) => {
  skyseerBot.sendMessage(msg.chat.id, "Insert witty welcome message here", {
    "reply_markup": {
        "keyboard": [["Predict"],["Astronomical night starting time"], ["Weather forecasts"], ["All options"]]
        }
    });
});

//reactions to main menu items
skyseerBot.onText(/Predict/, (msg) => {
  skyseerBot.sendMessage(msg.chat.id, "I can\'t see clearly right now");
});

skyseerBot.onText(/Astronomical night starting time/, (msg) => {
  notImplementedYet(msg);
});

skyseerBot.onText(/Weather forecasts/, (msg) => {
  notImplementedYet(msg);
});

skyseerBot.onText(/All options/, (msg) => {
  notImplementedYet(msg);
});

//functions
function notImplementedYet(msg) {
  skyseerBot.sendMessage(msg.chat.id, "Not implemented yet");
}
