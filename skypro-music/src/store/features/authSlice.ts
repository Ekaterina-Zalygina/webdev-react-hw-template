import { login, register } from "@/API/authApi";
import { LoginType, RegisterType, TokenType } from "@/types/types";
import { UserType } from "@/UserType";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

type AuthStateType =  {
  user: UserType | null;
  token: TokenType | null;
}

const initialState: AuthStateType = {
  user: null,
  token: null
};

export const registrationUser = createAsyncThunk('user/signup', 
  async ({email, password, username}: RegisterType) => {
    const response = await register({email, password, username})
    return response
  }
)

export const loginUser = createAsyncThunk(
  'user/login',
  async ({ email, password }: LoginType) => {
    return await login({email, password})
  }
)

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    LogoutState: (state) => {
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registrationUser.fulfilled, (state, action) => { //fulfilled-выводит успешный запрос
        state.user = action.payload; 
      })
      .addCase(registrationUser.rejected, (state, action) => { //rejected-выводит неудачный запрос
        console.error('Error:', action.error.message); 
      });
  },
});

// export const registrationUser = createAsyncThunk(
//   'user/register',
//   async ({ email, password }: regUserType) => {
//     return await RegisterUser({email, password})
//   }
// )

export const { LogoutState } = authSlice.actions;
export const authReducer = authSlice.reducer;