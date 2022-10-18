import { getDisplayName } from "next/dist/shared/lib/utils";

// Format date dd-mm-yyyy
export function formatDate(dateBefore) {
  let time = '';

  if (dateBefore != '') {
    const t  = new Date(dateBefore);

    const day = ('0' + t.getDate()).slice(-2);
    const month = ('0' + (t.getMonth() + 1)).slice(-2);
    const year = t.getFullYear() + 543;
    const hours = ('0' + t.getHours()).slice(-2);
    const minutes = ('0' + t.getMinutes()).slice(-2);
    const seconds = ('0' + t.getSeconds()).slice(-2);
    time = `${day}-${month}-${year}`;
  }

  return time;
}

// Format date yyyy-mm-dd
export function dateForUpdateAPI(dateBefore) {
  let time = '';

  if (dateBefore != '') {
    const t  = new Date(dateBefore);

    const day = ('0' + t.getDate()).slice(-2);
    const month = ('0' + (t.getMonth() + 1)).slice(-2);
    const year = t.getFullYear() - 543;
    const hours = ('0' + t.getHours()).slice(-2);
    const minutes = ('0' + t.getMinutes()).slice(-2);
    const seconds = ('0' + t.getSeconds()).slice(-2);
    time = `${year}-${day}-${month}`;
  }

  return time;
}

// Format date dd/mm/yyyy
export function formatDateTime(dateBefore) {
  let time = '';

  if (dateBefore != '') {
    const t  = new Date(dateBefore);

    const day = ('0' + t.getDate()).slice(-2);
    const month = ('0' + (t.getMonth() + 1)).slice(-2);
    const year = t.getFullYear() + 543;
    const hours = ('0' + t.getHours()).slice(-2);
    const minutes = ('0' + t.getMinutes()).slice(-2);
    const seconds = ('0' + t.getSeconds()).slice(-2);
    time = `${day}/${month}/${year} ${hours}:${minutes}น.`;
  }

  return time;
}

export function formatNumberWithComma(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function timeSince(dateTime) {

	var aDay = 24*60*60*1000;
  
  var date = new Date(dateTime).getTime()

  var seconds = Math.floor((new Date() - date) / 1000);

  var interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + " ปีที่แล้ว";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " เดือนที่แล้ว";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " วันที่แล้ว";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " ชั่วโมงที่แล้ว";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " นาทีที่แล้ว";
  }
  return Math.floor(seconds) + " วินาทีที่แล้ว";
}

export function getShortDay(dateTime) {
  var days = ['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส'];
  var d = new Date(dateTime);
  const dateObject = new Date(d * 1000)
  console.log(dateObject);
  var dayName = days[dateObject.getDay()];
  return dayName;
}

export function getShortDateTime(dateTime) {
  let time = '';
  var d = new Date(dateTime);
  const dateObject = new Date(d * 1000)
  
  var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const t  = new Date(dateObject);
  time = t.toLocaleDateString("th-TH", options)

  return time;
}