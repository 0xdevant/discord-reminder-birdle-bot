"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
// Require the necessary discord.js classes
var discord_js_1 = require("discord.js");
var dotenv = require("dotenv");
var node_cron_1 = require("node-cron");
dotenv.config();
var PRIVATE_TOKEN = process.env.PRIVATE_TOKEN;
var task1, task2, task3, task4, task5;
function calculateInterval(interval, time, period) {
    if (period === "am" && time === 12) {
        time = 0;
    }
    if (period === "pm") {
        if (time === 12) {
            time = 12;
        }
        time += 12;
    }
    var res = "* ";
    if (interval === "daily") {
        res += "".concat(time.toString(), " * * *");
    }
    if (interval === "weekly") {
        res += "".concat(time.toString(), " * * ").concat(new Date().getDay());
    }
    if (interval === "monthly") {
        res += "".concat(time.toString(), " ").concat(new Date().getDate(), " * *");
    }
    return res;
}
function formatInterval(interval, time, period) {
    return "".concat(interval, " at ").concat(time).concat(period);
}
// limit to maximum five reminders
var Reminder = /** @class */ (function () {
    function Reminder(limit) {
        this.messages = [];
        this.limit = limit;
    }
    Reminder.prototype.addMessage = function (message) {
        if (this.messages.length >= this.limit)
            return;
        this.messages.push(message);
        return this.messages[this.messages.length - 1];
    };
    Reminder.prototype.removeMessage = function (id) {
        var _this = this;
        if (this.messages.length === 0)
            return;
        this.messages.find(function (message) {
            if (message.id === id) {
                _this.messages.splice(_this.messages.indexOf(message), 1);
                // console.log(this.messages.indexOf(message));
            }
        });
    };
    Reminder.prototype.findMessage = function (id) {
        if (this.messages.length === 0)
            return;
        this.messages.find(function (message) {
            return message.id === id;
        });
    };
    Reminder.prototype.getMessages = function () {
        return this.messages;
    };
    Reminder.prototype.clearMessages = function () {
        this.messages = [];
    };
    return Reminder;
}());
var reminder = new Reminder(5);
// Create a new client instance
var client = new discord_js_1.Client({ intents: [discord_js_1.GatewayIntentBits.Guilds] });
// When the client is ready, run this code (only once)
client.once("ready", function () {
    console.log("Ready!");
});
client.on("interactionCreate", function (interaction) { return __awaiter(void 0, void 0, void 0, function () {
    var commandName, message_1, interval_1, time_1, period_1, newMessage, task, messageId, messages, allMessages_1, _a;
    var _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                if (!interaction.isChatInputCommand())
                    return [2 /*return*/];
                commandName = interaction.commandName;
                if (!(commandName === "remind")) return [3 /*break*/, 2];
                message_1 = interaction.options.getString("message");
                interval_1 = interaction.options.getString("interval");
                time_1 = interaction.options.getInteger("time");
                period_1 = interaction.options.getString("period");
                if (!(message_1 && interval_1 && time_1 && period_1)) return [3 /*break*/, 2];
                newMessage = reminder.addMessage({
                    id: reminder.messages.length + 1,
                    text: message_1,
                    interval: interval_1,
                    time: time_1,
                    period: period_1
                });
                return [4 /*yield*/, interaction.reply("Message \"".concat(message_1, "\" is added\uD83D\uDE06"))];
            case 1:
                _c.sent();
                task = node_cron_1["default"].schedule(calculateInterval(interval_1, time_1, period_1), function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, interaction.followUp("".concat(message_1, " , interval: ").concat(formatInterval(interval_1, time_1, period_1)))];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); });
                if (newMessage) {
                    switch (newMessage.id) {
                        case 1:
                            task1 = task;
                        case 2:
                            task2 = task;
                        case 3:
                            task3 = task;
                        case 4:
                            task4 = task;
                        case 5:
                            task5 = task;
                    }
                }
                _c.label = 2;
            case 2:
                if (!(commandName === "remove")) return [3 /*break*/, 4];
                messageId = (_b = interaction.options.getInteger("id")) !== null && _b !== void 0 ? _b : 0;
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
                return [4 /*yield*/, interaction.reply("Message ".concat(messageId, " is removed\uD83D\uDE1B"))];
            case 3:
                _c.sent();
                _c.label = 4;
            case 4:
                if (!(commandName === "list")) return [3 /*break*/, 9];
                messages = reminder.getMessages();
                allMessages_1 = "";
                messages.map(function (message) {
                    allMessages_1 += "ID: ".concat(message.id, " | Message: ").concat(message.text, " | Schedule: ").concat(formatInterval(message.interval, message.time, message.period), " \n");
                });
                if (!(messages.length > 0)) return [3 /*break*/, 6];
                return [4 /*yield*/, interaction.reply(allMessages_1)];
            case 5:
                _a = _c.sent();
                return [3 /*break*/, 8];
            case 6: return [4 /*yield*/, interaction.reply("No pending reminder message😌")];
            case 7:
                _a = _c.sent();
                _c.label = 8;
            case 8:
                _a;
                _c.label = 9;
            case 9:
                if (!(commandName === "clear")) return [3 /*break*/, 11];
                task1.stop();
                task2.stop();
                task3.stop();
                task4.stop();
                task5.stop();
                reminder.clearMessages();
                return [4 /*yield*/, interaction.reply("Clean now\uD83D\uDE0E")];
            case 10:
                _c.sent();
                _c.label = 11;
            case 11: return [2 /*return*/];
        }
    });
}); });
// Login to Discord with your client's token
client.login(PRIVATE_TOKEN);
