
function filterGames(category) {
  const games = document.querySelectorAll('.game-card');
  let hasGames = false;

  games.forEach(game => {
    if (category === 'all' || game.classList.contains(category)) {
      game.style.display = 'block';
      hasGames = true;
    } else {
      game.style.display = 'none';
    }
  });

  const noGamesMessage = document.getElementById('noGamesMessage');
  if (hasGames) {
    noGamesMessage.classList.add('hidden');
  } else {
    noGamesMessage.classList.remove('hidden');
  }
}



function searchGames() {
  const searchValue = document.getElementById('searchInput').value.toLowerCase();
  const games = document.querySelectorAll('.game-card');
  let hasGames = false;

  games.forEach(game => {
    const title = game.querySelector('span').textContent.toLowerCase();
    if (title.includes(searchValue)) {
      game.style.display = 'block';
      hasGames = true;
    } else {
      game.style.display = 'none';
    }
  });

  document.getElementById('noGamesMessage').classList.toggle('hidden', hasGames);
}



function openGame(url, title, rating) {
  localStorage.setItem('gameUrl', url);  
  localStorage.setItem('gameTitle', title);  
  localStorage.setItem('gameRating', rating);  
  location.href = 'cover.html';  
}


const gameUrl = localStorage.getItem('gameUrl');
const gameTitle = localStorage.getItem('gameTitle');
const gameRating = localStorage.getItem('gameRating');


document.getElementById('mainGame').src = gameUrl;
document.getElementById('gameTitle').innerText = gameTitle;


function generateStars(rating) {
  const starRatingContainer = document.getElementById('starRating');
  starRatingContainer.innerHTML = ''; 


  const fullStars = Math.floor(rating);
  
  const halfStar = (rating - fullStars) >= 0.5 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStar;

  
  for (let i = 0; i < fullStars; i++) {
      const star = document.createElement('span');
      star.textContent = '★'; 
      star.classList.add('star', 'full');
      starRatingContainer.appendChild(star);
  }

  
  if (halfStar) {
      const star = document.createElement('span');
      star.textContent = '★'; 
      star.classList.add('star', 'half');
      starRatingContainer.appendChild(star);
  }


  for (let i = 0; i < emptyStars; i++) {
      const star = document.createElement('span');
      star.textContent = '☆'; 
      star.classList.add('star', 'empty');
      starRatingContainer.appendChild(star);
  }
}



generateStars(gameRating);


function toggleLike() {
  const likeButton = document.getElementById('likeButton');
  if (likeButton.classList.contains('text-red-500')) {
    likeButton.classList.remove('text-red-500');
    likeButton.classList.add('hover:bg-red-500', 'hover:text-white');
  } else {
    likeButton.classList.remove('hover:bg-red-500', 'hover:text-white');
    likeButton.classList.add('text-red-500');
  }
}


function shareGame() {
  alert('Sharing game...');

}

function toggleFullscreen() {
  const iframe = document.getElementById('mainGame');
  if (iframe.requestFullscreen) {
    iframe.requestFullscreen();
  } else if (iframe.mozRequestFullScreen) { 
    iframe.mozRequestFullScreen();
  } else if (iframe.webkitRequestFullscreen) { 
    iframe.webkitRequestFullscreen();
  } else if (iframe.msRequestFullscreen) { 
    iframe.msRequestFullscreen();
  }
}

function closeGame() {
  location.href = 'main.html'; 
}

document.querySelectorAll('.group').forEach((card) => {
  const video = card.querySelector('.game-video');

  card.addEventListener('mouseenter', () => {
      if (video) {
          video.playbackRate = 1.5; 
      }
  });

  // Reset video on hover out
  card.addEventListener('mouseleave', () => {
      if (video) {
          video.currentTime = 0; 
          video.playbackRate = 2.0; 
      }
  });
});