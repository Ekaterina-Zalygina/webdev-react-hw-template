import { LoginUser, RegisterUser, regUserType } from "@/API/authApi";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

type AuthStateType =  {
  authState: boolean;
  // email: string;
  // id: number;
  // password: string;
  // login: string;

}

const initialState: AuthStateType = {
  authState: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthState: (state, action: PayloadAction<boolean>) => {
      state.authState = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registrationUser.fulfilled, (state, action) => { //fulfilled-выводит успешный запрос
        state.authState = action.payload; 
      })
      .addCase(registrationUser.rejected, (state, action) => { //rejected-выводит неудачный запрос
        console.error('Error:', action.error.message); 
      });
  },
});

export const registrationUser = createAsyncThunk(
  'user/register',
  async ({ email, password }: regUserType) => {
    return await RegisterUser({email, password})
  }
)

export const loginUser = createAsyncThunk(
  'user/login',
  async ({ email, password }: regUserType) => {
    return await LoginUser({email, password})
  }
)

export const { setAuthState } = authSlice.actions;
export const authReducer = authSlice.reducer;