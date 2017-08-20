const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const fs = require('fs');
const request = require('request');
const cheerio = require('cheerio');
const cheerioTableparser = require('cheerio-tableparser');
const emoji = require('node-emoji').emoji;

//set an evironment variable with your bot token.
// i.e. for Linux: export SKYSEER_TOKEN='YOUR_BOT_TOKEN'
const skyseerBot = new TelegramBot(process.env.SKYSEER_TOKEN, {polling: true});

//Main welcome message with menu
skyseerBot.onText(/\/start/, (msg) => {
  skyseerBot.sendMessage(msg.chat.id, "Insert witty welcome message here", {
    "reply_markup": {
        "keyboard": [
          [emoji.point_up + "  Predict"],
          [emoji.star2 + "  Astronomical night starting time"],
          [emoji.last_quarter_moon + "  Moon + planets"],
          ["  All options"]]
        }
    });
});

//reactions to main menu items
skyseerBot.onText(/Predict/, (msg) => {
  //of course i need this to be dynamic...
  url = 'https://www.timeanddate.com/astronomy/italy/cagliari';

  // The structure of our request call
  // The first parameter is our URL
  // The callback function takes 3 parameters, an error, response status code and the html
  request(url, function(error, response, html){

      // First we'll check to make sure no errors occurred when making the request
      if(!error){
          // Next, we'll utilize the cheerio library on the returned html which will essentially give us jQuery functionality
          var $ = cheerio.load(html);

          //Parse what we need to parse:
          //1 - astro night times
          var astroNightTimeStart = $('.tr', '#lm-leg-8').text().split("–", 1); //that is not a dash, it's some lame ass character
          var astroNightTimeEnd = $('.tr', '#lm-leg-0').text().split("–").pop(); //that is not a dash, it's some lame ass character

          //2 - moon condition
          cheerioTableparser($);
          data = $('#tb-7dmn').parsetable(true, true, true);
          var moonTimeStart = data[1][2];
          var moonTimeEnd = data[3][2];
          var moonIlluminationPercent = data[data.length - 1][2];

          //3 - planets
          data = $('table[class=\'tb-wc sep zebra fw\']').parsetable(true, true, true);
          var mercury = `Mercury:
  ${emoji.arrow_heading_up} ${data[1][2]}, ${emoji.arrow_heading_down} ${data[2][2]}
  ${data[4][2]}`;
          if(data[4][2].includes("Perfect") || data[4][2].includes("ood")) {
            mercury = "*" + mercury + "*";
          }

          var venus = `Venus:
  ${emoji.arrow_heading_up} ${data[1][3]}, ${emoji.arrow_heading_down} ${data[2][3]}
  ${data[4][3]}`;
          if(data[4][3].includes("Perfect") || data[4][3].includes("ood")) {
            venus = "*" + venus + "*";
          }

          var mars = `Mars:
  ${emoji.arrow_heading_up} ${data[1][4]}, ${emoji.arrow_heading_down} ${data[2][4]}
  ${data[4][4]}`;
          if(data[4][4].includes("Perfect") || data[4][4].includes("ood")) {
            mars = "*" + mars + "*";
          }

          var jupiter = `Jupiter:
  ${emoji.arrow_heading_up} ${data[1][5]}, ${emoji.arrow_heading_down} ${data[2][5]}
  ${data[4][5]}`;
        if(data[4][5].includes("Perfect") || data[4][5].includes("ood")) {
          jupiter = "*" + jupiter + "*";
        }

          var saturn = `Saturn:
  ${emoji.arrow_heading_up} ${data[1][6]}, ${emoji.arrow_heading_down} ${data[2][6]}
  ${data[4][6]}`;
        if(data[4][6].includes("Perfect") || data[4][6].includes("ood")) {
          saturn = "*" + saturn + "*";
        }

          var uranus = `Uranus:
  ${emoji.arrow_heading_up} ${data[1][7]}, ${emoji.arrow_heading_down} ${data[2][7]}
  ${data[4][7]}`;
          if(data[4][7].includes("Perfect") || data[4][7].includes("ood")) {
            uranus = "*" + uranus + "*";
          }

          var neptune = `Neptune:
  ${emoji.arrow_heading_up} ${data[1][8]}, ${emoji.arrow_heading_down} ${data[2][8]}
  ${data[4][8]}`;
          if(data[4][8].includes("Perfect") || data[4][8].includes("ood")) {
            neptune = "*" + neptune + "*";
          }

          //Finally assemble everything
          //this is preformatted, so indentation had to be sacrificed
          var message = `
*Astronomical night*
  start at *${astroNightTimeStart}*
  ends at *${astroNightTimeEnd}*

*Moon*
  rise at *${moonTimeStart}*
  sets at *${moonTimeEnd}*
  illumination *${moonIlluminationPercent}*

*Planets*
  ${mercury}
  ${venus}
  ${mars}
  ${jupiter}
  ${saturn}
  ${uranus}
  ${neptune}

          `;
          skyseerBot.sendMessage(msg.chat.id, message, {parse_mode: "Markdown"});
      }
  })

});

skyseerBot.onText(/Astronomical night starting time/, (msg) => {
  notImplementedYet(msg);
});

skyseerBot.onText(/Moon + planets/, (msg) => {
  notImplementedYet(msg);
});

skyseerBot.onText(/All options/, (msg) => {
  notImplementedYet(msg);
});

//functions
function notImplementedYet(msg) {
  skyseerBot.sendMessage(msg.chat.id, "Not implemented yet");
}
