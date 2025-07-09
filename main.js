const apiKey = 'AIzaSyBod3ZsIk3E-2O_Kj5fkIMBp6Vbn_5o8eQ';
const channelId = 'UCEX5aQ_LysDFtuuTN2b96gg'; // Canal Yuri Bessa

// Função para buscar vídeos do canal via RSS2JSON
async function fetchVideosRSS() {
  const channelId = 'UCEX5aQ_LysDFtuuTN2b96gg'; // Seu canal
  const feedUrl = `https://api.rss2json.com/v1/api.json?rss_url=https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;
  const res = await fetch(feedUrl);
  const data = await res.json();
  return data.items || [];
}

// Função para renderizar vídeos em uma seção
function renderVideosRSS(videos, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = '';
  videos.slice(0, 8).forEach(item => {
    const videoId = item.link.split('v=')[1];
    container.innerHTML += `
      <div class="video-thumbnail group">
        <a href="${item.link}" target="_blank">
          <img src="https://img.youtube.com/vi/${videoId}/maxresdefault.jpg" alt="${item.title}" class="w-full h-full object-cover" onerror="this.onerror=null;this.src='https://img.youtube.com/vi/${videoId}/hqdefault.jpg';">
          <div class="absolute inset-0 thumbnail-overlay flex flex-col justify-end p-4">
            <h4 class="font-bold text-lg">${item.title}</h4>
          </div>
          <i class="fas fa-play play-icon"></i>
        </a>
      </div>
    `;
  });
}

// Inicialização
window.addEventListener('DOMContentLoaded', async () => {
  try {
    const videos = await fetchVideosRSS();
    renderVideosRSS(videos, 'youtube-horizontais');
  } catch (e) {
    document.getElementById('youtube-horizontais').innerHTML = '<div class="col-span-4 text-center text-red-500">Erro ao buscar vídeos do canal.</div>';
  }
}); 