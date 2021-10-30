import create from "zustand";
import { persist } from "zustand/middleware";

type UserSettings = {
    userId: string,
    changeUserId: (value: string) => void,
}

export const userStore = create<UserSettings>(persist(
    (set, get) => ({
        userId: "",
        changeUserId: (value: string) =>
            set({
                userId: value
            })
    }),
    {
        name: "user-settings", // unique name
    }
))
export default userStore;
