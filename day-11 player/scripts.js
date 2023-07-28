const player=document.querySelector(".player")
const video=player.querySelector(".viewer")
const progress=player.querySelector('.progress')
const progressBar=player.querySelector('.progress__filled')
const toggle=player.querySelector('.toggle')
const skipButtons=player.querySelectorAll('[data-skip]')
const ranges=player.querySelectorAll('.player__slider')


function togglePlay(){
    video[video.paused? 'play' : 'pause']();
}

function updateButton() {
  const icon = this.paused ? '►' : '❚ ❚';
  toggle.textContent = icon;
}


function skip(){
  video.currentTime+=parseFloat(this.dataset.skip)
}

function updateRanges(){
  video[this.name]=this.value
}
function updateProgressBar(){
  const per= (video.currentTime/video.duration)*100;
  progressBar.style.flexBasis=`${per}%`;
}
function scrub(e){
  const scrubtime=(e.offsetX/progress.offsetWidth)* video.duration;
  video.currentTime=scrubtime;
}
video.addEventListener('click',togglePlay)
video.addEventListener('play',updateButton)
video.addEventListener('pause',updateButton)
video.addEventListener('timeupdate',updateProgressBar)
toggle.addEventListener('click',togglePlay)
skipButtons.forEach(buttons => buttons.addEventListener('click',skip));
ranges.forEach(range => range.addEventListener('change',updateRanges));
ranges.forEach(range => range.addEventListener('mousemove',updateRanges));
progress.addEventListener('click',scrub)
let mousedown=false;
progress.addEventListener('mousedown',()=> mousedown=true)
progress.addEventListener('mouseup',()=> mousedown=false)
progress.addEventListener('mousemove',(e)=> mousedown && scrub(e))