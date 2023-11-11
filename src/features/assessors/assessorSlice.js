import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// POST ASSESSOR
export const postAssessor = createAsyncThunk(
  "postAssessor",
  async (data, { rejectWithValue }) => {
    try {
      const response = await fetch("", {
        method: "POST",
        headers: {
          content: "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Network is not ok");
      }
      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

//Get assessor
export const getAllAssessors = createAsyncThunk(
  "getAllAssessors",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("https://fakestoreapi.com/products");

      if (!response.ok) {
        throw new Error("Network response not ok");
      }
      const result = await response.json();

      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// UPDATE ASSESSOR
export const updateAssessor = createAsyncThunk(
  "updateAssessor",
  async (data, { rejectWithValue }) => {
    try {
      const response = await fetch(``, {
        method: "PUT",
        headers: {
          content: "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Network not ok");
      }
      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// delete assessor

export const deleteAssessor = createAsyncThunk(
  "deleteAssessor",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(``, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Network its not ok");
      }
      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// the assessorsSlice

const assessorSlice = createSlice({
  name: "assessors",
  initialState: {
    assessors: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      // post assessor addCase
      .addCase(postAssessor.pending, (state) => {
        state.loading = true;
      })
      .addCase(postAssessor.fulfilled, (state, action) => {
        state.loading = false;
        state.assessors.push(action.payload);
      })
      .addCase(postAssessor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // getting all the assessors addCase
      .addCase(getAllAssessors.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllAssessors.fulfilled, (state, action) => {
        console.log("Data received", action.payload);
        state.loading = false;
        state.assessors = action.payload;
      })
      .addCase(getAllAssessors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //   updating Assessor addCase
      .addCase(updateAssessor.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateAssessor.fulfilled, (state, action) => {
        state.loading = false;
        state.assessors.map((data) =>
          data.id === action.payload.id ? action.payload : data
        );
      })
      .addCase(updateAssessor.rejected,(state,action) =>{
        state.loading =false;
        state.error = action.payload
      })

      //   delete addCase

      .addCase(deleteAssessor.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteAssessor.fulfilled, (state, action) => {
        state.loading = false;
        const id = action.payload;
        if (id) {
          state.assessors = state.assessors.filter((data) => data.id !== id);
        }
      })

      .addCase(deleteAssessor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default assessorSlice.reducer;
