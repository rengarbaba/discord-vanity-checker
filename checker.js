const spamurl = "";
const selftoken = "";
const sunucuID = "";

function sendDiscordRequest() {
  fetch(`http://discord.com/api/v9/invites/${spamurl}?with_counts=true&with_expiration=true`, {
    headers: {
      accept: "*/*",
      "accept-language": "tr-TR,tr;q=0.9,en-US;q=0.8,en;q=0.7",
      "sec-ch-ua": "\"Chromium\";v=\"112\", \"Google Chrome\";v=\"112\", \"Not:A-Brand\";v=\"99\"",
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": "\"Windows\"",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      "x-debug-options": "bugReporterEnabled",
      "x-discord-locale": "tr",
      "x-fingerprint": "1106586137847410698.uJEFGnNq74j9WcA25zdQPaKQybE",
    },
    referrer: `https://discord.com/invite/${spamurl}`,
    referrerPolicy: "strict-origin-when-cross-origin",
    body: null,
    method: "GET",
    mode: "cors",
    credentials: "include"
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      if (data && data.message === "Unknown Invite" && data.code === 10006) {
        değiş();
        console.log("URL boşa düştü!");
      }

      setTimeout(sendDiscordRequest, 1000);
    })
    .catch(error => {
      console.error(error);

      setTimeout(sendDiscordRequest, 1000);
    });
}

function değiş() {
  const guildID = sunucuID;
  const newURL = spamurl;
  const token = selftoken;

  const requestOptions = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
    body: JSON.stringify({ code: newURL }),
    redirect: 'follow'
  };

  fetch(`https://discord.com/api/v9/guilds/${guildID}/vanity-url`, requestOptions)
    .then(response => response.json())
    .then(result => {
      console.log(result);
      if (result && result.code === newURL) {
        console.log("URL alındı!");
      } else {
        console.log("URL alınamadı.");
      }
    })
    .catch(error => console.log('error', error));
}

sendDiscordRequest();
