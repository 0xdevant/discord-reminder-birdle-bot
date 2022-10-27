# discord-reminder-birdle-bot
Discord bot that sends reminder message automatically by specifying in daily/weekly/monthly intervals (5 reminders at max atm)

### `/remind(message, interval, time, period)` 
Set up a reminder message by specifying its:
- interval **(daily/weekly/monthly)**
- hour **(1-12)**
- period **(AM/PM)**

### `/remove(id)` 
Remove a specific reminder message and stop its cron job, by providing the ID of the message

### `/clear`
Clear all reminder messages from the list and stop their cron jobs

### `/list`
View all messages from the list including their ID, message and schedule
