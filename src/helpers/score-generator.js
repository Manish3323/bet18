
/**
 * @description this function checks whether the prediction and actual scores are equal
 * @param {*} prediction
 * @param {*} match
 * @returns true: when prediction is correct else false
 */
const equalScores = (prediction, match) => {
  return parseInt(prediction.homeScore) === parseInt(match.homeScore) && parseInt(prediction.awayScore) === parseInt(match.awayScore)
}
/**
 * @description this function checks whether the prediction and actual scores are unequal
 * @param {*} prediction
 * @param {*} match
 * @returns true: when prediction is correct else false
 */
const unequalScores = (prediction, match) => {
  return parseInt(prediction.homeScore) !== parseInt(match.homeScore) || parseInt(prediction.awayScore) !== parseInt(match.awayScore)
}
/**
 * @description this function only checks whether the prediction of winning team is correct or not
 * @param {*} prediction
 * @param {*} match
 * @returns true: when prediction is correct else false
 */
const differenceChecker = (prediction, match) => {
  return (parseInt(match.homeScore) > parseInt(match.awayScore) && parseInt(prediction.homeScore) > parseInt(prediction.awayScore)) ||
          (parseInt(match.homeScore) < parseInt(match.awayScore) && parseInt(prediction.homeScore) < parseInt(prediction.awayScore))
}
/**
 * @description this function checks whether the match prediction is strictly exact
 * @param {*} prediction
 * @param {*} match
 * @returns true: when prediction is correct else false
 * @author Manish Gowardipe @manish3323
 */
const predictionIsActualScore = (prediction, match) => {
  return equalScores(prediction, match) && parseInt(match.homeScore) !== parseInt(match.awayScore) && predictionWinnerCorrect(prediction, match)
}

/**
 * @description this function checks whether the match is strictly a draw
 * @param {*} prediction
 * @param {*} match
 * @returns true: when prediction is correct else false
 * @author Manish Gowardipe @manish3323
 */
const predictionIsDraw = (prediction, match) => {
  return equalScores(prediction, match) && parseInt(match.homeScore) === parseInt(match.awayScore)
}
/**
 * @description this function checks whether the winner is correctly predicted or not
 * @param {*} prediction
 * @param {*} match
 * @returns true: when prediction is correct else false
 * @author Manish Gowardipe @manish3323
 */
const predictionWinnerCorrect = (prediction, match) => {
  return unequalScores(prediction, match) && differenceChecker(prediction, match)
}

/**
 * @description calculates points for a predcition made on a single match by comparing with actual
 * @description match scores with different scenarios
 * @param {*prediction} param0
 * @param {*matches } param1
 */
export const generatePoints = ({prediction, match}) => {
  let sum = 0
  if (predictionIsActualScore(prediction, match)) {
    sum += 10
  } else if (predictionIsDraw(prediction, match)) {
    sum += 8
  } else if (predictionWinnerCorrect(prediction, match)) {
    sum += 7
  }
  return sum
}
export const weightOfMatch = ({match, points}) => {
  return points * mapLevelToPoints(match.level)
}

const mapLevelToPoints = (level) => {
  return LEVEL[level]
}

const LEVEL = {
  'group': 0.4,
  'quarter': 0.6,
  'semi': 0.8,
  'final': 0.9
}
