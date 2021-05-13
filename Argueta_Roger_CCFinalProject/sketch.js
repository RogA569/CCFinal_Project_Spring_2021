// Roger Argueta

// scene variables
let pg; // 2D buffer for 2D scenes
let scene; // incremental scene counter

// firework variables
let fireworks; // array of objects of Firework class
let explosion; // sound file of firework explosion

// raindrop variables
let raindrops; // array of object of Raindrop class
let single_patter; // sound file of a single raindrop

// choice circle variables
let yes; // a circle object that says yes
let no; // a circle object that says no
let yes_choice; // boolean that stores value of yes.clicked_on()
let no_choice; // boolean that stores value of no.clicked_on()

// image variables
let the_scream; // the subject of Edward Munch's The Scream
let beach_gif; // animated gif of the shoreline

// voiceover variables; sound files for each line in script
let voiceover_1;
let voiceover_2;
let voiceover_3;
let voiceover_4;
let voiceover_5;
let voiceover_6;
let voiceover_7;
let voice_switch; // allows voice to speak only once in draw()

// other variables for sound files
let splash; // sound file of a splash into water
let seashore; // sound file of the seashore

// font variables
let roboto; // stores the Roboto light typeface	

function preload() {
	the_scream = loadImage('assets/Munch_Scream_Outline.png');

	// The following gif was created by Floris Kloet.
	// The gif was licensed under CC BY 4.0
	// The link to this license is https://creativecommons.org/licenses/by/4.0/deed
	// You can find the gif at https://giphy.com/gifs/cinemagraph-cinemagraphs-l4hLyOGRJWNSR8QQ8
	beach_gif = loadGif('assets/living_stills_beach_day.gif');

	soundFormats('wav', 'ogg', 'mp3');
	voiceover_1 = loadSound('assets/sound_files/Voiceover_Lines/VoiceoverScriptLine1');
	voiceover_2 = loadSound('assets/sound_files/Voiceover_Lines/VoiceoverScriptLine2');
	voiceover_3 = loadSound('assets/sound_files/Voiceover_Lines/VoiceoverScriptLine3');
	voiceover_4 = loadSound('assets/sound_files/Voiceover_Lines/VoiceoverScriptLine4');
	voiceover_5 = loadSound('assets/sound_files/Voiceover_Lines/VoiceoverScriptLine5');
	voiceover_6 = loadSound('assets/sound_files/Voiceover_Lines/VoiceoverScriptLine6');
	voiceover_7 = loadSound('assets/sound_files/Voiceover_Lines/VoiceoverScriptLine7');

	explosion = loadSound('assets/sound_files/336008__rudmer-rotteveel__whistle-and-explosion-single-firework');

	single_patter = loadSound('assets/sound_files/17877__koops__rain-patter-01_render_001');

	splash = loadSound('assets/sound_files/536740__egomassive__splash.ogg');

	seashore = loadSound('assets/sound_files/72532__kmcgraphics-com__waves-and-wind-on-the-seashore-in-youghal-ireland.mp3');

	roboto = loadFont('assets/Roboto-Light.ttf');

}

function setup() {
	createCanvas(800, 600, WEBGL);
	pg = createGraphics(width, height); // for the scenes that render in 2D mode

	scene = 1;
	userStartAudio(); // need this when running in a browser because of its autoplay policy
	voice_switch = true;
	fireworks = [];
	raindrops = [];

	yes = new Choice_circle(-width/10, -height/5, 'yes');
	no = new Choice_circle(width/6, height/8, 'no');

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
				drawVolcanoMountain();
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
			
			background(167, 44, 79); // an almost fever dream kind of sky

			image(pg, -width/2, -height/2);

			yes.display();
			no.display();

			pg.push();
				pg.translate(width/2, height/2);
				pg.fill(237, 201, 175);
				pg.rect(-width/2, height/4, width, height/4); // draw simple desert land below
			pg.pop();

			break;
		// end of Scene 6

		// Scene 7 (user-dependent)
		case 7:
			if (voice_switch) { // here, voice_switch is also used to play sounds just once
				if (yes_choice) { // if you clicked on the yes circle
					//voiceover_6.play();

					seashore.play(1); // not played immediately to give a sense of fade-in
				}
				if (no_choice) { // if you clicked on the no circle
					voiceover_7.play();
					splash.play(1.5); // play 1.5 secs after this line is run
				}

				voice_switch = false;
			}

			if (yes_choice) {
				// beach scene, with an animation of sand meeting with the tide
				image(pg, -width/2, -height/2);
				pg.image(beach_gif, 0, 0, width, height);
			}

			if (no_choice) { // if you clicked on the no circle
				background(117, 234, 234);

				image(pg, -width/2, -height/2);

				pg.push();
					pg.translate(width/2, height/2);
					drawHills(); // somehow, by what I can only describe as a miraculous accident, THIS line is needed so that you can see drawSea()...
					drawVolcanoMountain();
					drawSea();
				pg.pop();
			}

			break;
		// end of Scene 7

		
		/*// Scene 8 (if fire)
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
		*/


	} // end of switch statement

}

function keyPressed() {
	if ((scene != 6) && (scene != 7)) { // both are scenes that I don't want to progress using spacebar
		if (key == ' ') {
			scene++; // go to next scene
			voice_switch = true; // reset voice switch
			pg.clear(); //clear the 2D mode buffer
		}
	}
}

function mouseClicked() {
	// for the choice circles in Scene 6
	if (scene == 6) { // only applies to the 6th scene
		yes_choice = yes.clicked_on(); // return true to yes_choice
		no_choice = no.clicked_on(); // return true to no_choice

		if ((no_choice) || (yes_choice)) { // this if statement will run as long as you click on one of the circles
			// replacing the role of the spacebar in function keyPressed()
			scene++;
			voice_switch = true;
			pg.clear();
		}
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
	}
	if (scene == 5) {
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
	// sun's fill changes from Scene 3 to Scene 5

	if (scene == 3) {
		pg.fill(255, 255, 0);
	}
	if (scene == 5) {
		pg.fill(219, 58, 35);
	}

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

	pg.fill(166, 160, 129);

	// moon
	pg.circle(width/12, -height/6, width/2.5);

	// The Scream, silhouette
	pg.blendMode(DIFFERENCE);
	the_scream.resize(143, 320)
	pg.image(the_scream, width/12 - 70, -height/3 - 20);
	pg.blendMode(BLEND);

}

function drawVolcanoMountain() {
	// draws volcano/mountain

	if (scene == 4) {
		pg.fill(23, 52, 83); // dark navy-blue 
	}
	if (scene == 7) {
		pg.fill(83, 106, 146); // a more mountain-like fill 
	}

	pg.beginShape();
		// left slope
		pg.curveVertex(-50, 0);
		pg.curveVertex(-50, 0);
		pg.curveVertex(8, -50);
		pg.curveVertex(50, -100);

		if (scene == 4) { // only applies to the volcano
			pg.curveVertex(67.5, -107); // creates a crater
		} else if (scene == 7) { // applies to the mountain
			pg.vertex(68, -120); // creates a peak
		}

		// right slope
		pg.curveVertex(85, -100);
		pg.curveVertex(105, -55);
		pg.curveVertex(135, 5);
		pg.curveVertex(135, 5);
	pg.endShape();
}

function drawSea() {
	// draws the wine-dark or blue sea

	if (scene == 4) {
		pg.fill(117, 46, 68); // wine dark; default fill
	}

	if (scene == 7) {
		pg.fill(54, 205, 255); // blue sea fill
	}

	// offing
	stroke(0);
	pg.beginShape();
		pg.curve(-width/2, -10, -width/2, -15, width/2, -15, width/2, -10);
		pg.vertex(width/2, height/2);
		pg.vertex(-width/2, height/2);
	pg.endShape();

	// ripples
	if (scene == 4) {
		pg.fill(148, 58, 86);
	}
	if (scene == 7) {
		pg.fill(41, 158, 196);
	}
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