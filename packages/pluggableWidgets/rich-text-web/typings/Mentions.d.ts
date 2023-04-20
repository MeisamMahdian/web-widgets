type MarkerType = "@" | "#";

type MentionQuery = {
    query: string;
    marker: MarkerType;
};

type MentionOrTagTemplate = {
    id: string | undefined;
    type: MarkerType | undefined;
    name: string | undefined;
};

type TCallBackFunction = (x: MentionOrTagTemplate[]) => void;