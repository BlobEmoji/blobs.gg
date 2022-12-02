import { EmojiProps } from "../Emoji.types";
import { ReactNode } from "react";

export interface ChangeRowProps {
    afterEmoji: EmojiProps | null;
    changedAt: string;
    emoji: EmojiProps;
    eventIcon: ReactNode;
    eventName: string;
}
