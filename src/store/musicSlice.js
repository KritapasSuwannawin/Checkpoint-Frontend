import { createSlice } from '@reduxjs/toolkit';

const musicSlice = createSlice({
  name: 'music',
  initialState: {
    availableMusicArr: [
      {
        id: '1',
        musicName: 'Moonlight',
        artistName: 'Checkpoint Originals',
        filePath: 'music/audio/lofi/Isehgal_Moonlight.m4a',
        thumbnailFilePath: 'music/thumbnail/lofi/Isehgal (1) - Moonlight.jpg',
      },
      {
        id: '2',
        musicName: 'Summer Breeze',
        artistName: 'Checkpoint Originals',
        filePath: 'music/audio/piano/SteveAiken_SummerBreeze.m4a',
        thumbnailFilePath: 'music/thumbnail/piano/Steve Aiken (1) - Summer Breeze.jpg',
      },
      {
        id: '3',
        musicName: 'Shine',
        artistName: 'Checkpoint Originals',
        filePath: 'music/audio/piano/klaus_Shine.m4a',
        thumbnailFilePath: 'music/thumbnail/piano/klaüs (1) - Shine.jpg',
      },
      {
        id: '4',
        musicName: 'The voice of the Wind',
        artistName: 'Checkpoint Originals',
        filePath: 'music/audio/piano/klaus_TheVoiceOfTheWind.m4a',
        thumbnailFilePath: 'music/thumbnail/piano/klaüs (2) - The voice of the wind.jpg',
      },
      {
        id: '5',
        musicName: 'Ivory',
        artistName: 'Checkpoint Originals',
        filePath: 'music/audio/piano/klaus_Ivory.m4a',
        thumbnailFilePath: 'music/thumbnail/piano/klaüs (3) - Ivory.jpg',
      },
      {
        id: '6',
        musicName: 'Learn to Fly',
        artistName: 'Checkpoint Originals',
        filePath: 'music/audio/piano/klaus_LearnToFly.m4a',
        thumbnailFilePath: 'music/thumbnail/piano/klaüs (4) - Learn to fly.jpg',
      },
      {
        id: '7',
        musicName: 'Venus',
        artistName: 'Checkpoint Originals',
        filePath: 'music/audio/piano/klaus_Venus.m4a',
        thumbnailFilePath: 'music/thumbnail/piano/klaüs (5) - Venus.jpg',
      },
    ],
    currentMusic: {
      id: '1',
      musicName: 'Moonlight',
      artistName: 'Checkpoint Originals',
      filePath: 'music/audio/lofi/Isehgal_Moonlight.m4a',
      thumbnailFilePath: 'music/thumbnail/lofi/Isehgal (1) - Moonlight.jpg',
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
    setAvailableMusic(state, action) {
      const availableMusicArr = [...state.availableMusicArr];
      const existingMusicIndex = availableMusicArr.findIndex((music) => music.id === action.payload.id);
      if (availableMusicArr[existingMusicIndex].url && availableMusicArr[existingMusicIndex].thumbnailUrl) {
        return;
      }
      availableMusicArr[existingMusicIndex] = action.payload;
      state.availableMusicArr = availableMusicArr;
    },
  },
});

export const musicActions = musicSlice.actions;
export default musicSlice.reducer;
