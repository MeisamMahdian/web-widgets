const MENTION_CLASS_NAME = "mention";
const MENTION_TAG_NAME = "span";
const MENTION_CONFIG = {
    minChars: 2,
    throttle: 200,
    marker: "@",
    itemTemplate: '<li class="cke_mention_option" data-id="{id}">{name}</li>',
    outputTemplate: `&nbsp;<${MENTION_TAG_NAME} data-class="mention" data-id="{id}" data-type="mention">{name}</${MENTION_TAG_NAME}>&nbsp;`
};
const parser = new DOMParser();

const getMentionedList = (content: string): string[] => {
    const editorDoc = parser.parseFromString(content, "text/html");
    const mentionElementsInDoc = editorDoc.querySelectorAll("span[data-type='mention']");
    const foundUsers: string[] = [];

    for (const el of Array.from(mentionElementsInDoc)) {
        if (el.getAttribute("data-type") === "mention") {
            const id = el.getAttribute("data-id");
            if (id) {
                foundUsers.push(id);
            }
        }
    }
    return foundUsers;
};
const getMentionAllowedContent = (allowedContent: any) => {
    const extraAllowedContent = { span: { attributes: [] }, ...allowedContent };
    extraAllowedContent.span.attributes = [
        ...extraAllowedContent.span.attributes,
        "data-id",
        "data-type",
        "data-class"
    ];
    return extraAllowedContent;
};

export { MENTION_CLASS_NAME, MENTION_TAG_NAME, MENTION_CONFIG, getMentionAllowedContent, getMentionedList };
