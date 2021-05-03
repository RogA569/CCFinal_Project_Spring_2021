class Raindrop {

	constructor(x_, y_) {
		// x_ = starting x-position of raindrop
		// y_ = starting y-position of raindrop

		this.x = x_;
		this.y = y_;

		//vectors
		this.velocity = createVector(0, 0); // no velocity to start with
		this.gravity = createVector(0, -0.03) // gravity will start to add velocity
	}

	display() {
		fill(188, 227, 240); // light blue
		noStroke();
		line(this.x, this.y, this.x, this.y+20);
	}


}