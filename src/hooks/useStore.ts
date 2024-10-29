import { store } from "../store";
import { RootState } from "../hooks/store";
import { useDispatch, useSelector } from "react-redux";

export type RootState = ReturnType<typeof store.getState>;

export const useAppSelector: typedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => appDispatch = useDispatch;
