// Iteration 1: All directors? - Get the array of all directors.
// _Bonus_: It seems some of the directors had directed multiple movies so they will pop up multiple times in the array of directors.
// How could you "clean" a bit this array and make it unified (without duplicates)?
function getAllDirectors(moviesArray) {
  return [...new Set(moviesArray.map(movie => movie.director))]; // Bonus done
}
 
// Iteration 2: Steven Spielberg. The best? - How many drama movies did STEVEN SPIELBERG direct?
function howManyMovies(moviesArray) {
  return moviesArray.filter((movie) => movie.director === 'Steven Spielberg' && movie.genre.includes('Drama')).length;
}

// Iteration 3: All scores average - Get the average of all scores with 2 decimals
function scoresAverage(moviesArray) {
  if (!Array.isArray(moviesArray) || moviesArray.length === 0) return 0;

  const total = moviesArray.reduce((sum, movie) => {
    return sum + (typeof movie.score === "number" && !isNaN(movie.score) ? movie.score : 0);
  }, 0);

  const avg = total / moviesArray.length;
  return Number(avg.toFixed(2));
}

// Iteration 4: Drama movies - Get the average of Drama Movies
function dramaMoviesScore(moviesArray) {
  const dramaMovies = moviesArray.filter((movie) => movie.genre.includes('Drama'));
  return scoresAverage(dramaMovies);
}

// Iteration 5: Ordering by year - Order by year, ascending (in growing order)
function orderByYear(moviesArray) {
  return moviesArray.toSorted((a, b) => {
        if (a.year !== b.year) {
          return a.year - b.year;
        }
        // If same year, sort by title alphabetically
        return a.title.localeCompare(b.title);
      })
}
// Iteration 6: Alphabetic Order - Order by title and print the first 20 titles
function orderAlphabetically(moviesArray) {
  return moviesArray.map((movie) => movie.title).toSorted().splice(0, 20);
}

function convertToMinutes(duration) {
  // Match hours and minutes
  const match = duration.match(/(?:(\d+)h)?\s*(?:(\d+)min)?/);
  if (!match) return 0;
  const hours = parseInt(match[1]) || 0;
  const minutes = parseInt(match[2]) || 0;
  return hours * 60 + minutes;
}

// BONUS - Iteration 7: Time Format - Turn duration of the movies from hours to minutes
function turnHoursToMinutes(moviesArray) {
  return moviesArray.map((movie) => {
    const durationInMinutes = convertToMinutes(movie.duration);
    return {...movie, duration: durationInMinutes} 
  })
}

// BONUS - Iteration 8: Best yearly score average - Best yearly score average
function bestYearAvg(moviesArray) {
  if (!moviesArray || moviesArray.length === 0) return null;

  const yearScores = {};

  // 1. Group scores by year
  moviesArray.forEach(movie => {
    if (typeof movie.score === 'number' && !isNaN(movie.score)) {
      if (!yearScores[movie.year]) {
        yearScores[movie.year] = [];
      }
      yearScores[movie.year].push(movie.score);
    }
  });

  let bestYear = null;
  let bestAvg = 0;

  // 2. Find year with highest average (earlier year wins when equal)
  Object.entries(yearScores).forEach(([year, scores]) => {
    const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
    if (
      avg > bestAvg ||
      (avg === bestAvg && (!bestYear || year < bestYear))
    ) {
      bestYear = year;
      bestAvg = avg;
    }
  });

  return `The best year was ${bestYear} with an average score of ${bestAvg}`;
}
