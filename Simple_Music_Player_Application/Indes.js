let track_list = [
    {
        name : "Demo1",
        artist : "The Rolling Stones",
        Image : "https://i.pinimg.com/originals/d5/75/73/d575738181df76688cadb59a861a0e28.jpg",
        path : "Dandelions (Slowed Reverb)_64-(PagalWorld.Ink).mp3"
    },
    {
        name : "Demo2",
        artist : "Sia",
        Image : "https://images-na.ssl-images-amazon.com/images/I/71Hnf9XzOhL._AC_SX466_.jpg",
        path : "Unstoppable_64(PagalWorld.com.se).mp3"
    },
    {
        name : "Demo3",
        artist : "Arijit Singh",
        Image : "https://th.bing.com/th?id=OIP.ytm4CoVbTQ3na0otYRvCOwHaEK&w=333&h=187&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2",
        path : "Dilliwaali Girlfriend (Yeh Jawaani Hai Deewani)_64-(PagalWorld.Ink).mp3"
    },
    {
        name : "Demo4",
        artist : "Pritam",
        Image : "https://th.bing.com/th?id=OIP.xGha9OjP5_bKtsfQ7NPkFgHaHa&w=250&h=250&c=8&rs=1&qlt=30&o=6&pid=3.1&rm=2",
        path : "Rasiya - Brahmastra_64-(PagalWorld.Ink).mp3"
    }
]


// Step 1: select all the elemnts in the HTML page and assing them to varitable
let now_playing = document.querySelector('.now-playing');
let track_art = document.querySelector('.track-art');
let track_name = document.querySelector('.track-name');
let track_artist = document.querySelector('.track-artist');


let playpause_btn = document.querySelector('.playpause-track');
let next_btn = document.querySelector('.next-track');
let prev_btn = document.querySelector('.prev_track');


let seek_slider = document.querySelector('.seek_slider');
let volume_Slider = document.querySelector('.volume_slider');
let curr_time = document.querySelector('.current_time');
let total_duration = document.querySelector('.total_duration_time');


// Step 2: Specify globally used values
let track_index = 0;
let is_playing = false;


// Step 3: Creat the audio element for the player
const audio_player = document.createElement('audio');

// To conver seconds of music into 00:00 form 
function converDuration(totalSeconds){
   const minutes = '' + Math.floor(totalSeconds / 60);
    const seconds = '' + Math.floor(totalSeconds - (minutes * 60 ));

    // convert into 01:10 timing
    return minutes.padStart( 2, '0' ) + ':' + seconds.padStart( 2, '0') ;
}

// loadTrack( track_index ) to load a track and set it up
function loadTrack(){
    let track = track_list[track_index];

    // here src is to fetch song form its path
    audio_player.src = track.path;

    //load() is an API used to load track
    audio_player.load() 

    // Show basic details of the song
    // to change the image, artist and song name
    now_playing.textContent = 'PLAYING ' + (track_index +1) + ' OF ' + (track_list.length);

    track_art.style.backgroundImage = 'url( " '+ track.Image +'")'; 
     track_name.textContent = track.name; // here textContent is same as innerText
     track_artist.textContent = track.artist;

     random_rgb_colors();

    // set up for calling seekUpdate() every second
    setInterval(seekUpdate , 1000)// the second parametre is for mili second and 1000 mili second is 1 sec
} 

// To set up a rendom backgorund color
function random_rgb_colors(){
    
        let red = Math.floor( Math.random() * ( 256 - 64 ) ) + 64;
        let green = Math.floor( Math.random() * ( 256 - 64 ) ) + 64;
        let blue = Math.floor( Math.random() * ( 256 - 64 ) ) + 64;
    
        let color = `rgb( ${red}, ${green}, ${blue} )`;

        document.body.style.backgroundColor = color;
    
}
// To switch to playing when paused, and vice versa
function playPauseTrack(){
    if( is_playing ){
        pauseTrack();
    }
    else{
        playTrack();
    }

}


function playTrack(){
    audio_player.play();
    is_playing=true;
    playpause_btn.innerHTML = '<i class="fa-solid fa-circle-pause fa-5x"></i>';

     // Set up total duration of the track
     // audio_player.duration gives total time duration of song in seconds
    total_duration.textContent = converDuration(audio_player.duration);
}

function pauseTrack(){
    audio_player.pause();
    is_playing=false;
    // To change the playPause animation while plying and pausing
    playpause_btn.innerHTML = '<i class="fa-solid fa-circle-play fa-5x"></i>'
}

function nextTrack(){
    ++track_index;

    if(track_index >= track_list.length){
        track_index = 0;
    }

    loadTrack();
    playTrack();

}

function prevTrack(){
    --track_index;
    if(track_index < 0){
        track_index = (track_list.length-1);
    }

    loadTrack();
    playTrack();
}

// To play the song if user slide the seek
function seekTo(){
    // here currentTime represents the current time of song 
    audio_player.currentTime = audio_player.duration * (seek_slider.value / 100);
}

function setVolume(){
    audio_player.volume = volume_Slider.value / 100;
}

//update the pregress slider and durations as the music plays 
function seekUpdate(){
    // set up current duration of the track
    curr_time.textContent = converDuration(audio_player.currentTime);

    // For updating the range of seekUpdate
    seek_slider.value = Math.floor( audio_player.currentTime / audio_player.duration * 100);
}


// setup event handlers
playpause_btn.addEventListener('click',playPauseTrack );

next_btn.addEventListener('click' , nextTrack);

//prev_btn.addEventListener('click',prevTrack);
volume_Slider.addEventListener('input',setVolume) ;

seek_slider.addEventListener('input', seekTo);

//whan the song is end it will switch to the next song
audio_player.addEventListener('ended' , nextTrack );






// set the ball rolling when the page is load
loadTrack();