<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a id="readme-top"></a>
<!--
*** Thanks for checking out the PatAnt - Riso e Cozze project.
*** If you have any suggestions to improve the project or this README, feel free to fork the repo and create a pull request,
*** or simply open an issue with your ideas. Enjoy the music shuffle!
-->

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://rubenbavaro.github.io/PatAnt-Riso-e-Cozze/">
    <img src="static/img/cd.gif" alt="CD Logo" width="80" height="80">
  </a>

  <h3 align="center">🎵 PatAnt - Riso e Cozze</h3>

  <p align="center">
    A fun and dynamic music shuffler app that lets you randomly extract songs from a custom list!
    <br />
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#about-the-project">About The Project</a></li>
    <li><a href="#features">Features</a></li>
    <li><a href="#how-to-use">How To Use</a></li>
    <li><a href="#built-with">Built With</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## About The Project

**PatAnt - Riso e Cozze** is a playful web application that allows users to upload a custom list of songs and randomly extract them one at a time. Designed for casual listening sessions, game nights, or creative teaching moments, the app guarantees no duplicates in a row and lets you know when the song list is fully consumed.

<!-- FEATURES -->
## Features

- Upload a `.txt` or `.csv` file containing songs (with name, ID, and link).
- Randomly extract a song and view its:
  - 🎵 **Name**
  - 🆔 **ID**
  - 🔗 **Link**
- Prevents repeating the same song twice in a row.
- Displays a friendly message when all songs have been used: _"Canzoni terminate!"_
- Interactive modal to remove songs manually.
- Animated particle background for an aesthetic vibe.

<!-- HOW TO USE -->
## How To Use

1. **Open the App:**  
   Visit [https://rubenbavaro.github.io/PatAnt-Riso-e-Cozze/](https://rubenbavaro.github.io/PatAnt-Riso-e-Cozze/)

2. **Upload a Song List File:**  
   - Click **"📁 Carica lista"**
   - Choose a `.txt` or `.csv` file containing songs formatted like:
     ```
     <Nome: Song Title
     Link: https://example.com
     ID: 1234>
     ```

3. **Generate a Song:**  
   - Click the button **"🎲 Genera canzone randomica"** to extract a song at random.

4. **View and Interact:**  
   - The selected song’s details will be shown in the form.
   - Click the link to open it in a new tab.
   - Use **"🗑️ Rimuovi Brano"** to manage songs manually.

5. **Reset:**  
   - When the message “Canzoni terminate!” appears, click it to restart the session.

<!-- BUILT WITH -->
## Built With

This project is built using:
* **HTML** – For structuring the interface.
* **CSS** – For the stylish and animated layout, including glassmorphism effects and background particles.
* **JavaScript** – For file parsing, logic control, animations, and DOM manipulation.

<!-- BUILT BY -->
## Built BY

This project was built by the following students:
* **RUBEN BAVARO** – https://github.com/RubenBavaro.
* **RAFFAELE AURIOLE** – https://github.com/RaffaeleeAuriole.
