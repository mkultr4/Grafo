Grafo Plugin Jquery with Kinetic 
------------------

For this project use https://github.com/joker-x/canvas-grafocondorcet from  joker-x.
For graphical use Kinetic. <a href="http://agavestorm.com/kineticjs/">HomePage</a>

just call:

$(container).grafo(options)


<h2>Options Default and seteables</h2>
   
    options = {
        //Options 
        radius: 20,
        opacity: 1,
        width: 600,
        height: 600,
        points: [],
        /*Circle Options*/
        color:"rgba(200,0,0,0.5)",
        stroke: '#fff',
        strokeWidth: 1,
        /*Options of the label*/
        fontSize :11,
        fontWeight:"bold",
        fontFamily:"calibri",
        fontColor:"#fff",
        /*Options of the lines*/
        strokeLine: '#f00',
        strokeWidthLine: 1,

    };<br>

-points: array of points("[{x,y,label*}]"). Label is optional.<br>


<h2>Functions</h2>

To call function :<br>
var grafo = $(container).grafo(options).data('grafo');
<br>

Function to reinit grafo: grafo.rePaint();<br>
Function to set option: grafo.setOption(option,value);<br>
Function to get option: grafo.getOption(option);<br>
<br>
<h4>Examples</h4>
grafo.setOption('opacity',opacity/100);<br>
grafo.setOption('radius',radius);<br>
grafo.setOption('points',points);<br>



<h2>Usage</h2>
Add grafo.jquery.js, and kinetic.
   
<h2>Example</h2>
<a href="http://mkultr4.github.io/Grafo/">A example</a>

I made according to my problem, I hope someone will serve you.

cheers




