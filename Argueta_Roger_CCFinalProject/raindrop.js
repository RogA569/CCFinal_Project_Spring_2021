class Raindrop {

	constructor(x_, y_) {
		// x_ = starting x-position of raindrop
		// y_ = starting y-position of raindrop

		this.x = x_;
		this.y = y_;

		this.velocity = createVector(0, 100); // velocity with y = 100
	}

	display() {
		stroke(188, 227, 240); // light blue
		line(this.x, this.y, this.x, this.y+20);
	}

	fall() {
		// makes the raindrop fall by adding terminal velocity to this.y
		// once it reaches the bottom 
		this.y += this.velocity.y;
	}


}