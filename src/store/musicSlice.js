import { createSlice } from '@reduxjs/toolkit';

const musicSlice = createSlice({
  name: 'music',
  initialState: {
    availableMusicArr: [],
    availableMusicCategoryArr: [],
    currentMusic: null,
    shuffledMusicArr: [],
    musicPlaying: false,
    musicVolume: 0.5,
    shuffleMusic: false,
    loopMusic: false,
    musicCategory: null,
    favouriteMusicIdArr: [],
    playFromPlaylist: false,
    currentMoodId: null,
  },
  reducers: {
    changeMusicHandler(state, action) {
      if (state.currentMusic.id !== action.payload) {
        if (state.shuffleMusic) {
          state.shuffledMusicArr = [];
        }

        state.currentMusic = state.availableMusicArr.find((music) => music.id === action.payload);
        state.musicPlaying = true;
      } else {
        state.musicPlaying = true;
      }
    },
    setInitialMusic(state, action) {
      const initialMusic = state.availableMusicArr.find((music) => music.id === action.payload);

      if (initialMusic) {
        state.currentMusic = initialMusic;

        if (initialMusic.isMood) {
          state.currentMoodId = initialMusic.id;
        }
      }
    },
    toggleMusicPlayPause(state, action) {
      state.musicPlaying = !state.musicPlaying;
    },
    setMusicVolume(state, action) {
      state.musicVolume = action.payload;
    },
    backMusicHandler(state, action) {
      let availableMusicArr = [...state.availableMusicArr];

      if (state.currentMoodId) {
        availableMusicArr = availableMusicArr.filter((music) => music.isMood);
      } else {
        if (state.musicCategory) {
          availableMusicArr = availableMusicArr.filter((music) => music.category === state.musicCategory);
        }

        if (state.playFromPlaylist && state.favouriteMusicIdArr.length > 0) {
          availableMusicArr = state.favouriteMusicIdArr.map((id) => state.availableMusicArr.find((music) => music.id === id));
        }
      }

      if (availableMusicArr.length === 1) {
        state.loopMusic = true;
      }

      if (!state.shuffleMusic) {
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
          const currentMusicIndex = availableMusicArr.findIndex((music) => music.id === state.currentMusic.id);
          availableMusicArr.splice(currentMusicIndex, 1);
          const randomMusic = availableMusicArr[Math.floor(Math.random() * availableMusicArr.length)];
          state.currentMusic = randomMusic;
        }
      }
      state.musicPlaying = true;
    },
    nextMusicHandler(state, action) {
      let availableMusicArr = [...state.availableMusicArr];

      if (state.currentMoodId) {
        availableMusicArr = availableMusicArr.filter((music) => music.isMood);
      } else {
        if (state.musicCategory) {
          availableMusicArr = availableMusicArr.filter((music) => music.category === state.musicCategory);
        }

        if (state.playFromPlaylist && state.favouriteMusicIdArr.length > 0) {
          availableMusicArr = state.favouriteMusicIdArr.map((id) => state.availableMusicArr.find((music) => music.id === id));
        }
      }

      if (availableMusicArr.length === 1) {
        state.loopMusic = true;
      }

      if (!state.shuffleMusic) {
        const currentMusicIndex = availableMusicArr.findIndex((music) => music.id === state.currentMusic.id);
        if (currentMusicIndex < availableMusicArr.length - 1) {
          state.currentMusic = availableMusicArr[currentMusicIndex + 1];
        } else {
          state.currentMusic = availableMusicArr[0];
        }
      } else {
        let shuffledMusicArr = state.shuffledMusicArr;
        if (shuffledMusicArr.length === availableMusicArr.length) {
          shuffledMusicArr = [];
        }
        const notShuffledMusicArr = [];
        availableMusicArr.forEach((music) => {
          const indexInShuffled = shuffledMusicArr.findIndex((shuffledMusic) => shuffledMusic.id === music.id);
          if (indexInShuffled === -1) {
            notShuffledMusicArr.push(music);
          }
        });
        const randomMusic = notShuffledMusicArr[Math.floor(Math.random() * notShuffledMusicArr.length)];
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
    setAvailableMusicArr(state, action) {
      state.availableMusicArr = action.payload;
      state.currentMusic = action.payload.find((music) => music.id === 4);
    },
    setMusicCategory(state, action) {
      const category = action.payload;
      if (category) {
        state.musicCategory = category;
        state.playFromPlaylist = false;
        state.currentMoodId = null;
      }
    },
    favouriteBtnClickHandler(state, action) {
      const favouriteMusicIdArr = state.favouriteMusicIdArr;
      const clickedId = action.payload;
      if (favouriteMusicIdArr.includes(clickedId)) {
        state.favouriteMusicIdArr = favouriteMusicIdArr.filter((id) => id !== clickedId);
      } else {
        state.favouriteMusicIdArr = [...favouriteMusicIdArr, clickedId];
      }
    },
    setFavouriteMusicIdArr(state, action) {
      state.favouriteMusicIdArr = action.payload;
    },
    setPlayFromPlaylist(state, action) {
      const playFromPlaylist = action.payload;
      if (playFromPlaylist) {
        state.playFromPlaylist = playFromPlaylist;
        state.musicCategory = null;
        state.currentMoodId = null;
      }
    },
    moodSelectHandler(state, action) {
      if (state.currentMoodId !== action.payload) {
        state.loopMusic = false;
        state.shuffleMusic = false;
        state.playFromPlaylist = false;
        state.musicCategory = null;

        state.currentMusic = state.availableMusicArr.find((music) => music.id === action.payload);
        state.currentMoodId = action.payload;
        state.musicPlaying = true;
      } else {
        state.musicPlaying = true;
      }
    },
    setAvailableMusicCategory(state, action) {
      state.availableMusicCategoryArr = action.payload;
    },
  },
});

export const musicActions = musicSlice.actions;
export default musicSlice.reducer;
