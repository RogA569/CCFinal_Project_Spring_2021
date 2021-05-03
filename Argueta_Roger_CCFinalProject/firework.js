class Firework {

	constructor(x_, y_) {
		// x_ = starting x-position of firework
		// y_ = starting y-position of firework

		this.x = x_;
		this.y = y_;

		this.peak_height = random((-height/2), -50);

		// vectors
		this.gravity = createVector(0, -0.03); // create a gravity vector with y = -0.03
		this.velocity = createVector(0, 10); // create a velocity vector that starts at y = 10

	}

	display() {
		// firework's main form when rising (excluding trail)
		
		if (this.y > this.peak_height) {
			fill(255);
			noStroke();
			circle(this.x, this.y, 10);
		}

	}

	rise() {
		// makes the firework rise, leaving a trail behind

		if (this.y > this.peak_height) {
			//trail
			fill(255, 255, 0); // yellow
			// trail length varies from the y-pos of firework launch (height/2)
			// to 5 pixels below y-pos of firework in the air (this.y+5)
			for (let trail_length = height/2; trail_length >= this.y+5; trail_length -= 10) {
				rectMode(CENTER);
				rect(this.x, trail_length, 5, 10); // TURN INTO SOMETHING MORE LIKE A FIREWORK TRAIL
			}
			
			this.y -= this.velocity.y; // apply velocity y-value to firework's y position
			this.velocity.add(this.gravity); // decrease starting velocity with gravity
		}

	}

	explode() {
		// when firework exploded, velocity becomes 0
		if (this.y < this.peak_height) {
			this.velocity = 0;
			return true;
		}
	}
}