import { store, AppDispatch } from "../store";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export type RootState = ReturnType<typeof store.getState>;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;