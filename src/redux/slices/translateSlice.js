import { createSlice } from "@reduxjs/toolkit";
import { translateText } from "../actions";

const initialState = {
    sourceLang: {
        value: "en",
        label: "English",
    },
    targetLang: {
        value: "es",
        label: "Spanish",
    },
    textToTranslate: "",
    translatedText: "",
    isLoading: false,
};

const translateSlice = createSlice({
    name: "language",
    initialState,
    reducers: {
        setSource: (state, action) => {
            state.sourceLang = action.payload;
        },
        setTarget: (state, action) => {
            state.targetLang = action.payload;
        },
        setText: (state, action) => {
            state.textToTranslate = action.payload;
        },

        swap: (state) => {

            const currentSource = state.sourceLang;
            const currentTarget = state.targetLang;
            const currentText = state.textToTranslate;
            const currentTranslated = state.translatedText;

            state.sourceLang = currentTarget;
            state.targetLang = currentSource;
            state.textToTranslate = currentTranslated;
            state.translatedText = currentText;
        },

    },
    extraReducers: (builder) => {
        builder.addCase(translateText.pending, (state) => {
            state.isLoading = true;
            state.translatedText = "";
        })
        builder.addCase(translateText.fulfilled, (state, { payload }) => {
            state.isLoading = false;
            state.translatedText = payload;
        })
        builder.addCase(translateText.rejected, (state, { error }) => {
            state.isLoading = false;
            alert("Something went wrong", error.message);
        })
    },
});

export const { setSource, setTarget, setText, swap } = translateSlice.actions;

export default translateSlice.reducer;