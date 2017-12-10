var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");

function Graph(value0, value1, value2, value3){
    this.name = value0;
    this.positionX = value1;
    this.positionY = value2;
    this.X = 100;
    this.Y = 100;
    this.height = 300;
    this.arr = []
    switch(value3){
        case 0://sorted
            for(var a = 0; a<this.X; a++){
                this.arr.push(a);
            }
            break;
        case 1://rev sorted
            for(var a = 0; a<this.X; a++){
                this.arr.push(this.X-a);
            }
            break;
        default://random 
            for(var a = 0; a<this.X; a++){
                this.arr.push(Random(this.X));
            }
            break;
    }

    this.Lines = [];
    this.addLine = function(name, color, type){
        var temp = [];
        switch(type){
            case 0:
                for(var l = 0; l<this.X; l++){
                    temp.push(selectionSort(this.arr.slice(0,l)));
                }
                break;
            case 1:
                for(var l = 0; l<this.X; l++){
                    temp.push(bubbleSort(this.arr.slice(0,l)));
                }
                break;
            case 2: 
                for(var l = 0; l<this.X; l++){
                    temp.push(insertionSort(this.arr.slice(0,l)));
                }
                break;
            case 3: 
                for(var l = 0; l<this.X; l++){
                    gaps = [];
                    for(var g = l; g/2 > 0; g = Math.floor(g/2)){
                        gaps.push(Math.floor(g));
                    }
                    temp.push(shellSort(this.arr.slice(0,l)));
                }
                break;
            case 4: 
                for(var l = 0; l<this.X; l++){
                    gaps = [57,23,10,4,1];
                    temp.push(shellSort(this.arr.slice(0,l)));
                }
                break;
            case 5: 
                for(var l = 0; l<this.X; l++){
                    temp.push(bucketSort(this.arr.slice(0,l)));
                }
                break;
            case 6: 
                for(var l = 0; l<this.X; l++){
                    temp.push(radixCountingSort(this.arr.slice(0,l)));
                }
                break;
            case 7: 
                for(var l = 0; l<this.X; l++){
                    temp.push(radixInsertionSort(this.arr.slice(0,l)));
                }
                break;
            case 8: 
                for(var l = 0; l<this.X; l++){
                    temp.push(mergeSort(this.arr.slice(0,l)));
                }
                break;
            case 9: 
                for(var l = 0; l<this.X; l++){
                    temp.push(quickSort(this.arr.slice(0,l)));
                }
                break;
        }
        var func = new Function(name,color,temp);
        this.Lines.push(func);
    }

    this.draw = function(){
        context.fillStyle = "#555";
        context.fillRect(this.positionX, this.positionY, this.X*3, this.Y*3);
        context.fillStyle = "#ccc";
		context.font = "20px Calibri";
        context.fillText( "0", this.positionX, this.positionY+(this.Y*3)+20);
        context.fillText( "100", this.positionX+(this.X*3), this.positionY+(this.Y*3)+20);
        context.fillText( "300", this.positionX, this.positionY+20);
        context.fillStyle = "#fff";
		context.font = "30px Calibri";
        context.fillText( this.name, this.positionX, this.positionY+(this.Y*3)+50);

        for(var ctr = 0; ctr < this.Lines.length; ctr++){
            context.strokeStyle = this.Lines[ctr].color;
            context.beginPath();
            context.moveTo(this.positionX, this.positionY+(this.Y*3));
            context.stroke();
            for(var x = 0; x < this.Y; x++){
                if(this.Y*(this.height/this.Y)-this.Lines[ctr].arr[x] >= 0)
                context.lineTo(this.positionX+(x*3), this.positionY+((this.Y*(this.height/this.Y)-this.Lines[ctr].arr[x])));
                context.stroke();
            }
            context.fillStyle = this.Lines[ctr].color;
            context.font = "20px Calibri";
            context.fillText( this.Lines[ctr].name, this.positionX+(7*3), this.positionY+((this.Y-this.Lines[ctr].arr[7])*3) + Random(20));
        }
        
    }
}
function Function(value0, value1, value2){
    this.name = value0;
    this.color = value1;
    this.arr = value2;
}
function Random(value){
    return Math.floor(Math.random() * value)
}

var OnSquaredComparisonBC = new Graph("PreSorted Comparison",10,100,0);
OnSquaredComparisonBC.addLine("Selection", "#f00", 0);
OnSquaredComparisonBC.addLine("Bubble", "#0f0", 1);
OnSquaredComparisonBC.addLine("Insertion", "#00f", 2);

var OnSquaredComparisonWC = new Graph("RevSorted Comparison",400,100,1);
OnSquaredComparisonWC.addLine("Selection", "#f00", 0);
OnSquaredComparisonWC.addLine("Bubble", "#0f0", 1);
OnSquaredComparisonWC.addLine("Insertion", "#00f", 2);


var OnSquaredComparisonAC = new Graph("RandSorted Comparison",800,100,2);
OnSquaredComparisonAC.addLine("Selection", "#f00", 0);
OnSquaredComparisonAC.addLine("Bubble", "#0f0", 1);
OnSquaredComparisonAC.addLine("Insertion", "#00f", 2);

var ShellSortOptimizationBC = new Graph("PreSorted Comparison",10,600,0);
ShellSortOptimizationBC.addLine("Insertion", "#f00",2);
ShellSortOptimizationBC.addLine("Shell", "#0f0",3);

var ShellSortOptimizationWC = new Graph("RevSorted Comparison",400,600,1);
ShellSortOptimizationWC.addLine("Insertion", "#f00",2);
ShellSortOptimizationWC.addLine("Shell", "#0f0",3);

var ShellSortOptimizationAC = new Graph("RandSorted Comparison",800,600,2);
ShellSortOptimizationAC.addLine("Insertion", "#f00",2);
ShellSortOptimizationAC.addLine("Shell", "#0f0",3);

var ShellGapComparisonShells = new Graph("Shell vs Ciura Comparison", 10, 1100, 2);
ShellGapComparisonShells.addLine("Shell", "#0f0",3);
ShellGapComparisonShells.addLine("Ciura", "#00f",4);

var BucketSortOptimizationBC = new Graph("PreSorted Comparison", 10 ,1600, 0);
BucketSortOptimizationBC.addLine("Bucket", "#0f0",5);

var BucketSortOptimizationWC = new Graph("RevSorted Comparison", 400 ,1600, 1);
BucketSortOptimizationWC.addLine("Bucket", "#0f0",5);

var BucketSortOptimizationAC = new Graph("RandSorted Comparison", 800 ,1600, 2);
BucketSortOptimizationAC.addLine("Bucket", "#0f0",5);

var RadixSortOptimizationBC = new Graph("PreSorted Comparison", 10 ,2100, 0);
RadixSortOptimizationBC.addLine("RadixCounting", "#0f0",6);
RadixSortOptimizationBC.addLine("RadixInsertion", "#00f",7);

var RadixSortOptimizationWC = new Graph("RevSorted Comparison", 400 ,2100, 1);
RadixSortOptimizationWC.addLine("RadixCounting", "#0f0",6);
RadixSortOptimizationWC.addLine("RadixInsertion", "#00f",7);

var RadixSortOptimizationAC = new Graph("RandSorted Comparison", 800 ,2100, 2);
RadixSortOptimizationAC.addLine("RadixCounting", "#0f0",6);
RadixSortOptimizationAC.addLine("RadixInsertion", "#00f",7);

var MergevsQuickBC = new Graph("PreSorted Comparison", 10 ,2600, 0);
MergevsQuickBC.addLine("Merge", "#0f0",8);
MergevsQuickBC.addLine("Quick", "#00f",9);

var MergevsQuickWC = new Graph("RevSorted Comparison", 400 ,2600, 1);
MergevsQuickWC.addLine("Merge", "#0f0",8);
MergevsQuickWC.addLine("Quick", "#00f",9);

var MergevsQuickAC = new Graph("RandSorted Comparison", 800 ,2600, 2);
MergevsQuickAC.addLine("Merge", "#0f0",8);
MergevsQuickAC.addLine("Quick", "#00f",9);


function Time(){
    context.fillStyle = "#000";
    context.fillRect(0,0,1500,3000);

    context.fillStyle = "#fff";
    context.font = "50px Calibri";

    context.fillText("O(n^2) Algorithms (Selection, Bubble, Insertion)", 10, 70);
    OnSquaredComparisonBC.draw();
    OnSquaredComparisonWC.draw();
    OnSquaredComparisonAC.draw();

    context.fillStyle = "#fff";
    context.font = "50px Calibri";
    context.fillText("Shell Sort Optimization", 10, 570);
    ShellSortOptimizationBC.draw();
    ShellSortOptimizationWC.draw();
    ShellSortOptimizationAC.draw();

    context.fillStyle = "#fff";
    context.font = "50px Calibri";
    context.fillText("Shell vs Ciura", 10, 1070);
    ShellGapComparisonShells.draw();

    context.fillStyle = "#fff";
    context.font = "50px Calibri";
    context.fillText("Bucket Sort Optimization", 10, 1570);
    BucketSortOptimizationBC.draw();
    BucketSortOptimizationWC.draw();
    BucketSortOptimizationAC.draw();
    
    context.fillStyle = "#fff";
    context.font = "50px Calibri";
    context.fillText("Radix Sort Optimization", 10, 2070);
    RadixSortOptimizationBC.draw();
    RadixSortOptimizationWC.draw();
    RadixSortOptimizationAC.draw();
    
    context.fillStyle = "#fff";
    context.font = "50px Calibri";
    context.fillText("Merge Sort vs Quick Sort", 10, 2570);
    MergevsQuickBC.draw();
    MergevsQuickWC.draw();
    MergevsQuickAC.draw();
}

setInterval(Time, 1000);