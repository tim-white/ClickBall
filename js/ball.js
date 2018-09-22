function Ball(xpos, ypos, radius, color, w, h) {
  var x = xpos, y=ypos;
  var xdir=1, ydir=1;
  var moveDistance = 2;
  this.update = ()=> {
      x += (moveDistance*xdir);
      y += (moveDistance*ydir);
      if ( x-radius <= 0 || x+radius >= w ) {
        xdir*=-1;
        x+= (moveDistance*xdir);
      }
      if ( y-radius <= 0 || y+radius >= h) {
        ydir*=-1;
        y+=(moveDistance*ydir);
      }
    };
	
	//this.acceptClick = function(clickEvent) {
	this.acceptClick = ( clickEvent ) => {
		// Calculate distance from the click point to the centre of the circle. If that distance is greater than the 
		// radius of the circle then the click is outside the circle, otherwise the click is inside the circle.
		// Pythagoras theorem - The Square on the Hypotenuse is equal to the sum of the square of the other two sides.
		var distanceToCentre = Math.sqrt(Math.pow(clickEvent.clientX-x,2)+Math.pow(clickEvent.clientY-y,2));
		if ( distanceToCentre <= radius ) {
			return true;
		}
		return false;
		
		// return distanceToCentre <= radius;
	}
	
	this.onClick = ( clickEvent ) => {
		// Do whatever I'm supposed to do when I'm clicked.
		//alert("Got me - a little circle!!");
	}

  this.draw = (ctx)=>{
      var path = new Path2D();
      path.arc(x,y,radius, 0, 2*Math.PI, false);
      ctx.fillStyle= color;
      ctx.fill(path);
    };
}
