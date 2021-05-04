// Roger Argueta

// scene variables
let scene; // incremental scene counter


// firework variables
let fireworks; // array of objects of Firework class
let explosion; // sound file of firework explosion

// raindrop variables
let raindrop_1;
let single_patter; // sound file of a single raindrop

// voiceover variables; sound files for each line in script
let voiceover_1;
let voiceover_2;
let voiceover_3;
let voiceover_4;
let voiceover_5;
let voiceover_6;
let voiceover_7;

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
	scene = 2; // SET TO WHATEVER SCENE YOU'RE WORKING ON

	userStartAudio(); // need this when running in a browser because of its autoplay policy

	fireworks = [];

	raindrop_1 = new Raindrop(0, -height/4);

	// 2021 structure in Scenes 1 and 2
	twty_twty_one = createWord3D("2021", width/35, width/150, 30);

	// voiceover lines (dependent on scene number)
	// PROBLEM: THIS DOESN'T WORK FOR SOME REASON
	if (scene == 2) {
		voiceover_1.play();
	}

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
			
			break;
		// end of Scene 1

		// Scene 2
		case 2:
			raindrop_1.display();
			raindrop_1.fall();

			if (raindrop_1.y >= height/2) {
				single_patter.play();
			}

			twty_twty_one.show();

			break;
		// end of Scene 2

		//Scene 3
		case 3:
			break;
		// end of Scene 3

		// Scene 4
		case 4:
			break;
		// end of Scene 4

		// Scene 5
		case 5:
			break;
		// end of Scene 5

		// Scene 6
		case 6:
			break;
		// end of Scene 6

		// Scene 7 (user-dependent)
		case 7:
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
		scene++;
	}
}