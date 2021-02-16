// the current year
const year = new Date().getFullYear()

// strart
const start = new Date(`${year}-01-01T00:00:00+00:00`).getTime()

// end
const end = new Date(`${year}-12-31T23:59:59+00:00`).getTime()
const progress = (Date.now() - start) / (end - start)


const createProgressBar = () => {
	const progressBarIndex = parseInt(progress * 30)

	const progressBar = Array(30)
        .fill('.')
        .map((value, index) => index < progressBarIndex ? '█' : value)
        .join('')
    return `[${progressBar}]`

}
// █

module.exports = {createProgressBar}

