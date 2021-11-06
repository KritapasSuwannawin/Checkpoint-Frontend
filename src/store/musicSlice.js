import { createSlice } from '@reduxjs/toolkit';

const musicSlice = createSlice({
  name: 'music',
  initialState: {
    availableMusicArr: [],
    currentMusic: null,
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

        const newMusic = state.availableMusicArr.find((music) => music.id === action.payload.id);
        state.currentMusic = newMusic;
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
    setAvailableMusic(state, action) {
      state.availableMusicArr = action.payload;
      state.currentMusic = action.payload[0];
    },
  },
});

export const musicActions = musicSlice.actions;
export default musicSlice.reducer;
