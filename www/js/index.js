var gameSounds = ["earphones.mp3","theme.mp3","menu.mp3","click.mp3","shoot.mp3","die.mp3","monkey.mp3"]
var narration = ["failedCalibrate.mp3","calibrate.mp3","gameplay.mp3"]

$(document).ready(function() {
    pluginEarphones(); 



    function clickSound(){
        sounds.load([gameSounds[3]]);
        sounds.whenLoaded = function(){
            console.log("Click Sound");

            var click = sounds[gameSounds[3]]

            click.loop = false;
            click.pan = 0;
            click.volume = 0.7; 

            click.play();
           
        }
    }

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
        loadMenuTrack(); 
        $("#pluginEarphones").css("display","none")   
    })

    function loadMenuTrack(){
        var earphonesWarning = sounds[gameSounds[0]]
        earphonesWarning.pause();

        sounds.load([gameSounds[1],gameSounds[2]]);
        sounds.whenLoaded = function(){
            console.log("Menu Sounds");
            $(".menu").css("display","block");
            var theme = sounds[gameSounds[1]]
            var menuOption = sounds[gameSounds[2]]
            
            theme.loop = true;
            theme.pan = 0;
            theme.volume = 0.1; 

            menuOption.loop = false;
            menuOption.pan = 0;
            menuOption.volume = 0.7; 

            theme.play();
            menuOption.play();
            clickSound();
        }
    }

    $("#tutorial").click(()=>{
        var menuOption = sounds[gameSounds[2]]
        menuOption.pause();
        clickSound();
        calibrate(0);
    })

    $("#startGame").click(()=>{
        var menuOption = sounds[gameSounds[2]]
        menuOption.pause();
        clickSound();
        calibrate(1);
    })

    function calibrate(a){
        $("#calibrate").css("display","block");
        sounds.load([narration[1]]);
        sounds.whenLoaded = function(){
            console.log("Calibrate Sound");

            var calibrate = sounds[narration[1]]

            calibrate.loop = false;
            calibrate.pan = 0;
            calibrate.volume = 0.7; 

            calibrate.play();
           
        }
        $("#calibrate").click(function(){
            checkAndGetRoll(a);
        })
    }

    function proceed(choice){
        if (isRollOkay) {
            $("#calibrate").css("display","none");
            if (choice==1) {
                startGame();
            }
            else{

            }
        }
    }

    function startGame(){
        sounds.load([narration[2]]);
        sounds.whenLoaded = function(){
            console.log("gameplay Sound");

            var gameplay = sounds[narration[2]]

            gameplay.loop = false;
            gameplay.pan = 0;
            gameplay.volume = 0.7; 

            gameplay.play();
           
        }

        setTimeout(function(){
            $("#shoot").css("display","block");
            generateSound();
            $("#shoot").click(function(){
                if (localstorage.answer=="left") {

                }
                else if (localstorage.answer=="right") {
                    
                }
            })
        },4000)
    }

    function generateSound(){
        sounds.load([gameSounds[6]]);
        sounds.whenLoaded = function(){
            console.log("Calibrate Sound");

            var monkey = sounds[gameSounds[6]]
            localstorage.pan = Math.random() * (1 - (-1)) -1;
            monkey.loop = false;
            monkey.pan = localstorage.pan;
            monkey.volume = Math.random() * (0.7 - (-0)) +0; 

            gameSounds.play();
           
        }
        if (localstorage.pan<-0.2) {
            localstorage.answer = "left";
        }
        else if(localstorage.pan>0.2)
        {
            localstorage.answer = "right";
        }
        else{
            localstorage.answer = "center";
        }
    }



    var result = "no"                   //test case variable for result of roll orientation check
    var yawActual = -1;                 // setting the yaw after proper roll orientation
    var isRollOkay = false;             // is roll properly oriented
    var permissibleError = 10;          // angle +- 10 , i.e.  left +-10 

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
            }
    }

    
    document.addEventListener("deviceready", onDeviceReady, false);
    

    function onDeviceReady() {
        console.log("Device is Ready");
    }
    function checkAndGetRoll(choice){
        if (navigator.fusion) {
            console.log('SensorFusion available.');
            navigator.fusion.watchSensorFusion(function (result) {

                var yaw_inter = result.eulerAngles.yaw*58.14;
                var pitch_inter = result.eulerAngles.pitch*58.14;
                var roll_inter = result.eulerAngles.roll*58.14;

                var yaw_fixed = yaw_inter < 0 ? 360 + yaw_inter : yaw_inter;
                var pitch_fixed = pitch_inter < 0 ? 360 + pitch_inter : pitch_inter;
                var roll_fixed = roll_inter < 0 ? 360 + roll_inter : roll_inter;

                localstorage.roll = roll_fixed;
                localstorage.yaw = yaw_fixed;
                checkRoll(localstorage.roll,yaw_fixed);
                proceed(choice);
                               
            }, function (err) {
                console.log('error', err);
            }, {
                frequency: 500
            });
        }
    }

    function checkRoll(roll,yaw)            // to check roll || roll and yaw is set, pass roll_fixed and yaw_fixed
    {
        if(roll >= 230 && roll <= 320)      // angle of roll between 230 and 320 degrees .. i.e. probably facing toward the user
        {
            isRollOkay = true;
            yawActual = yaw;
            localstorage.init_yaw = yaw;
        }
        else
        {
            result = "Roll not yet Oriented";
            resetRoll();
            console.log(result)
            return;

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


});
