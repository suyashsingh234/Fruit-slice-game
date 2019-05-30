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
var ctr=0;
var lifearea=document.getElementById('lifearea');
function updatelives()
{
	while(lifearea.firstChild)
		lifearea.removeChild(lifearea.firstChild);
	for(let i=0;i<lives;i++)
	{
		var img=document.createElement('img');
		img.src='heart.png';
		document.getElementById('lifearea').appendChild(img);
	}
	if(lives<=0)
	{
		while(document.getElementById('fruitarea').firstChild)
		{
			document.getElementById('fruitarea').removeChild(document.getElementById('fruitarea').firstChild);
		}
		document.getElementById('gameover').style.display='inline-block';
		document.getElementById('gameover').innerHTML='Gameover!'+'<br>'+'Score:'+score;
	}
}
function updatescore()
{
	document.getElementById('scorearea').innerHTML="Score:"+score;
}
function dropfruit()
{
	var imgele=document.createElement("img");
	var img=['i1.png','i2.png','i3.png','i4.png'];
	var imgidx=Math.floor(Math.random()*4);
	imgele.src=img[imgidx];
	imgele.id="id"+ctr;
	ctr++;
	imgele.style.position="absolute";
	var left=Math.random()*91;
	imgele.style.top='0%';
	imgele.style.left=left+'%';
	document.getElementById('fruitarea').appendChild(imgele);

	imgele.addEventListener('mouseover',function(){
		$(imgele).hide( "explode", {pieces: 4 }, 500 );
		document.getElementById('fruitarea').removeChild(imgele);
		score++;
		clearInterval(godown);
		updatescore();
	});

var	godown=setInterval(function()
	{
		// console.log(ctr);
		//console.log(imgele.id);
		if(imgele.parentNode==document.getElementById('fruitarea'))
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
					document.getElementById('fruitarea').removeChild(imgele);
					clearInterval(godown);
				}
			}
		}
		else {
			//console.log('c->'+imgele.id);
			clearInterval(godown);
		}
	},1000)
}

document.getElementById('startbutton').addEventListener('click',function(){
	document.getElementById('gameover').style.display='';
	score=0;
	lives=3;
	updatelives();
	updatescore();
	while(document.getElementById('fruitarea').firstChild)
	{
		document.getElementById('fruitarea').removeChild(document.getElementById('fruitarea').firstChild);
	}
	for(let i=0;i<9999;i++)
		clearInterval(i);
	clearInterval(interval);
	interval=setInterval(function(){
		dropfruit();
		if(lives<=0)
			clearInterval(interval);
	},500);
});
