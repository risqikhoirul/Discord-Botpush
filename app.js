const { send, check, delet } = require("./fetch");
const chalk = require("chalk");
const moment = require("moment");
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
    const mess = process.env.MESSAGE.split(",");
    const randomMsg = mess[Math.floor(mess.length * Math.random())];
    const Token = process.env.TOKEN.split(",");

    let i = 0;
    while (i < Token.length) {
      const token = Token[i].trim();
      i++;

      const readSend = await send(process.env.CHANNEL_ID, token, randomMsg);

      const readSendMsg = await readSend.json();

      const userReadSend = () => {
        if (readSend.status === 200) {
          return chalk.yellow(`[${readSendMsg.author.username}#${readSendMsg.author.discriminator}]`);
        } else {
          return chalk.red("[Token Failed]");
        }
      };
      const usr = await userReadSend();

      if (readSend.status === 200) {
        console.log(`[ ${timeGreen()} ] ${usr} Send Messege: ${readSendMsg.content}`);
      } else {
        console.log(`[ ${timeRed()} ] ${usr} Please Check Token!!!`);
      }

      await delay(process.env.DELAY);
      const readCheck = await check(process.env.CHANNEL_ID, token);
      if (readCheck.status === 200) {
        const msg = await readCheck.json();

        if (msg.length === 0) {
          console.log(`[ ${timeRed()} ] ${usr} No detect message!!!`);
          break;
        } else {
          await delay(process.env.DELAY);

          const msgId = msg[0].id;
          const readDelet = await delet(process.env.CHANNEL_ID, msgId, token);
          if (readDelet.status === 204) {
            console.log(`[ ${timeGreen()} ] ${usr} Message sent with ID ${chalk.yellow(msgId)} deleted successfully`);
          } else {
            console.log(`[ ${timeRed()} ] ${usr} Failed to delete message with ID ${chalk.yellow(msgId)}: ${chalk.yellow(readDelet.status)}`);
          }
        }
      } else {
        console.log(`[ ${timeRed()} ] ${usr} Failed to get messages on channel: ${chalk.yellow(readCheck.status)}`);
        await delay(process.env.DELAY);
      }
    }
  }
})();
