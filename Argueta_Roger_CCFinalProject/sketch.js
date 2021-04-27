// Problems: I don't know how to come back to a loop after resetting y position of the firework
// I don't know how to make a new shape whose x and y positions differ by a random value than the shape in display()


function setup() {
	createCanvas(800, 600);

	//fireworks in Scene 1
	firework1 = new Firework(width/2, height);
}

function draw() {
	background(0);

	if (firework1.y > 10) {
		firework1.display();
		firework1.rise();
	} else if (firework1.y <= 10) {

			firework1.explode();

			firework1.x = width/2;
			firework1.y = height;
			console.log(firework1.y);
		}
}