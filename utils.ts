
export function getFullName(firstName: string, lastName: string) {
  return `${firstName ?? ''} ${lastName ?? ''}`;
}

export function formatDate(dateString: string) {
  const date = new Date(dateString)
  return date.toLocaleDateString('default', { dateStyle: 'long' });
}

export function getMonthString(dateString: string) {
  const date = new Date(dateString);
  return `${date.getFullYear()}-${date.getMonth() + 1}`;
}
