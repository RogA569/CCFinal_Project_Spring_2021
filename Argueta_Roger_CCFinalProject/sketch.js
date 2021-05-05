// Roger Argueta

// scene variables
let scene; // incremental scene counter


// firework variables
let fireworks; // array of objects of Firework class
let explosion; // sound file of firework explosion

// raindrop variables
let raindrops; // array of object of Raindrop class
let single_patter; // sound file of a single raindrop

// voiceover variables; sound files for each line in script
let voiceover_1;
let voiceover_2;
let voiceover_3;
let voiceover_4;
let voiceover_5;
let voiceover_6;
let voiceover_7;
let voice_switch; // allows voice to speak only once in draw()

function preload() {
	soundFormats('wav');
	
	voiceover_1 = loadSound('assets/sound_files/Voiceover_Lines/VoiceoverScriptLine1');
	voiceover_2 = loadSound('assets/sound_files/Voiceover_Lines/VoiceoverScriptLine2');
	voiceover_3 = loadSound('assets/sound_files/Voiceover_Lines/VoiceoverScriptLine3');
	voiceover_4 = loadSound('assets/sound_files/Voiceover_Lines/VoiceoverScriptLine4');
	voiceover_5 = loadSound('assets/sound_files/Voiceover_Lines/VoiceoverScriptLine5');
	voiceover_6 = loadSound('assets/sound_files/Voiceover_Lines/VoiceoverScriptLine6');
	voiceover_7 = loadSound('assets/sound_files/Voiceover_Lines/VoiceoverScriptLine7');

	explosion = loadSound('assets/sound_files/336008__rudmer-rotteveel__whistle-and-explosion-single-firework');

	single_patter = loadSound('assets/sound_files/17877__koops__rain-patter-01_render_001');


}

function setup() {
	createCanvas(800, 600, WEBGL);
	scene = 3; // SET TO WHATEVER SCENE YOU'RE WORKING ON

	userStartAudio(); // need this when running in a browser because of its autoplay policy

	voice_switch = true;

	fireworks = [];

	raindrops = [];

	// 2021 structure in Scenes 1 and 2
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
					
				if (fireworks[firework].y <= height/2 && fireworks[firework].y >= height/2 - 10) {
					explosion.play(); // plays whistle/explosion sound as soon as it's launched
				}
				fireworks[firework].explode();
				if (fireworks[firework].explode()) {
					fireworks.splice(fireworks[firework], 1); // remove individual firework from fireworks array
				}
				break;
			}

			twty_twty_one.show();
			
			break;
		// end of Scene 1

		// Scene 2
		case 2:
			if (voice_switch) {
				voiceover_1.play();
				voice_switch = false;
			}
			for (let x = -width/2 + 10; x < width/2; x++) {
				let new_raindrop = new Raindrop(random(-width/2, width/2), random(-height/2, (-height/2 + 15)));
				raindrops.push(new_raindrop);
			}

			for (let raindrop = 0; raindrop < raindrops.length; raindrop++) {
				if (raindrops[raindrop].y < height/2) {
					raindrops[raindrop].display();
					raindrops[raindrop].fall();
				}

				if (raindrops[raindrop].y >= height/2) {
					single_patter.play();
					raindrops.splice(raindrops[raindrop], 1); // remove individual raindrop from array
				}
				break;
			}

			twty_twty_one.show();

			break;
		// end of Scene 2

		//Scene 3
		case 3:
			if (voice_switch) {
				voiceover_2.play();
				voice_switch = false; // so that voiceover doesn't play again and again
			}

			background(117, 234, 234);

			drawSun(); // curious as to why the stroke of sun appears behind the hills
			drawHills();

			break;
		// end of Scene 3

		// Scene 4
		case 4:
			if (voice_switch) {
				voiceover_3.play();
				voice_switch = false;
			}

			break;
		// end of Scene 4

		// Scene 5
		case 5:
			if (voice_switch) {
				voiceover_4.play();
				voice_switch = false;
			}

			drawHills();

			break;
		// end of Scene 5

		// Scene 6
		case 6:
			if (voice_switch) {
				voiceover_5.play();
				voice_switch = false;
			}

			break;
		// end of Scene 6

		// Scene 7 (user-dependent)
		case 7:
			if (voice_switch) {
				// another if statement based on user choice
				//voiceover_6.play(); // yes
				voiceover_7.play(); // no
				voice_switch = false;
			}

			break;
		// end of Scene 7

		// Scene 8 (if fire)
		case 8:
			break;
		// end of Scene 8

		// Scene 9 (if fire)
		case 9:
			break;
		// end of Scene 9

		// Scene 10 (if water)
		case 10:
			break;
		// end of Scene 10

	} // end of switch statement

}

function keyPressed() {
	if (key == ' ') {
		scene++; // go to next scene
		voice_switch = true; // reset voice switch
	}
}

function drawHills() {
	// draws hills from Scenes 3 and 5
	
	// hill 1 starts from right to left, sloping upwards
	let hill_1_x_start = width/2;
	let hill_1_y_start = 50;
	// hill 2 starts from left to right, sloping downwards
	let hill_2_x_start = -width/2;
	let hill_2_y_start = -12;
	fill(0, 255, 0);
	stroke(1);
	
	// back hill
	beginShape();
		vertex(hill_1_x_start, height/2);

		// long curve
		curveVertex(hill_1_x_start, hill_1_y_start); // beginning guide
		curveVertex(hill_1_x_start, hill_1_y_start);
		curveVertex(hill_1_x_start - 65, hill_1_y_start - 5);
		curveVertex(hill_1_x_start - 150, hill_1_y_start - 2);
		curveVertex(hill_1_x_start - 220, hill_1_y_start - 25);
		curveVertex(hill_1_x_start - 300, hill_1_y_start - 25);
		curveVertex(hill_1_x_start - 350, hill_1_y_start - 40);
		curveVertex(hill_1_x_start - 415, hill_1_y_start - 35);
		curveVertex(hill_1_x_start - 450, hill_1_y_start - 40);
		curveVertex(hill_1_x_start - 470, hill_1_y_start - 42);
		curveVertex(hill_1_x_start - 500, hill_1_y_start - 40);
		curveVertex(hill_1_x_start - 555, hill_1_y_start - 37);
		curveVertex(hill_1_x_start - 555, hill_1_y_start - 37);
		//curveVertex(-width/2, hill_1_y_start - 25);
		//curveVertex(-width/2, hill_1_y_start - 25); // end guide		
	endShape();

	// front hill
	beginShape();
		vertex(hill_2_x_start, height/2);

		// long curve
		curveVertex(hill_2_x_start, hill_2_y_start);
		curveVertex(hill_2_x_start, hill_2_y_start);
		curveVertex(hill_2_x_start + 50, hill_2_y_start + 5);
		curveVertex(hill_2_x_start + 125, hill_2_y_start + 5);
		curveVertex(hill_2_x_start + 180, hill_2_y_start + 20);
		curveVertex(hill_2_x_start + 215, hill_2_y_start + 25);
		curveVertex(hill_2_x_start + 365, hill_2_y_start + 35);
		curveVertex(hill_2_x_start + 600, hill_2_y_start + 120);
		curveVertex(width/2, hill_2_y_start + 250);
		curveVertex(width/2, hill_2_y_start + 250);

		vertex(width/2, height/2);
	endShape();	

}

function drawSun() {
	// draws the sun
	// definitely will be modified bc the sun's face changes
	// from Scene 3 when it's Scene 5

	fill(255, 255, 0);
	circle(0, 0, width/2.5);

	//rays
	for (let angle = 0; angle < 360; angle += 40) {
		noStroke();
		push();
			rotate(radians(angle));
			beginShape(TRIANGLES);
				vertex(-50, width/5-10);
				vertex(0, width/5 + 75);
				vertex(50, width/5-10);
			endShape();
		pop();
	}

}