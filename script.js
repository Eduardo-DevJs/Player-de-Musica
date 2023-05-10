const musicas = [
  {
    titulo: 'Dias de luta, Dias de gloria',
    artista: 'Charlie Bronw Jr.',
    src: 'musicas/Dias de luta dias de gloria.mp3',
  },
  {
    titulo: 'Como tudo Deve ser',
    artista: 'Charlie Bronw Jr.',
    src: 'musicas/Como Tudo deve ser.mp3',
  }
];

let musica = document.querySelector('audio');
let indexMusica = 1;

let duracaoMusica = document.querySelector('.final');
let nomeMusica = document.querySelector("[data-musica='nomeMusica']");
let nomeArtista = document.querySelector("[data-musica='artista']");

// eventos
document
  .querySelector('[data-botao="play"]')
  .addEventListener('click', playMusic);

document
  .querySelector('[data-botao="pause"]')
  .addEventListener('click', pauseMusic);

document
  .querySelector('[data-botao="proximo"]')
  .addEventListener('click', () => {
    indexMusica++;
    if (indexMusica > 1) {
      indexMusica = 0;
    }
    pauseMusic() 

    mostrarMusica(indexMusica);
  });

document
  .querySelector('[data-botao="anterior"]')
  .addEventListener('click', () => {
    indexMusica--;
    if (indexMusica < 2) {
      indexMusica = 0;
    }
    pauseMusic()

    mostrarMusica(indexMusica);
  });

  musica.addEventListener('timeupdate', atualizarTempoMusica)

// funcoes
function playMusic() {
  musica.play();
  document.querySelector('[data-botao="pause"]').style.display = 'block';
  document.querySelector('[data-botao="play"]').style.display = 'none';
}

function pauseMusic() {
  musica.pause();
  document.querySelector('[data-botao="pause"]').style.display = 'none';
  document.querySelector('[data-botao="play"]').style.display = 'block';
}

function mostrarMusica(index) {
  musica.setAttribute('src', musicas[index].src);
  musica.addEventListener('loadeddata', () => {
    nomeMusica.textContent = musicas[index].titulo;
    nomeArtista.textContent = musicas[index].artista;
    duracaoMusica.textContent = segundosParaMinutos(Math.floor(musica.duration))
  });
}

// progresso
function atualizarTempoMusica() {
  let progresso = document.querySelector('progress');
  progresso.style.width = Math.floor((musica.currentTime / musica.duration) * 100) + '%';
  let tempoInicio = document.querySelector('.inicio');
  tempoInicio.textContent = segundosParaMinutos(Math.floor(musica.currentTime));
}

function segundosParaMinutos(segundos) {
  let campoMinutos = Math.floor(segundos / 60);
  let campoSegundos = segundos % 60;
  if (campoSegundos < 10) {
    campoSegundos = '0' + campoSegundos;
  }

  return campoMinutos+':'+campoSegundos;
}

