function makeMudMap(config){
  var outside = {},
      draw = kendo.drawing,
      surface = draw.Surface.create($("#surface"));

  var createRectangles2D = function(rectangles){
    var arrayRect = [];
    rectangles.forEach(function(item){
      var rectangle = makeRectangle(item.abscissa, item.coordinate,item.width,item.height);
      arrayRect.push(rectangle);
    });
    return arrayRect;
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

  pathRects.forEach(function(rectangle) {
    var kendoRect = rectangle.getKendoRect();
    surface.draw(kendoRect);
  });

  return outside;
}
