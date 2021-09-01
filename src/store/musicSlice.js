import { createSlice } from '@reduxjs/toolkit';

const musicSlice = createSlice({
  name: 'music',
  initialState: {
    availableMusicArr: [
      {
        id: '1',
        musicName: 'music name',
        artistName: 'artist name',
        filePath: 'music/Music_test_#1_Mitsuha.mp3',
        thumbnailFilePath: 'music/Music_tn_#1.jpg',
      },
      {
        id: '2',
        musicName: 'music name',
        artistName: 'artist name',
        filePath: 'music/Music_test_#2_A_Tender_Feeling.mp3',
        thumbnailFilePath: 'music/Music_tn_#2.jpg',
      },
      {
        id: '3',
        musicName: 'music name',
        artistName: 'artist name',
        filePath: 'music/Music_test_#3_Whisper.mp3',
        thumbnailFilePath: 'music/Music_tn_#3.jpg',
      },
      {
        id: '4',
        musicName: 'music name',
        artistName: 'artist name',
        filePath: 'music/Music_test_#4_Sweetbitter.mp3',
        thumbnailFilePath: 'music/Music_tn_#4.jpg',
      },
      {
        id: '5',
        musicName: 'music name',
        artistName: 'artist name',
        filePath: 'music/Davy Jones.mp3',
        thumbnailFilePath: 'music/Davy Jones.jpg',
      },
      {
        id: '6',
        musicName: 'music name',
        artistName: 'artist name',
        filePath: 'music/Laputa.mp3',
        thumbnailFilePath: 'music/Laputa.jpg',
      },
      {
        id: '7',
        musicName: 'music name',
        artistName: 'artist name',
        filePath: 'music/soma.mp3',
        thumbnailFilePath: 'music/soma.jpg',
      },
      {
        id: '8',
        musicName: 'music name',
        artistName: 'artist name',
        filePath: 'music/Spirited Away.mp3',
        thumbnailFilePath: 'music/Spirited Away.jpg',
      },
      {
        id: '9',
        musicName: 'music name',
        artistName: 'artist name',
        filePath: 'music/anything.mp3',
        thumbnailFilePath: 'music/anything.jpg',
      },
      {
        id: '10',
        musicName: 'music name',
        artistName: 'artist name',
        filePath: 'music/Fireworks Festival.mp3',
        thumbnailFilePath: 'music/Fireworks Festival.jpg',
      },
      {
        id: '11',
        musicName: 'music name',
        artistName: 'artist name',
        filePath: 'music/Nausicaa.mp3',
        thumbnailFilePath: 'music/Nausicaa.jpg',
      },
      {
        id: '12',
        musicName: 'music name',
        artistName: 'artist name',
        filePath: 'music/Promised Neverland.mp3',
        thumbnailFilePath: 'music/Promised Neverland.jpg',
      },
    ],
    currentMusic: {
      id: '1',
      musicName: 'music name',
      artistName: 'artist name',
      filePath: 'music/Music_test_#1_Mitsuha.mp3',
      thumbnailFilePath: 'music/Music_tn_#1.jpg',
    },
    shuffledMusicArr: [],
    musicPlaying: false,
    musicVolume: 0.5,
    shuffleMusic: false,
    loopMusic: false,
  },
  reducers: {
    changeMusicHandler(state, action) {
      if (state.currentMusic.id !== action.payload.id) {
        if (state.shuffleMusic) {
          state.shuffledMusicArr = [];
        }
        state.currentMusic = action.payload;
        state.musicPlaying = true;
      } else {
        state.musicPlaying = true;
      }
    },
    toggleMusicPlayPause(state, action) {
      state.musicPlaying = !state.musicPlaying;
    },
    setMusicVolume(state, action) {
      state.musicVolume = action.payload;
    },
    backMusicHandler(state, action) {
      if (!state.shuffleMusic) {
        const availableMusicArr = state.availableMusicArr;
        const currentMusicIndex = availableMusicArr.findIndex((music) => music.id === state.currentMusic.id);
        if (currentMusicIndex === 0) {
          state.currentMusic = availableMusicArr[availableMusicArr.length - 1];
        } else {
          state.currentMusic = availableMusicArr[currentMusicIndex - 1];
        }
      } else {
        if (state.shuffledMusicArr.length > 1) {
          const shuffledMusicArr = [...state.shuffledMusicArr];
          shuffledMusicArr.pop();
          const previousMusic = shuffledMusicArr.pop();
          shuffledMusicArr.push(previousMusic);
          state.currentMusic = previousMusic;
          state.shuffledMusicArr = shuffledMusicArr;
        } else {
          const availableMusicArr = [...state.availableMusicArr];
          const currentMusicIndex = availableMusicArr.findIndex((music) => music.id === state.currentMusic.id);
          availableMusicArr.splice(currentMusicIndex, 1);
          const randomMusic = availableMusicArr[Math.floor(Math.random() * availableMusicArr.length)];
          state.currentMusic = randomMusic;
        }
      }
      state.musicPlaying = true;
    },
    nextMusicHandler(state, action) {
      if (!state.shuffleMusic) {
        const availableMusicArr = state.availableMusicArr;
        const currentMusicIndex = availableMusicArr.findIndex((music) => music.id === state.currentMusic.id);
        if (currentMusicIndex < availableMusicArr.length - 1) {
          state.currentMusic = availableMusicArr[currentMusicIndex + 1];
        } else {
          state.currentMusic = availableMusicArr[0];
        }
      } else {
        let shuffledMusicArr = state.shuffledMusicArr;
        if (shuffledMusicArr.length === state.availableMusicArr.length) {
          shuffledMusicArr = [];
        }
        const availableMusicArr = [];
        state.availableMusicArr.forEach((music) => {
          const indexInShuffled = shuffledMusicArr.findIndex((shuffledMusic) => shuffledMusic.id === music.id);
          if (indexInShuffled === -1) {
            availableMusicArr.push(music);
          }
        });
        const randomMusic = availableMusicArr[Math.floor(Math.random() * availableMusicArr.length)];
        state.currentMusic = randomMusic;
        shuffledMusicArr.push(randomMusic);
        state.shuffledMusicArr = shuffledMusicArr;
      }
      state.musicPlaying = true;
    },
    toggleShuffleMusic(state, action) {
      state.shuffleMusic = !state.shuffleMusic;
      if (state.shuffleMusic) {
        state.loopMusic = false;
        state.shuffledMusicArr = [state.currentMusic];
      } else {
        state.shuffledMusicArr = [];
      }
    },
    toggleLoopMusic(state, action) {
      state.loopMusic = !state.loopMusic;
      if (state.loopMusic) {
        state.shuffleMusic = false;
        state.shuffledMusicArr = [];
      }
    },
    setMusicPlaying(state, action) {
      state.musicPlaying = action.payload;
    },
  },
});

export const musicActions = musicSlice.actions;
export default musicSlice.reducer;
