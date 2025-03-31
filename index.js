const progressBarOfThisYear = generateProgressBar()

function generateProgressBar(len) {
  const thisYear = new Date().getFullYear()
  const startTimeOfThisYear = new Date(`${thisYear}-01-01T00:00:00+00:00`).getTime()
  const endTimeOfThisYear = new Date(`${thisYear}-12-31T23:59:59+00:00`).getTime()
  const progressOfThisYear = (Date.now() - startTimeOfThisYear) / (endTimeOfThisYear - startTimeOfThisYear)
  const passedProgressBarIndex = parseInt(progressOfThisYear * len)
  const progressBar =
    '█'.repeat(passedProgressBarIndex) +
    '▁'.repeat(len - passedProgressBarIndex)
  return `${parseFloat(progressOfThisYear * 100)}% { ${progressBar} }<br>${passedProgressBarIndex}/${len}`
}

function displayPrograssBar() {
  document.querySelectorAll('p')[0].innerHTML = generateProgressBar(parseInt(document.querySelectorAll("input")[0].value));
}

document.querySelectorAll("input")[0].value = "52"
document.querySelectorAll('p')[0].textContent = generateProgressBar();
