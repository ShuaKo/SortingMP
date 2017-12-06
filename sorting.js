function swap(array, i, j) {
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
}

function selectionSort(array) {
    var countOuter = 0;
    var countInner = 0;
    var countSwap = 0;
  
    for(var i = 0; i < array.length; i++) {
      countOuter++;
      var min = i;
      for(var j = i + 1; j < array.length; j++) {
        countInner++;
        if(array[j] < array[min]) {
          min = j;
        }
      }
      if(i !== min) {
        countSwap++;
        swap(array, i, min);
      }
    }
    return countOuter+countInner+countSwap;
  }

function bubbleSort(array) {
    var countOuter = 0;
    var countInner = 0;
    var countSwap = 0;
  
    var swapped;
    do {
      countOuter++;
      swapped = false;
      for(var i = 0; i < array.length; i++) {
        countInner++;
        if(array[i] && array[i + 1] && array[i] > array[i + 1]) {
          countSwap++;
          swap(array, i, i + 1);
          swapped = true;
        }
      }
    } while(swapped);
    return countOuter+countInner+countSwap;
}

function insertionSort(array) {
    var countOuter = 0;
    var countInner = 0;
    var countSwap = 0;
  
    for(var i = 0; i < array.length; i++) {
      countOuter++;
      var temp = array[i];
      var j = i - 1;
      while (j >= 0 && array[j] > temp) {
        countInner++;
        countSwap++;
        array[j + 1] = array[j];
        j--;
      }
      array[j + 1] = temp;
    }
    return countOuter+countInner+countSwap;
  }

var gaps = [];
function shellSort(array) {
    var countOuter = 0;
    var countInner = 0;
    var countSwap = 0;
  
    for(var g = 0; g < gaps.length; g++) {
      var gap = gaps[g];
      for(var i = gap; i < array.length; i++) {
        countOuter++;
        var temp = array[i];
        for(var j = i; j >= gap && array[j - gap] > temp; j -= gap) {
          countInner++;
          countSwap++;
          array[j] = array[j - gap];
        }
        array[j] = temp;
      }
    }
    return countOuter+countInner+countSwap;
  }

function bucketSort(array, bucketSize) {
    var time = 0;
    if (array.length === 0) {
        return array;
    }
  
    // Declaring vars
    var i,
    minValue = array[0],
    maxValue = array[0],
    bucketSize = bucketSize || 5;
    
    // Setting min and max values
    array.forEach(function (currentVal) {
        time++;
        if (currentVal < minValue) {
            minValue = currentVal;
        } else if (currentVal > maxValue) {
            maxValue = currentVal;
        }
    })
  
    // Initializing buckets
    var bucketCount = Math.floor((maxValue - minValue) / bucketSize) + 1;
    var allBuckets = new Array(bucketCount);
    
    for (i = 0; i < allBuckets.length; i++) {
      allBuckets[i] = [];
    }
    
    // Pushing values to buckets
    array.forEach(function (currentVal) {
        allBuckets[Math.floor((currentVal - minValue) / bucketSize)].push(currentVal);
    });
  
    // Sorting buckets
    array.length = 0;
    
    allBuckets.forEach(function(bucket) {
        time+=insertionSort(bucket);
        bucket.forEach(function (element) {
            array.push(element)
        });
    });
    return time;
}


function radixBucketSort (arr) {
    var idx1, idx2, idx3, len1, len2, radix, radixKey;
    var radices = {}, buckets = {}, num, curr;
    var currLen, radixStr, currBucket;

    len1 = arr.length;
    len2 = 10;  // radix sort uses ten buckets

    // find the relevant radices to process for efficiency        
    for (idx1 = 0;idx1 < len1;idx1++) {
      radices[arr[idx1].toString().length] = 0;
    }

    // loop for each radix. For each radix we put all the items
    // in buckets, and then pull them out of the buckets.
    for (radix in radices) {          
      // put each array item in a bucket based on its radix value
      len1 = arr.length;
      for (idx1 = 0;idx1 < len1;idx1++) {
        curr = arr[idx1];
        // item length is used to find its current radix value
        currLen = curr.toString().length;
        // only put the item in a radix bucket if the item
        // key is as long as the radix
        if (currLen >= radix) {
          // radix starts from beginning of key, so need to
          // adjust to get redix values from start of stringified key
          radixKey = curr.toString()[currLen - radix];
          // create the bucket if it does not already exist
          if (!buckets.hasOwnProperty(radixKey)) {
            buckets[radixKey] = [];
          }
          // put the array value in the bucket
          buckets[radixKey].push(curr);          
        } else {
          if (!buckets.hasOwnProperty('0')) {
            buckets['0'] = [];
          }
          buckets['0'].push(curr);          
        }
      }
      // for current radix, items are in buckets, now put them
      // back in the array based on their buckets
      // this index moves us through the array as we insert items
      idx1 = 0;
      // go through all the buckets
      for (idx2 = 0;idx2 < len2;idx2++) {
        // only process buckets with items
        if (buckets[idx2] != null) {
          currBucket = buckets[idx2];
          // insert all bucket items into array
          len1 = currBucket.length;
          for (idx3 = 0;idx3 < len1;idx3++) {
            arr[idx1++] = currBucket[idx3];
          }
        }
      }
      buckets = {};
    }
  }