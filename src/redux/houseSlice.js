import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { houseService } from "../services/houseService";
import { reviewService } from "../services/reviewService";

// Async Thunks
export const fetchHouses = createAsyncThunk("house/fetchHouses", async () => {
  const [houses, reviews] = await Promise.all([
    houseService.getAll(),
    reviewService.getAll(),
  ]);


  const housesWithRating = houses.map((house) => {
    const houseReviews = reviews.filter(
      (r) => String(r.houseId) === String(house.id),
    );
    if (houseReviews.length > 0) {
      const sum = houseReviews.reduce((acc, curr) => acc + curr.rating, 0);
      house.rating = (sum / houseReviews.length).toFixed(1);
      house.reviewCount = houseReviews.length;
    } else {
      house.rating = "0.0";
      house.reviewCount = 0;
    }
    return house;
  });

  return housesWithRating;
});

export const addHouse = createAsyncThunk(
  "house/addHouse",
  async (houseData) => {
    return await houseService.create(houseData);
  },
);

export const updateHouse = createAsyncThunk(
  "house/updateHouse",
  async ({ id, data }) => {
    return await houseService.update(id, data);
  },
);

export const deleteHouse = createAsyncThunk(
  "house/deleteHouse",
  async (id) => {
    await houseService.delete(id);
    return id;
  },
);

const houseSlice = createSlice({
  name: "house",
  initialState: {
    houses: [],
    favorites: JSON.parse(localStorage.getItem("favorites") || "[]"),
    loading: false,
    error: null,
  },
  reducers: {
    toggleFavorite: (state, action) => {
      const houseId = action.payload;
      if (state.favorites.includes(houseId)) {
        state.favorites = state.favorites.filter((id) => id !== houseId);
      } else {
        state.favorites.push(houseId);
      }
      localStorage.setItem("favorites", JSON.stringify(state.favorites));
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchHouses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHouses.fulfilled, (state, action) => {
        state.loading = false;
        state.houses = action.payload;
      })
      .addCase(fetchHouses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Add
      .addCase(addHouse.fulfilled, (state, action) => {
        state.houses.push(action.payload);
      })
      // Update
      .addCase(updateHouse.fulfilled, (state, action) => {
        const idx = state.houses.findIndex((h) => h.id === action.payload.id);
        if (idx !== -1) state.houses[idx] = action.payload;
      })
      // Delete
      .addCase(deleteHouse.fulfilled, (state, action) => {
        state.houses = state.houses.filter((h) => h.id !== action.payload);
      });
  },
});

export const { toggleFavorite } = houseSlice.actions;
export default houseSlice.reducer;
