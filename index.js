let thisYear;
let thisMonth;
let firstMonth;
let thisDay;
let thisWeek;
let thisHour;
let thiMinute;
let thisSecond;
let padZeros;
let percentage_output = 100;
let percInp;
let totalTime = 0;
let progressOfThisYear
let progressOfThisSeason;
let progressOfThisMonth
let progressOfThisWeek
let progressOfThisDay
let progressOfThisHour
let progressOfThisMinute
/* 
0 - year
1 - season
2 - month
3 - week
4 - day
5 - hour
6 - minute
7 - second
*/

const comments = ["3 days 15 hours 50 minutes 24 seconds", "21 hours 36 minutes 0 seconds", "7 hours 12 minutes 0 seconds","1 hours 40 minutes 48 seconds","14 minutes 24 seconds","36 seconds","0.6 seconds","0.01 seconds"]
let inputs = []
let timestamps = []

const progressBarOfThisYear = generateYear(15)
const progressBarOfThisMonth = generateMonth(15)
const progressBarOfThisSeason = generateSeason(15)
const progressBarOfThisDay = generateDay(15)

document.querySelector('input').value = "15";

function generateProgressBar(passed, len, round, id){
  let passedProgressBarIndex = parseInt(passed * len)
  let progressBar;
  if(isNaN(len)) {
    progressBar =
    '?'.repeat(Math.round(passed * 5)) +
    '   '.repeat(5 - Math.round(passed * 5))
  } if(len <= 50 & len > 0){
    progressBar =
    '█'.repeat(passedProgressBarIndex) +
    '▁'.repeat(len - passedProgressBarIndex)
  } else if(len<0) {
    len = Math.round(Math.random() * 25)
        progressBar =
    '▁'.repeat(Math.round(passed * 5)) +
    '█'.repeat(len - Math.round(passed * 5))
    
    percentage_output = -1501
  } else if(len == 0){
    if(passed == progressOfThisYear) {
      len = 12
    } else if(passed == progressOfThisSeason) {
      len = 3
    } else if(passed == progressOfThisMonth) {
      len = 30
    } else if(passed == progressOfThisWeek) {
      len = 7
    } else if(passed == progressOfThisDay) {
      len = 24
    } else if(passed == progressOfThisHour) {
      len = 60
    } else if(passed == progressOfThisMinute) {
      len = 60
    } else { len = 10}
    passedProgressBarIndex = parseInt(passed * len)
    progressBar =
      '█'.repeat(passedProgressBarIndex) +
      '▁'.repeat(len - passedProgressBarIndex)
  } if(len > 50) {
    progressBar =
    `█x${passedProgressBarIndex}` +
    `▁x${len - passedProgressBarIndex}`
  }
  padZeros = 2;
  if(passed == progressOfThisSeason){
    padZeros = 1;
  }
  if(percentage_output != -1501){
    if(!document.getElementById("percentage").checked){
      percentage_output = parseFloat(passed) * 100;
    } else {
      percentage_output = (Math.round(parseFloat(passed * 100) * round) / round).toString().padEnd(round.toString().length + padZeros, "0");
    }
  } else {
    percentage_output = Math.round(Math.random() * 100)
  }

  
  if(document.getElementById("comments").checked){
    return `${passedProgressBarIndex}/${len} [ ${progressBar} ]<br><br><a style="color:rgb(201, 201, 201);">${percentage_output}%</a><br><a style="color: rgb(109, 109, 109); font-size: 10px">1% = ${comments[id]}</a>`
  }
  return `${passedProgressBarIndex}/${len} [ ${progressBar} ]<br><br><a style="color:rgb(201, 201, 201);">${percentage_output}%</a>`
}

function generateYear(len) {
  thisYear = new Date().getFullYear()
  const startTimeOfThisYear = new Date(`${thisYear}-01-01T00:00:00+00:00`).getTime()
  const endTimeOfThisYear = new Date(`${thisYear}-12-31T23:59:59+00:00`).getTime()
  progressOfThisYear = (Date.now() - startTimeOfThisYear) / (endTimeOfThisYear - startTimeOfThisYear)
  return generateProgressBar(progressOfThisYear, len, 100000000, 0);

}

function generateSeason(len) {
  firstMonth = new Date().getMonth() + 1 - (new Date().getMonth() + 1) % 3
  const startTimeOfThisSeason = new Date(`${thisYear}-${firstMonth.toString().padStart(2, "0")}-01T00:00:00+00:00`).getTime()
  const endTimeOfThisSeason = new Date(`${thisYear}-${(firstMonth + 4).toString().padStart(2, "0")}-01T00:00:00+00:00`).getTime()
  progressOfThisSeason = (Date.now() - startTimeOfThisSeason) / (endTimeOfThisSeason - startTimeOfThisSeason)
  return generateProgressBar(progressOfThisSeason, len, 10000000, 1);
}

function generateMonth(len) {
  thisMonth = new Date().getMonth()
  const startTimeOfThisMonth = new Date(`${thisYear}-${(thisMonth+1).toString().padStart(2, "0")}-01T00:00:00+00:00`).getTime()
  const endTimeOfThisMonth = new Date(`${thisYear}-${(thisMonth+2).toString().padStart(2, "0")}-01T00:00:00+00:00`).getTime()
  progressOfThisMonth = (Date.now() - startTimeOfThisMonth) / (endTimeOfThisMonth - startTimeOfThisMonth)
  return generateProgressBar(progressOfThisMonth, len, 10000000, 2);
}

function generateWeek(len) {
  const startTimeOfThisWeek = new Date(`1970-01-01T00:00:00+00:00`).getTime()
  const currentTimeOfThisWeek = new Date(`1970-01-0${new Date().getDay()}T${new Date().getHours().toString().padStart(2, "0")}:${new Date().getMinutes().toString().padStart(2, "0")}:${new Date().getSeconds().toString().padStart(2, "0")}+00:00`).getTime() + new Date().getMilliseconds()
  const endTimeOfThisWeek = new Date(`1970-01-07T23:59:59+00:00`).getTime()
  progressOfThisWeek = (currentTimeOfThisWeek - startTimeOfThisWeek) / (endTimeOfThisWeek - startTimeOfThisWeek)
  return generateProgressBar(progressOfThisWeek, len, 1000000, 3);
}

function generateDay(len) {
  thisDay = new Date().getDate()
  const startTimeOfThisDay = new Date(`1970-01-01T00:00:00+00:00`).getTime()
  const currentTimeOfThisDay = new Date(`1970-01-01T${new Date().getHours().toString().padStart(2, "0")}:${new Date().getMinutes().toString().padStart(2, "0")}:${new Date().getSeconds().toString().padStart(2, "0")}+00:00`).getTime() + new Date().getMilliseconds()
  const endTimeOfThisDay = new Date(`1970-01-02T00:00:00+00:00`).getTime()
  progressOfThisDay = (currentTimeOfThisDay - startTimeOfThisDay) / (endTimeOfThisDay - startTimeOfThisDay)
  return generateProgressBar(progressOfThisDay, len, 100000, 4);
}

function generateHour(len) {
  const startTimeOfThisHour = new Date(`1970-01-01T00:00:00+00:00`).getTime()
  const currentTimeOfThisHour = new Date(`1970-01-01T00:${new Date().getMinutes().toString().padStart(2, "0")}:${new Date().getSeconds().toString().padStart(2, "0")}+00:00`).getTime() + new Date().getMilliseconds()
  const endTimeOfThisHour = new Date(`1970-01-01T01:00:00+00:00`).getTime()
  progressOfThisHour = (currentTimeOfThisHour - startTimeOfThisHour) / (endTimeOfThisHour - startTimeOfThisHour)
  return generateProgressBar(progressOfThisHour, len, 1000, 5);
}

function generateMinute(len) {
  const startTimeOfThisMinute = new Date(`1970-01-01T00:00:00+00:00`).getTime()
  const currentTimeOfThisMinute = new Date(`1970-01-01T00:00:${new Date().getSeconds().toString().padStart(2, "0")}+00:00`).getTime() + new Date().getMilliseconds()
  const endTimeOfThisMinute = new Date(`1970-01-01T00:01:00+00:00`).getTime()
  progressOfThisMinute = (currentTimeOfThisMinute - startTimeOfThisMinute) / (endTimeOfThisMinute - startTimeOfThisMinute)
  return generateProgressBar(progressOfThisMinute, len, 100, 6);
}

function generateSecond(len) {
  const startTimeOfThisHour = new Date(`1970-01-01T00:00:00+00:00`).getTime()
  const currentTimeOfThisHour = new Date(`1970-01-01T00:00:00+00:00`).getTime() + new Date().getMilliseconds()
  const endTimeOfThisHour = new Date(`1970-01-01T00:00:01+00:00`).getTime()
  progressOfThisHour = (currentTimeOfThisHour - startTimeOfThisHour) / (endTimeOfThisHour - startTimeOfThisHour)
  return generateProgressBar(progressOfThisHour, len, 10, 7);
}

function displayProgressBar() {
  document.getElementById('year').innerHTML = generateYear(parseInt(document.querySelector("input").value));
  document.getElementById('season').innerHTML = generateSeason(parseInt(document.querySelector("input").value));
  document.getElementById('month').innerHTML = generateMonth(parseInt(document.querySelector("input").value));
  document.getElementById('day').innerHTML = generateDay(parseInt(document.querySelector("input").value));
  document.getElementById('week').innerHTML = generateWeek(parseInt(document.querySelector("input").value));
  document.getElementById('hour').innerHTML = generateHour(parseInt(document.querySelector("input").value));
  document.getElementById('minute').innerHTML = generateMinute(parseInt(document.querySelector("input").value));
  document.getElementById('second').innerHTML = generateSecond(parseInt(document.querySelector("input").value));
}

function convert() {
  inputs = []
  for(let i = 0; i < 8; i++){
    console.log(parseFloat(document.getElementById(["year", "season", "month", "week", "day", "hour", "minute", "second"][i] + "-inp").value))
    inputs.push(isNaN(parseFloat(document.getElementById(["year", "season", "month", "week", "day", "hour", "minute", "second"][i] + "-inp").value)) ? 0 : parseFloat(document.getElementById(["year", "season", "month", "week", "day", "hour", "minute", "second"][i] + "-inp").value))
  }
  totalTime += parseInt(inputs[0]) * 31622400 // year
  totalTime += parseInt(inputs[1]) * 7776000 // season
  totalTime += parseInt(inputs[2]) * 2592000 // month
  totalTime += parseInt(inputs[3]) * 604800 // week
  totalTime += parseInt(inputs[4]) * 86400 // day
  totalTime += parseInt(inputs[5]) * 3600 // hour
  totalTime += parseInt(inputs[6]) * 60 // minute
  totalTime += parseInt(inputs[7]) // second
  document.getElementById("convert-result").innerHTML = `${formatTime(totalTime)[0]} years ${formatTime(totalTime)[1]} months ${formatTime(totalTime)[2]} days ${formatTime(totalTime)[3]} hours ${formatTime(totalTime)[4]} minutes ${formatTime(totalTime)[5]} seconds <p>equals...</p>`
  document.getElementById("result").innerHTML = `${Math.round(totalTime / 316224 * 10000000) / 10000000}% of year<br>${Math.round(totalTime / 77760 * 1000000) / 1000000}% of season<br>${Math.round(totalTime / 25920 * 1000000) / 1000000}% of month<br>${Math.round(totalTime / 6048 * 100000) / 100000}% of week<br>${Math.round(totalTime / 864 * 10000) / 10000}% of day<br>
${Math.round(totalTime / 36 * 1000) / 1000}% of hour<br>${Math.round(totalTime / 0.6 * 100) / 100}% of minute<br>${Math.round(totalTime / 0.01)}% of second`
  totalTime = 0
}

function formatTime(inp_seconds) {
  let min = Math.floor(inp_seconds / 60)
  let sec = Math.round(inp_seconds % 60 * 100) / 100

  let hrs = Math.floor(min / 60)
  min %= 60

  let day = Math.floor(hrs / 24)
  hrs %= 24

  let months = Math.floor(day / 30)
  day %= 30
  
  let y = Math.floor(months / 12)
  months %= 12

  return [y, months, day, hrs, min, sec]
}

function displayPercResult(magnitude, multiplier) {
  document.getElementById("perc-result").innerHTML += `<h2>${Math.round(percInp * 100000000000000 ) / 1000000000000}% of ${magnitude}<h2><p style="color: rgb(161, 161, 161); font-size: 15px;">${formatTime(percInp * multiplier)[0]} years ${(formatTime(percInp * multiplier)[1])} months ${formatTime(percInp * multiplier)[2]} days ${formatTime(percInp * multiplier)[3]} hours ${formatTime(percInp * multiplier)[4]} minutes ${formatTime(percInp * multiplier)[5]} seconds<br>`
}
function percConvert() {
  percInp = parseFloat(document.getElementById("perc-inp").value) / 100

  document.getElementById("perc-result").innerHTML = ''
  displayPercResult("year", 31622400)
  displayPercResult("season", 7776000)
  displayPercResult("month",  2592000)
  displayPercResult("week", 604800)
  displayPercResult("day", 86400)
  displayPercResult("hour", 3600)
  displayPercResult("minute", 60)
  displayPercResult("second", 1)
} 

setInterval(displayProgressBar, 1);


