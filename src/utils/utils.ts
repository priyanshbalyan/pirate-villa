import { areIntervalsOverlapping, differenceInDays, format, isAfter, isBefore, isSameDay, isValid, parse } from "date-fns";
import { CreditCardData } from "~/components/atoms/CreditCardPaymentForm";
import { SITE } from "~/config";

// Function to format a number in thousands (K) or millions (M) format depending on its value
export const getSuffixNumber = (number: number, digits: number = 1): string => {
  const lookup = [
    { value: 1, symbol: '' },
    { value: 1e3, symbol: 'K' },
    { value: 1e6, symbol: 'M' },
    { value: 1e9, symbol: 'G' },
    { value: 1e12, symbol: 'T' },
    { value: 1e15, symbol: 'P' },
    { value: 1e18, symbol: 'E' },
  ];

  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  const lookupItem = lookup
    .slice()
    .reverse()
    .find((item) => number >= item.value);
  return lookupItem ? (number / lookupItem.value).toFixed(digits).replace(rx, '$1') + lookupItem.symbol : '0';
};

export function toStartCase(str: string) {
  if (!str) return '';

  return str
    .toLowerCase() // Convert the entire string to lowercase
    .split(' ') // Split the string into words
    .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize the first letter of each word
    .join(' '); // Join the words back together
}

export const generateFormattedDate = (date: Date) => {
  // Format the date as YYYYMMDDTHHmmssZ
  const formattedDate = format(date, "yyyyMMdd'T'HHmmss'Z'");
  return formattedDate;
};

export function validateEmail(email: string): boolean {
  // Regular expression for validating email addresses
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validateBookingData(name: string, email: string, startDate: Date | null, endDate: Date | null) {
  const newErrors: { [key: string]: string } = {}

  if (!validateEmail(email)) {
    newErrors.email = 'Email must be a valid email'
  }
  if (name.trim() === '') {
    newErrors.name = 'Name is required'
  }
  if (!startDate || !endDate || isSameDay(startDate, endDate)) {
    newErrors.date = 'Date range needs to be selected'
  }
  if (endDate && startDate && differenceInDays(endDate, startDate) < SITE.MINIMUM_NIGHTS_STAY) {
    newErrors.date = 'Minimum 3 night stays can be booked.'
  }

  return newErrors;
}

export function validateCardData(creditCardData: CreditCardData) {
  const newErrors: { [key: string]: string } = {}

  if (!/^\d{16}$/.test(creditCardData.cardNumber)) {
    newErrors.cardNumber = 'Card number must be 16 digits'
  }
  if (creditCardData.cardName.trim() === '') {
    newErrors.cardName = 'Cardholder name is required'
  }

  const [expiryMonth, expiryYear] = creditCardData.expiryDate.split('/')
  if (!expiryMonth) {
    newErrors.expiryMonth = 'Expiry month is required'
  }
  if (!expiryYear) {
    newErrors.expiryYear = 'Expiry year is required'
  }
  if (!/^\d{3,4}$/.test(creditCardData.cvv)) {
    newErrors.cvv = 'CVV must be 3 or 4 digits'
  }

  return newErrors;
}

export const isDevEnv = process.env.NODE_ENV === 'development';

const cardPatterns = {
  visa: /^4/,
  mastercard: /^(5[1-5]|2[2-7])/,
  amex: /^3[47]/,
  discover: /^6(?:011|5)/,
  diners: /^3(?:0[0-5]|[68])/,
  jcb: /^(?:2131|1800|35)/,
};

const cardLogos = {
  visa: 'https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg',
  mastercard: 'https://upload.wikimedia.org/wikipedia/commons/a/a4/Mastercard_2019_logo.svg',
  amex: 'https://upload.wikimedia.org/wikipedia/commons/3/30/American_Express_logo_%282018%29.svg',
  discover: 'https://upload.wikimedia.org/wikipedia/commons/f/f4/Discover_Card_logo.svg',
  diners: 'https://upload.wikimedia.org/wikipedia/commons/1/16/Diners_Club_Logo7.svg',
  jcb: 'https://upload.wikimedia.org/wikipedia/en/4/40/JCB_logo.svg',
};

// Function to detect card type
export function detectCardType(number: string) {
  for (const [card, pattern] of Object.entries(cardPatterns)) {
    if (pattern.test(number)) {
      return cardLogos[card as keyof typeof cardLogos];
    }
  }
  return '';
}

export const DATE_FORMAT_STRING = "yyyy-MM-dd";


export function isValidDateFormat(dateString: Date | string | undefined): boolean {
  if (!dateString) return false

  // Parse the date string according to the format
  const parsedDate = parse(dateString.toString(), DATE_FORMAT_STRING, new Date());

  // Ensure the parsed date is valid and matches the original input
  return isValid(parsedDate) && format(parsedDate, DATE_FORMAT_STRING) === dateString;
}

export function isDateRangeOverlappingStrings(
  startDateStr: string,
  endDateStr: string,
  dateRanges: { startDate: string; endDate: string }[]
): boolean {
  const startDate = parse(startDateStr, DATE_FORMAT_STRING, new Date());
  const endDate = parse(endDateStr, DATE_FORMAT_STRING, new Date());

  return dateRanges.some((range) => {
    const rangeStart = parse(range.startDate, DATE_FORMAT_STRING, new Date());
    const rangeEnd = parse(range.endDate, DATE_FORMAT_STRING, new Date());

    return areIntervalsOverlapping(
      { start: startDate, end: endDate },
      { start: rangeStart, end: rangeEnd }
    )
  });
}

export function getHeaders() {
  const token = localStorage.getItem('token');
  return { Authorization: `Bearer ${token}` }
}