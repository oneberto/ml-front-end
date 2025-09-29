export const generateArray = (length: number) =>
  new Array(length).fill(null).map((_, index) => index);

export const formatCurrency = (amount = 0) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  })
    .format(amount / 100)
    .toString()
    .replace(/\s/g, " ");

export const formatThousands = (amount = 0) => {
  /**
   * @todo make things better
   */

  if (amount < 1000) {
    return String(amount);
  }

  let value = 0;

  const isLessThanMillion = amount < 1000000;

  if (isLessThanMillion) {
    value = amount / 1000;
  } else {
    value = amount / 1000000;
  }

  const formattedValue = value.toLocaleString("pt-BR", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 1,
  });

  return `${formattedValue} ${isLessThanMillion ? "mil" : "M"}`;
};
