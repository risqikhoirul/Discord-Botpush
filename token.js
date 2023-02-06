const DiscordDatabase = require("discord-cloud-database");
const discordDatabase = new DiscordDatabase();
const fs = require("fs");
/**
 * M Khoirul Risqi
 * https://github.com/risqikhoirul
 * thank to ahmed
 */

(async () => {
  const email = process.argv[2];
  const password = process.argv[3];
  try {
    const token = await discordDatabase.login(email, password);

    console.log(email);
    console.log(password);
    console.log();
    console.log(token.token);

    const restkn = `${token.token}\n`;

    await fs.appendFile("outoken.txt", restkn, "utf8", (err) => {
      if (err) throw err;
      console.log("\ntoken telah tersimpan di outoken.txt!");
    });
  } catch (error) {
    throw error;
  }
})();
