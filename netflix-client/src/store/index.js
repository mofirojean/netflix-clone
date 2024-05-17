import {
    configureStore,
    createAsyncThunk, createSlice
} from "@reduxjs/toolkit";
import axios from "axios";

// eslint-disable-next-line no-undef
const apiKey = import.meta.env.VITE_NETFLIX_API_KEY;
// eslint-disable-next-line no-undef
const apiUrl = import.meta.env.VITE_TMDB_BASE_URL;

const initialState = {
    movies: [],
    genresLoaded: false,
    genres: []
}

export const getGenres = createAsyncThunk("netflix/genres", async () => {
    const { data: { genres } } = await axios.get(
        `${apiUrl}/genre/movie/list?api_key=${apiKey}`
    );
    return genres
})

export const fetchMovie = createAsyncThunk(
    "netflix/trending",
    async ({type}, thunkAPI) => {
    const {
        netflix: { genres }
    } = thunkAPI.getState();
    const data = await getRawData(
        `${apiUrl}/trending/${type}/week?api_key=${apiKey}`,
        genres,
        true
    )
    console.log(data)
    // return getRawData(`${apiUrl}/discover/${type}?api_key=${apiKey}&with_genres=${genres}`)
})

const getRawData = async (api, genres, paging) => {
    const movies = [];
    for (let i = 1; movies.length < 60 && i < 10; i++) {
        const { data: results } = await axios.get(
            `${api}${paging ? `&page=${i}` : ''}`
        );
        createArrayFromRawData(results, movies, genres)
        return movies;
    }
}

const createArrayFromRawData = (array, moviesArray, genres) => {
    console.log(array)
    array.forEach((movie) => {
        const movieGenres = [];
        movie.genre_ids.forEach((genre) => {
            const name = genres.find(({id}) => id === genre);
            if (name) movieGenres.push(name.name)
        })
        if (movie.backdrop_path) {
            moviesArray.push({
                id: movie.id,
                name: movie?.original_name ? movie.original_name : movie.original_title,
                image: movie.backdrop_path,
                genres: movieGenres.slice(0, 3)
            })
        }
    })
}

export const netflixSlice = createSlice({
    name: 'Netflix',
    initialState: initialState,
    extraReducers: builder => {
        builder.addCase(getGenres.fulfilled, (state, action) => {
            state.genres = action.payload;
            state.genresLoaded = true
        })
    }
})

export const store = configureStore({
    reducer: {
        netflix: netflixSlice.reducer
    }
})
