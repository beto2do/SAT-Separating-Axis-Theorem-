function makeMudMap(config){
  var outside = {},
      draw = kendo.drawing,
      Path = draw.Path;

  var createRectangles2D = function(rectangles){
    var arrayRect = [];
    rectangles.forEach(function(item){
      var rectangle = makeRectangle(item.abscissa, item.coordinate,item.percent,item.amount);
      arrayRect.push(rectangle);
    });
    return arrayRect;
  }

  function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  var pathRects = createRectangles2D(config.rectangles);
  var rect1 = pathRects[0];
  var rect2 = pathRects[1];

   var overlap = rect1.hasOverlap(rect2);
  if(overlap){
    console.error("There is overlap :(");
  }else{
    console.info("There isn't overlap :)");
  }
  var surface = draw.Surface.create($("#surface"));

  pathRects.forEach(function(rectangle){
    var rect = Path.fromRect(rectangle.getKendoRect());
    rect.fill(getRandomColor());
    surface.draw(rect);
  });

  return outside;
}
