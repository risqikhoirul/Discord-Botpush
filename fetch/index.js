const fetch = require("node-fetch");

const fetcher ={
  send: (chnl_id, token, mess) =>
  new Promise((resolve, reject) => {
    fetch(`https://discord.com/api/v9/channels/${chnl_id}/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        content: mess,
      }),
    })
      .then((response) => resolve(response))
      .catch((error) => reject(error));
  }),
  check: (chnl_id, token) =>
  new Promise((resolve, reject) => {
    fetch(`https://discord.com/api/v9/channels/${chnl_id}/messages`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => reject(error));
  }),
  delet: (chnl_id, msg_id, token) =>
  new Promise((resolve, reject) => {
    fetch(`https://discord.com/api/v9/channels/${chnl_id}/messages/${msg_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => reject(error));
  }),
};

module.exports = fetcher;
