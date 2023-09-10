import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('#vimeo-player');
const player = new Player(iframe);

const saveTimeToLocalStorage = throttle(data => {
  const currentTime = data.seconds;
  //console.log(currentTime);
  localStorage.setItem('videoplayer-current-time', currentTime.toString());
}, 1000);

player.on('timeupdate', saveTimeToLocalStorage);

function setTime() {
  const savedTime = localStorage.getItem('videoplayer-current-time');
  if (savedTime) {
    //console.log(savedTime);
    player.setCurrentTime(parseFloat(savedTime));
  }
}

document.addEventListener('DOMContentLoaded', setTime);
