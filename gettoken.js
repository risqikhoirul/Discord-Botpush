const axios = require("axios");
const readlineSync = require("readline-sync");
const fs = require("fs");
const login = async (email, password) => {
  try {
    const res = await axios.post(
      "https://discord.com/api/v9/auth/login",
      {
        email,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const token = await res.data.token;
    const restkn = `${token}\n`;

    fs.appendFile("outoken.txt", restkn, "utf8", (err) => {
      if (err) throw err;
      console.log("\ntoken telah tersimpan di outoken.txt!");
    });
    console.log(token);
  } catch (error) {
    throw error;
  }
};

console.log(
  ` 
GET TOKEN DISCORD
Masukan Email Dan Password
`
);
const email = readlineSync.question("Email? ");
const pass = readlineSync.question("Password? ");
login(email, pass);
