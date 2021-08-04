
// Default Tools 
var selectedTools = {
    'strokeSize' : 10,
    'color' : "#000000",
    'tool' : "pencil"    
}

// Called if new tool is selected
function selectTool(newTool) {
    selectedTools.tool = newTool;
}

// Called if stroke size is changed
function strokeChange(e) {
    selectedTools.strokeSize = e.value;
}

// Called if color is changed
function colorChange(e) {
    selectedTools.color = e.value;
}


window.addEventListener("load", function() {

    const canvas = document.getElementById("board");
    
    // Resizing Canvas
    canvas.height = window.innerHeight - 20;
    canvas.width = window.innerWidth;

    // Context Element
    const context = canvas.getContext('2d');

    // Boolean Variable to State wether to draw or not
    var painting = false;

    // Initial Position of drawing 
    var initPos;

    // To Store snapshot
    var snapshot;




    // Gives the mouse coordinates
    function getMouseCoordinates(e) {
        return {"x": e.clientX, "y": e.clientY};
    }




    // Repeating lines to draw
    function write(e) {
        context.lineTo(e.clientX, e.clientY);
        context.stroke();
        context.beginPath();
        context.moveTo(e.clientX, e.clientY); 
    }




    // Take snapshot of current state
    function takeSnapshot() {
        snapshot = context.getImageData(0, 0, canvas.width, canvas.height);
    }




    // Use saved snapshot
    function restoreSnapshot() {
        context.putImageData(snapshot, 0, 0);
    }





    // To draw straight 
    function drawLine(position) {
        context.beginPath();
        context.moveTo(initPos.x, initPos.y)
        context.lineTo(position.x, position.y);
        context.stroke()
    }



    // When start drawing
    function startDrawingPosition(e) {
        painting = true;
        initPos = getMouseCoordinates(e);
        takeSnapshot();
        draw(e);
    }



    // When stopped drawing
    function stopDrawingPosition(e) {
        painting = false;
        context.beginPath()
    }




    // Main function for drawing
    function draw(e) {
        if(painting){
            context.lineWidth = selectedTools.strokeSize;
            context.strokeStyle = selectedTools.color;
            context.lineCap='round';

            if (selectedTools.tool === "pencil"){
                write(e);  
            }
            else if (selectedTools.tool === "eraser"){
                context.strokeStyle = "#ffffff";
                write(e); 
            }
            else if (selectedTools.tool === "line"){
                restoreSnapshot();
                drawLine(getMouseCoordinates(e));
            }
        }
    }



    // 
    //  Event Listeners for drawing 
    //

    canvas.addEventListener("mousedown", startDrawingPosition);
    canvas.addEventListener("mouseup", stopDrawingPosition);
    canvas.addEventListener("mouseout", stopDrawingPosition);
    canvas.addEventListener("mousemove", draw);

});

