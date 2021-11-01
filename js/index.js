const $player = document.querySelector('.player'),
      $cover = document.querySelector('.cover__img'),
      $titleSong = document.querySelector('.title-song'),
      $src = document.querySelector('#src'),
      $upload = document.querySelector('#upload'),
      $audio = document.querySelector('#audio'),
      $progressContainer = document.querySelector('.progress__container'),
      $progress = document.querySelector('.progress'),
      $playBtn = document.querySelector('.play'),
      $imgSrc = document.querySelector('.img__src'),
      $stopBtn = document.querySelector('.stop');


function handleFiles(event) {
    var files = event.target.files;
    $audio.setAttribute("src", URL.createObjectURL(files[0]));
    $audio.load();
    var nameFile = document.querySelector('input[type=file]').files[0].name;
    document.querySelector('.title-song span').innerHTML = nameFile;
}
$upload.addEventListener("change", handleFiles, false);

//Play
function playSong() {
  $player.classList.add('play');
  $cover.classList.add('active');  
  $imgSrc.src = './img/pause.png';
  $audio.play();
}

//Pause
function pauseSong(){
  $player.classList.remove('play');
  $cover.classList.remove('active');
  $imgSrc.src = './img/play.png';
  $audio.pause();
}

//Stop
function stopSong() {
  $imgSrc.src = './img/play.png';
  $cover.classList.remove('active');
  $audio.pause();
  $audio.currentTime = 0;
}

$playBtn.addEventListener('click', function(){
  const isPlaying = $player.classList.contains('play');
  if(isPlaying){
    pauseSong();
  } else {
    playSong();
  }
});

$stopBtn.addEventListener('click', function(){
  stopSong();
});

//Format time
function formatTime( time ) {
  let minutes = Math.floor( time / 60 );
  let timeForSeconds = time - ( minutes * 60 );
  let seconds = Math.floor( timeForSeconds );
  let secondsReadable = seconds > 9 ? seconds : `0${seconds}`;
  return `${minutes}:${secondsReadable}`;
}

//progresbar 
function updateProgress(e) {
  const {duration, currentTime} = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  $progress.style.width = + progressPercent +'%';
  const minuteDuration = (duration / 60);

  document.querySelector('.current__song').innerHTML = formatTime(this.currentTime);
  document.querySelector('.end__song').innerHTML = formatTime(this.duration);;
}
$audio.addEventListener('timeupdate', updateProgress);

//Set progress
function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = $audio.duration;

  $audio.currentTime = (clickX / width) * duration;
}
$progressContainer.addEventListener('click', setProgress);

//End audio
$audio.addEventListener('ended', stopSong);
