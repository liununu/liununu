let thisYear;
let thisMonth;
let firstMonth;
let thisDay;
let thisWeek;
let thisHour;
let thiMinute;
let thisSecond;

const progressBarOfThisYear = generateYear(15)
const progressBarOfThisMonth = generateMonth(15)
const progressBarOfThisSeason = generateSeason(15)
const progressBarOfThisDay = generateDay(15)

document.querySelector('input').value = "15";

function generateProgressBar(passed, len, round){
  const passedProgressBarIndex = parseInt(passed * len)
  const progressBar =
    '█'.repeat(passedProgressBarIndex) +
    '▁'.repeat(len - passedProgressBarIndex)
  return `${passedProgressBarIndex}/${len} { ${progressBar} }<br><br><a style="color:rgb(201, 201, 201);">${Math.round(parseFloat(passed * 100) * round) / round}%</a>`
}

function generateYear(len) {
  thisYear = new Date().getFullYear()
  const startTimeOfThisYear = new Date(`${thisYear}-01-01T00:00:00+00:00`).getTime()
  const endTimeOfThisYear = new Date(`${thisYear}-12-31T23:59:59+00:00`).getTime()
  const progressOfThisYear = (Date.now() - startTimeOfThisYear) / (endTimeOfThisYear - startTimeOfThisYear)
  return generateProgressBar(progressOfThisYear, len, 10000000);

}

function generateSeason(len) {
  firstMonth = new Date().getMonth() + 1 - (new Date().getMonth() + 1) % 3
  let lastDay;
  switch(firstMonth){
    case 0:
      if(thisYear % 4 == 0){
        lastDay = 29
      } else {
        lastDay = 28
      }
      firstMonth = 12
    case 3:
      lastDay = 31
    case 6:
      lastDay = 31
    case 9:
      lastDay = 30
  }
  const startTimeOfThisSeason = new Date(`${thisYear}-${firstMonth.toString().padStart(2, "0")}-01T00:00:00+00:00`).getTime()
  const endTimeOfThisSeason = new Date(`${thisYear}-${(firstMonth + 3).toString().padStart(2, "0")}-${lastDay}T23:59:59+00:00`).getTime()
  const progressOfThisSeason = (Date.now() - startTimeOfThisSeason) / (endTimeOfThisSeason - startTimeOfThisSeason)
  return generateProgressBar(progressOfThisSeason, len, 10000000);
}

function generateMonth(len) {
  thisMonth = new Date().getMonth()
  const startTimeOfThisMonth = new Date(`${thisYear}-${(thisMonth+1).toString().padStart(2, "0")}-01T00:00:00+00:00`).getTime()
  const endTimeOfThisMonth = new Date(`${thisYear}-${(thisMonth+1).toString().padStart(2, "0")}-30T23:59:59+00:00`).getTime()
  const progressOfThisMonth = (Date.now() - startTimeOfThisMonth) / (endTimeOfThisMonth - startTimeOfThisMonth)
  return generateProgressBar(progressOfThisMonth, len, 10000000);
}

function generateWeek(len) {
  const startTimeOfThisWeek = new Date(`1970-01-01T00:00:00+00:00`).getTime()
  const currentTimeOfThisWeek = new Date(`1970-01-0${new Date().getDay()}T${new Date().getHours().toString().padStart(2, "0")}:${new Date().getMinutes().toString().padStart(2, "0")}:${new Date().getSeconds().toString().padStart(2, "0")}+00:00`).getTime() + new Date().getMilliseconds()
  const endTimeOfThisWeek = new Date(`1970-01-07T23:59:59+00:00`).getTime()
  const progressOfThisWeek = (currentTimeOfThisWeek - startTimeOfThisWeek) / (endTimeOfThisWeek - startTimeOfThisWeek)
  return generateProgressBar(progressOfThisWeek, len, 1000000);
}

function generateDay(len) {
  thisDay = new Date().getDate()
  const startTimeOfThisDay = new Date(`1970-01-01T00:00:00+00:00`).getTime()
  const currentTimeOfThisDay = new Date(`1970-01-01T${new Date().getHours().toString().padStart(2, "0")}:${new Date().getMinutes().toString().padStart(2, "0")}:${new Date().getSeconds().toString().padStart(2, "0")}+00:00`).getTime() + new Date().getMilliseconds()
  const endTimeOfThisDay = new Date(`1970-01-01T23:59:59+00:00`).getTime()
  const progressOfThisDay = (currentTimeOfThisDay - startTimeOfThisDay) / (endTimeOfThisDay - startTimeOfThisDay)
  return generateProgressBar(progressOfThisDay, len, 100000);
}

function generateHour(len) {
  const startTimeOfThisHour = new Date(`1970-01-01T00:00:00+00:00`).getTime()
  const currentTimeOfThisHour = new Date(`1970-01-01T00:${new Date().getMinutes().toString().padStart(2, "0")}:${new Date().getSeconds().toString().padStart(2, "0")}+00:00`).getTime() + new Date().getMilliseconds()
  const endTimeOfThisHour = new Date(`1970-01-01T00:59:59+00:00`).getTime()
  const progressOfThisHour = (currentTimeOfThisHour - startTimeOfThisHour) / (endTimeOfThisHour - startTimeOfThisHour)
  return generateProgressBar(progressOfThisHour, len, 1000);
}

function generateMinute(len) {
  const startTimeOfThisMinute = new Date(`1970-01-01T00:00:00+00:00`).getTime()
  const currentTimeOfThisMinute = new Date(`1970-01-01T00:00:${new Date().getSeconds().toString().padStart(2, "0")}+00:00`).getTime() + new Date().getMilliseconds()
  const endTimeOfThisMinute = new Date(`1970-01-01T00:00:59+00:00`).getTime()
  const progressOfThisMinute = (currentTimeOfThisMinute - startTimeOfThisMinute) / (endTimeOfThisMinute - startTimeOfThisMinute)
  return generateProgressBar(progressOfThisMinute, len, 100);
}

function generateSecond(len) {
  const startTimeOfThisHour = new Date(`1970-01-01T00:00:00+00:00`).getTime()
  const currentTimeOfThisHour = new Date(`1970-01-01T00:00:00+00:00`).getTime() + new Date().getMilliseconds()
  const endTimeOfThisHour = new Date(`1970-01-01T00:00:01+00:00`).getTime()
  const progressOfThisHour = (currentTimeOfThisHour - startTimeOfThisHour) / (endTimeOfThisHour - startTimeOfThisHour)
  return generateProgressBar(progressOfThisHour, len, 10);
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


setInterval(displayProgressBar, 1);


