import dayjs from "dayjs";

export const getRecentThreeMonths = () => {
  const months = [];

  for (let i = 0; i < 3; i++) {
    const month = dayjs().subtract(i, "month").format("MMMM");
    months.push(month);
  }

  return months.reverse();
};
