var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");

function Graph(value0, value1, value2, value3){
    this.name = value0;
    this.positionX = value1;
    this.positionY = value2;
    this.X = 100;
    this.Y = 100;
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
                    gaps = [1,4,10,23,57];
                    temp.push(shellSort(this.arr.slice(0,l)));
                }
                break;
            case 5: 
                for(var l = 0; l<this.X; l++){
                    temp.push(bucketSort(this.arr.slice(0,l)));
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
        context.fillText( "100", this.positionX, this.positionY+20);
        context.fillStyle = "#fff";
		context.font = "30px Calibri";
        context.fillText( this.name, this.positionX, this.positionY+(this.Y*3)+50);

        for(var ctr = 0; ctr < this.Lines.length; ctr++){
            context.strokeStyle = this.Lines[ctr].color;
            context.beginPath();
            context.moveTo(this.positionX, this.positionY+(this.Y*3));
            context.stroke();
            for(var x = 0; x < this.Y; x++){
                if(this.Y-this.Lines[ctr].arr[x] >= 0)
                context.lineTo(this.positionX+(x*3), this.positionY+((this.Y-this.Lines[ctr].arr[x])*3));
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

var OnSquaredComparisonBC = new Graph("PreSorted Comparison",10,10,0);
OnSquaredComparisonBC.addLine("Selection", "#f00", 0);
OnSquaredComparisonBC.addLine("Bubble", "#0f0", 1);
OnSquaredComparisonBC.addLine("Insertion", "#00f", 2);

var OnSquaredComparisonWC = new Graph("RevSorted Comparison",400,10,1);
OnSquaredComparisonWC.addLine("Selection", "#f00", 0);
OnSquaredComparisonWC.addLine("Bubble", "#0f0", 1);
OnSquaredComparisonWC.addLine("Insertion", "#00f", 2);


var OnSquaredComparisonAC = new Graph("RandSorted Comparison",800,10,2);
OnSquaredComparisonAC.addLine("Selection", "#f00", 0);
OnSquaredComparisonAC.addLine("Bubble", "#0f0", 1);
OnSquaredComparisonAC.addLine("Insertion", "#00f", 2);

var ShellSortOptimizationBC = new Graph("PreSorted Comparison",10,500,0);
ShellSortOptimizationBC.addLine("Insertion", "#f00",2);
ShellSortOptimizationBC.addLine("Shell", "#0f0",3);

var ShellSortOptimizationWC = new Graph("RevSorted Comparison",400,500,1);
ShellSortOptimizationWC.addLine("Insertion", "#f00",2);
ShellSortOptimizationWC.addLine("Shell", "#0f0",3);

var ShellSortOptimizationAC = new Graph("RandSorted Comparison",800,500,2);
ShellSortOptimizationAC.addLine("Insertion", "#f00",2);
ShellSortOptimizationAC.addLine("Shell", "#0f0",3);

var ShellGapComparisonShells = new Graph("ShellCiura Comparison", 10, 1000, 2);
ShellGapComparisonShells.addLine("Shell", "#0f0",3);
ShellGapComparisonShells.addLine("Ciura", "#00f",4);

var BucketSortOptimizationBC = new Graph("PreSorted Comparison", 10 ,1500, 0);
BucketSortOptimizationBC.addLine("Bucket", "#0f0",5);

var BucketSortOptimizationWC = new Graph("RevSorted Comparison", 400 ,1500, 1);
BucketSortOptimizationWC.addLine("Bucket", "#0f0",5);

var BucketSortOptimizationAC = new Graph("RandSorted Comparison", 800 ,1500, 2);
BucketSortOptimizationAC.addLine("Bucket", "#0f0",4);

function Time(){
    context.fillStyle = "#000";
    context.fillRect(0,0,1500,2000);

    OnSquaredComparisonBC.draw();
    OnSquaredComparisonWC.draw();
    OnSquaredComparisonAC.draw();
    ShellSortOptimizationBC.draw();
    ShellSortOptimizationWC.draw();
    ShellSortOptimizationAC.draw();
    ShellGapComparisonShells.draw();
    BucketSortOptimizationBC.draw();
    BucketSortOptimizationWC.draw();
    BucketSortOptimizationAC.draw();
}

setInterval(Time, 1000);