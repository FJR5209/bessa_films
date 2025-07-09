const apiKey = 'AIzaSyBnrnqSHliKqCBRfEv1aG_SiCk0x1LXk6I';
const channelId = 'UCEX5aQ_LysDFtuuTN2b96gg'; // Canal Yuri Bessa

// Função para buscar vídeos do canal
async function fetchVideos() {
  // 1. Buscar os vídeos do canal (máx 20)
  const searchUrl = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=20&type=video`;
  const searchRes = await fetch(searchUrl);
  const searchData = await searchRes.json();
  const videoIds = searchData.items.map(item => item.id.videoId).join(',');

  // 2. Buscar detalhes dos vídeos
  const detailsUrl = `https://www.googleapis.com/youtube/v3/videos?key=${apiKey}&id=${videoIds}&part=player,snippet`;
  const detailsRes = await fetch(detailsUrl);
  const detailsData = await detailsRes.json();

  // 3. Separar vídeos verticais e horizontais
  const verticais = [];
  const horizontais = [];
  detailsData.items.forEach(item => {
    const match = item.player.embedHtml.match(/width="(\d+)" height="(\d+)"/);
    if (match) {
      const width = parseInt(match[1]);
      const height = parseInt(match[2]);
      if (height > width) {
        verticais.push(item);
      } else {
        horizontais.push(item);
      }
    }
  });
  return { verticais, horizontais };
}

// Função para renderizar vídeos em uma seção
function renderVideos(videos, containerId, vertical = false) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = '';
  videos.forEach(item => {
    const videoId = item.id;
    const title = item.snippet.title;
    // Sempre tenta maxresdefault, mas faz fallback para hqdefault se não carregar
    const thumbMax = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
    const thumbHQ = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
    const thumb = vertical ? thumbHQ : thumbMax;
    container.innerHTML += `
      <div class="video-thumbnail group${vertical ? ' aspect-[9/16]' : ''}">
        <a href="https://www.youtube.com/watch?v=${videoId}" target="_blank">
          <img src="${thumb}" alt="${title}" class="w-full h-full object-cover${vertical ? ' rounded-lg' : ''}" onerror="this.onerror=null;this.src='${thumbHQ}';">
          <div class="absolute inset-0 thumbnail-overlay flex flex-col justify-end p-4">
            <h4 class="font-bold text-lg">${title}</h4>
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
    // Buscar e separar vídeos
    const { verticais, horizontais } = await fetchVideos();
    // Renderizar seções
    renderVideos(horizontais, 'youtube-horizontais', false);
    renderVideos(verticais, 'youtube-verticais', true);
  } catch (e) {
    document.getElementById('youtube-horizontais').innerHTML = '<div class="col-span-4 text-center text-red-500">Erro ao buscar vídeos horizontais.</div>';
    document.getElementById('youtube-verticais').innerHTML = '<div class="col-span-4 text-center text-red-500">Erro ao buscar vídeos verticais.</div>';
  }
}); 