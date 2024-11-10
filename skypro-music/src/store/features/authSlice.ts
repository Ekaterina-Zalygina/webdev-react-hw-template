import { login, register } from "@/API/authApi"
import { LoginType, RegisterType, TokenType } from "@/types/types"
import { UserType } from "@/UserType"
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"

type AuthStateType = {
    user: UserType | null
    token: TokenType | null
    error: string | null
}

const initialState: AuthStateType = {
    user: null,
    error: null,
    token: null,
}

export const registrationUser = createAsyncThunk("user/signup", async ({ email, password, username }: RegisterType) => {
    const response = await register({ email, password, username })
    return response
})

export const loginUser = createAsyncThunk(
    "user/login",
    async ({ email, password }: LoginType, { rejectWithValue, fulfillWithValue }) => {
        return login({ email, password })
            .then(fulfillWithValue)
            .catch((err) => rejectWithValue({ message: err.message }))
    }
)

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        LogoutState: (state) => {
            state = initialState
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(registrationUser.fulfilled, (state, action) => {
                //fulfilled-выводит успешный запрос
                state.user = action.payload
            })
            .addCase(registrationUser.rejected, (state, action) => {
                //rejected-выводит неудачный запрос
                state.error = action.error.message || "Произошла ошибка"
            })
            .addCase(loginUser.fulfilled, (state, action: PayloadAction<any>) => {
                state.user = action.payload
            })
            .addCase(loginUser.rejected, (state, action: PayloadAction<any>) => {
                state.error = action.payload.message || "Произошла ошибка"
            })
    },
})

// export const registrationUser = createAsyncThunk(
//   'user/register',
//   async ({ email, password }: regUserType) => {
//     return await RegisterUser({email, password})
//   }
// )

export const { LogoutState } = authSlice.actions
export const authReducer = authSlice.reducer
