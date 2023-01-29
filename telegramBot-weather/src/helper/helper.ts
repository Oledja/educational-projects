const getWeekDay = (date: string): string => {
  const day = new Date(date).getDay();
  const days = [
    "воскресенье",
    "понедельник",
    "вторник",
    "среда",
    "четверг",
    "пятница",
    "суббота",
  ];
  return days[day];
};

const getMonth = (date: string) => {
  const month = new Date(date).getMonth();
  const days = [
    "января",
    "февраля",
    "марта",
    "апреля",
    "мая",
    "июня",
    "июля",
    "августа",
    "сентября",
    "октября",
    "ноября",
    "декабря",
  ];
  return days[month];
};

export { getWeekDay, getMonth };
