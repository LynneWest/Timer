$(document).ready(function()
{
	//Change defualt times here
	var deckTime = 12;
	var stationOneTime = 10;
	var stationTwoTime = 10;
	var stationThreeTime = 10;

		//Check current time and display on clock
		function clock()
		{
			var d = new Date();
			var hour = d.getHours();
			var min = d.getMinutes();
			var sec = d.getSeconds();
			if(hour>12)
			{
				hour-=12;			
			}
			if(min<10){
				min="0"+min;
			}
			if(sec<10){
				sec="0"+sec;
			}
			$("#clock-time").html(hour+":"+min+":"+sec);
			var t = setTimeout(clock, 500);
		}
		clock();

	//when submit is clicked create custom timers from input		
	$("#submit-time").click(function()
	{		
		if($("#deckInput").val()!=="")
		{
			deckTime = $("#deckInput").val();									
		}
		if($("#oneInput").val()!=="")
		{
			stationOneTime = $("#oneInput").val();						
		}
		if($("#twoInput").val()!=="")
		{
			stationTwoTime = $("#twoInput").val();						
		}
		if($("#threeInput").val()!=="")
		{
			stationThreeTime = $("#threeInput").val();						
		}		
		setTime();				
	});

	//apply timer minutes to timers
	function setTime()
	{
		$("#deck-timer").html(deckTime+":00");
		$(".timer-one").html(stationOneTime+":00");
		$(".timer-two").html(stationTwoTime+":00");
		$(".timer-three").html(stationThreeTime+":00");
		instanciateTimers();
	}
	setTime()

	//Display two timers or three timers depending on radio button selection
	$(function()
	{
    	$("input[name=stations]").change(function() 
    	{     
        	if($("#2").is(":checked"))
        	{
        		$(".two-timers").removeClass("hidden");
        		$(".three-timers").addClass("hidden");
        	}
        	else
        	{
        		$(".two-timers").addClass("hidden");
        		$(".three-timers").removeClass("hidden");
        	};        
    	});
	});
		
	var crewArray = [];
	var order;
	var y = 0-1;
	
	//Set and display crew order
	//Set first crews to timers
	//clear station two and three crew assignments
	function setCrew()
	{
		crewArray = [];
		order;
		y = 0-1;
		order = $("#order").val();
		$("#crew-order").html(order);
		crewArray = order.split(",");
		$("#deck").html(crewArray[1]);
		$(".station-one").html(crewArray[0]);
		$(".station-two").html("");
		$(".station-three").html("");
	}

	$("#reset").click(function() 
	{
		setCrew();
		setTime();
		// need to stop timer too
	});
	
	$("#submit-crew").click(function()
	{
		setCrew();				
	});		
	
	$("#next").click(function()
	{
		nextCrew();
	});

	function nextCrew()
	{	if(crewArray[3+y] === undefined)
		{
			$("#deck").html("");
		}
		else
		{
			$("#deck").html(crewArray[3+y]);
		}
		if(crewArray[2+y] === undefined)
		{
			$(".station-one").html("");
		}
		else
		{
			$(".station-one").html(crewArray[2+y]);
		}		
		if(crewArray[1+y] === undefined)
		{
			$(".station-two").html("");
		}
		else
		{
			$(".station-two").html(crewArray[1+y]);
		}			
		if(crewArray[0+y] === undefined)
		{
			$(".station-three").html("");
		}	
		else
		{
			$(".station-three").html(crewArray[0+y]);
		}				
		y++;
	};

	function Timer(minute,timerID)
	{
		this.min = minute;
		var min = minute-1;
		var sec = 60;
		
		this.countdown = function()
		{			
			if(min>0 && sec>0)
			{
				start = setInterval(function()
				{
					sec--;
					if(min===0 && sec===0)
					{
						clearInterval(start);
					}			
					
					if(sec>9){
						$(timerID).html(min+":"+sec);		
					}
					else
					{
						$(timerID).html(min+":0"+sec);
					}		
					if(sec===0)
					{			
						min--;
						sec=60;			
					}
					pauseTimer = function()
					{
						clearInterval(start);
					}												
				},20);
			}
		}
		this.pause = function()
		{
			pauseTimer();
		}
		this.addMin = function()
		{

		}
		this.reset = function()
		{
			//reset function here
		}
	}

	var ondeck;
	var station1;
	var station2;
	var station3;

	function instanciateTimers(){
		onDeck = new Timer(deckTime, "#deck-timer");
		station1 = new Timer(stationOneTime, ".timer-one");
		station2 = new Timer(stationTwoTime, ".timer-two");
		station3 = new Timer(stationThreeTime, ".timer-three");
	}
	instanciateTimers();

	$("#go").click(function()
	{
		onDeck.countdown();
		station1.countdown();		
	});	
	
	$(".pauseOne").click(function()
	{
		onDeck.pause();
		station1.pause();
	});
	// var minInput = 10
	// var min=minInput-1;
	// var sec=60;
	// var reset=false;
	// $(".start").click(function()
	// {
	// 	if(min>0 && sec>0)
	// 	{
	// 		var start = setInterval(function()
	//		{
	// 			// console.log(reset);
	// 			if(reset===true)
	// 			{
	// 				reset=false;
	// 				clearInterval(start);				
	// 			}
	// 			if(min===0 && sec===1)
	// 			{
	// 				clearInterval(start);
	// 			}			
	// 			sec--;
	// 			if(sec>9){
	// 				$("#clock-one").html(min+":"+sec);		
	// 			}
	// 			else
	// 			{
	// 				$("#clock-one").html(min+":0"+sec);
	// 			}		
	// 			if(sec===0)
	// 			{			
	// 				min--;
	// 				sec=60;			
	// 			}												
	// 		},50);
	// 	}
	// });
	// $(".reset").click(function(){
	// 	reset=true;
	// 	$("#clock-one").html("10:00");
	// 	min=10;
	// 	sec=1;				
	// });

});