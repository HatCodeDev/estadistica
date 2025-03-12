export function calculateSturgesRule(n: number): number {
  if (n <= 0) return 0;
  return Math.round(1 + 3.322 * Math.log10(n));
}

export function calculateIntervalSize(min: number, max: number, k: number): number {
  if (k <= 0) return 0;
  return parseFloat(((max - min) / k).toFixed(2));
}

export function generateIntervals(numbers: number[]): { key: string; interval: string; fi: number }[] {
  if (numbers.length === 0) return [];

  const sortedNumbers = [...numbers].sort((a, b) => a - b);
  const min = sortedNumbers[0];
  const max = sortedNumbers[sortedNumbers.length - 1];

  const k = calculateSturgesRule(numbers.length);
  const h = calculateIntervalSize(min, max, k);

  const intervals = [];
  let lowerLimit = min;

  for (let i = 0; i < k; i++) {
    let upperLimit = lowerLimit + h;
    intervals.push({
      key: i.toString(),
      interval: `${lowerLimit.toFixed(2)} - ${upperLimit.toFixed(2)}`,
      fi: numbers.filter(num => num >= lowerLimit && num < upperLimit).length,
    });

    lowerLimit = upperLimit;
  }

  return intervals;
}

export function calculateFrequencyMetrics(intervals: any[], totalNumbers: number) {
  let cumulativeSum = 0;
  return intervals.map(interval => {
    cumulativeSum += interval.fi;
    return {
      ...interval,
      mc: ((parseFloat(interval.interval.split(" - ")[0]) + parseFloat(interval.interval.split(" - ")[1])) / 2).toFixed(2),
      Fi: cumulativeSum,
      fr: (interval.fi / totalNumbers).toFixed(4),
      Fra: (cumulativeSum / totalNumbers).toFixed(4),
    };
  });
}
export function calculateColumnSums(intervals: any[]) {
  return intervals.reduce(
    (sums, interval) => {
      sums.fi += interval.fi;
      sums.Fi = interval.Fi;
      sums.fr += parseFloat(interval.fr) || 0; 
      sums.Fra = parseFloat(interval.Fra) || 0; // Convertir a número y evitar NaN
      sums.mc += parseFloat(interval.mc) || 0; // Convertir a número y evitar NaN
      return sums;
    },
    { fi: 0, Fi: 0, fr: 0, Fra: 0, mc: 0 } // Inicializar valores en 0
  );
}

