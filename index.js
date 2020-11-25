const tmi = require('tmi.js');
const fs = require('fs');
const Login = JSON.parse(fs.readFileSync('twitch-login.json', 'utf8'));
const http = require('http');

function rand(r){
	return Math.floor(Math.random()*r);
}

function removeItemOnce(arr, value) {
  var index = arr.indexOf(value);
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
}

function joinChannel(channelName) {
	client.channels.push(channelName);
	Login.channels.push(channelName);
	fs.writeFileSync("twitch-login.json",JSON.stringify(Login,null,4));
	client.join(channelName);
}

function leaveChannel(channelName) {
	removeItemOnce(client.channels, channelName);
	removeItemOnce(Login.channels, channelName);
	fs.writeFileSync("twitch-login.json",JSON.stringify(Login,null,4));
	client.part(channelName);
}

const client = new tmi.Client({
	options: { debug: true },
	connection: {
		reconnect: true,
		secure: true
	},
	identity: {
		username: Login.username,
		password: Login.oauth
	},
	channels: Login.channels
});
client.connect();
client.on('message', (channel, tags, message, self) => {
	if(self) return;

  // Global Commands
  // -----------------------

	if (message.toLowerCase()=== '!sus') {
		let url = `http://tmi.twitch.tv/group/user/${channel.replace("#","")}/chatters`;
		http.get(url,(res) => {
		    let body = "";

		    res.on("data", (chunk) => {
		        body += chunk;
		    });

		    res.on("end", () => {
		        try {
		            let json = JSON.parse(body);
								viewerArray = (json.chatters.viewers).concat(json.chatters.vips).concat(json.chatters.moderators).concat(json.chatters.broadcaster);

		            // do something with JSON
								//'commanderroot'
								let viewer = viewerArray[rand(viewerArray.length)];
								let susstrings = [
									`@${viewer} is sus`,
									`I saw @${viewer} vent`,
									`@${viewer} is the Imposter`,
									`I saw @${viewer} faking tasks`
								];
								client.say(channel, susstrings[rand(susstrings.length)]);
								//console.log(json.chatters.viewers[Math.floor(Math.random() * (json.chatters.viewers).length)]);


		        } catch (error) {
		            console.error(error.message);
		        };
		    });

		}).on("error", (error) => {
		    console.error(error.message);
		})
	}

	// Bot Channel
  // -----------------------
	if (channel=="#"+Login.username) {

		// !join
		if (message.toLowerCase() === '!join') {
			if (!(Login.channels).includes(`#${tags.username}`)) {
				client.say(channel, `susbot has joined @${tags.username}`);
				joinChannel(`#${tags.username}`)
			}
			else {
				client.say(channel, `@${tags.username}, susbot is already in your channel`);
			}
		}
		// !leave
		if (message.toLowerCase() === '!leave') {
			if ((Login.channels).includes(`#${tags.username}`)) {
				client.say(channel, `@${tags.username} susbot has left your channel`);
				leaveChannel(`#${tags.username}`)
			}
			else {
				client.say(channel, `@${tags.username}, susbot isn't in your channel`);
			}
		}
	}




});
