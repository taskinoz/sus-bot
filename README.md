# Susbot
Call out random people in your chat with among us memes

## Add to channel
You can invite Susbot to join you channel by typing `!join` in [Susbot's channel](https://www.twitch.tv/susbot__)

## Remove from channel
Just like adding Susbot to your channel you can remove it but typing `!leave` in [Susbot's channel](https://www.twitch.tv/susbot__)

## Development
To run Susbot for yourself clone the project:
```
git clone https://github.com/taskinoz/sus-bot.git
cd sus-bot/
```

Install the packages:
```
npm install
```

Rename `twitch-login.json.example` to `twitch-login.json`

Add your username to the `twitch-login.json` in both the username and channel sections, however in the cannels section add a `#` in front of your username.

Get your Oath token from [here](https://twitchapps.com/tmi/) and add it to the oath section

Run:
```
node index.js
```
