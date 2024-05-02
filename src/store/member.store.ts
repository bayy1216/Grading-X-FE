import {create} from "zustand";
import {Member} from "../api/member/member.response.ts";

interface MemberStoreState {
  data: Member | null;
  setData(data: Member | null) : void;
  reset: () => void;
}

export const useMemberStore = create<MemberStoreState>((set) => ({
  data: null,
  setData(data) {
    set({
      data
    });
  },
  reset() {
    set({
      data: null
    })
  }
}));
