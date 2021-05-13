class Choice_circle {

	constructor(x_, y_, yes_no) {
		// x_ = starting x-position of circle
		// y_ = starting y-position of circle
		// yes_no = string that is either 'yes' or 'no'

		this.x = x_;
		this.y = y_;
		this.choice = yes_no;
	}

	display() {
		pg.noStroke();
		textFont(roboto); // set font to Roboto light
		textSize(32); // make the text bigger

		// different fills of circle depending on this.choice
		// also different positioning of text (to remain in center of respective circles)
		if (this.choice == 'yes') {
			pg.fill(245, 77, 7);
			text(this.choice, (this.x - 25), (this.y + 7));
		} else if (this.choice == 'no') {
			pg.fill(74, 212, 134);
			text(this.choice, (this.x - 17), (this.y + 9));
		}
		pg.push();
			pg.translate(width/2, height/2);
			pg.circle(this.x, this.y, width/6); // circle drawn
		pg.pop();
	}

	clicked_on() {
		// runs in function mouseClicked()
		// progresses scene and returns true
		// to one of two variables used in Scene 7

		// add amounts to this.x and this.y so that they match up with the coordinates
		// we see on the screen 
		let d = dist(mouseX, mouseY, (this.x + width/2), (this.y + height/2)); // like translate(width/2, height/2)
		if (d < width/12) {
			// replacing the role of the spacebar
			scene++;
			voice_switch = true;
			pg.clear();
			
			return true; // returning true to the choice object is associated with (yes or no)
		}
	}


}