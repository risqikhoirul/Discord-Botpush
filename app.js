const DiscordDatabase = require("discord-cloud-database");
const chalk = require("chalk");
const moment = require("moment");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const delay = (time) => {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
};
const timeGreen = () => {
  return chalk.green(moment().format("HH:mm:ss"));
};
const timeRed = () => {
  return chalk.red(moment().format("HH:mm:ss"));
};

(async () => {
  console.log(`
++++++++++++++++++++++++++++++++++++++++++++++
+ BOT PUSH LEVEL DISCORD | (Auto Send & Auto +
+ SUPPORT MULTIACCOUNT   |  Delete Messege)  +
==============================================
+ Author: M Khoirul Risqi                    +
+ Github: https://github.com/risqikhoirul    +
++++++++++++++++++++++++++++++++++++++++++++++
  `);
  while (true) {
    const modulesToCheck = ["discord-cloud-database", "moment", "chalk", "dotenv"];

    for (const moduleName of modulesToCheck) {
      const modulePath = path.join(__dirname, "node_modules", moduleName);

      if (!fs.existsSync(modulePath)) {
        console.error(`Error: ${moduleName} is not installed. Please run "npm install ${moduleName}" and try again.`);
        process.exit(1);
      }
    }
    const mess = process.env.MESSAGE.split(",");

    const Token = process.env.TOKEN.split(",");

    let i = 0;
    while (i < Token.length) {
      const token = Token[i].trim();
      i++;

      const randomMsg = mess[Math.floor(mess.length * Math.random())];
      const discordDatabase = new DiscordDatabase(token, { risqi: process.env.CHANNEL_ID });

      try {
        const readSend = await discordDatabase.insertOne(randomMsg, { name: "risqi" });
        // console.log(readSend);
        const readSendMsg = await discordDatabase.findOne(readSend.id, { name: "risqi" });
        // console.log(readSendMsg);
        const usr = chalk.yellow(`${readSendMsg.author.username}#${readSendMsg.author.discriminator}`);
        console.log(`[ ${timeGreen()} ] [${usr}] Send Messege: ${readSendMsg.content}`);
        const deletById = await discordDatabase.deleteMessageById(readSend.id, { name: "risqi" });
        // console.log(deletById);
        if (deletById === true) {
          console.log(`[ ${timeGreen()} ] [${usr}] Success delete: ${chalk.yellow(readSend.id)}`);
        } else {
          console.log(`[ ${timeRed()} ] [${usr}] Failed delete: ${chalk.yellow(readSend.id)}`);
        }
        await delay(process.env.DELAY);
      } catch (error) {
        if (error.error.discordError === true) {
          const usr = chalk.red("Token Failed");
          console.log(`[ ${timeRed()} ] [${usr}] Please Check Token!!!`);
        } else {
          console.error(error);
        }
        await delay(process.env.DELAY);
      }
    }
  }
})();
