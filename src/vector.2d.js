var Vector2D = (function(){
  var outside = {},
  geom = kendo.geometry;

  outside.generateVectorBetweenTwoPoints = function(initialPoint, finalPoint) {
    var abscissa = finalPoint.getX() - initialPoint.getX();
    var coordinate = finalPoint.getY() - initialPoint.getY();
    return new geom.Point(abscissa, coordinate);
  }

  outside.getScalarProjectionOfAOnP = function(vectorA, vectorP) {
    var dotProduct = (vectorA.getX() * vectorP.getX()) + (vectorA.getY() * vectorP.getY());
    var magnitudeVectorP = this.getVectorMagnitude(vectorP);
    var magnitudProjecttion = dotProduct / magnitudeVectorP;
    return Math.abs(magnitudProjecttion);
  }

  outside.getVectorMagnitude = function(vector) {
    var abscissaPow2 =  Math.pow(vector.getX(), 2);
    var coordinatePow2 =  Math.pow(vector.getY(), 2);
    return Math.sqrt(abscissaPow2 + coordinatePow2);
  }

  return outside;
}());
