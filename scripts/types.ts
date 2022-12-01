import { EmojiProps } from "./components/Emoji.types";

export interface Guild {
  emoji: EmojiProps[];
  icon: string;
  id: string;
  invite: string;
  name: string;
 }
