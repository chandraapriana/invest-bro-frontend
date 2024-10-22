export function calculateStableDCA2(
  regularInvestment: number,
  intervalInvestment: "daily" | "weekly" | "monthly",
  startDate: string,
  endDate: string,
  annualReturn: number
): {
  totalUnits: number;
  totalInvested: number;
  currentValue: number;
  historyGrowth: { date: string; value: number }[];
} {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const historyGrowth: { date: string; value: number }[] = [];

  // Define interval in days for calculations
  let intervalDays: number;
  switch (intervalInvestment) {
    case "daily":
      intervalDays = 1;
      break;
    case "weekly":
      intervalDays = 7;
      break;
    case "monthly":
      intervalDays = 30;
      break;
  }

  let totalInvested = 0;
  let currentValue = 0;
  const dailyReturn = Math.pow(1 + annualReturn / 100, 1 / 365) - 1;

  let currentDate = new Date(start);
  const investments: { date: Date; amount: number }[] = [];

  // Iterate over each investment period
  while (currentDate <= end) {
    // Record each investment
    investments.push({
      date: new Date(currentDate),
      amount: regularInvestment,
    });
    totalInvested += regularInvestment;

    // Calculate the value of all previous investments with compounding
    currentValue = 0;
    investments.forEach((investment) => {
      const daysInvested =
        (currentDate.getTime() - investment.date.getTime()) /
        (1000 * 3600 * 24);
      const compoundedValue =
        investment.amount * Math.pow(1 + dailyReturn, daysInvested);
      currentValue += compoundedValue;
    });

    // Store growth history
    historyGrowth.push({
      date: currentDate.toISOString().split("T")[0],
      value: currentValue,
    });

    // Move to the next investment interval
    currentDate.setDate(currentDate.getDate() + intervalDays);
  }

  return {
    totalUnits: totalInvested, // total amount invested as units
    totalInvested: totalInvested, // total money invested without growth
    currentValue: currentValue, // current value after compounding
    historyGrowth: historyGrowth,
  };
}

export function calculateStableDCA(
  regularInvestment: number,
  intervalInvestment: "daily" | "weekly" | "monthly",
  startDate: string,
  endDate: string,
  annualReturn: number
): {
  totalUnits: number;
  totalInvested: number;
  currentValue: number;
  historyGrowth: { date: string; value: number }[];
  historyCost: { date: string; value: number }[];
} {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const historyGrowth: { date: string; value: number }[] = [];
  const historyCost: { date: string; value: number }[] = [];

  let totalInvested = 0;
  let currentValue = 0;
  const dailyReturn = Math.pow(1 + annualReturn / 100, 1 / 365) - 1;

  const investments: { date: Date; amount: number }[] = [];

  // Helper function to get the next valid investment date based on interval
  const getNextValidDate = (currentDate: Date, interval: string): Date => {
    let nextDate = new Date(currentDate);

    if (interval === "monthly") {
      // Move to the first of the next month
      nextDate.setMonth(nextDate.getMonth() + 1);
      nextDate.setDate(1);
      // Find the first Tuesday of that month
      while (nextDate.getDay() !== 2) {
        // 2 = Tuesday
        nextDate.setDate(nextDate.getDate() + 1);
      }
    } else if (interval === "weekly") {
      // Add 7 days to the current date
      nextDate.setDate(nextDate.getDate() + 7);
      // Move to next Tuesday
      while (nextDate.getDay() !== 2) {
        // 2 = Tuesday
        nextDate.setDate(nextDate.getDate() + 1);
      }
    } else if (interval === "daily") {
      // Add 1 day to the current date
      nextDate.setDate(nextDate.getDate() + 1);
    }

    // If the next date falls on a weekend, adjust to Monday or Tuesday
    if (nextDate.getDay() === 0) nextDate.setDate(nextDate.getDate() + 2); // If Sunday, move to Tuesday
    if (nextDate.getDay() === 6) nextDate.setDate(nextDate.getDate() + 3); // If Saturday, move to Tuesday

    return nextDate;
  };

  let currentDate = new Date(start);

  // Loop until the current date exceeds the end date
  while (currentDate <= end) {
    const investmentDate = getNextValidDate(currentDate, intervalInvestment);

    // Check if the investment date is beyond the end date
    if (investmentDate > end) break;

    // Record each investment
    investments.push({
      date: new Date(investmentDate),
      amount: regularInvestment,
    });
    totalInvested += regularInvestment;

    // Calculate the current value with compounding
    currentValue = investments.reduce((total, investment) => {
      const daysInvested =
        (investmentDate.getTime() - investment.date.getTime()) /
        (1000 * 3600 * 24);
      const compoundedValue =
        investment.amount * Math.pow(1 + dailyReturn, daysInvested);
      return total + compoundedValue;
    }, 0);

    // Store growth history
    historyGrowth.push({
      date: investmentDate.toISOString().split("T")[0],
      value: Math.round(currentValue),
    });

    historyCost.push({
      date: investmentDate.toISOString().split("T")[0],
      value: totalInvested,
    });

    // Update currentDate to the next investment date
    currentDate = new Date(investmentDate);
  }

  return {
    totalUnits: totalInvested, // Total invested as units
    totalInvested: totalInvested, // Total money invested without growth
    currentValue: currentValue, // Current value after compounding
    historyGrowth: historyGrowth,
    historyCost: historyCost,
  };
}

export function calculateDCA(
  historicalData: { [key: string]: number },
  regularInvestment: number,
  intervalInvestment: "daily" | "weekly" | "monthly"
): {
  totalUnits: number;
  totalInvested: number;
  currentValue: number;
  historyGrowth: { date: string; value: number }[];
  historyCost: { date: string; value: number }[];
} {
  const historyGrowth: { date: string; value: number }[] = [];
  const historyCost: { date: string; value: number }[] = [];
  const dates = Object.keys(historicalData).sort(
    (a, b) => new Date(a).getTime() - new Date(b).getTime()
  );

  let totalUnits = 0;
  let totalInvested = 0;
  let lastInvestmentMonth: number | null = null; // Menyimpan bulan terakhir investasi

  // Helper function untuk mendapatkan hari Selasa yang valid
  const getNextValidTuesday = (date: Date) => {
    while (date.getDay() !== 2) {
      // Mencari hari Selasa
      date.setDate(date.getDate() + 1);
    }
    return date;
  };

  dates.forEach((date) => {
    const currentDate = new Date(date);
    const price = historicalData[date];

    if (!price || isNaN(price)) return; // Lewati jika tidak ada harga

    // Monthly investment
    if (intervalInvestment === "monthly") {
      // Mencari hari Selasa pertama dalam bulan tersebut
      const firstOfMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        1
      );

      const investmentDate = getNextValidTuesday(new Date(firstOfMonth));

      // Jika hari ini adalah hari Selasa pertama dalam bulan

      if (lastInvestmentMonth !== currentDate.getMonth()) {
        totalUnits += regularInvestment / price; // Membeli unit berdasarkan harga
        totalInvested += regularInvestment;
        historyGrowth.push({
          date: currentDate.toISOString().split("T")[0],
          value: Math.round(totalUnits * price), // Nilai saat ini berdasarkan harga
        });
        historyCost.push({
          date: currentDate.toISOString().split("T")[0],
          value: totalInvested,
        });
        lastInvestmentMonth = currentDate.getMonth(); // Perbarui bulan terakhir investasi
      }
    }

    // Weekly investment: dilakukan setiap hari Selasa
    if (intervalInvestment === "weekly") {
      if (currentDate.getDay() === 2) {
        // Hari Selasa
        totalUnits += regularInvestment / price; // Membeli unit
        totalInvested += regularInvestment;
        historyGrowth.push({
          date: currentDate.toISOString().split("T")[0],
          value: Math.round(totalUnits * price), // Nilai saat ini
        });
        historyCost.push({
          date: currentDate.toISOString().split("T")[0],
          value: totalInvested,
        });
      }
    }

    // Daily investment: setiap hari kerja (Senin sampai Jumat)
    if (intervalInvestment === "daily") {
      if (currentDate.getDay() >= 1 && currentDate.getDay() <= 5) {
        // Senin sampai Jumat
        totalUnits += regularInvestment / price; // Membeli unit
        totalInvested += regularInvestment;
        historyGrowth.push({
          date: currentDate.toISOString().split("T")[0],
          value: Math.round(totalUnits * price), // Nilai saat ini
        });
        historyCost.push({
          date: currentDate.toISOString().split("T")[0],
          value: totalInvested,
        });
      }
    }
  });

  // Menghitung nilai investasi saat ini berdasarkan harga terbaru
  const currentPrice = historicalData[dates[dates.length - 1]];
  const currentValue = totalUnits * currentPrice;

  return {
    totalUnits: totalUnits,
    totalInvested: totalInvested,
    currentValue: currentValue,
    historyGrowth: historyGrowth,
    historyCost: historyCost,
  };
}

export function calculateDCA2(
  historicalData: { [key: string]: number },
  regularInvestment: number,
  intervalInvestment: "daily" | "weekly" | "monthly"
): {
  totalUnits: number;
  totalInvested: number;
  currentValue: number;
  historyGrowth: { date: string; value: number }[];
} {
  const historyGrowth: { date: string; value: number }[] = [];

  // Get sorted dates from historical data
  const dates = Object.keys(historicalData).sort(
    (a, b) => new Date(a).getTime() - new Date(b).getTime()
  );

  let totalUnits = 0;
  let totalInvested = 0;
  let lastInvestmentDate = new Date(dates[0]);

  // Helper function to find the next valid weekday (Tuesday or Wednesday)
  const getNextValidWeekday = (date: Date) => {
    if (date.getDay() === 6)
      date.setDate(date.getDate() + 3); // Saturday -> Tuesday
    else if (date.getDay() === 0)
      date.setDate(date.getDate() + 2); // Sunday -> Tuesday
    else if (date.getDay() === 1)
      date.setDate(date.getDate() + 1); // Monday -> Tuesday
    else if (date.getDay() === 2) return date; // Tuesday -> valid
    else if (date.getDay() === 3)
      return date; // Wednesday -> valid (if Tuesday is skipped)
    else if (date.getDay() > 3)
      date.setDate(date.getDate() + (9 - date.getDay())); // Thursday/Friday -> next Tuesday
    return date;
  };

  // Iterate over historical data
  dates.forEach((date, index) => {
    const currentDate = new Date(date);
    const price = historicalData[date];

    // Monthly investment: first valid Tuesday of each month
    if (intervalInvestment === "monthly") {
      const investmentDate = getNextValidWeekday(
        new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
      );
      if (
        currentDate.getTime() === investmentDate.getTime() &&
        lastInvestmentDate.getMonth() !== currentDate.getMonth()
      ) {
        totalUnits += regularInvestment / price;
        totalInvested += regularInvestment;
        historyGrowth.push({
          date: currentDate.toISOString().split("T")[0],
          value: totalUnits * price,
        });
        lastInvestmentDate = currentDate;
      }
    }

    // Weekly investment: every valid Tuesday
    if (intervalInvestment === "weekly") {
      if (
        currentDate.getDay() === 2 ||
        (currentDate.getDay() === 3 && lastInvestmentDate.getDay() !== 2)
      ) {
        // Tuesday or Wednesday if Tuesday skipped
        totalUnits += regularInvestment / price;
        totalInvested += regularInvestment;
        historyGrowth.push({
          date: currentDate.toISOString().split("T")[0],
          value: totalUnits * price,
        });
        lastInvestmentDate = currentDate;
      }
    }

    // Daily investment: every weekday
    if (intervalInvestment === "daily") {
      if (currentDate.getDay() >= 1 && currentDate.getDay() <= 5) {
        // Monday to Friday
        totalUnits += regularInvestment / price;
        totalInvested += regularInvestment;
        historyGrowth.push({
          date: currentDate.toISOString().split("T")[0],
          value: totalUnits * price,
        });
      }
    }
  });

  // Calculate current value of the total investment based on the latest price
  const currentPrice = historicalData[dates[dates.length - 1]];
  const currentValue = totalUnits * currentPrice;

  return {
    totalUnits: totalUnits,
    totalInvested: totalInvested,
    currentValue: currentValue,
    historyGrowth: historyGrowth,
  };
}
