Grafo with Kinetic 
------------------

I usage https://github.com/joker-x/canvas-grafocondorcet from  joker-x,
for graph drawing with the lib kinetic.

just call:

grafo = new Grafo(container, points, radius, width,height,opacity);

container: the container in which anger the chart
points : format of point [{x,y},{x,y}]
radius: radius of the circles
width: width of the stage where the graphs will be drawn
height: height of the stage where the graphs will be drawn
opacity: opacity of the graphs

<h2>Functions</h2>

rePaint: repaint the graphs.

setPoints(array)= set new collection of points, after that call repaint.  
self.setSize(width, height)= set size of stage, after that call repaint.
self.setRadius(radius)= set radius of the circles, after that call repaint.
self.setOpacity(opacity)= set the opacity, after that call repaint.


<h2>Usage</h2>
Add grafos.js, and kinetic.
    
I made according to my problem, I hope someone will serve you.

cheers




