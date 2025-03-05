//helper functions, it turned out chrome doesn't support Math.sgn() 
function signum(x) {
    return (x < 0) ? -1 : 1;
}
function absolute(x) {
    return (x < 0) ? -x : x;
}

function drawPath(svg, path, startX, startY, endX, endY) {
    // get the path's stroke width (if one wanted to be  really precize, one could use half the stroke size)
    var stroke =  parseFloat(path.attr("stroke-width"));
    // check if the svg is big enough to draw the path, if not, set heigh/width
    if (svg.attr("height") <  endY)                 svg.attr("height", endY);
    if (svg.attr("width" ) < (startX + stroke) )    svg.attr("width", (startX + stroke));
    if (svg.attr("width" ) < (endX   + stroke) )    svg.attr("width", (endX   + stroke));
    
    var curveRadius = 0.55;

    var deltaX = (endX - startX) * curveRadius;
    var deltaY = (endY - startY) * curveRadius;
    // for further calculations which ever is the shortest distance
    var delta  =  deltaY < absolute(deltaX) ? deltaY : absolute(deltaX);

    // set sweep-flag (counter/clock-wise)
    // if start element is closer to the left edge,
    // draw the first arc counter-clockwise, and the second one clock-wise
    startY = startY-30

    var arc1 = 1; var arc2 = 0;
    if (startX > endX) {
        arc1 = 0;
        arc2 = 1;
    }
    // draw tha pipe-like path
    // 1. move a bit down, 2. arch,  3. move a bit to the right, 4.arch, 5. move down to the end 
    // path.attr("d",  "M"  + startX + " " + startY +
    //                 " V" + (startY + delta) +
    //                 " A" + delta + " " +  delta + " 0 0 " + arc1 + " " + (startX + delta*signum(deltaX)) + " " + (startY + 2*delta) +
    //                 " H" + (endX - delta*signum(deltaX)) + 
    //                 " A" + delta + " " +  delta + " 0 0 " + arc2 + " " + endX + " " + (startY + 3*delta) +
    //                 " V" + endY );

    path.attr("d",  "M"  + (startX-60) + " " + (startY) +
                    " H" + ((endX/2) - delta + 25) +
                    " A" + delta + " " +  delta + " 0 0 " + "1" + " " + ((endX/2)+25) + " " + (startY+deltaY) +
                    " V" + (endY-130) + 
                    " A" + delta + " " +  delta + " 0 0 " + "0" + " " + (endX/2+deltaY+25) + " " + (endY+deltaY-130) +
                    " H" + (endX - 35)
                    );
    
    
}

function connectElements(svg, path, startElem, endElem) {
    var svgContainer= $("#svgContainer");

    // if first element is lower than the second, swap!
    if(startElem.offset().top > endElem.offset().top){
        var temp = startElem;
        startElem = endElem;
        endElem = temp;
    }

    // get (top, left) corner coordinates of the svg container   
    var svgTop  = svgContainer.offset().top;
    var svgLeft = svgContainer.offset().left;

    // get (top, left) coordinates for the two elements
    var startCoord = startElem.offset();
    var endCoord   = endElem.offset();

    // calculate path's start (x,y)  coords
    // we want the x coordinate to visually result in the element's mid point
    var startX = startCoord.left + 0.5*startElem.outerWidth() - svgLeft;    // x = left offset + 0.5*width - svg's left offset
    var startY = startCoord.top  + startElem.outerHeight() - svgTop;        // y = top offset + height - svg's top offset

    // calculate path's end (x,y) coords
    var endX = endCoord.left - svgLeft;
    // var endY = endCoord.top - svgTop;
    var endY = endCoord.top - svgTop ;

    // call function for drawing the path
    drawPath(svg, path, startX, startY, endX, endY);
}


function connectAll() {
    // connect all the paths you want!
    connectElements($("#svg1"), $("#path1"), $("#join"), $("#event-date"));
}

$(document).ready(function() {
    // reset svg each time 
    $("#svg1").attr("height", "0");
    $("#svg1").attr("width", "0");
    connectAll();
});

$(window).resize(function () {
    // reset svg each time 
    $("#svg1").attr("height", "0");
    $("#svg1").attr("width", "0");
    connectAll();
});