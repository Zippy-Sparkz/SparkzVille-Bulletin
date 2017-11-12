const Discord = require('discord.js');
const bot = new Discord.Client();
var hour = 0;
var minute = 0;
var season = ["Spring", "Summer", "Fall", "Winter"];
var starting_season = 0;
var current_season = season[0];
var weather = ["Sunny", "Cloudy", "Rain", "Thunderstorm", "Tropical Storm", "Hurricane"];
var winter_weather = ["Sunny", "Cloudy", "Snow", "Blizzard"];
var current_weather = weather[0];
var current_weather_winter = winter_weather[0];
var weekday = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
var current_weekday = weekday[0];
var starting_weekday = 0;

function SetWeekDay(val) {
    var new_weekday = parseInt(starting_weekday) + val;

    if(new_weekday > 6) {
        new_weekday = 0;
    }

    if(new_weekday < 0) {
        new_weekday = 0;
    }

    starting_weekday = new_weekday;
    current_weekday = weekday[starting_weekday]
}

function SetWeather() {
    var new_weather = weather[Math.floor(Math.random() * 6)];

    if(current_season == season[3]) {
        var new_weather_winter = winter_weather[Math.floor(Math.random() * 4)];
        current_weather_winter = new_weather_winter;
    }

    if(current_season == season[2]) {
        current_weather = new_weather;
    }

    if(current_season == season[1]) {
        current_weather = new_weather;
    }

    if(current_season == season[0]) {
        current_weather = new_weather;
    }
}

function SetSeason(val) {
    var new_season = parseInt(starting_season) + val;

    if(new_season > 3) {
        new_season = 0;
    }

    if(new_season < 0) {
        new_season = 0;
    }

    starting_season = new_season
    current_season = season[starting_season];
}

function SetTime(val) {
    var new_hour = hour + 1;
    var new_minute = parseInt(minute) + val;

    if(new_minute > 59) {
        new_minute = 0;
        hour = new_hour;
    }
    
    if(new_minute < 0) {
        new_minute = 0;
    }

    if (new_hour > 23) {
        new_hour = 0;
    }

    if(new_hour < 0) {
        new_hour = 0;
    }

    minute = new_minute;
}

function CurrentWeather() {
    bot.channels.get('378366881683341314').send("The weather is currently " + current_weather);
}

function CurrentWeekDay () {
    SetWeekDay(0);
    bot.channels.get('378366881683341314').send("It is " + current_weekday);
}

function CurrentSeason() {
    SetSeason(0);
    bot.channels.get('378366881683341314').send("It is currently " + current_season);
}

function CurrentTime() {
    SetTime(0);

    if(minute < 10) {
        bot.channels.get('378366881683341314').send("The time is currently " + hour + ":0" + minute);
    }

    if(minute == 10) {
        bot.channels.get('378366881683341314').send("The time is currently " + hour + ":" + minute);
    }

    if(minute > 10) {
        bot.channels.get('378366881683341314').send("The time is currently " + hour + ":" + minute);
    }
}

setInterval(function(){ SetTime(1); }, 12000);

setInterval(function(){ SetWeather(); }, 17280000);

setInterval(function(){ SetWeekDay(1); }, 17280000);

setInterval(function(){ SetSeason(1); }, 535680000);

if(starting_season == 3) {
    setInterval(function(){ bot.channels.get('378366881683341314').send("The weather is now " + current_weather_winter); }, 17280001);
}

if(starting_season < 3) {
    setInterval(function(){ bot.channels.get('378366881683341314').send("The weather is now " + current_weather); }, 17280001);
}

setInterval(function(){ bot.channels.get('378366881683341314').send("It's now " + current_weekday); }, 17280001);

setInterval(function(){ bot.channels.get('378366881683341314').send("It is now " + current_season); }, 535680001)

bot.on('message', (message) => {
 
    if(message.content == '!time') {
        CurrentTime();
    }

    if(message.content == '!season') {
        CurrentSeason();
    }

    if(message.content == '!weekday') {
        CurrentWeekDay();
    }

    if(message.content == '!weather') {
        CurrentWeather();
    }

});

bot.login(process.env.BOT_TOKEN);
