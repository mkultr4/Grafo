var Grafo = function (id, points, radius, width, height, opacity) {
    /*Selft*/
    var self = this;
    /*The stage*/
    self._stage = null;
    /*The shapes layer*/
    self._shapesLayer = null;
    self._container_id = id;
    self._points = points;
    self._radius = radius;
    self._width = width;
    self._height = height;
    self._opacity = opacity;
    self._grafos = [];

    self._initialize = function () {
        /*Create the stage*/
        self._stage = new Kinetic.Stage({container: self._container_id, width: self._width, height: self._height});
        /*Create the shape layers*/
        self._shapesLayer = new Kinetic.Layer();
        /*Clear stage*/
        self._stage.clear();
        /*Total of points*/
        var totalPoints = self._points.length;
        for (var i = 0; i < totalPoints; i++) {
            var label = i;
            /*Node Draw*/
            self.drawNode(self._points[i], ++label);
            /*Arrow Draw*/
            var arrowAux = i;
            var arrowAux = arrowAux + 1;

            if (arrowAux < totalPoints)
            {
                self.drawLine(self._points[i], self._points[arrowAux]);
            }
        }
        /*If have grafos add shapes layer to the stage*/
        if (self._grafos.length > 0)
        {
            self._stage.add(self._shapesLayer);
        }
    };
    /*Function Draw Node*/
    self.drawNode = function (point, label)
    {
        var x = point.x;
        var y = point.y;
        /*Not overflow canvas*/
        if (x < self._radius)
        {
            x = self._radius;
        } else if (x > self._width)
        {
            x = x - self._radius;
        }

        if (y < self._radius)
        {
            y = self._radius;
        } else if (y > self._height)
        {
            y = y - self._radius;

        }
        /*Text*/
        var text = new Kinetic.Text({
            align: 'center',
            text: label,
            fontStyle: 'bold',
            fontSize: 11,
            fontFamily: 'Calibri',
            fill: '#fff',
            opacity:self._opacity
        });
        /*Circle*/
        var circle = new Kinetic.Circle({
            x: x,
            y: y,
            radius: self._radius,
            fill: 'rgba(200,0,0,0.5)',
            stroke: '#fff',
            text: text,
            strokeWidth: 1,
            opacity:self._opacity
        });

        /*Text Position*/
        text.setX(circle.getX() - text.getWidth() / 2);
        text.setY(circle.getY() - text.getHeight() / 2);
        /*Group Text && Circle*/
        var group = new Kinetic.Group();
        group.add(circle);
        group.add(text);
        /*Push array grafos*/
        self._grafos.push(group);
        /*Add to layers group*/
        self._shapesLayer.add(group);
        /*
        self.mouseActions(group);*/
    };
    /*Function Draw Line*/
    self.drawLine = function (origin, destiny)
    {

        if (origin.x < self._radius)
            origin.x = self._radius;
        else if (origin.x > self._width)
            origin.x = origin.x - self._radius;

        if (origin.y < self._radius)
            origin.y = self._radius;
        else if (origin.y > self._height)
            origin.y = origin.y - self._radius;

        if (destiny.x < self._radius)
            destiny.x = self._radius;
        else if (destiny.x > self._width)
            destiny.x = destiny.x - self._radius;

        if (destiny.y < self._radius)
            destiny.y = self._radius;
        else if (destiny.y > self._height)
            destiny.y = destiny.y - self._radius;
        /*Angle 2 Points*/
        var angle = Math.atan2(destiny.y - origin.y, destiny.x - origin.x);
        /*Size Arrow*/
        var sizeHead = self._radius / 2;
        var origen_x = origin.x + self._radius * Math.cos(angle);
        var origen_y = origin.y + self._radius * Math.sin(angle);
        var destino_x = destiny.x - self._radius * Math.cos(angle);
        var destino_y = destiny.y - self._radius * Math.sin(angle);


        /*Grafo line*/
        var grafo_line = new Kinetic.Line({
            points: [origen_x, origen_y, destino_x, destino_y],
            stroke: '#f00',
            strokeWidth: 1,
            lineCap: 'round',
            lineJoin: 'round',
            opacity: self._opacity
        });
        /*Add Grafo line to shapes layer*/
        self._shapesLayer.add(grafo_line);

    };

    self.mouseActions = function (group)
    {


        group.on('mouseover', function (e) {

            var children = this.children;
            var circle = children[0];
            var text = children[0];


            circle.attrs.fill = 'blue';
            circle.attrs.radius = circle.attrs.radius * 1.1;
            text.attrs.fontSize = circle.attrs.text.attrs.fontSiz * 0.5;
            self._shapesLayer.draw();

        });
        group.on('mouseout', function (e) {
            var children = this.children;
            var circle = children[0];
            var text = children[0];


            circle.attrs.fill = 'rgba(200,0,0,0.5)';
            circle.attrs.radius = self._radius;
            text.attrs.fontSize = 11;
            self._shapesLayer.draw();

        });
    };

    self.setPoints = function (points)
    {
        self._points = points;

    };
    self.setSize = function (width, height)
    {
        self._width = width;
        self._height = height;

    };
    self.setRadius = function (radius)
    {
        self._radius = radius;

    };
    self.setOpacity = function (opacity)
    {
        self._opacity = opacity / 100;

    };

    self.rePaint = function ()
    {
        console.log('repaint');
        self._initialize();
    };

    {
        self._initialize();
    }
};



