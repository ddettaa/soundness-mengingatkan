require('dotenv').config();
const { Client, GatewayIntentBits, AttachmentBuilder } = require('discord.js');
const cron = require('node-cron');
const fs = require('fs');
const path = require('path');

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
  rest: { timeout: 10000, retries: 3 },
});

const ROLES = ['Zippy', 'Bloop', 'Blu', 'Wava', 'Echo'];
const STATE_FILE = './rotation-state.json';

// Load & save state
function loadState() {
  try {
    if (fs.existsSync(STATE_FILE)) {
      const data = JSON.parse(fs.readFileSync(STATE_FILE, 'utf8'));
      if (typeof data.currentIndex === 'number' && data.currentIndex >= 0 && data.currentIndex < ROLES.length) {
        return data;
      }
    }
  } catch {}
  return { currentIndex: 1 };
}

function saveState(state) {
  try {
    fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2));
  } catch {}
}

let state = loadState();

function getCurrentRole() {
  return ROLES[state.currentIndex];
}

function nextRole() {
  state.currentIndex = (state.currentIndex + 1) % ROLES.length;
  saveState(state);
  return getCurrentRole();
}

// Helper: dapatkan path gambar berdasarkan role
function getRoleImagePath(roleName) {
  const imagePath = path.join(__dirname, 'img', `${roleName}.jpg`);
  return fs.existsSync(imagePath) ? imagePath : null;
}

// Helper: kirim pesan dengan gambar ke channel
async function sendRoleMessage(channel, emoji = '🐬') {
  try {
    const role = getCurrentRole();
    const imagePath = getRoleImagePath(role);
    
    const messageContent = `${emoji} **Role Hari Ini:** ${role}`;
    
    if (imagePath) {
      const attachment = new AttachmentBuilder(imagePath);
      await channel.send({ content: messageContent, files: [attachment] });
    } else {
      await channel.send(messageContent);
    }
  } catch {}
}

// Event handlers
client.once('clientReady', async () => {
  try {
    const channel = process.env.CHANNEL_ID ? await client.channels.fetch(process.env.CHANNEL_ID) : null;
    if (channel) await sendRoleMessage(channel);
  } catch {}

  cron.schedule('0 0 * * *', async () => {
    try {
      const channel = await client.channels.fetch(process.env.CHANNEL_ID);
      const roleBaru = nextRole();
      const imagePath = getRoleImagePath(roleBaru);
      
      const messageContent = `🎲 **Role Hari Ini:** ${roleBaru}`;
      
      if (imagePath) {
        const attachment = new AttachmentBuilder(imagePath);
        await channel.send({ content: messageContent, files: [attachment] });
      } else {
        await channel.send(messageContent);
      }
    } catch {}
  }, { timezone: 'Asia/Jakarta' });
});

client.on('messageCreate', async (message) => {
  if (message.author.bot || !client.isReady() || message.content.toLowerCase() !== '!role') return;
  
  try {
    const role = getCurrentRole();
    const imagePath = getRoleImagePath(role);
    const messageContent = `🐬 **Role Hari Ini:** ${role}`;
    
    if (imagePath) {
      const attachment = new AttachmentBuilder(imagePath);
      await message.reply({ content: messageContent, files: [attachment] }).catch(() => {
        message.channel?.send({ content: messageContent, files: [attachment] });
      });
    } else {
      await message.reply(messageContent).catch(() => {
        message.channel?.send(messageContent);
      });
    }
  } catch {}
});

// Login
if (!process.env.DISCORD_TOKEN) process.exit(1);

async function login() {
  for (let i = 0; i < 3; i++) {
    try {
      await client.login(process.env.DISCORD_TOKEN);
      return;
    } catch (error) {
      if (i === 2 || error.message?.includes('disallowed intents') || error.message?.includes('Invalid token')) {
        process.exit(1);
      }
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
  }
}

process.on('uncaughtException', () => process.exit(1));
process.on('unhandledRejection', (reason) => {
  if (reason?.stack?.includes('login') || reason?.stack?.includes('connect')) {
    process.exit(1);
  }
});

login();
