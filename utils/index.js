export const getSectionsWithHeaders = (
  sortedSections,
  groupedTransactions,
  formattedDate
) => {
  return sortedSections?.map(([date, transactions]) => ({
    title:
      date === new Date().toDateString()
        ? "Today"
        : date ===
          new Date(new Date().setDate(new Date().getDate() - 1)).toDateString()
        ? "Yesterday"
        : formattedDate(date),
    data: groupedTransactions[date],
  }));
};


export function formatAmount(number) {
  const formattedValue = parseFloat(`${number}`).toFixed(2)
  return formattedValue.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}


export const groupTransactionsByDate = (transactions) => {
  const groupedTransactions = {};
  transactions?.forEach((transaction) => {
    const date = new Date(transaction.createdAt).toDateString();
    if (!groupedTransactions[date]) {
      groupedTransactions[date] = [];
    }
    groupedTransactions[date].push(transaction);
  });
  return groupedTransactions;
};

export const sortSections = (groupedTransactions) => {
  return Object.entries(groupedTransactions).sort(
    ([a], [b]) => new Date(b) - new Date(a)
  );
};

export const getFormattedDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();
  const suffix =
    day === 1 || day === 21 || day === 31
      ? "st"
      : day === 2 || day === 22
      ? "nd"
      : day === 3 || day === 23
      ? "rd"
      : "th";
  return `${day}${suffix}, ${month} ${year}`;
};

export function isDateValid(dateStr) {
  const parts = dateStr.split("-");
  if (parts.length !== 3) {
    return false;
  }

  const year = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10);
  const day = parseInt(parts[2], 10);

  if (
    Number.isNaN(year) ||
    Number.isNaN(month) ||
    Number.isNaN(day) ||
    year < 0 ||
    month < 1 ||
    month > 12 ||
    day < 1 ||
    day > 31
  ) {
    return false;
  }

  return true;
}

export function convertDateToHyphenFormat(inputDate) {
  const parts = inputDate.split("/");
  if (parts.length !== 3) {
    return "Invalid date format";
  }

  const [year, month, day] = parts;
  if (isNaN(year) || isNaN(month) || isNaN(day)) {
    return "Invalid date format";
  }

  const hyphenDate = `${year}-${month}-${day}`;
  return hyphenDate;
}

export function formatTimeDifference(updatedAt) {
  const updatedTime = new Date(updatedAt);
  const currentTime = new Date();

  const timeDifference = Math.abs(currentTime - updatedTime); // Difference in milliseconds

  // Convert milliseconds to minutes
  const minutesDifference = Math.floor(timeDifference / 60000);

  // Determine the appropriate time unit and value
  if (minutesDifference < 1) {
    return "less than 1 minute ago";
  } else if (minutesDifference < 60) {
    return `${minutesDifference} minute${
      minutesDifference !== 1 ? "s" : ""
    } ago`;
  } else {
    const hoursDifference = Math.floor(minutesDifference / 60);
    return `${hoursDifference} hour${hoursDifference !== 1 ? "s" : ""} ago`;
  }
}

export function generateRandom16DigitNumber() {
  let randomNumber = '';
  for (let i = 0; i < 16; i++) {
      randomNumber += Math.floor(Math.random() * 10);
  }
  return randomNumber;
}

export const parseAmount = (num, type) => {
  if (num) {
    let formatedWithDecimal = Number(num).toFixed(type === "CRYPTO" ? 8 : 2);
    let [integer, decimal] = String(formatedWithDecimal).split(".");

    let formatedWithComma = integer
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    let formattedAll = [formatedWithComma, decimal].join(".");

    return formattedAll;
  } else {
    return 0;
  }
};


export function addCommasToCurrency(value) {
  // Convert the value to a string
  let stringValue = value.toString();

  // Split the string into parts before and after the decimal point
  let parts = stringValue.split('.');
  let wholePart = parts[0];
  let decimalPart = parts.length > 1 ? '.' + parts[1] : '';

  // Add commas to the whole part
  let formattedValue = wholePart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  // Return the formatted value with the decimal part
  return formattedValue + decimalPart;
}

export const formatDate = (dateString) => {
  const inputDate = new Date(dateString);
  const day = inputDate.getDate();
  const month = inputDate.getMonth() + 1; // Months are zero-based
  const year = inputDate.getFullYear();

  return `${month}/${day}/${year}`;
};

export function checkPassword(password, confirmPassword) {
  const minLength = 12;
  const hasUpperCase = /[A-Z]/;
  const hasLowerCase = /[a-z]/;
  const hasDigit = /\d/;
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;
  const hasSpace = /\s/;

  if (password !== confirmPassword) {
    return "Password and confirm password do not match.";
  }
  if (password.length < minLength) {
    return "Password must be at least 12 characters long.";
  }
  if (!hasUpperCase.test(password)) {
    return "Password must contain at least one upper case letter (A-Z).";
  }
  if (!hasLowerCase.test(password)) {
    return "Password must contain at least one lower case letter (a-z).";
  }
  if (!hasDigit.test(password)) {
    return "Password must contain at least one digit (0-9).";
  }
  if (!hasSpecialChar.test(password)) {
    return "Password must contain at least one special character.";
  }
  if (hasSpace.test(password)) {
    return "Password must not contain any spaces.";
  }
}

export function checkSinglePassword(password) {
  const minLength = 12;
  const hasUpperCase = /[A-Z]/;
  const hasLowerCase = /[a-z]/;
  const hasDigit = /\d/;
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;
  const hasSpace = /\s/;

  if (password.length < minLength) {
    return "Password must be at least 12 characters long.";
  }
  if (!hasUpperCase.test(password)) {
    return "Password must contain at least one upper case letter (A-Z).";
  }
  if (!hasLowerCase.test(password)) {
    return "Password must contain at least one lower case letter (a-z).";
  }
  if (!hasDigit.test(password)) {
    return "Password must contain at least one digit (0-9).";
  }
  if (!hasSpecialChar.test(password)) {
    return "Password must contain at least one special character.";
  }
  if (hasSpace.test(password)) {
    return "Password must not contain any spaces.";
  }
}
