Animation(true);

CurrentDungeon = new Dungeon(500);
new Warrior("Jochen");

function setup() {
}

function draw() {
	CurrentDungeon.draw();
	Character.draw();
}

function NoLoop() {
	Animation(false);
}
function Loop() {
	Animation(true);
}
function reload() {
	location.reload();
}


//Framerate
var before,now,fps;
before=Date.now();
fps=0;
requestAnimationFrame(
    function loop(){
        now=Date.now();
        fps=Math.round(1000/(now-before));
        before=now;
        requestAnimationFrame(loop);
				if(fps < 58) {
        document.getElementById("Count").innerHTML = fps;
			} else {
				document.getElementById("Count").innerHTML = 60;
			}
    }
 );
