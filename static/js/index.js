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
                        fileStatus.style.color = '#4ade80';
                        
                        // Reset the game state
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
            
            for (let line of lines) {
                const parts = line.split(',').map(part => part.trim());
                if (parts.length >= 3) {
                    songs.push({
                        name: parts[0],
                        id: parts[1],
                        link: parts[2]
                    });
                }
            }
        }

        function generateRandomSong() {
            if (isGenerating) return;
            if (songs.length === 0) {
                showError('Carica prima un file con le canzoni!');
                return;
            }

            if (usedSongs.length >= songs.length) {
                showError();
                return;
            }

            isGenerating = true;
            const button = document.getElementById('generateButton');
            const originalText = button.textContent;
            
            // Animation during generation
            button.innerHTML = '<div class="loading"></div> Generando...';
            button.disabled = true;

            setTimeout(() => {
                const availableSongs = songs.filter(song => !usedSongs.includes(song));
                let randomSong;
                
                // Ensure we don't get the same song twice in a row
                do {
                    randomSong = availableSongs[Math.floor(Math.random() * availableSongs.length)];
                } while (randomSong === currentSong && availableSongs.length > 1);

                currentSong = randomSong;
                usedSongs.push(randomSong);
                
                displaySong(randomSong);
                
                button.textContent = originalText;
                button.disabled = false;
                isGenerating = false;
                
                // Add success animation
                document.querySelector('.song-display').classList.add('success-animation');
                setTimeout(() => {
                    document.querySelector('.song-display').classList.remove('success-animation');
                }, 600);
                
            }, 1500); // Dramatic pause for effect
        }

        function displaySong(song) {
            document.getElementById('songName').value = song.name;
            document.getElementById('songId').value = song.id;
            document.getElementById('songLink').value = song.link;
            
            hideError();
        }

        function clearSongDisplay() {
            document.getElementById('songName').value = '';
            document.getElementById('songId').value = '';
            document.getElementById('songLink').value = '';
        }

        function removeSong() {
            if (!currentSong) {
                showError('Nessuna canzone da rimuovere!');
                return;
            }

            // Remove from original songs array
            songs = songs.filter(song => song !== currentSong);
            
            // Remove from used songs array
            usedSongs = usedSongs.filter(song => song !== currentSong);
            
            clearSongDisplay();
            currentSong = null;
            
            // Update file status
            const fileStatus = document.getElementById('fileStatus');
            fileStatus.textContent = `${songs.length} canzoni rimanenti`;
            
            // Show success feedback
            const miniBox = event.target.closest('.mini-box');
            const originalContent = miniBox.innerHTML;
            miniBox.innerHTML = '<div>✅ Rimossa!</div>';
            setTimeout(() => {
                miniBox.innerHTML = originalContent;
            }, 1500);
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

        // Add some dynamic particle movement
        setInterval(() => {
            const particles = document.querySelectorAll('.particle');
            particles.forEach(particle => {
                const randomX = Math.random() * 100;
                const randomY = Math.random() * 100;
                particle.style.left = randomX + '%';
                particle.style.top = randomY + '%';
            });
        }, 8000);

        // Reset game when error message is clicked
        document.getElementById('errorMessage').addEventListener('click', function() {
            if (this.textContent.includes('terminate')) {
                usedSongs = [];
                currentSong = null;
                clearSongDisplay();
                hideError();
            }
        });