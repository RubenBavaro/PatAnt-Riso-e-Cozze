let songs = [];
let usedSongs = [];
let currentSong = null;
let isGenerating = false;

function loadFile() {
    document.getElementById('fileInput').click();
}

function handleFileLoad(event) {
    const file = event.target.files[0];
    if (!file) return;

    const loadText = document.getElementById('loadText');
    const fileStatus = document.getElementById('fileStatus');
    
    loadText.innerHTML = '<div class="loading"></div> Caricamento...';
    
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const content = e.target.result;
            parseSongs(content);
            
            setTimeout(() => {
                loadText.innerHTML = '✅ File caricato';
                fileStatus.textContent = `${songs.length} canzoni caricate`;
                fileStatus.style.color = '#005920';
                
                usedSongs = [];
                currentSong = null;
                clearSongDisplay();
                hideError();
            }, 1000);
        } catch (error) {
            setTimeout(() => {
                loadText.innerHTML = '❌ Errore';
                fileStatus.textContent = 'Errore nel caricamento del file';
                fileStatus.style.color = '#ef4444';
            }, 1000);
        }
    };
    reader.readAsText(file);
}

function parseSongs(content) {
    songs = [];
    const lines = content.split('\n').filter(line => line.trim());
    
    let currentSong = {};
    
    for (let line of lines) {
        line = line.trim();
        
        if (line.startsWith('#') || line === '') continue;
        
        if (line.startsWith('<Nome:')) {
            currentSong = {};
            const nameMatch = line.match(/^<Nome:\s*(.+)$/);
            if (nameMatch) {
                currentSong.nome = nameMatch[1].trim();
            }
        } else if (line.startsWith('Link:')) {
            const linkMatch = line.match(/^Link:\s*(.+)$/);
            if (linkMatch) {
                currentSong.link = linkMatch[1].trim();
            }
        } else if (line.startsWith('ID:') && line.endsWith('>')) {
            const idMatch = line.match(/^ID:\s*(\d+)>$/);
            if (idMatch) {
                currentSong.id = idMatch[1].trim();
                
                if (currentSong.nome && currentSong.link && currentSong.id) {
                    songs.push({
                        nome: currentSong.nome,
                        id: currentSong.id,
                        link: currentSong.link
                    });
                }
            }
        }
    }
}

function generateRandomSong() {
    if (isGenerating) return;
    if (songs.length === 0) {
        showError('Carica prima un file con le canzoni!');
        return;
    }

    if (songs.length === 0) {
        showError();
        return;
    }

    isGenerating = true;
    const button = document.getElementById('generateButton');
    const originalText = button.textContent;
    
    button.innerHTML = '<div class="loading"></div> Generando...';
    button.disabled = true;

    setTimeout(() => {
        let randomSong;
        do {
            randomSong = songs[Math.floor(Math.random() * songs.length)];
        } while (randomSong === currentSong && songs.length > 1);

        currentSong = randomSong;
        
        displaySong(randomSong);
        
        songs = songs.filter(song => song !== randomSong);
        
        const fileStatus = document.getElementById('fileStatus');
        fileStatus.textContent = `${songs.length} canzoni rimanenti`;
        
        button.textContent = originalText;
        button.disabled = false;
        isGenerating = false;
        
        document.querySelector('.song-display').classList.add('success-animation');
        setTimeout(() => {
            document.querySelector('.song-display').classList.remove('success-animation');
        }, 600);
        
        if (songs.length === 0) {
            showError();
        }
        
    }, 1500); 
}

function displaySong(song) {
    document.getElementById('songName').value = song.nome;
    document.getElementById('songId').value = song.id;
    
    const linkInput = document.getElementById('songLink');
    linkInput.value = song.link;
    
    linkInput.style.cursor = 'pointer';
    linkInput.style.color = '#60a5fa';
    linkInput.style.textDecoration = 'underline';
    
    linkInput.replaceWith(linkInput.cloneNode(true));
    const newLinkInput = document.getElementById('songLink');
    
    newLinkInput.addEventListener('click', function() {
        if (this.value && this.value.trim() !== '') {
            window.open(this.value, '_blank');
        }
    });
    
    newLinkInput.addEventListener('mouseenter', function() {
        this.style.backgroundColor = 'rgba(96, 165, 250, 0.1)';
    });
    
    newLinkInput.addEventListener('mouseleave', function() {
        this.style.backgroundColor = '';
    });
    
    hideError();
}

function clearSongDisplay() {
    document.getElementById('songName').value = '';
    document.getElementById('songId').value = '';
    
    const linkInput = document.getElementById('songLink');
    linkInput.value = '';
    
    linkInput.style.cursor = 'default';
    linkInput.style.color = '';
    linkInput.style.textDecoration = 'none';
    linkInput.style.backgroundColor = '';
    
    linkInput.replaceWith(linkInput.cloneNode(true));
}

function removeSong() {
    if (songs.length === 0) {
        showError('Nessuna canzone disponibile da rimuovere!');
        return;
    }

    showSongList();
}

function showSongList() {
    const existingModal = document.getElementById('songListModal');
    if (existingModal) {
        existingModal.remove();
    }

    const modal = document.createElement('div');
    modal.id = 'songListModal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
        backdrop-filter: blur(5px);
    `;

    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 15px;
        padding: 20px;
        max-width: 600px;
        max-height: 70vh;
        overflow-y: auto;
        backdrop-filter: blur(10px);
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
    `;

    const title = document.createElement('h3');
    title.textContent = `Lista Canzoni (${songs.length} disponibili)`;
    title.style.cssText = `
        color: white;
        text-align: center;
        margin-bottom: 20px;
        font-family: 'Nova Flat', cursive;
    `;

    const songList = document.createElement('div');
    songList.style.cssText = `
        max-height: 400px;
        overflow-y: auto;
        margin-bottom: 20px;
    `;

    songs.forEach((song, index) => {
        const songItem = document.createElement('div');
        songItem.style.cssText = `
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 10px;
            padding: 10px;
            margin: 10px 0;
            color: white;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            justify-content: space-between;
            align-items: center;
        `;

        songItem.innerHTML = `
            <div>
                <div style="font-weight: bold; margin-bottom: 5px;">${song.nome}</div>
                <div style="font-size: 0.8em; opacity: 0.7;">ID: ${song.id}</div>
            </div>
            <button style="
                background: #ef4444;
                color: white;
                border: none;
                border-radius: 5px;
                padding: 5px 10px;
                cursor: pointer;
                font-size: 0.8em;
            ">🗑️ Rimuovi</button>
        `;

        songItem.addEventListener('mouseenter', () => {
            songItem.style.background = 'rgba(255, 255, 255, 0.2)';
        });

        songItem.addEventListener('mouseleave', () => {
            songItem.style.background = 'rgba(255, 255, 255, 0.1)';
        });

        const removeBtn = songItem.querySelector('button');
        removeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            removeSongFromList(song, songItem, modal);
        });

        songList.appendChild(songItem);
    });

    const closeButton = document.createElement('button');
    closeButton.textContent = 'Chiudi';
    closeButton.style.cssText = `
        background: rgba(255, 255, 255, 0.2);
        color: white;
        border: 1px solid rgba(255, 255, 255, 0.3);
        border-radius: 10px;
        padding: 10px 20px;
        cursor: pointer;
        display: block;
        margin: 0 auto;
        font-family: 'Nova Flat', cursive;
    `;

    closeButton.addEventListener('click', () => {
        modal.remove();
    });

    modalContent.appendChild(title);
    modalContent.appendChild(songList);
    modalContent.appendChild(closeButton);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

function removeSongFromList(songToRemove, songElement, modal) {
    songs = songs.filter(song => song !== songToRemove);
    
    const fileStatus = document.getElementById('fileStatus');
    fileStatus.textContent = `${songs.length} canzoni rimanenti`;
    
    songElement.style.cssText += `
        transform: translateX(100%);
        opacity: 0;
        transition: all 0.3s ease;
    `;
    
    setTimeout(() => {
        songElement.remove();
        
        const title = modal.querySelector('h3');
        title.textContent = `Lista Canzoni (${songs.length} disponibili)`;
        
        if (songs.length === 0) {
            modal.remove();
            showError('Tutte le canzoni sono state rimosse!');
            clearSongDisplay();
            currentSong = null;
        }
    }, 300);
}

function showError(customMessage = null) {
    const errorElement = document.getElementById('errorMessage');
    if (customMessage) {
        errorElement.textContent = customMessage;
    }
    errorElement.style.display = 'block';
    
    setTimeout(() => {
        if (!customMessage) {
            hideError();
        }
    }, 5000);
}

function hideError() {
    document.getElementById('errorMessage').style.display = 'none';
}

setInterval(() => {
    const particles = document.querySelectorAll('.particle');
    particles.forEach(particle => {
        const randomX = Math.random() * 100;
        const randomY = Math.random() * 100;
        particle.style.left = randomX + '%';
        particle.style.top = randomY + '%';
    });
}, 8000);

document.getElementById('errorMessage').addEventListener('click', function() {
    if (this.textContent.includes('terminate')) {
        usedSongs = [];
        currentSong = null;
        clearSongDisplay();
        hideError();
    }
});