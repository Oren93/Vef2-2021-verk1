function getTimeSince (timeThen) {
    var xUnits;
    var TimeUnit;
    var i=0;
    const diff = Math.floor(Math.abs((Date.now()-timeThen))/1000);
    const day = 3600*24;
    const times = [day/24,day,day*7,day*30,day*365];
    const strings = [["klukkustund","klukkustundum"],
                    ["degi","dögum"],
                    ["viku","vikum"],
                    ["mánuði","mánuðum"],
                    ["ári","árum"]];
    for (i=1 ;i < times.length ;i++) {
        if (diff < times[i])
            break;
    }
    xUnits = Math.floor(diff/times[i-1]);
    if (xUnits <= 1) { 
        TimeUnit = strings[i=0? i : i-1][0];
        xUnit = 1;} // 0 hours change to 1 hour
    else TimeUnit = strings[i=0? i : i-1][1];
    return `Fyrir ${xUnits} ${TimeUnit} síðan`;
}

function timeStamp(seconds) {
    var str = "";
    const stamps = []; // [hours, minutes, seconds] as numbers
    for (i=2;i>=0;i--) {
        stamps[2-i]=Math.floor(seconds/Math.pow(60,i));
        seconds = seconds % Math.pow(60,i);
    }
    str += (stamps[0]==0? "":""+stamps[0] + ":") +
     (stamps[1]<10? "0"+stamps[1] : stamps[1]) + ":" +
     (stamps[2]<10? "0"+stamps[2] : stamps[2]) + "";
    return str; // hh:mm:ss as string
}

// To get the proper object video by id
function filterById(jsonObject, id)
{return jsonObject.filter(function(jsonObject) {return (jsonObject['id'] == id);})[0];}


module.exports = {
    getTimeSince: getTimeSince,
    timeStamp: timeStamp,
    filterById: filterById
} 