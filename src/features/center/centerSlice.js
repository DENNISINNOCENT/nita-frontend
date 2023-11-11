import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

//  posting center
export const postCenter = createAsyncThunk(
  "postCenter",
  async (data, { rejectWithValue }) => {
    try {
      const response = await fetch("", {
        method: "POST",
        headers: {
          content: "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response) {
        throw new error("Network not ok");
      }
      const result = await response.json();
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// getting centers
export const getAllCenters = createAsyncThunk(
  "getAllCenters",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("");
      if (!response) {
        throw new error("Network not Ok");
      }
      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// deleting centers
export const deleteCenter = createAsyncThunk(
  "deleteCenter",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`\${id}`, {
        method: "DELETE",
      });
      if (!response) {
        throw new error("Network not ok");
      }
      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
// updating centers
export const updateCenter = createAsyncThunk(
  "updateCenter",
  async (data, { rejectWithValue }) => {
    try {
      const response = await fetch(`\${data.id}`, {
        method: "PUT",
        headers: {
          content: "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response) {
        throw new error("Network not Ok");
      }
      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// centerSlice
const centerSlice = createSlice({
  name: "centers",
  initialState: {
    centers: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      // post centers

      .addCase(postCenter.pending, (state) => {
        state.loading = true;
      })
      .addCase(postCenter.fulfilled, (state, action) => {
        state.loading = false;
        state.centers.push(action.payload);
      })
      .addCase(postCenter.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // getting All centers
      .addCase(getAllCenters.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllCenters.fulfilled, (state, action) => {
        state.loading = false;
        state.centers.push(action.payload);
      })
      .addCase(getAllCenters.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // updating centers
      .addCase(updateCenter.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCenter.fulfilled, (state, action) => {
        state.loading = false;
        state.centers.map((data) => {
          data.id === action.payload.id ? action.payload : data;
        });
      })
      .addCase(updateCenter.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
    //   deleting centers
    .addCase(deleteCenter.pending, state =>{
        state.loading = true;
    })
    .addCase(deleteCenter.fulfilled,(state,action) =>{
        state.loading  = false;
        const id = action.payload
        if(id){
            state.centers = state.centers.filter((data) => data.id !== id)
        }
    })
    .addCase(deleteCenter.rejected,(state,action) =>{
        state.loading = false;
        state.error = action.payload
    })
  },
});
export default centerSlice.reducer;
