export const celsiusToFahrenheit = (celsius) => {
  return Math.round((celsius * 9) / 5 + 32);
};

export const fahrenheitToCelsius = (fahrenheit) => {
  return Math.round(((fahrenheit - 32) * 5) / 9);
};

export const kmhToMph = (kmh) => {
  return Math.round(kmh * 0.621371);
};

export const mphToKmh = (mph) => {
  return Math.round(mph / 0.621371);
}; 