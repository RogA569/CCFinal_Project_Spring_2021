// Problems: I don't know how to come back to a loop after resetting y position of the firework
// I don't know how to make a new shape whose x and y positions differ by a random value than the shape in display()

let explosion;

function preload() {
	soundFormats('wav');
	explosion = loadSound('assets/sound_files/336008__rudmer-rotteveel__whistle-and-explosion-single-firework');
}

function setup() {
	createCanvas(800, 600, WEBGL);

	//fireworks in Scene 1
	firework1 = new Firework(0, height);

	explosion.play();


	//2021 structure in Scenes 1 and 2
	twty_twty_one = createWord3D("2021", width/35, width/150, 30);
}

function draw() {
	background(0);

	//Scene 1

	if (firework1.y > (-height/2 + 10)) {
		firework1.display();
		firework1.rise();
	} else if (firework1.y <= (-height/2 + 10)) {

			firework1.explode();

			firework1.x = width/2;
			firework1.y = height;
			console.log(firework1.y);
		}

	twty_twty_one.show();
	
	// end of Scene 1 (2021 structure is still part of Scene 2)

	// Scene 2



	// end of Scene 2

}