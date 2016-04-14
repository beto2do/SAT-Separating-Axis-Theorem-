function makeRectangle(abscissa,coordinate, width, height){
  var outside = {},
  geom = kendo.geometry,
  origin = new geom.Point(abscissa, coordinate),
  size = new geom.Size(width, height),
  rect = new geom.Rect(origin, size);

   var getCenterToRightUpVector = function() {
    return new geom.Point(size.getWidth() / 2,-size.getHeight() / 2);
  }

  var getCenterToLeftUpVector = function() {
    return new geom.Point(-size.getWidth() / 2,-size.getHeight() / 2);
  }

  var getCenterToLeftBottomVector = function() {
    return new geom.Point(-size.getWidth() / 2,size.getHeight() / 2);
  }

  var getCenterToRightBottomVector = function() {
    return new geom.Point(size.getWidth() / 2,size.getHeight() / 2);
  }

  var getLeftUpPoint = function() {
    return origin;
  }

  var getRightUpPoint = function() {
    return new geom.Point(origin.getX() + size.getWidth(),origin.getY());
  }

  var getLeftBottomPoint = function() {
    return new geom.Point(origin.getX() + size.getWidth(),origin.getY() + size.getHeight());
  }

  var getRightBottomPoint = function() {
    return new geom.Point(origin.getX(),origin.getY() + size.getHeight());
  }

  var isThereAGap = function(axis, vectorP, vectorA, vectorB) {

    var magnitudeProjAOnAxis = Vector2D.getScalarProjectionOfAOnP(vectorA, axis);
    var magnitudeProjBOnAxis = Vector2D.getScalarProjectionOfAOnP(vectorB, axis);
    var magnitudeProjPOnAxis = Vector2D.getScalarProjectionOfAOnP(vectorP, axis);

    var gap = magnitudeProjPOnAxis - magnitudeProjAOnAxis - magnitudeProjBOnAxis;
    var greatThanCero = (gap > 0);

    return !greatThanCero;
  }

  outside.getKendoRect = function() {
    return rect;
  }

  outside.hasOverlap = function(rectangle) {
    var centerPointA = this.getCenterPoint();
    var centerPointB = rectangle.getCenterPoint();

    var vectorBetweenCenters = Vector2D.generateVectorBetweenTwoPoints(centerPointA,centerPointB);

    var vectorGroupA = this.getInteriorVectors();
    var vectorGroupB = rectangle.getInteriorVectors();
    var axesGroupA = this.getAxes();
    var hasOverlap = true;

    noOverlap:
    for(numAxes = 0; numAxes < axesGroupA.length; numAxes++){
      for(numVectA = 0; numVectA < vectorGroupA.length; numVectA++){
        for(numVectB = 0; numVectB < vectorGroupB.length; numVectB++){
          if(!isThereAGap(axesGroupA[numAxes],vectorBetweenCenters,vectorGroupA[numVectA],vectorGroupB[numVectB])){
            hasOverlap = false;
            break noOverlap;
          }
        }
      }
    }

    return hasOverlap;
  }

  outside.getCenterPoint = function() {
    var centerAbscissa = origin.getX() + (size.getWidth() / 2);
    var centerCoordinate = origin.getY() + (size.getHeight() / 2);
    return new geom.Point(centerAbscissa, centerCoordinate);
  }

  outside.getInteriorVectors = function() {
    var vectorA = getCenterToRightUpVector();
    var vectorB = getCenterToLeftUpVector();
    var vectorC = getCenterToLeftBottomVector();
    var vectorD = getCenterToRightBottomVector();
    return [vectorA,vectorB,vectorC,vectorD];
  }

  outside.getAxes = function() {
    var vectorUp = Vector2D.generateVectorBetweenTwoPoints(getLeftUpPoint(),getRightUpPoint());
    var vectorRight = Vector2D.generateVectorBetweenTwoPoints(getRightUpPoint(),getLeftBottomPoint());
    var vectorBottom = Vector2D.generateVectorBetweenTwoPoints(getLeftBottomPoint(),getRightBottomPoint());
    var vectorLeft = Vector2D.generateVectorBetweenTwoPoints(getRightBottomPoint(),getLeftUpPoint());
    return [vectorUp,vectorRight,vectorBottom,vectorLeft];
  }

  return outside;
}
