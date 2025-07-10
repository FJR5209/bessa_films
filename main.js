// Arquivo JavaScript principal para Fredson Films
// Aqui você pode adicionar funcionalidades específicas para o portfólio

// Função para inicializar funcionalidades quando a página carregar
window.addEventListener('DOMContentLoaded', () => {
    console.log('Fredson Films - Portfólio carregado com sucesso!');
    
    // Aqui você pode adicionar funcionalidades específicas
    // como animações, interações, etc.
});

// Função para adicionar vídeos verticais dinamicamente (opcional)
function addVerticalVideo(containerId, videoData) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    const videoElement = document.createElement('div');
    videoElement.className = 'video-thumbnail group aspect-[9/16]';
    videoElement.innerHTML = `
        <a href="${videoData.link}" target="_blank">
            <img src="${videoData.thumbnail}" alt="${videoData.title}" class="w-full h-full object-cover rounded-lg">
            <div class="absolute inset-0 thumbnail-overlay flex flex-col justify-end p-4">
                <h4 class="font-bold text-lg">${videoData.title}</h4>
            </div>
            <i class="fas fa-play play-icon"></i>
        </a>
    `;
    
    container.appendChild(videoElement);
}

// Exemplo de como usar a função addVerticalVideo:
// addVerticalVideo('instagram-verticais', {
//     link: 'https://www.instagram.com/reel/SEU_REEL_ID/',
//     thumbnail: 'assets/imagens/seu-thumbnail.jpg',
//     title: 'Título do Vídeo'
// });