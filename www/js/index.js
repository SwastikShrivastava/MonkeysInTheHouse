var gameSounds = ["earphones.mp3","theme.mp3","menu.mp3","click.mp3","shoot.mp3","die.mp3"]
var narration = []

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
        //clickSound();
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
        if (a=0) {

        }
        else{

        }
    }

});
