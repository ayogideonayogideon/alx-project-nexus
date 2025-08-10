import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Poll {
  id: string;
  question: string;
  options: string[];
  votes: number[];
}

interface CreatePollPayload {
  question: string;
  options: string[];
}

interface PollState {
  polls: Poll[];
}

const initialState: PollState = {
  polls: [],
};

const pollSlice = createSlice({
  name: 'poll',
  initialState,
  reducers: {
    createPoll: (state, action: PayloadAction<CreatePollPayload>) => {
      const { question, options } = action.payload;
      const newPoll: Poll = {
        id: Math.random().toString(36).substr(2, 9),
        question,
        options,
        votes: Array(options.length).fill(0),
      };
      state.polls.push(newPoll);
    },
    // Additional reducers (e.g., for voting) can be added here
  },
});

export const { createPoll } = pollSlice.actions;
export default pollSlice.reducer;
