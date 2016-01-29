window.onload = function() {

	setBackgroundImage();
	setDate();

	//Settings
	if(localStorage.fontFamily != null)
	{
		$("#setting-font-family").val(localStorage.fontFamily);
		var fontFamily = localStorage.fontFamily;
		document.body.classList.add(fontFamily);
	}

	if(localStorage.background != null)
		var background = localStorage.background;

	if(localStorage.clockAnimation != null)
	{
		$("#setting-animation").val(localStorage.clockAnimation);
		$(".animated").addClass(localStorage.clockAnimation);
	}

	if(localStorage.clockAllignment != null)
	{
		$("#setting-allign").val(localStorage.clockAllignment);
		var clock = document.getElementById("clockAllign");
		clock.classList.add(localStorage.clockAllignment);
	}

	setTime();

	setInterval(function (){
		setTime();
	}, 1000);
	
}

$( document ).ready(function() {
	$("#head").hide();
	$("#drop-toggle").click(function(){
		if($("#head").is(":hidden"))
			$("#head").slideDown(400);
		else
			$("#head").slideUp(400);
	});
});

//Sets the current Time
function setTime(){
	//Get the current date as a short time string
	var myDate = new Date().toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1");
	
	if(localStorage.time == null)
		localStorage.setItem("time",myDate);		

	//Get individual time elements from page
	var hour1 = document.getElementById('hour1');
	var hour2 = document.getElementById('hour2');
	var min1 = document.getElementById('min1');
	var min2 = document.getElementById('min2');
	var sec1 = document.getElementById('sec1');
	var sec2 = document.getElementById('sec2');

	//Populate time elements
	hour1.innerHTML = "<h1>" + myDate[0] + "</h1>";
	hour2.innerHTML = "<h1>" + myDate[1] + "</h1>";
	min1.innerHTML =  "<h1>" + myDate[3] + "</h1>";
	min2.innerHTML = "<h1>" + myDate[4] + "</h1>";
	sec1.innerHTML = "<h1>" + myDate[6] + "</h1>";
	sec2.innerHTML = "<h1>" + myDate[7] + "</h1>";

	//Get local stored time
	var lHour1 = localStorage.time[0];
	var lHour2 = localStorage.time[1];
	var lMin1 = localStorage.time[3];
	var lMin2 = localStorage.time[4];
	var lSec1 = localStorage.time[6];
	var lSec2 = localStorage.time[7];

	//THERES PROBABLY A BETTER WAY TO DO THIS
	//
	//Sets animation on digits if they change
	//TODO: Hors not refreshing correctly at 23:59:59
	if(myDate[0] > lHour1 || lHour1 + lHour2 + ":" + lMin1 + lMin2 + ":" + lSec1 + lSec2 == "23:59:59")
	{
		$(hour1).replaceWith($(hour1).clone(true));
		setDate();
	}
	if(myDate[1] > lHour2 || lHour2 + ":" + lMin1 + lMin2 + ":" + lSec1 + lSec2 == "3:59:59")
		$(hour2).replaceWith($(hour2).clone(true));

	if(myDate[3] > lMin1 || lMin1 + lMin2 + ":" + lSec1 + lSec2 == "59:59")
		$(min1).replaceWith($(min1).clone(true));
	if(myDate[4] > lMin2 || lMin2 + ":" + lSec1 + lSec2 == "9:59")
		$(min2).replaceWith($(min2).clone(true));

	if(myDate[6] > lSec1 || lSec1 + lSec2 == 59)
		$(sec1).replaceWith($(sec1).clone(true));
	if(myDate[7] > lSec2 || lSec2 == 9)
		$(sec2).replaceWith($(sec2).clone(true));


	localStorage.setItem("time",myDate);
};

//Sets the current Date
function setDate(){
	var dayArray = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
	var monthArray = ["January","Febuary","March","April","May","June","July","August","September","October","November","December"];
	var date = new Date();
	var dayL = date.getDay();
	var day = date.getDate();
	var month = date.getMonth();
	console.log(dayL);
	var dayLBlock = document.getElementById('dateDL');
	var dayBlock = document.getElementById('dateD');
	var monthBlock = document.getElementById('dateM');

	dayLBlock.innerHTML = dayArray[dayL-1] + " ";
	dayBlock.innerHTML = day + " ";
	monthBlock.innerHTML = monthArray[month];
};

//Sets the current random background
function setBackgroundImage(){
	var imageArray = ["pic1","pic2","pic3","pic4","pic5","pic6","pic7","pic8","pic9"];
	var x = Math.floor((Math.random() * imageArray.length));

	document.body.style.backgroundImage = "url('images/backgrounds/" + imageArray[x] + ".jpg')";
}

function saveSettings(){
	setClockAllignment();
	setFont();
	setClockAnimation();
	location.reload();
};

function setFont(){
	var x = document.getElementById("setting-font-family");
	localStorage.fontFamily = x.options[x.selectedIndex].value;
}

function setBackground(url){
	localStorage.background = url;
}

function setClockAllignment(){
	var x = document.getElementById("setting-allign");
	localStorage.clockAllignment = x.options[x.selectedIndex].value;
}

function setClockAnimation(){
	var x = document.getElementById("setting-animation");
	localStorage.clockAnimation = x.options[x.selectedIndex].value;
}