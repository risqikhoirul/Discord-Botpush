const DiscordDatabase = require("discord-cloud-database");
const discordDatabase = new DiscordDatabase();
const fs = require("fs");
const path = require("path");
/**
 * M Khoirul Risqi
 * https://github.com/risqikhoirul
 * thank to ahmed
 */

(async () => {
    const modulesToCheck = ["discord-cloud-database"];

    for (const moduleName of modulesToCheck) {
      const modulePath = path.join(__dirname, "node_modules", moduleName);

      if (!fs.existsSync(modulePath)) {
        console.error(`Error: ${moduleName} is not installed. Please run "npm install ${moduleName}" and try again.`);
        process.exit(1);
      }
    }
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
