"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Require the necessary discord.js classes
const discord_js_1 = require("discord.js");
const dotenv = __importStar(require("dotenv"));
const node_cron_1 = __importDefault(require("node-cron"));
dotenv.config();
const PRIVATE_TOKEN = process.env.PRIVATE_TOKEN;
var task1, task2, task3, task4, task5;
function calculateInterval(interval, time, period) {
    if (period === "am" && time === 12) {
        time = 0;
    }
    if (period === "pm") {
        if (time === 12) {
            time = 12;
        }
        else {
            time += 12;
        }
    }
    let res = "0 ";
    if (interval === "daily") {
        res += `${time.toString()} * * *`;
    }
    if (interval === "weekly") {
        res += `${time.toString()} * * ${new Date().getDay()}`;
    }
    if (interval === "monthly") {
        res += `${time.toString()} ${new Date().getDate()} * *`;
    }
    return node_cron_1.default.validate(res) ? res : "";
}
function formatInterval(interval, time, period) {
    return `${interval} at ${time}${period}`;
}
// limit to maximum five reminders
class Reminder {
    constructor(limit) {
        this.messages = [];
        this.limit = limit;
    }
    addMessage(message) {
        if (this.messages.length >= this.limit)
            return;
        this.messages.push(message);
        return this.messages[this.messages.length - 1];
    }
    removeMessage(id) {
        if (this.messages.length === 0)
            return;
        this.messages.find((message) => {
            if (message.id === id) {
                this.messages.splice(this.messages.indexOf(message), 1);
                // console.log(this.messages.indexOf(message));
            }
        });
    }
    findMessage(id) {
        if (this.messages.length === 0)
            return;
        this.messages.find((message) => {
            return message.id === id;
        });
    }
    getMessages() {
        return this.messages;
    }
    clearMessages() {
        this.messages = [];
    }
}
const reminder = new Reminder(5);
// Create a new client instance
const client = new discord_js_1.Client({ intents: [discord_js_1.GatewayIntentBits.Guilds] });
// When the client is ready, run this code (only once)
client.once("ready", () => {
    console.log("Ready!");
});
client.on("interactionCreate", (interaction) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (!interaction.isChatInputCommand())
        return;
    const { commandName } = interaction;
    if (commandName === "remind") {
        const message = interaction.options.getString("message");
        const interval = interaction.options.getString("interval");
        const time = interaction.options.getInteger("time");
        const period = interaction.options.getString("period");
        if (message && interval && time && period) {
            const newMessage = reminder.addMessage({
                id: reminder.messages.length + 1,
                text: message,
                interval: interval,
                time: time,
                period: period,
            });
            yield interaction.reply(`Message "${message}" is added😆`);
            var task = node_cron_1.default.schedule(calculateInterval(interval, time, period), () => __awaiter(void 0, void 0, void 0, function* () {
                yield interaction.followUp(`${message}`);
            }), {
                scheduled: false,
                timezone: "Asia/Hong_Kong",
            });
            if (newMessage) {
                switch (newMessage.id) {
                    case 1:
                        task1 = task;
                        task1.start();
                    case 2:
                        task2 = task;
                        task2.start();
                    case 3:
                        task3 = task;
                        task3.start();
                    case 4:
                        task4 = task;
                        task4.start();
                    case 5:
                        task5 = task;
                        task5.start();
                }
            }
        }
    }
    if (commandName === "remove") {
        const messageId = (_a = interaction.options.getInteger("id")) !== null && _a !== void 0 ? _a : 0;
        reminder.removeMessage(messageId);
        // stop the cron task by messageId
        switch (messageId) {
            case 1:
                task1.stop();
            case 2:
                task2.stop();
            case 3:
                task3.stop();
            case 4:
                task4.stop();
            case 5:
                task5.stop();
        }
        yield interaction.reply(`Message ${messageId} is removed😛`);
    }
    if (commandName === "list") {
        const messages = reminder.getMessages();
        let allMessages = "";
        messages.map((message) => {
            allMessages += `ID: ${message.id} | Message: ${message.text} | Schedule: ${formatInterval(message.interval, message.time, message.period)} \n`;
        });
        messages.length > 0
            ? yield interaction.reply(allMessages)
            : yield interaction.reply("No pending reminder message😌");
    }
    if (commandName === "clear") {
        task1.stop();
        task2.stop();
        task3.stop();
        task4.stop();
        task5.stop();
        reminder.clearMessages();
        yield interaction.reply(`Clean now😎`);
    }
}));
// Login to Discord with your client's token
client.login(PRIVATE_TOKEN);
