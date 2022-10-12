// Require the necessary discord.js classes
import { REST, SlashCommandBuilder, Routes } from "discord.js";
import * as dotenv from "dotenv";
dotenv.config();

const CLIENT_ID =
  process.env.CLIENT_ID !== undefined ? process.env.CLIENT_ID : "";
const GUILD_ID = process.env.GUILD_ID !== undefined ? process.env.GUILD_ID : "";
const PRIVATE_TOKEN =
  process.env.PRIVATE_TOKEN !== undefined ? process.env.PRIVATE_TOKEN : "";

const commands = [
  new SlashCommandBuilder()
    .setName("remind")
    .setDescription("Sends reminder message with a fixed interval")
    .addStringOption((option) =>
      option
        .setName("message")
        .setDescription("The message to send out")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("interval")
        .setDescription("How often you want the message to be sent")
        .setRequired(true)
        .addChoices(
          { name: "Daily", value: "daily" },
          { name: "Weekly", value: "weekly" },
          { name: "Monthly", value: "monthly" }
        )
    )
    .addIntegerOption((option) =>
      option
        .setName("time")
        .setDescription("Which hour you want the message to be sent")
        .setRequired(true)
        .addChoices(
          { name: "1", value: 1 },
          { name: "2", value: 2 },
          { name: "3", value: 3 },
          { name: "4", value: 4 },
          { name: "5", value: 5 },
          { name: "6", value: 6 },
          { name: "7", value: 7 },
          { name: "8", value: 8 },
          { name: "9", value: 9 },
          { name: "10", value: 10 },
          { name: "11", value: 11 },
          { name: "12", value: 12 }
        )
    )
    .addStringOption((option) =>
      option
        .setName("period")
        .setDescription("Which period you want the message to be sent")
        .setRequired(true)
        .addChoices({ name: "AM", value: "am" }, { name: "PM", value: "pm" })
    ),
  new SlashCommandBuilder()
    .setName("remove")
    .setDescription(
      "Remove message with a specific ID, can check by typing `list`"
    )
    .addIntegerOption((option) =>
      option
        .setName("id")
        .setDescription("The message ID to remove the message")
        .setRequired(true)
    ),
  new SlashCommandBuilder()
    .setName("clear")
    .setDescription("Clear all reminder messages from the list"),
  new SlashCommandBuilder()
    .setName("list")
    .setDescription("View all messages from the list"),
].map((command) => command.toJSON());

const rest = new REST({ version: "10" }).setToken(PRIVATE_TOKEN);

rest
  .put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), { body: commands })
  .then((data: any) =>
    console.log(`Successfully registered ${data.length} application commands.`)
  )
  .catch(console.error);

// rest
//   .put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), { body: [] })
//   .then(() => console.log("Successfully deleted all guild commands."))
//   .catch(console.error);
