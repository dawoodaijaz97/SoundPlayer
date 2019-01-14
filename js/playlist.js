let projects = []; //list of projects


var Track = function (name, path, howl) { //Track Object,The Object represent each Audio or Track
    this.name = name; // Name of the track
    this.name2 = name.replace(/[^A-Z0-9]/ig, ""); //name of the track after after removing spaces and special characters from the track name
    this.path = path; //URL or permalink to the audio file Ex (audio/alive.mp3 or https://web006.mp3-youtube.download/tmp/20190107105311_20496a94-d44b-4e28-95bb-06a2c6063b3a/krewella-alive-video?md5=rEvap_kahikTI3DddnKuoQ&expires=1546858417)
    this.howl = howl; //The howler object for each track stores the actual player

};


var Playlist = function (name, imgUrl, text, tracks) { // Playlist Object,The object represents Playlist
    this.name = name; //Name of The playlist
    this.name2 = name.replace(/\s/g, ""); //Name of the playlist after removing spaces and special characters ex( "Alejandro(2) remix = Alejandro2remix")
    this.imgUrl = imgUrl; //Url or the image attached to each playlist Ex(images/xyz.jpg or https://i1.sndcdn.com/avatars-000010991573-yxedrc-t200x200.jpg )
    this.text = text; //Text attached to each playlist ex(This is playlist 1)
    this.tracks = tracks;//List of track in a playlist The list is of type Track
};

//represents a Project object,Each object has a sing or multiple playlist
var Project = function(name,playlistList){
    this.name = name; //name of the project
    this.playlistList = playlistList; //list of playlist in a project (A project can have 1 or multiple playlist)
};


//start adding the content from here

let track1Path = "../audio/Trouble On My Mind.mp3";
let track2Path = "../audio/Alive.mp3";
let track3Path = "../audio/Beats.mp3";
let track4Path = "../audio/Buzz.mp3";
let track5Path = "../audio/Electro.mp3";
let track6Path = "../audio/Fader.mp3";
let track7Path = "../audio/Trance.mp3";
let track8Path = "../audio/back in black.mp3";



let playlistList1 = []; //list of playlist for project 1

let tracks1 = []; //create tracks array for playlist
tracks1.push(new Track("Trouble On My Mind",track1Path)); //add a track to tracks list new, Track(name of track,url to track)
tracks1.push(new Track("Alive",track2Path)); //add a track to tracks list
tracks1.push(new Track("Beats",track3Path)); //add a track to tracks list

playlistList1.push(new Playlist("Playlist 1", "https://i1.sndcdn.com/avatars-000010991573-yxedrc-t200x200.jpg", "This is Playlist 1", tracks1)); //playlist1 1 added



let track2 = [];
track2.push(new Track("Buzz",track4Path));
track2.push(new Track("Electro",track5Path));
track2.push(new Track("Fader",track6Path));

playlistList1.push(new Playlist("Playlist 2", "https://i1.sndcdn.com/avatars-000010991573-yxedrc-t200x200.jpg", "This is Playlist 1", track2)); //playlist 2 added

let project1 = new Project("Project 1",playlistList1); //create project EX(name,list of playlist)

projects.push(project1); //push the project in projects array


//Below steps show creating a new Project

let playlistList2 = []; //list of playlist in project 2

let tracks3 = [];
tracks3.push(new Track("Trance",track7Path )); //add a track to tracks list new, Track(name of track,url to track)
tracks3.push(new Track("Back In Black",track8Path)); //add a track to tracks list


playlistList2.push(new Playlist("Playlist3","https://i1.sndcdn.com/avatars-000010991573-yxedrc-t200x200.jpg","some text",tracks3));//playlist 3 added

let project2 = new Project("Dawood",playlistList2); //create project 3 with playlists "playlistList2"

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


    for(let i = 0;i<project.playlistList.length;i++){
        let playlist = project.playlistList[i];
        createPlaylistCard(playlist,i); //create playlist card for the playlist
        for (let y = 0; y < playlist.tracks.length; y++) { //create waveform for each track in the playlist
            createWave(playlist.name2, playlist.tracks[y]);
            playlist.tracks[y].wave.load(playlist.tracks[y].path);
        }
    }

});

//creates the playlist card
var createPlaylistCard = function (playlist,i) {

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
    let div = $(".playlist:eq("+i+")");
    div.attr("id",playlist.name2);
    div.append(card);
};


//creates songsCard for each track

var createSongCard = function (playlistName, track, i) {
    console.log("Creating song Card");
    let card = $("<li class=\"songCard\">\n" +
        "    <div>\n" +
        "        <div class=\"heading\">\n" +
        "            <p class=\"title\"><label class='duration'></label></p>\n" +
        "        </div>\n" +
        "        <div class=\"player\">\n" +
        "            <button class=\"btn play\"><i class=\"fas fa-play\"></i></button>\n" +
        "            <div class=\"wave\">\n" +
        "            </div>\n" +
        "        </div>\n" +
        "    </div>\n" +
        "</li>");

    card.find(".title").text(i + "." + track.name); //set the title of the card to track name
    card.find(".wave").attr("id", track.name2 + "Player"); //set the wave container to track.name2+"Player"
    let button = card.find("button");
    button.attr("id", track.name2);
    createHowl(track);//create howler object for the track
    button.on("click", function () { //add event listener to play button
        if ($(this).hasClass("play")) { //check if it is play button
            let buttons = $("button");
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

            //stop every other song
            console.log("list lenght"+project.playlistList.length);
            for(let x = 0;x<project.playlistList.length;x++){  //stop every other track that was playing when some track was played
                let playlist = project.playlistList[x];
                for(let y= 0;y<playlist.tracks.length;y++){
                    playlist.tracks[y].howl.stop(); //stop howler sound
                    playlist.tracks[y].wave.stop();// stop waveform animation
                    console.log("x");
                }
            }
            track.howl.play();//play the track
            track.wave.play();//start waveform animation
        }
        else if ($(this).hasClass("stop")) { //it it has stop class
            $(this).removeClass("stop").addClass("play"); //remove stop class and add play class to the button
            $(this).find("i").removeClass("fa-stop").addClass("fa-play");//change to icon from stop to play
            track.howl.stop(); //stop howler sound
            track.wave.stop();//stop waveform animation
        }

    });

    return card;
};
//create howl object for the track
var createHowl = function (track) {
    track.howl = new Howl({
        src: [track.path], //path to the song
        autoplay: false,//autoplay true or false
        loop: false,//should loop after completion true of false
        volume: 1,//volume (1-0)
        ctx: true, //expose audio context
        masterGain: true,
        preload: true
    });
};

//create waveform object for each track
var createWave = function (playlist, track) {
    let container = track.name2 + "Player";
    container = "#"+playlist + " #" + container;
    console.log("container" + container);
    let waveSurfer = WaveSurfer.create({
        container: container, //the container in which the waveform is drawn
        hideScrollbar: true,//hide the scroll bar for the wave
        autoCenter: true,
        fillParent: true,
        height: 60,//height for the wave
        progressColor: "#F5F5DC",//color of progress
        cursorColor: "#007066",//cursor color

    });
    waveSurfer.on('ready', function () {
        waveSurfer.setMute(true);
        console.log("ready");
    });

    waveSurfer.on("finish", function () {
        console.log("finish");
        waveSurfer.seekTo(0);
        track.howl.stop();
        track.howl.seek(0);
    });


    waveSurfer.on("seek", function (progress) {
        console.log("seeking");
        let seek = progress * track.howl.duration();
        console.log("seek" + seek);
        track.howl.seek(seek);
    });


    track.wave = waveSurfer;
};