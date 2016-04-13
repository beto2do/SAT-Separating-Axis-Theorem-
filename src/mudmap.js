function makeMudMap(config){
  var outside = {},
      draw = kendo.drawing,
      geom = kendo.geometry,
      Rect = kendo.geometry.Rect,
      Path = draw.Path;

      //funcion duplicada
  var getVectorBetweenTwoPoints = function(pointA, pointB){
    var abscissa = pointB.getX() - pointA.getX();
    var coordinate = pointB.getY() - pointA.getY();
    return new geom.Point(abscissa, coordinate);
  }

  var areThereCollision = function(axis, vectorP, vectorA, vectorB){

    var magnitudeProjection1 = projectionAB(vectorA, axis);
    var magnitudeProjection2 = projectionAB(vectorB, axis);
    var magnitudeProjection3 = projectionAB(vectorP, axis);
    var response = true;

    var gap = magnitudeProjection3 - magnitudeProjection1 - magnitudeProjection2;
    if(gap > 0){
      response = false;
    }
    return response;
  }

  var projectionAB = function(vectorA, vectorP){
    var dotProduct = (vectorA.getX() * vectorP.getX()) + (vectorA.getY() * vectorP.getY());
    var magnitudeVectorP = getModuloVector(vectorP);
    var magnitudProjecttion = dotProduct / magnitudeVectorP;
    return Math.abs(magnitudProjecttion);
  }

  var getModuloVector = function(vector){
    var abscissaPow2 =  Math.pow(vector.getX(), 2);
    var coordinatePow2 =  Math.pow(vector.getY(), 2);
    return Math.sqrt(abscissaPow2 + coordinatePow2);
  }

  var getRect = function(rectangles){
    var arrayRect = [];
    rectangles.forEach(function(item){
      var rectangle = makeRectangle(item.abscissa, item.coordinate,item.percent,item.amount);
      arrayRect.push(rectangle);
    });
    return arrayRect;
  }

  var areThereCollisionBetweenShares = function(rectA, rectB){
    var centerPointA = rectA.getCenterPoint();
    var centerPointB = rectB.getCenterPoint();

    var vectorP = getVectorBetweenTwoPoints(centerPointA,centerPointB);

    var vectorsA = rectA.getVectors();
    var vectorsB = rectB.getVectors();
    var axisA = rectA.getAxies();
    var axisB = rectB.getAxies();
    var response = true;
    shareA:
    for(w = 0; w < axisA.length; w++){
      for(i = 0; i < vectorsA.length; i++){
        for(j = 0; j < vectorsB.length; j++){
          if(!areThereCollision(axisA[w],vectorP,vectorsA[i],vectorsB[j])){
            response = false;
            break shareA;
          }
        }
      }
    }

    return response;
  }

  var areaCanvas = new Rect([0, 0], [config.canvaWith, config.canvaHeight]);
  var layout = new draw.Layout(areaCanvas,{
    alignContent:"start",
    alignItems: "start",
    justifyContent: "start"
  });

  var pathRects = getRect(config.rectangles);
  var rect1 = pathRects[0];
  var rect2 = pathRects[1];

   var collision = areThereCollisionBetweenShares(rect1,rect2);
  if(collision){
    console.error("hay colision :(");
  }else{
    console.info("NO HAY colision :))))");
  }
  var surface = draw.Surface.create($("#surface"));

  pathRects.forEach(function(rectangle){
    var rect = Path.fromRect(rectangle.getRect());
    rect.fill("orange");
    surface.draw(rect);
  });

  return outside;
}
