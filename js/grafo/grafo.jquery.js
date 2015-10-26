/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


(function ($) {

    /*Self*/
    var base;


    $.grafo = function (el, options) {

        if (typeof $.fn.Kinetic !== 'undefined')
        {
            throw new Error('Kinetic is not defined!. Please add this lib.');
        }

        base = this;
        /*The stage*/
        // Access to jQuery and DOM versions of element
        base.$el = $(el);
        base.el = el;
        //Set the options
        base._options = $.extend({}, $.grafo.defaults, options);

        var init = function () {

            base._stage = null;
            /*The shapes layer*/
            base._shapesLayer = null;
            base._grafos = [];
            base._lines = [];
            
            /*Create the stage*/
            base._stage = new Kinetic.Stage({
                container: base.el,
                width: base._options.width,
                height: base._options.height});

            /*Create the shape layers*/
            base._shapesLayer = new Kinetic.Layer();
            /*Clear stage*/
            base._stage.clear();
            
            base._options.radius = parseInt(base._options.radius);
            base._options.width = parseInt(base._options.width);
            base._options.height = parseInt(base._options.height);
            
            /*Draw the grafo*/
            drawGrafo();
            console.log(base._options);
            console.log(base._grafos);
            console.log(base._lines);

        };

        var drawGrafo = function ()
        {
            /*Total of points*/
            var totalPoints = base._options.points.length;
            console.log(totalPoints);
            var labelAux = 1;
            for (var i = 0; i < totalPoints; i++) {

                var label;

                if (typeof base._options.points[i].label !== 'undefined')
                    label = base._options.points[i].label;
                else
                {

                    label = labelAux;
                    labelAux++;
                }


                /*Node Draw*/
                drawNode(base._options.points[i], label);
                /*Arrow Draw*/
                var arrowAux = i;
                var arrowAux = arrowAux + 1;

                if (arrowAux < totalPoints)
                {
                    drawLine(base._options.points[i], base._options.points[arrowAux]);
                }
            }

            /*If have grafos add shapes layer to the stage*/
            if (base._grafos.length > 0)
            {
                base._stage.add(base._shapesLayer);
            }
        };

        /*Function Draw Node*/
        var drawNode = function (point, label)
        {
            var x = point.x;
            var y = point.y;
            /*Not overflow canvas*/
            if (x < base._options.radius)
            {
                x = base._options.radius;
            } else if (x > base._options.width)
            {
                x = x - base._options.radius;
            }

            if (y < base._options.radius)
            {
                y = base._options.radius;
            } else if (y > base._options.height)
            {
                y = y - base._options.radius;

            }



            /*Text*/
            var text = new Kinetic.Text({
                align: 'center',
                text: label,
                fontStyle: base._options.fontWeight,
                fontSize: base._options.fontSize,
                fontFamily: base._options.fontFamily,
                fill: base._options.fontColor,
                opacity: base._options.opacity
            });
            /*Circle*/
            var circle = new Kinetic.Circle({
                x: x,
                y: y,
                radius: base._options.radius,
                fill: base._options.color,
                stroke: base._options.stroke,
                strokeWidth: base._options.strokeWidth,
                opacity: base._options.opacity
            });

            /*Text Position*/
            text.setX(circle.getX() - text.getWidth() / 2);
            text.setY(circle.getY() - text.getHeight() / 2);
            /*Group Text && Circle*/
            var group = new Kinetic.Group();
            group.add(circle);
            group.add(text);
            /*Push array grafos*/
            base._grafos.push(group);
            /*Add to layers group*/
            base._shapesLayer.add(group);
            /*
             base.mouseActions(group);*/
        };
        /*Function Draw Line*/
        var drawLine = function (origin, destiny)
        {

            if (origin.x < base._options.radius)
                origin.x = base._options.radius;
            else if (origin.x > base._options.width)
                origin.x = origin.x - base._options.radius;

            if (origin.y < base._options.radius)
                origin.y = base._options.radius;
            else if (origin.y > base._options.height)
                origin.y = origin.y - base._options.radius;

            if (destiny.x < base._options.radius)
                destiny.x = base._options.radius;
            else if (destiny.x > base._options.width)
                destiny.x = destiny.x - base._options.radius;

            if (destiny.y < base._options.radius)
                destiny.y = base._options.radius;
            else if (destiny.y > base._options.height)
                destiny.y = destiny.y - base._options.radius;
            /*Angle 2 Points*/
            var angle = Math.atan2(destiny.y - origin.y, destiny.x - origin.x);
            /*Size Arrow*/
            var sizeHead = base._options.radius / 2;
            var origen_x = origin.x + base._options.radius * Math.cos(angle);
            var origen_y = origin.y + base._options.radius * Math.sin(angle);
            var destino_x = destiny.x - base._options.radius * Math.cos(angle);
            var destino_y = destiny.y - base._options.radius * Math.sin(angle);



            /*Grafo line*/
            var grafo_line = new Kinetic.Line({
                points: [origen_x, origen_y, destino_x, destino_y],
                stroke: base._options.strokeLine,
                strokeWidth: base._options.strokeWidthLine,
                lineCap: 'round',
                lineJoin: 'round',
                opacity: base._options.opacity
            });
            /*Add Grafo line to shapes layer*/
            base._shapesLayer.add(grafo_line);
            base._lines.push(grafo_line);
        };

        /*Get option*/
        base.getOption = function (option)
        {
            return base._options[option];
        };
        base.setOption = function (option, value)
        {
            base._options[option] = value;
        };
        base.rePaint = function ()
        {
            init();
        };

        init();


    };



    $.grafo.defaults = {
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

    };


    $.fn.grafo = function (options) {
        /*return this.each(function () {
         (new $.grafo(this, options));
         });*/

        return this.each(function () {
            if (!$(this).data('grafo'))
                $(this).data('grafo', new $.grafo(this, options));
        });


    };

})(jQuery);