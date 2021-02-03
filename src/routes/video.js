/* eslint-disable prefer-destructuring */
function getTimeSince(msSinceTime0) {
  let measureTime;
  let TimeUnit;
  let i = 0;
  const secondsSince = Math.floor(Math.abs(Date.now() - msSinceTime0) / 1000);
  const day = 3600 * 24;
  const times = [day / 24, day, day * 7, day * 30, day * 365];
  const words = [
    ["klukkustund", "klukkustundum"],
    ["degi", "dögum"],
    ["viku", "vikum"],
    ["mánuði", "mánuðum"],
    ["ári", "árum"],
  ];
  for (i = 1; i < times.length; i += 1) {
    if (secondsSince < times[i]) break;
  }
  // eslint-disable-next-line prefer-const
  measureTime = Math.floor(secondsSince / times[i - 1]);
  if (measureTime <= 1) {
    TimeUnit = words[i === 0 ? i : i - 1][0];
    // eslint-disable-next-line no-undef
    xUnit = 1;
  } // 0 hours change to 1 hour
  else TimeUnit = words[i === 0 ? i : i - 1][1];
  return `Fyrir ${measureTime} ${TimeUnit} síðan`;
}

function timeStamp(seconds) {
  let str = "";
  let i;
  let timeSeconds = seconds;
  const stamps = []; // [hours, minutes, seconds] as numbers
  for (i = 2; i >= 0; i -= 1) {
    stamps[2 - i] = Math.floor(timeSeconds / 60 ** i);
    timeSeconds %= 60 ** i;
  }
  str += `${stamps[0] === 0 ? "" : `${stamps[0]}:`}${
    stamps[1] < 10 ? `0${stamps[1]}` : stamps[1]
  }:${stamps[2] < 10 ? `0${stamps[2]}` : stamps[2]}`;
  return str; // hh:mm:ss as string
}

// To get the proper object video by id
function filterById(jsonObject, id) {
  // eslint-disable-next-line no-shadow
  return jsonObject.filter((jsonObject) => jsonObject.id === id)[0];
}

module.exports = {
  getTimeSince,
  timeStamp,
  filterById,
};
