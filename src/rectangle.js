function makeRectangle(abscissa,coordinate, width, height){
  var outside = {},
  geom = kendo.geometry,
  origin = new geom.Point(abscissa, coordinate),
  size = new geom.Size(width, height),
  rect = new geom.Rect(origin, size);


  outside.getCenterPoint = function(){
    var centerAbscissa = origin.getX() + (size.getWidth() / 2);
    var centerCoordinate = origin.getY() + (size.getHeight() / 2);
    return new geom.Point(centerAbscissa, centerCoordinate);
  }

   var getVectorA = function(){
    return new geom.Point(size.getWidth() / 2,-size.getHeight() / 2);
  }

  var getVectorB = function(){
    return new geom.Point(-size.getWidth() / 2,-size.getHeight() / 2);
  }

  var getVectorC = function(){
    return new geom.Point(-size.getWidth() / 2,size.getHeight() / 2);
  }

  var getVectorD = function(){
    return new geom.Point(size.getWidth() / 2,size.getHeight() / 2);
  }

  var getFirstPointSquare = function(){
    return origin;
  }

  var getSecondPointSquare = function(){
    return new geom.Point(origin.getX() + size.getWidth(),origin.getY());
  }

  var getThirdPointSquare = function(){
    return new geom.Point(origin.getX() + size.getWidth(),origin.getY() + size.getHeight());
  }

  var getFourthPointSquare = function(){
    return new geom.Point(origin.getX(),origin.getY() + size.getHeight());
  }

  outside.getRect = function(){
    return rect;
  }

  var generateVector = function(initialPoint, finalPoint){
    var abscissa = finalPoint.getX() - initialPoint.getX();
    var coordinate = finalPoint.getY() - initialPoint.getY();
    return new geom.Point(abscissa, coordinate);
  }

  outside.getVectors = function(){
    var vectorA = getVectorA();
    var vectorB = getVectorB();
    var vectorC = getVectorC();
    var vectorD = getVectorD();
    return [vectorA,vectorB,vectorC,vectorD];
  }

  outside.getAxies = function(){
    var vectorX = generateVector(getFirstPointSquare(),getSecondPointSquare());
    var vectorY = generateVector(getSecondPointSquare(),getThirdPointSquare());
    var vectorW = generateVector(getThirdPointSquare(),getFourthPointSquare());
    var vectorZ = generateVector(getFourthPointSquare(),getFirstPointSquare());
    return [vectorX,vectorY,vectorW,vectorZ];
  }

  return outside;
}
