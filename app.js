const fs = require('fs')
require('dotenv').config();
const tmi = require('tmi.js');

const client = new tmi.Client({
    options: { debug: true, messagesLogLevel: "info" },
    connection: {
        reconnect: true,
        secure: true
    },
    channels: [``] //Inserisci qui il nome del canale o il nome dei canali separato da una virgola a cui desideri che il bot faccia accesso esempio channels: [`Canale1`,`Canale2`] 
});

client.connect().catch(console.error);

let chatHistory = "";

client.on('message', (channel, tags, message, self) => {
    if (self) return;

    console.log(message);
    const time = new Date().toLocaleTimeString(); // ottieni l'orario formattato come stringa
    const data = `${tags.username} ${time}: ${message}\n`; // crea la stringa da scrivere nel file
    chatHistory += data;

    // Aggiungi il messaggio alla fine del file "Output.txt"
    fs.appendFile('Output.txt', data, (err) => {
        if (err) throw err;
    });
});

function getChatHistory() {
    const content = fs.readFileSync('Output.txt', 'utf-8');
    return content;
}

console.log(getChatHistory());
