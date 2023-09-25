import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";

const getId = () => (100000 * Math.random()).toFixed(0);

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    setAnecdotes(state, action) {
      return action.payload;
    },

    appendAnecdotes(state, action) {
      state.push(action.payload);
    },
  },
});

export const { setAnecdotes, appendAnecdotes } = anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createNewAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = {
      ...content,
      id: getId(),
      votes: 0,
    };
    await anecdoteService.createNew(newAnecdote);
    dispatch(appendAnecdotes(newAnecdote));
  };
};

export const voteAnecdote = (id) => {
  return async (dispatch, getState) => {
    const anecdoteToVote = getState().anecdotes.find(
      (anecdote) => Number(anecdote.id) === Number(id)
    );
    const votedAnecdote = {
      ...anecdoteToVote,
      votes: anecdoteToVote.votes + 1,
    };
    await anecdoteService.updateVote(id, votedAnecdote);
    
    const updatedAnecdotes = getState().anecdotes.map((anecdote) => {
      if (Number(anecdote.id) === Number(id)) {
        return votedAnecdote;
      }
      return anecdote;
    });

    dispatch(setAnecdotes(updatedAnecdotes));
  };
};

export default anecdoteSlice.reducer;
