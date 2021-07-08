export function generateAntWinLikelihoodCalculator() {
    const delay =  7000 + Math.random() * 7000;
    const likelihoodOfAntWinning = Math.random();

    return (callback) => {
        setTimeout(() => {
            callback(likelihoodOfAntWinning);
        }, delay);
    };
}

export function shallowCopyArray(index, array) {
    return [...array.slice(0, index), ...array.slice(index + 1)]
  }

