// Roger Argueta

let pg; // 2D buffer for 2D scenes
let scene; // incremental scene counter

// firework variables
let fireworks; // array of objects of Firework class
let explosion; // sound file of firework explosion

// raindrop variables
let raindrops; // array of object of Raindrop class
let single_patter; // sound file of a single raindrop

// image variables
let the_scream; // the subject of Edward Munch's The Scream

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
	the_scream = loadImage('assets/Munch_Scream_Outline.png');

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
	pg = createGraphics(width, height); // for the scenes that render in 2D mode

	scene = 5; // SET TO WHATEVER SCENE YOU'RE WORKING ON
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

			image(pg, -width/2, -height/2); // display the buffer, which serves as the sketch's 2D space, at top-left

			pg.push(); // every function that's in the buffer will be pg.[shape/transformation function]
				pg.translate(width/2, height/2);
				drawSun(); // the custom functions themselves have elements that are pg.[element]
				drawHills();
			pg.pop();

			break;
		// end of Scene 3

		// Scene 4
		case 4:
			if (voice_switch) {
				voiceover_3.play();
				voice_switch = false;
			}

			background(75, 76, 81);

			image(pg, -width/2, -height/2);

			pg.push();
				pg.translate(width/2, height/2);
				drawVolcano();
				drawSea();
			pg.pop();

			break;
		// end of Scene 4

		// Scene 5
		case 5:
			if (voice_switch) {
				voiceover_4.play();
				voice_switch = false;
			}

			background(51, 69, 91);

			image(pg, -width/2, -height/2);

			pg.push();
				pg.translate(width/2, height/2);
				drawSun();
				drawMoonScream();
				drawHills();
			pg.pop();

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
		pg.clear(); //clear insde the 2D mode buffer
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
	
	if (scene == 3) {
		pg.fill(0, 255, 0);
	} else if (scene == 5) {
		pg.fill(0, 61, 55);
	}
	pg.stroke(1);
	
	// back hill
	pg.beginShape();
		pg.vertex(hill_1_x_start, height/2);

		// long curve
		pg.curveVertex(hill_1_x_start, hill_1_y_start); // beginning guide
		pg.curveVertex(hill_1_x_start, hill_1_y_start);
		pg.curveVertex(hill_1_x_start - 65, hill_1_y_start - 5);
		pg.curveVertex(hill_1_x_start - 150, hill_1_y_start - 2);
		pg.curveVertex(hill_1_x_start - 220, hill_1_y_start - 25);
		pg.curveVertex(hill_1_x_start - 300, hill_1_y_start - 25);
		pg.curveVertex(hill_1_x_start - 350, hill_1_y_start - 40);
		pg.curveVertex(hill_1_x_start - 415, hill_1_y_start - 35);
		pg.curveVertex(hill_1_x_start - 450, hill_1_y_start - 40);
		pg.curveVertex(hill_1_x_start - 470, hill_1_y_start - 42);
		pg.curveVertex(hill_1_x_start - 500, hill_1_y_start - 40);
		pg.curveVertex(hill_1_x_start - 555, hill_1_y_start - 37);
		pg.curveVertex(hill_1_x_start - 555, hill_1_y_start - 37);
		
		// Maybe come back to this...
		//curveVertex(-width/2, hill_1_y_start - 25);
		//curveVertex(-width/2, hill_1_y_start - 25); // end guide		
	pg.endShape(CLOSE);

	// front hill
	pg.beginShape();
		pg.vertex(hill_2_x_start, height/2);

		// long curve
		pg.curveVertex(hill_2_x_start, hill_2_y_start);
		pg.curveVertex(hill_2_x_start, hill_2_y_start);
		pg.curveVertex(hill_2_x_start + 50, hill_2_y_start + 5);
		pg.curveVertex(hill_2_x_start + 125, hill_2_y_start + 5);
		pg.curveVertex(hill_2_x_start + 180, hill_2_y_start + 20);
		pg.curveVertex(hill_2_x_start + 215, hill_2_y_start + 25);
		pg.curveVertex(hill_2_x_start + 365, hill_2_y_start + 35);
		pg.curveVertex(hill_2_x_start + 600, hill_2_y_start + 120);
		pg.curveVertex(width/2, hill_2_y_start + 250);
		pg.curveVertex(width/2, hill_2_y_start + 250);

		pg.vertex(width/2, height/2);
	pg.endShape(CLOSE);	

}

function drawSun() {
	// draws the sun
	// definitely will be modified bc the sun's face changes
	// from Scene 3 when it's Scene 5

	pg.fill(255, 255, 0);

	//rays
	for (let angle = 0; angle < 360; angle += 40) {
		//pg.noStroke();
		pg.push();
			pg.rotate(radians(angle));
			pg.beginShape(TRIANGLES);
				pg.vertex(-50, width/5 - 10);
				pg.vertex(0, width/5 + 75);
				pg.vertex(50, width/5 - 10);
			pg.endShape();
		pg.pop();
	}

	pg.circle(0, 0, width/2.5);
}

function drawMoonScream() {
	// draws the moon and
	// the silhouette of the
	// subject of Munch's The Scream

	pg.fill(255, 246, 199);

	// moon
	pg.circle(width/4, -height/4, width/2.5);

	// The Scream, silhouette
	pg.blendMode(DIFFERENCE);
	the_scream.resize(143, 320)
	pg.image(the_scream, width/4 - 70, -height/2 - 10);
	pg.blendMode(BLEND);

}

function drawVolcano() {
	// draws volcano

	pg.fill(23, 52, 83); // dark navy-blue 

	pg.beginShape();
		// left slope
		pg.curveVertex(-50, 0);
		pg.curveVertex(-50, 0);
		pg.curveVertex(8, -50);
		pg.curveVertex(50, -100);

		pg.curveVertex(67.5, -107);

		// right slope
		pg.curveVertex(85, -100);
		pg.curveVertex(105, -55);
		pg.curveVertex(135, 5);
		pg.curveVertex(135, 5);
	pg.endShape();
}

function drawSea() {
	// draws the wine-dark sea

	pg.fill(117, 46, 68); // wine dark

	// offing
	stroke(0);
	pg.beginShape();
		pg.curve(-width/2, -10, -width/2, -15, width/2, -15, width/2, -10);
		pg.vertex(width/2, height/2);
		pg.vertex(-width/2, height/2);
	pg.endShape();

	// I think the ripples should become a class
	// ripples
	pg.fill(148, 58, 86);
	//pg.noStroke();
	for (let y = -3; y <= (height/2 - 6); y += 9) {
		for (let x = random(-width/2 - 10, -width/2 + 10); x <= width/2; x += 25) {
			pg.beginShape();
				pg.vertex(x, y);
				pg.curve(x, y, x + 7, y - 9, x + 13, y - 9, x + 20, y); // a very small curve to round the top
				pg.vertex(x + 20, y);
			pg.endShape();
		}
	}
}