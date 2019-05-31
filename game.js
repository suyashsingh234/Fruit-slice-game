//start game
//check if reset
//start timer
//drop fruits randomly
//if fruit smash score+1
//else life-1
//life 0 end game

var score;
var lives;
var interval;

var gamearea=document.getElementById('gamearea');
var lifearea=document.getElementById('lifearea');
var scorearea=document.getElementById('scorearea');
var fruitarea=document.getElementById('fruitarea');
var startbutton=document.getElementById('startbutton');
var gameover=document.getElementById('gameover');

function updatelives()
{
	while(lifearea.firstChild)
		lifearea.removeChild(lifearea.firstChild);

	for(let i=0;i<lives;i++)
	{
		var img=document.createElement('img');
		img.src='heart.png';
		lifearea.appendChild(img);
	}

	if(lives<=0)
	{
		while(fruitarea.firstChild)
			fruitarea.removeChild(fruitarea.firstChild);
		gameover.style.display='inline-block';
		gameover.innerHTML='Gameover!'+'<br>'+'Score:'+score;
	}

}

function updatescore()
{
	scorearea.innerHTML="Score:"+score;
}

function dropfruit()
{
	var img=['i1.png','i2.png','i3.png','i4.png'];
	var imgidx=Math.floor(Math.random()*4);

	var imgele=document.createElement("img");
	imgele.src=img[imgidx];
	imgele.style.position="absolute";
	var left=Math.random()*91;
	imgele.style.top='0%';
	imgele.style.left=left+'%';

	fruitarea.appendChild(imgele);

	imgele.addEventListener('mouseover',function(){
		$(imgele).hide( "explode", {pieces: 4 }, 500 );
		fruitarea.removeChild(imgele);
		score++;
		clearInterval(godown);
		updatescore();
	});
    
    imgele.addEventListener('click',function(){
		$(imgele).hide( "explode", {pieces: 4 }, 500 );
		fruitarea.removeChild(imgele);
		score++;
		clearInterval(godown);
		updatescore();
	});

var	godown=setInterval(function()
	{
		if(imgele.parentNode==fruitarea)
		{
			imgele.style.top=(parseInt(imgele.style.top,10)+20)+'%';
			if(parseInt(imgele.style.top,10)>=90)
			{
				lives--;
				updatelives();
				if(lives<=0)
				{
					for(let i=0;i<9999;i++)  //to clear all instances of godown
						clearInterval(i);
					clearInterval(interval);
				}
				else
				{
					fruitarea.removeChild(imgele);
					clearInterval(godown);
				}
			}
		}
		else {
			clearInterval(godown);
		}
	},1000)
}

	startbutton.addEventListener('click',function(){
	gameover.style.display='';
	score=0;
	lives=3;
	updatelives();
	updatescore();

	while(fruitarea.firstChild)
		fruitarea.removeChild(fruitarea.firstChild);

	for(let i=0;i<9999;i++)   //clear all instances of godown
		clearInterval(i);
	clearInterval(interval);

	interval=setInterval(function(){
		dropfruit();
		if(lives<=0)
			clearInterval(interval);
	},500);

});
