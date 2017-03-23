var gameSounds = ["intro.mp3","theme.mp3","story.mp3","click.mp3","shotgun.mp3","die.mp3","monkey.mp3","monkey1.mp3","monkey2.mp3"]
var narration = ["calibration.mp3","tut.mp3"]

$(document).ready(function() {
    pluginEarphones();

    function pluginEarphones(){

        sounds.load([gameSounds[0]]);
        sounds.whenLoaded = function(){
            console.log("Plugin Sound");

            var earphonesWarning = sounds[gameSounds[0]]

            earphonesWarning.loop = false;
            earphonesWarning.pan = 0;
            earphonesWarning.volume = 0.7; 

            earphonesWarning.play();
           
        }
    }


    $("#pluginEarphones").click(function(){
        storyStart(); 
        navigator.vibrate(650);
        $("#pluginEarphones").css("display","none")   
    })

    function storyStart(){
        var earphonesWarning = sounds[gameSounds[0]]
        earphonesWarning.pause();

        sounds.load([gameSounds[2]]);
        sounds.whenLoaded = function(){
            console.log("story Sounds");            
            var menuOption = sounds[gameSounds[2]] 

            menuOption.loop = false;
            menuOption.pan = 0;
            menuOption.volume = 0.7; 

            menuOption.play();

            setTimeout(function(){
                $("#calibrate").css("display","block");
            },30000)
            
        }
    }

    $("#calibrate").click(function(){
        console.log("Calibration started")
        navigator.vibrate(650);
        checkAndGetRoll(1);
    })

    function proceed(choice){
        $("#calibrate").css("display","none");
        sounds.load([narration[0]]);
        sounds.whenLoaded = function(){
            console.log("Calibration successfull");            
            var menuOption = sounds[narration[0]] 

            menuOption.loop = false;
            menuOption.pan = 0;
            menuOption.volume = 0.7; 

            menuOption.play();

            var p = document.getElementById("myAudio3");
            p.play(); 
            setTimeout(function(){
                sounds.load([gameSounds[7]]);
	            sounds.whenLoaded = function(){
	                console.log("Left Monkey");            
	                var menuOption = sounds[gameSounds[7]] 

	                menuOption.loop = false;
	                menuOption.pan = -0.6;
	                menuOption.volume = 0.8; 

	                menuOption.play();

	                setTimeout(function(){
	                	startTut()
	                },1500)
	            } 
            },1500)    

        }
    }
    
    var tutcount = 0;
    function startTut(){
        $("#tutshoot").css("display","block");
        if (tutcount==0) {
            sounds.load([narration[1]]);
            sounds.whenLoaded = function(){
                console.log("Lean Left to shoot the left Monkey");            
                var menuOption = sounds[narration[1]] 

                menuOption.loop = false;
                menuOption.pan = -0.6;
                menuOption.volume = 0.9; 

                menuOption.play();
            }

        }
        else
        {
           sounds.load([gameSounds[3]]);
            sounds.whenLoaded = function(){
                console.log("Lean right to shoot the left Monkey");            
                var menuOption = sounds[gameSounds[3]] 

                menuOption.loop = false;
                menuOption.pan = 0.6;
                menuOption.volume = 0.7; 

                menuOption.play();
            } 
        }
        
        
        $("#tutshoot").click(function(){
            var x = document.getElementById("myAudio");
            x.play(); 
            if (tutcount==0) {
                if(checkLeft(localStorage.yaw))
                {
                    navigator.vibrate(650);
                    var o = document.getElementById("myAudio2");
                    o.play(); 
                    setTimeout(function(){
                        startGame()
                    },5000)       
                }
            }
        });

    }

    var Bullets;
    var Shots_Hit;
    var d = new Date();
    var Start_Time = 0;
    var End_Time = 0;

    function startGame(){

        Start_Time = d.getTime(); //milliseconds

        Bullets = 5;
        Shots_Hit = 0;

        setTimeout(function(){
            var answered = false;
            $("#shoot").css("display","block");  
                generateSound();
                $("#shoot").click(function(){
                    if(Bullets!=0)
                    {
                        var x = document.getElementById("myAudio");
                        x.play(); 
                        

                        Bullets--;
                    
                        if (localStorage.answer=="left") {
                            if(checkLeft(localStorage.yaw))
                            {
                                //alert("Sahi Left")
                                navigator.vibrate(650);
                                Shots_Hit++;
                                setTimeout(function(){
                                    var z = document.getElementById("myAudio1");
                                    z.play(); 
                                },500)
                                setTimeout(function(){
                                    generateSound();
                                },3300)
                                   
                            }
                        }
                        else if (localStorage.answer=="right") {
                            if(checkRight(localStorage.yaw))
                            {
                                //alert("Sahi Right")
                                navigator.vibrate(650);
                                Shots_Hit++;
                                setTimeout(function(){
                                    generateSound();
                                },3300)
                                setTimeout(function(){
                                    var z = document.getElementById("myAudio1");
                                    z.play(); 
                                },500)
                            }   
                        }
                        else
                        {
                           if(checkCenter(localStorage.yaw))
                            {
                                //alert("Sahi Center")
                                navigator.vibrate(650);
                                Shots_Hit++;
                                setTimeout(function(){
                                    generateSound();
                                },3300)
                                setTimeout(function(){
                                    var z = document.getElementById("myAudio1");
                                    z.play(); 
                                },500)
                            }   
                        }
                    }
                    else
                    {
                        //game end
                        End_Time = d.getTime();
                        GameEnd();
                    }
                
                
                })

        },4000)
    }

    function GameEnd()
    {
        alert("Game Ended")
        navigator.vibrate(1000);
        var ch = new SpeechSynthesisUtterance("Game Has ended dude");
        window.speechSynthesis.speak(ch);
        var settings = 
        {
          "async": true,
          "crossDomain": true,
          "url": "http://localhost:8080/result",
          "method": "POST",
          "headers": 
          {
            "Shots" : Shots_Hit,
            "Time" : End_Time - Start_Time,  // milliseconds
            "content-type": "application/x-www-form-urlencoded"
           }
        }

        $.ajax(settings).done(function (response) 
        {
         
          //response JSON contains accuracy, world rank , details of shots

        });
    }


    function generateSound(){
        var soundIndex = Math.floor(Math.random() * (8 - 6 + 1)) + 6;
        sounds.load([gameSounds[soundIndex]]);
        sounds.whenLoaded = function(){
            //alert("Sound Generated");

            var monkey = sounds[gameSounds[soundIndex]]
            localStorage.pan = Math.random() * (1 - (-1)) -1;
            monkey.loop = false;
            monkey.pan = localStorage.pan;
            monkey.volume = Math.random() * (0.7 - (-0)) +0; 

            monkey.play();

            if (localStorage.pan<-0.2) {
                localStorage.answer = "left";
            }
            else if(localStorage.pan>0.2)
            {
                localStorage.answer = "right";
            }
            else{
                localStorage.answer = "center";
            }
           
        }
    }



    var result = "no"                   //test case variable for result of roll orientation check
    var yawActual = -1;                 // setting the yaw after proper roll orientation
    var isRollOkay = false;             // is roll properly oriented
    var permissibleError = 20;          // angle +- 10 , i.e.  left +-10 

    // values from -180 to 180 degrees
    var yaw_inter = -1                  
    var pitch_inter = -1
    var roll_inter = -1

    // values from 0 to 360 degrees
    var yaw_fixed = -1
    var pitch_fixed = -1
    var roll_fixed = -1

    // to store permissibleError in left and right, i.e range in left and right
    var yawRange = {
        left : {
                    val_one : -1,
                    val_two : -1
                },

        right : {
                    val_one : -1,
                    val_two : -1
            },
        center : {
                    val_one : -1,
                    val_two : -1
        }
    }

    
    document.addEventListener("deviceready", onDeviceReady, false);
    

    function onDeviceReady() {
        //alert("Device is Ready");
        console.log(navigator.vibrate);
    }
    function checkAndGetRoll(choice){
        if (navigator.fusion) {
            //alert('SensorFusion available.');
            navigator.fusion.watchSensorFusion(function (result) {

                yaw_inter = result.eulerAngles.yaw*58.14;
                pitch_inter = result.eulerAngles.pitch*58.14;
                roll_inter = result.eulerAngles.roll*58.14;

                yaw_fixed = yaw_inter < 0 ? 360 + yaw_inter : yaw_inter;
                pitch_fixed = pitch_inter < 0 ? 360 + pitch_inter : pitch_inter;
                roll_fixed = roll_inter < 0 ? 360 + roll_inter : roll_inter;

                document.getElementById("accelerometer").innerHTML = "Yaw : "+ yaw_fixed + "<br>Pitch : " + pitch_fixed + "<br>Roll : " +  roll_fixed + "<br>Pan: "+ localStorage.pan;

                localStorage.roll = roll_fixed;
                localStorage.yaw = yaw_fixed;
                checkRoll(localStorage.roll,yaw_fixed,choice);
                
                               
            }, function (err) {
                console.log('error', err);
            }, {
                frequency: 500
            });
        }
    }

    function checkRoll(roll,yaw,choice)            // to check roll || roll and yaw is set, pass roll_fixed and yaw_fixed
    {
        if (isRollOkay==false) {
            if(roll >= 180 && roll <= 340)      // angle of roll between 230 and 320 degrees .. i.e. probably facing toward the user
            {
                isRollOkay = true;
                yawActual = yaw;
                localStorage.init_yaw = yaw;
                updateSides();
                proceed(choice);
                //alert("Roll Set hai")
            }
            else
            {
                result = "Roll not yet Oriented";
                resetRoll();
                console.log(result)
                return;

            }
        }
    }

    function resetRoll()                // to reset roll back to false , i.e. not properly oriented
    {
        isRollOkay = false;
        yawActual = -1;
    }


    function updateSides()              // generating probable range of left and right and updating yawRange JSON 
    {
        if(isRollOkay)
        {
            yawRange.left.val_one = (yawActual - 90 - permissibleError)%360 < 0 ? 360 + (yawActual - 90 - permissibleError)%360 : (yawActual - 90 - permissibleError)%360;
            yawRange.left.val_two = (yawActual - 90 + permissibleError)%360 < 0 ? 360 + (yawActual - 90 + permissibleError)%360 : (yawActual - 90 + permissibleError)%360;

            yawRange.right.val_one = (yawActual + 90 - permissibleError)%360;
            yawRange.right.val_two = (yawActual + 90 + permissibleError)%360;

            yawRange.center.val_one = (yawActual - permissibleError)%360;
            yawRange.center.val_two = (yawActual + permissibleError)%360;
        }
    }

    function checkLeft(yaw)                         // to check for current yaw in left range
    {
        if(isRollOkay)
        {
            if((yawRange.left.val_one > yawRange.left.val_two) && (yaw >= yawRange.left.val_one && yaw <= 360 || yaw >= 0 && yaw <= yawRange.left.val_two))
            {
                return true;
            }
            else if((yawRange.left.val_one < yawRange.left.val_two) && (yaw >= yawRange.left.val_one && yaw <= yawRange.left.val_two))
            {
                return true;
            }
            else
            {
                return false;
            }
        }
    }

    function checkRight(yaw)                        // to check for current yaw in right range
    {
        if(isRollOkay)
        {
            if((yawRange.right.val_one > yawRange.right.val_two) && (yaw >= yawRange.right.val_one && yaw <= 360 || yaw >= 0 && yaw <= yawRange.right.val_two))
            {
                return true;
                
            }
            else if((yawRange.right.val_one < yawRange.right.val_two) && (yaw >= yawRange.right.val_one && yaw <= yawRange.right.val_two))
            {
                return true;
                
            }
            else
            {
                return false;
            }
        }
    }

    function checkCenter(yaw)                        // to check for current yaw in right range
    {
        if(isRollOkay)
        {
            if((yawRange.center.val_one > yawRange.center.val_two) && (yaw >= yawRange.center.val_one && yaw <= 360 || yaw >= 0 && yaw <= yawRange.center.val_two))
            {
                return true;
                
            }
            else if((yawRange.center.val_one < yawRange.center.val_two) && (yaw >= yawRange.center.val_one && yaw <= yawRange.center.val_two))
            {
                return true;
                
            }
            else
            {
                return false;
            }
        }
    }


});
