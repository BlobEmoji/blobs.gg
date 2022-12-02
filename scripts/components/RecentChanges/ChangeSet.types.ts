interface ChangeEventEmoji {
    id: string;
    name: string;
    animated: boolean;
}

type ChangeSetBase = {
    changed_at: string;
    guild: ChangeSetGuild;
}

interface ChangeSetRename extends ChangeSetBase{
    event: "EMOJI_RENAME" | "EMOJI_UPDATE";
    after: ChangeSetEventData;
    before: ChangeSetEventData;
}

interface ChangeSetCreate extends ChangeSetBase{
    event: "EMOJI_CREATE" | "EMOJI_REMOVE";
    emoji: ChangeEventEmoji;
}

export type ChangeEvent = ChangeSetCreate | ChangeSetRename;

interface ChangeSetEventData {
    animated: boolean;
    id: string;
    name: string;
}

interface ChangeSetGuild {
    icon: string;
    id: string;
    invite: string;
    name: string;
}

export interface ChangeSetWrapperClassProps {
    changeSet: ChangeEvent[];
}
