export function formatDateTime(timeString) {
  const dateTime = new Date(timeString);

  const year = String(dateTime.getFullYear());
  const month = String(dateTime.getMonth() + 1).padStart(2, '0');
  const day = String(dateTime.getDate()).padStart(2, '0');
  const hour = String(dateTime.getHours()).padStart(2, '0');
  const minute = String(dateTime.getMinutes()).padStart(2, '0');
  const second = String(dateTime.getSeconds()).padStart(2, '0');


  return `${year}年${month}月${day}日 ${hour}时${minute}分${second}秒`;
}