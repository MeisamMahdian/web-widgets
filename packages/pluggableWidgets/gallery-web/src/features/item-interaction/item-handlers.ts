import { ElementEntry, EventCaseEntry } from "@mendix/widget-plugin-grid/event-switch/base";
import { EventEntryContext } from "./base";
import {
    SelectAdjacentInGridFx,
    SelectAllFx,
    SelectFx,
    onSelectGridAdjacentHotKey,
    onSelectAllHotKey,
    isSelectOneTrigger
} from "@mendix/widget-plugin-grid/selection";
import { blockUserSelect, removeAllRanges, unblockUserSelect } from "@mendix/widget-plugin-grid/selection/utils";

const onMouseDown = (
    handler: (ctx: EventEntryContext, event: React.MouseEvent<Element>) => void
): EventCaseEntry<EventEntryContext, Element, "onMouseDown"> => ({
    eventName: "onMouseDown",
    filter: ctx => ctx.selectionType !== "None",
    handler
});

const onSelect = (selectFx: SelectFx): EventCaseEntry<EventEntryContext, HTMLDivElement, "onClick"> => ({
    eventName: "onClick",
    filter: ctx => ctx.selectionType !== "None",
    handler: ({ item }, event) => {
        const useToggleMode = event.metaKey || event.ctrlKey;
        selectFx(item, event.shiftKey, useToggleMode);
    }
});

const onSelectItemHotKey = (selectFx: SelectFx): EventCaseEntry<EventEntryContext, HTMLDivElement, "onKeyUp"> => ({
    eventName: "onKeyUp",
    filter: (ctx, event) => ctx.selectionType !== "None" && isSelectOneTrigger(event),
    handler: ({ item }) => selectFx(item, false, true)
});

export function createItemHandlers(
    selectFx: SelectFx,
    selectAllFx: SelectAllFx,
    selectAdjacentFx: SelectAdjacentInGridFx,
    numberOfColumns: number
): Array<ElementEntry<EventEntryContext, HTMLDivElement>> {
    return [
        onMouseDown(removeAllRanges),
        onSelect(selectFx),
        onSelectItemHotKey(selectFx),
        onSelectAllHotKey(
            () => {
                blockUserSelect();
                selectAllFx("selectAll");
            },
            () => {
                unblockUserSelect();
            }
        ),
        onSelectGridAdjacentHotKey(selectAdjacentFx, numberOfColumns)
    ].flat();
}
