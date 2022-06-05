const amountFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export function formatAmount(amount: number) {
  return amountFormatter.format(amount);
}
