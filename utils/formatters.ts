/**
 * Format a number as Tanzania Shillings currency
 * @param amount - The amount to format
 * @returns Formatted currency string (e.g. "TZS 10,000")
 */
export function formatCurrency(amount: number): string {
  return `TZS ${amount.toLocaleString('en-US')}`;
}

/**
 * Format a date to a readable string
 * @param date - The date to format
 * @returns Formatted date string (e.g. "Mar 15, 2025")
 */
export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

/**
 * Format a date to show only month and year
 * @param date - The date to format
 * @returns Formatted month/year string (e.g. "March 2025")
 */
export function formatMonthYear(date: Date): string {
  return date.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });
}

/**
 * Calculate percentage and format it
 * @param part - The partial amount
 * @param total - The total amount
 * @returns Formatted percentage string (e.g. "75%")
 */
export function formatPercentage(part: number, total: number): string {
  if (total === 0) return '0%';
  return `${Math.round((part / total) * 100)}%`;
}

/**
 * Format a date to show how many days are left
 * @param targetDate - The target date
 * @returns String showing days left or "Expired" if in the past
 */
export function formatDaysLeft(targetDate: Date): string {
  const today = new Date();
  const timeDiff = targetDate.getTime() - today.getTime();
  const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));
  
  if (daysLeft < 0) return 'Expired';
  if (daysLeft === 0) return 'Today';
  if (daysLeft === 1) return '1 day left';
  return `${daysLeft} days left`;
}