function Picture(imgReference, w, h, x, y) {
  var xpos=x, ypos=y;
  var xdir = 1, ydir = 1;
  var moveAmount = 2;
  var imgWidth = imgReference.naturalWidth;
  var imgHeight = imgReference.naturalHeight;
  this.update = ()=> {
    xpos += moveAmount*xdir;
    ypos += moveAmount*ydir;

    if ( xpos <= 0 || (xpos + imgWidth)>=w) {
      xdir *= -1;
      xpos += moveAmount*xdir;
    }

    if (ypos <= 0 || (ypos + imgHeight)>=h) {
      ydir *= -1;
      ypos += moveAmount*ydir;
    }
  }

	this.acceptClick = ( clickEvent ) => {
		// If this click event happened on space I occupy then return true, otherwise return false.
		// clientX clientY
		if ( clickEvent.clientX >= xpos && clickEvent.clientX <= (xpos + imgWidth) &&
			 clickEvent.clientY >= ypos && clickEvent.clientY <= (ypos + imgHeight)	) {
				 return true;
		}
		return false;
	}
	
	this.onClick = ( clickEvent ) => {
		//alert("Got me! - but I'm a big square");
	}
	
  this.draw = (canvasContext)=> {
    canvasContext.drawImage(imgReference, 0, 0, imgWidth,
      imgHeight, xpos, ypos,imgWidth,imgHeight);
  }
}
