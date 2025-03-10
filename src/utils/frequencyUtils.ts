export const calculateIntervals = (numbers: number[]) => {
    if (numbers.length === 0) return { intervals: [], frequencies: [] };
  
    const sortedNumbers = [...numbers].sort((a, b) => a - b);
    const min = sortedNumbers[0];
    const max = sortedNumbers[sortedNumbers.length - 1];
    const k = Math.ceil(1 + 3.322 * Math.log10(numbers.length));
    const h = Math.ceil((max - min) / k);
  
    const intervals = [];
    let lowerLimit = min;
  
    for (let i = 0; i < k; i++) {
      let upperLimit = lowerLimit + h - 1;
      intervals.push({ lower: lowerLimit, upper: upperLimit });
      lowerLimit = upperLimit + 1;
    }
  
    const frequencies = intervals.map(({ lower, upper }) =>
      numbers.filter(num => num >= lower && num <= upper).length
    );
  
    return { intervals, frequencies, h };
  };
  
  export const calculateClassMarks = (intervals: { lower: number; upper: number }[]) => {
    return intervals.map(interval => (interval.lower + interval.upper) / 2);
  };
  
  export const calculateRelativeFrequencies = (frequencies: number[], total: number) => {
    return frequencies.map(fi => (fi / total).toFixed(4));
  };
  
  export const calculateCumulativeFrequencies = (frequencies: number[]) => {
    let cumulative = 0;
    return frequencies.map(fi => (cumulative += fi));
  };
  