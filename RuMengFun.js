$(document).ready(function(){
	var pc = "";
	var user = "";
	var group = [0,0,0,0,0,0,0,0,0];

	$(".choose").fadeIn(1000);

	$("#x").on("click",function(){
	    $("#x").css("background-color","grey");
	    $("#O").css("opacity","0.5");
	    $("#O").css("cursor","not-allowed");
        $("#1st").on("click",function(){
            $("#1st").css("background-color","grey");
            $(".choose").fadeOut(500);
            $(".back").fadeOut(500);
            pc = "O";
            user = "x";
            for(var i=1; i<=9; i++){
                initClick1(i);
            }
            pcStep1();
        });
        $("#2nd").on("click",function(){
            $("#2nd").css("background-color","grey");
            $(".choose").fadeOut(1);
            $(".back").fadeOut(1);
            pc = "O";
            user = "x";
            pcStep0();
            for(var i=1; i<=9; i++){
                initClick0(i);
            }
        });
	});

	$("#O").on("click",function(){
	    $("#O").css("background-color","grey");
	    $("#x").css("opacity","0.5");
	    $("#x").css("cursor","not-allowed");
        $("#1st").on("click",function(){
            $("#1st").css("background-color","grey");
            $(".choose").fadeOut(500);
            $(".back").fadeOut(500);
            pc = "x";
            user = "O";
            pcStep1();
            for(var i=1; i<=9; i++){
                initClick1(i);
            }
        });
        $("#2nd").on("click",function(){
            $("#2nd").css("background-color","grey");
            $(".choose").fadeOut(1);
            $(".back").fadeOut(1);
            pc = "x";
            user = "O";
            pcStep0();
            for(var i=1; i<=9; i++){
                initClick0(i);
            }
        });
	});


	var pcStep0 = function(){
	    var step = 0;
		for(var i in group){
			if(group[i] !== 0){
				step++;
			}
		}
		if(step %2 !== 0){
			return;
		}

		if(step === 0){
			var proStep = [1,2,3,4,5,6,7,8,9];
			var posit = parseInt(Math.random()*9,10);
			group[proStep[posit-1]] = 1;
			$("#span-"+(proStep[posit])).html(pc);
			judge0();
			return;
		}

		if(step === 2){
			if(group[4] === 1){
				var corStep = [1,3,7,9];
				for(var t = 0; t<4; t++){
					if(group[corStep[t]] === 3){
						var posit = 1;
						if(corStep[t] === 1){
							posit = 9;
						}else if(corStep[t] === 9){
							posit = 1;
						}else if(corStep[t] === 3){
							posit = 7;
						}else if(corStep[t] === 7){
							posit = 3;
						}
						posit = parseInt(posit);
						group[posit-1] = 1;
						$("#span-"+posit).html(pc);
						judge0();
						return;
					}
				}

				var posit_g=[0,0];
				var posit = 0;
				if(group[1] === 2){
					posit_g[0] = 0;
					posit_g[1] = 2;
				}else if(group[3] === 2){
					posit_g[0] = 0;
					posit_g[1] = 6;
				}else if(group[5] === 2){
					posit_g[0] = 2;
					posit_g[1] = 8;
				}else if(group[7] === 2){
					posit_g[0] = 6;
					posit_g[1] = 8;
				}
				posit = posit_g[parseInt(Math.random()*2)];
				posit = parseInt(posit);
				group[posit] = 1;
				$("#span-"+(posit+1)).html(pc);
				judge0();
				return;
			}else{

				if(group[4] === 0){
					group[4] = 1;
					$("#span-5").html(pc);
					judge0();
					return;
				}

				var posit = 0;
				if(group[0] === 1){
					posit = 8;
				}else if(group[8] === 1){
					posit = 0;
				}else if(group[2] === 1){
					posit = 6;
				}else if(group[6] === 1){
					posit = 2;
				}
				posit = parseInt(posit);
				group[posit] = 1;
				$("#span-"+(posit+1)).html(pc);
				judge0();
				return;
			}
		}


		var first_arr = checkThree(1,group);
		if(first_arr.length !== 0){

			var posit = first_arr[0];
			posit = parseInt(posit);
			group[posit] = 1;
			$("#span-"+(posit+1)).html(pc);
			judge0();
			return;
		}

		var second_arr = checkThree(2,group);
		if(second_arr.length !== 0){
			var posit = second_arr[0];
			posit = parseInt(posit);
			group[posit] = 1;
			$("#span-"+(posit+1)).html(pc);
			judge0();
			return;
		}

		var third_posit = 0;
		var third_max = -1;
		for(var temp in group){
			if(group[temp] === 0){
				if(third_max === -1){
					third_posit = temp;
					third_max = 0;
				}
				var ttt = [].concat(group);
				ttt[temp] = 1;
				var temp_arr = checkThree(1,ttt);
				if(temp_arr.length > third_max){

					third_max = temp_arr.length;
					third_posit = temp;
				}
			}
		}
		group[third_posit] = 1;

		var wtf = parseInt(third_posit);
		wtf+=1;
		$("#span-"+wtf).html(pc);
		judge0();
		return;
	};

	var pcStep1 = function(){
	    var step = 0;
	    var first_step = 0;
		for(var i in group){
			if(group[i] !== 0){
			    first_step = i;
				step++;
			}
		}
		if(step %2 == 0){
			return;
		}
		if(step === 1){
			var proStep = [0,1,2,3,4,5,6,7,8];
			proStep.splice(first_step, 1);
			var posit = parseInt(Math.random()*8);
			group[proStep[posit]] = 1;
			$("#span-"+(proStep[posit]+1)).html(pc);
			judge1();
			return;
		}


		var first_arr = checkThree(1,group);
		if(first_arr.length !== 0){

			var posit = first_arr[0];
			posit = parseInt(posit);
			group[posit] = 1;
			$("#span-"+(posit+1)).html(pc);
			judge1();
			return;
		}

		var second_arr = checkThree(2,group);
		if(second_arr.length !== 0){
			var posit = second_arr[0];
			posit = parseInt(posit);
			group[posit] = 1;
			$("#span-"+(posit+1)).html(pc);
			judge1();
			return;
		}

		var third_posit = 0;
		var third_max = -1;
		for(var temp in group){
			if(group[temp] === 0){
				if(third_max === -1){
					third_posit = temp;
					third_max = 0;
				}
				var ttt = [].concat(group);
				ttt[temp] = 1;
				var temp_arr = checkThree(1,ttt);
				if(temp_arr.length > third_max){

					third_max = temp_arr.length;
					third_posit = temp;
				}
			}
		}
		group[third_posit] = 1;

		var wow = parseInt(third_posit);
		wow+=1;
		$("#span-"+wow).html(pc);
		judge1();
		return;
	};

	var checkThree = function(kind,gp){
		var state = [];
		var allPossible = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
		for(var i in allPossible){
			var x = allPossible[i][0];
			var y = allPossible[i][1];
			var z = allPossible[i][2];
			if((gp[x] === kind && gp[y] === kind && gp[z] === 0) || (gp[x] === 0 && gp[y] === kind && gp[z] === kind) || (gp[x] === kind && gp[y] === 0 && gp[z] === kind)){

				if(gp[x] === 0){
					state.push(x);
					continue;
				}else if(gp[y] === 0){
					state.push(y);
					continue;
				}else if(gp[z] === 0){
					state.push(z);
					continue;
				}
			}
		}
		return state;
	};


	var result = function(state,a,b,c){
		if(state === 1){
			console.log('lose');
			$(".loser").html("YOU LOSE!");

		}else if(state === 2){
			console.log('win');
			$(".loser").html("YEAH! WIN!");

		}else if(state === 3){
			console.log('tie');
			$(".loser").html("COOL! TIE!");

		}
		if(state !== 3){
			$("#tic-"+a).css("background-color","#877f6c");
			$("#tic-"+b).css("background-color","#877f6c");
			$("#tic-"+c).css("background-color","#877f6c");
		}
		setTimeout(function(){
			if(state !== 3){
				$("#tic-"+a).css("background-color","#fff");
				$("#tic-"+b).css("background-color","#fff");
				$("#tic-"+c).css("background-color","#fff");
			}
        $(".loser").fadeIn(400,function(){
                setTimeout(function(){
                beginAgain();
            },2000);
        });
		},500);



	};


	var beginAgain= function(){
		for(var yyy = 0; yyy < 9;yyy++){
			group[yyy]=0;
			$("#span-"+(yyy+1)).html("");
		}
		$(".loser").fadeOut(1,function(){
			location.reload();
		});
	}


	var judge0 = function(){
		if(group[0] === group[1] && group[1] === group[2] && group[0]!== 0){
			result(group[0],1,2,3);
		}else if(group[3] === group[4] && group[4] === group[5] && group[3] !== 0){
			result(group[3],4,5,6);
		}else if(group[6] === group[7] && group[7] === group[8] && group[6] !== 0){
			result(group[6],7,8,9);
		}else if(group[0] === group[3] && group[3] === group[6] && group[0] !== 0){
			result(group[0],1,4,7);
		}else if(group[1] === group[4] && group[4] === group[7] && group[1] !== 0){
			result(group[1],2,5,8);
		}else if(group[2] === group[5] && group[5] === group[8] && group[2] !== 0){
			result(group[2],3,6,9);
		}else if(group[0] === group[4] && group[4] === group[8] && group[0] !== 0){
			result(group[0],1,5,9);
		}else if(group[2] === group[4] && group[4] === group[6] && group[2] !== 0){
			result(group[2],3,5,7);
		}else{
			var isTie = true;
			for(var i = 0; i < 9;i++){
				if(group[i] === 0){
					isTie = false;
				}
			}
			if(isTie){
				result(3,0,0,0);
			}else{
				var step = 0;
				for(var i in group){
					if(group[i] !== 0){
						step++;
					}
				}
				if(step %2 === 0 && step !== 0){
					pcStep0();
				}
			}
		}
	};

	var judge1 = function(){
		if(group[0] === group[1] && group[1] === group[2] && group[0]!== 0){
			result(group[0],1,2,3);
		}else if(group[3] === group[4] && group[4] === group[5] && group[3] !== 0){
			result(group[3],4,5,6);
		}else if(group[6] === group[7] && group[7] === group[8] && group[6] !== 0){
			result(group[6],7,8,9);
		}else if(group[0] === group[3] && group[3] === group[6] && group[0] !== 0){
			result(group[0],1,4,7);
		}else if(group[1] === group[4] && group[4] === group[7] && group[1] !== 0){
			result(group[1],2,5,8);
		}else if(group[2] === group[5] && group[5] === group[8] && group[2] !== 0){
			result(group[2],3,6,9);
		}else if(group[0] === group[4] && group[4] === group[8] && group[0] !== 0){
			result(group[0],1,5,9);
		}else if(group[2] === group[4] && group[4] === group[6] && group[2] !== 0){
			result(group[2],3,5,7);
		}else{
			var isTie = true;
			for(var i = 0; i < 9;i++){
				if(group[i] === 0){
					isTie = false;
				}
			}
			if(isTie){
				result(3,0,0,0);
			}else{
				var step = 0;
				for(var i in group){
					if(group[i] !== 0){
						step++;
					}
				}
				if(step %2 !== 0 && step !== 0){
					pcStep1();
				}
			}
		}
	};

	var initClick0 = function(i){
		$("#tic-"+i).on("click",function(){
			var step = 0;
			for(var j in group){
				if(group[j] !== 0){
					step++;
				}
			}
			if(step %2 === 0){
				return;
			}
			if(group[i-1] === 0){
				group[i-1] = 2;
				$("#span-"+i).html(user);
				judge0();
			}
		});
	};

	var initClick1 = function(i){
		$("#tic-"+i).on("click",function(){
			var step = 0;
			for(var j in group){
				if(group[j] !== 0){
					step++;
				}
			}
			if(step %2 !== 0){
				return;
			}
			if(group[i-1] === 0){
				group[i-1] = 2;
				$("#span-"+i).html(user);
				judge1();
			}
		});
	};

});