class Firework {

	constructor(x_, y_) {
		// x_ = starting x-position of firework
		// y_ = starting y-position of firework

		this.x = x_;
		this.y = y_;

		// vectors
		//this.lift = createVector(0, 5); // create a lift vector with y = 5
		this.gravity = createVector(0, -0.05); // create a gravity vector with y = -0.2
		this.velocity = createVector(0, 8); // create a velocity vector that starts at y = 5

		// explosion attributes
		this.bit1_x = this.x + random(10);
		this.bit1_y = this.y + random(3);

		/*if (this.y <= 10) {
			this.x = x_;
			this.y = y_;
		}*/

	}

	display() {
		// firework's main form when rising (excluding trail)

		fill(255);
		noStroke();
		circle(this.x, this.y, 10);

	}

	rise() {
		// makes the firework rise, leaving a trail behind

		//trail
		fill(255, 255, 0); // yellow
		// trail length varies from the y-pos of firework launch (height)
		// to 5 pixels below y-pos of firework in the air (this.y+5)
		for (let trail_length = height; trail_length >= this.y+5; trail_length -= 10) {
			rectMode(CENTER);
			rect(this.x, trail_length, 5, 10); // TURN INTO SOMETHING MORE LIKE A FIREWORK TRAIL
		}

		//this.velocity.add(this.lift); // increment velocity by value of lift
		//this.velocity.limit(5); // limiting the velocity to 5
		
		//console.log(this.velocity.y);
		this.y -= this.velocity.y; // apply velocity y-value to firework's y position
		//console.log(this.y);
		this.velocity.add(this.gravity); // decrease starting velocity with gravity

	}

	explode() {
		// makes the firework explode, with bits falling down in various directions/trajectories

		this.velocity.mult(0); //reset velocity vector
		fill(255);
		noStroke();
		circle(this.bit1_x, this.bit1_y, 5);

	}

	restart() {
		// makes the firework shoot once more

		//this.x = x_;
		//this.y = y_;

	}

}