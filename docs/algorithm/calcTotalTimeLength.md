### 计算任务并行总耗时，去除gap
[原文](https://stackoverflow.com/questions/68094243/how-can-i-calculate-the-total-duration-without-overlapping-periods-in-google-she)
```js
function myFunction(param) {
    var sheet = SpreadsheetApp.getActiveSpreadsheet();

    var r,array;
    if(typeof param =="string")
    {
      r = sheet.getRange(param);
      array = r.getValues();
    }
    else
      array=param;

    //Check for non-dates

    filteredArray = array.filter(function(value) {
      return Object.prototype.toString.call(value[0]) == "[object Date]" && Object.prototype.toString.call(value[1]) == "[object Date]";
    });

    // Sort the array

    filteredArray.sort(function(a, b) {
      return a[0] - b[0];
    })

    // Initialise

    minStart = filteredArray[0][0];
    maxEnd = filteredArray[0][0];
    gap = 0
    
    // Loop over rows

    for (i = 0; i<filteredArray.length;i++)
    {

      // If there is a gap, increment total gap length
    
      if (filteredArray[i][0] > maxEnd )
        gap = gap + filteredArray[i][0].valueOf() - maxEnd;

      // Update latest end time
        
      if (filteredArray[i][1] > maxEnd)
        maxEnd = filteredArray[i][1];
            
    }
    
    
    TimeOnTask = (maxEnd - minStart - gap)/(60*60*1000);


    return TimeOnTask;
}
```

