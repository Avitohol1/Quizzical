const getQuestions = async (gameOptions) => {
    const { category, difficulty, type } = gameOptions

    let categoryQuery = ""
    let difficultyQuery = ""
    let typeQuery = ""

    if (category !== "") categoryQuery = `&category=${category}`
    if (difficulty !== "") difficultyQuery = `&difficulty=${difficulty}`
    if (type !== "") typeQuery = `&type=${type}`

    const url = `https://opentdb.com/api.php?amount=5${categoryQuery}${difficultyQuery}${typeQuery}`

    try {
        const response = await fetch(url)
        const data = await response.json()
        return data.results
    } catch (err) {
        console.log(err)
    }
}

export default getQuestions
