// Roger Argueta

let scene; // incremental scene counter

// firework variables
let explosion; // sound file of firework explosion
let fireworks; // array of objects of Firework class

function preload() {
	soundFormats('wav');
	explosion = loadSound('assets/sound_files/336008__rudmer-rotteveel__whistle-and-explosion-single-firework');
}

function setup() {
	createCanvas(800, 600, WEBGL);
	scene = 1;

	fireworks = [];

	//2021 structure in Scenes 1 and 2
	twty_twty_one = createWord3D("2021", width/35, width/150, 30);
}

function draw() {
	background(0);

	switch (scene) {

		//Scene 1
		case 1:
			for (let x = random(-(width/4), -(width/4)+60); x < (width/4); x += random(25, 75)) {
				let new_firework = new Firework(x, height);
				fireworks.push(new_firework);
			}

			for (let firework = 0; firework < fireworks.length; firework++) {
				fireworks[firework].display();
				fireworks[firework].rise();
					
				if (fireworks[firework].y <= height/2 && fireworks[firework].y >= height/2-10) {
					explosion.play();
				}
				fireworks[firework].explode();
				if (fireworks[firework].explode()) {
					fireworks.splice(fireworks[firework], 1);
				}
				break;
			}

			twty_twty_one.show();	
		// end of Scene 1

		// Scene 2



		// end of Scene 2

	} // end of switch statement

}