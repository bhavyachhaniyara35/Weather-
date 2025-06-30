export const formatDate = (date, format = 'full') => {
  const options = {
    full: {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    },
    weekday: {
      weekday: 'long',
    },
    hour: {
      hour: 'numeric',
      minute: '2-digit',
    },
  };

  return new Intl.DateTimeFormat('en-US', options[format]).format(date);
}; 