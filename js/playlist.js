let projects = []; //list of projects
let autoplay = false;


let createWave = function () {
    let waveSurfer = WaveSurfer.create({
        container: ".playerCont .wave", //the container in which the waveform is drawn
        hideScrollbar: true,//hide the scroll bar for the wave
        autoCenter: true,
        fillParent: true,
        height: 60,//height for the wave
        progressColor: "#F5F5DC",//color of progress
        cursorColor: "#007066",//cursor color
        backend: 'MediaElement',
        responsive: true,

    });
    waveSurfer.on('ready', function () {
        console.log("ready");
        if (autoplay === false) {
            autoplay = true;
        } else {

            waveSurfer.play();
        }
    });

    waveSurfer.on("finish", function () {
        console.log("finish");
        waveSurfer.seekTo(0);
    });
    waveSurfer.on("seek", function (seek) {
        console.log("seek" + seek);
    });
    waveSurfer.on("audioprocess", function () {

        let tDuration = wave.getDuration();
        let tMin = Math.floor(tDuration / 60);
        let tSec = Math.floor(tDuration % 60);
        let progress = wave.getCurrentTime();
        let durationP = $(".playerCont").find(".duration");
        let min;
        if (progress / 60 < 0) {
            min = 0;
        } else {
            min = Math.floor(progress / 60);
        }

        let sec = Math.floor(progress % 60);
        if (sec < 10) {
            durationP.text(min + ":0" + sec + " | " + tMin + ":" + tSec);

        }
        else{
            durationP.text(min + ":" + sec + " | " + tMin + ":" + tSec);
        }

    });
    waveSurfer.on("stop", function () {
        console.log("stop");
    });


    return waveSurfer;
};

var setPlayer = function (track) {

    let playerCont = $(".playerCont");
    playerCont.find(".title").text(track.name);


};


var wave;

var Track = function (name, path) { //Track Object,The Object represent each Audio or Track
    this.name = name; // Name of the track
    this.name2 = name.replace(/[^A-Z0-9]/ig, ""); //name of the track after after removing spaces and special characters from the track name
    this.path = path; //URL or permalink to the audio file Ex (audio/alive.mp3 or https://web006.mp3-youtube.download/tmp/20190107105311_20496a94-d44b-4e28-95bb-06a2c6063b3a/krewella-alive-video?md5=rEvap_kahikTI3DddnKuoQ&expires=1546858417)
};


var Playlist = function (name, imgUrl, text, tracks) { // Playlist Object,The object represents Playlist
    this.name = name; //Name of The playlist
    this.name2 = name.replace(/\s/g, ""); //Name of the playlist after removing spaces and special characters ex( "Alejandro(2) remix = Alejandro2remix")
    this.imgUrl = imgUrl; //Url or the image attached to each playlist Ex(images/xyz.jpg or https://i1.sndcdn.com/avatars-000010991573-yxedrc-t200x200.jpg )
    this.text = text; //Text attached to each playlist ex(This is playlist 1)
    this.tracks = tracks;//List of track in a playlist The list is of type Track
};

//represents a Project object,Each object has a sing or multiple playlist
var Project = function (name, playlistList) {
    this.name = name; //name of the project
    this.playlistList = playlistList; //list of playlist in a project (A project can have 1 or multiple playlist)
};


//start adding the content from here

// let track1Path = "../audio/Trouble On My Mind.mp3";
let track1Path = "https://wavesurfer-js.org/example/media/demo.wav";
let track2Path = "../audio/Alive.mp3";
let track3Path = "../audio/Beats.mp3";
let track4Path = "../audio/Buzz.mp3";
let track5Path = "../audio/Electro.mp3";
let track6Path = "../audio/Fader.mp3";
let track7Path = "../audio/Trance.mp3";
let track8Path = "../audio/back in black.mp3";


let playlistList1 = []; //list of playlist for project 1

let tracks1 = []; //create tracks array for playlist
tracks1.push(new Track("Trouble On My Mind", track1Path)); //add a track to tracks list new, Track(name of track,url to track)
tracks1.push(new Track("Alive", track2Path)); //add a track to tracks list
tracks1.push(new Track("Beats", track3Path)); //add a track to tracks list

playlistList1.push(new Playlist("Playlist 1", "https://i1.sndcdn.com/avatars-000010991573-yxedrc-t200x200.jpg", "This is Playlist 1 Add desk", tracks1)); //playlist1 1 added


let track2 = [];
track2.push(new Track("Buzz", track4Path));
track2.push(new Track("Electro", track5Path));
track2.push(new Track("Fader", track6Path));

playlistList1.push(new Playlist("Playlist 2", "https://i1.sndcdn.com/avatars-000010991573-yxedrc-t200x200.jpg", "This is Playlist 1", track2)); //playlist 2 added

let project1 = new Project("Project 1", playlistList1); //create project EX(name,list of playlist)

projects.push(project1); //push the project in projects array


//Below steps show creating a new Project

let playlistList2 = []; //list of playlist in project 2

let tracks3 = [];
tracks3.push(new Track("Trance", track7Path)); //add a track to tracks list new, Track(name of track,url to track)
tracks3.push(new Track("Back In Black", track8Path)); //add a track to tracks list


playlistList2.push(new Playlist("Playlist3", "https://i1.sndcdn.com/avatars-000010991573-yxedrc-t200x200.jpg", "some text", tracks3));//playlist 3 added

let project2 = new Project("Dawood", playlistList2); //create project 3 with playlists "playlistList2"

projects.push(project2);//push the project in projects array


let project;

$("document").ready(function () {


    let path = $(location).attr("pathname");
    let x = path.lastIndexOf("/");
    let y = path.indexOf(".");
    console.log("x= " + x + "y" + y);
    let projectName = path.substring(x + 1, y);
    projectName = decodeURI(projectName);
    console.log(path);
    console.log("name=" + projectName);

    for (let i = 0; i < projects.length; i++) { //search for playlist in the projects array
        if (projectName === projects[i].name) {
            project = projects[i];
            break;
        }
    }
    console.log("project" + project);


    for (let i = 0; i < project.playlistList.length; i++) {
        let playlist = project.playlistList[i];
        createPlaylistCard(playlist, i); //create playlist card for the playlist

    }
    if (!wave) {
        wave = createWave();
    }


    $(".container:eq(0)").css({
        "margin-top": "250px"
    });

    $("#forward").on("click", function () {

        let nextBtn = $(".playing").next().find(".btn");
        console.log(nextBtn.attr("class"));
        if (nextBtn.attr("class")) {
            nextBtn.trigger("click");
        }
        else {
            console.log("going to else");
            let nextPlaylist = $(".playing").parents(".container").next(".container").find(".playlist").attr("id");
            console.log(nextPlaylist);
            for (let x = 0; x < project.playlistList.length; x++) {
                if (project.playlistList[x].name2 === nextPlaylist) {
                    let nextSong = project.playlistList[x].tracks[0].name2;
                    console.log("next song =" + nextSong);
                    $("#" + nextSong).trigger("click");
                }
            }
        }
    });

    $("#backward").on("click", function () {
        let prevBtn = $(".playing").prev().find(".btn");
        console.log("prev song" + prevBtn.attr("id"));
        if (prevBtn.attr("id")) {
            prevBtn.trigger("click");
        } else {
            console.log("playing else");

            let prevPlaylist = $(".playing").parents(".container").prev(".container").find(".playlist").attr("id");
            console.log("prev playlist= " + prevPlaylist);
            for (let x = 0; x < project.playlistList.length; x++) {
                if (project.playlistList[x].name2 === prevPlaylist) {
                    let nextSong = project.playlistList[x].tracks[project.playlistList[x].tracks.length - 1].name2;
                    console.log("next song =" + nextSong);
                    $("#" + nextSong).trigger("click");
                }
            }

        }
    });
    $("#play").on("click", function (e, data) {
        if ($(this).hasClass("play")) {
            $(this).find("i").removeClass("fa-play").addClass("fa-pause");
            $(this).removeClass("play").addClass("stop");
            let playingSong = $(".playing").find(".btn").attr("id");
            console.log(playingSong);
            wave.play();
        } else {
            $(this).find("i").removeClass("fa-pause").addClass("fa-play");
            $(this).removeClass("stop").addClass("play");
            wave.pause();
        }
    });

    $("#mute").on("click", function (event, data) {
        console.log(data);
        console.log(event);
        let btn = $(this);
        if (data) {
            btn.addClass("soundOff").removeClass("sound").find("i").addClass("fa-mute").removeClass("fa-volume-up");
            wave.setMute(false);
        }
        else {
            if (btn.hasClass("sound")) {
                btn.addClass("soundOff").removeClass("sound").find("i").addClass("fa-mute").removeClass("fa-volume-up");
                wave.setMute(false);
            } else {
                btn.addClass("sound").removeClass("soundOff").find("i").addClass("fa-volume-up").removeClass("fa-mute");
                wave.setMute(true);
            }
        }
    });

    $(".songCard:first").find(".btn").trigger("click");
    $("#play").trigger("click");


});

//creates the playlist card
var createPlaylistCard = function (playlist, i) {

    let card = $("<div class=\"playlistCard\">\n" +
        "    <h3 class=\"playlistName\">Playlist1</h3>\n" +
        "    <div class=\"meta\">\n" +
        "        <img src=\"https://i1.sndcdn.com/artworks-000021056062-hj3gdo-t500x500.jpg\" class=\"playlistImg\">\n" +
        "        <p class=\"playlistDesc\">Lorem ipsum dolor\n" +
        "            sit amet, consectetur adipisicing elit.\n" +
        "            Commodi cumque necessitatibus neque nostrum\n" +
        "            quod vitae.\n" +
        "        </p>\n" +
        "    </div>\n" +
        "    <ul class=\"songList\">\n" +
        "    </ul>\n" +
        "</div>");
    card.find(".playlistName").text(playlist.name); //set title to playlist name
    card.find(".playlistImg").attr("src", playlist.imgUrl); //set the playlist image url
    card.find(".playlistDesc").text("").text(playlist.text);
    let songList = card.find(".songList");
    for (let i = 0; i < playlist.tracks.length; i++) { //create song card for each track in the playlist
        songList.append(createSongCard(playlist.name, playlist.tracks[i], i)); //append the each song card to corresponding playlist song list
    }
    let div = $(".playlist:eq(" + i + ")");
    div.attr("id", playlist.name2);
    div.append(card);
};


//creates songsCard for each track

var createSongCard = function (playlistName, track,) {
    console.log("Creating song Card");
    let card = $("<li class=\"songCard\">\n" +
        "               <button class=\"btn play\"><i class=\"fas fa-play\"></i></button>\n" +
        "               <p class=\"title\">This is a song</p>\n" +
        "</li>");

    card.find(".title").text(track.name); //set the title of the card to track name

    let button = card.find("button");
    button.attr("id", track.name2);
    button.on("click", function (event) { //add event listener to play button
        event.stopImmediatePropagation();
        if ($(this).hasClass("play")) { //check if it is play button

            let buttons = $(".songCard button");
            buttons.removeClass("stop").addClass("play");
            buttons.each(function () {
                $(this).find("i").removeClass("fa-stop").addClass("fa-play");
            });
            $(this).removeClass("play"); //remove play class from the button
            $(this).addClass("stop"); //add stop class to the button
            $(".songCard").each(function () {
                $(this).removeClass("playing"); //from all songs card remove playing class
            });
            $(this).parent(".songCard").toggleClass("playing"); //add the playing class to song card for which the track was played
            $(this).find("i").removeClass("fa-play").addClass("fa-stop"); //change the button icon from play to stop
            $(".playerCont").find("#play").addClass("pause").removeClass("play").find("i").removeClass("fa-play").addClass("fa-pause");
            $("#mute").trigger("click", ["play"]);
            wave.load(track.path);
            setPlayer(track);

        }
        else if ($(this).hasClass("stop")) { //it it has stop class
            $(this).removeClass("stop").addClass("play"); //remove stop class and add play class to the button
            $(this).find("i").removeClass("fa-stop").addClass("fa-play");//change to icon from stop to play
            console.log("playling sds ");
            wave.stop();

        }

    });

    card.on("click", function () {
        $(this).find(".btn").trigger("click");
    });

    return card;
};




