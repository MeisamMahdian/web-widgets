import { ElementEntry, EventCaseEntry } from "@mendix/widget-plugin-grid/event-switch/base";
import {
    SelectAdjacentFx,
    SelectAllFx,
    SelectFx,
    isSelectOneTrigger,
    onSelectAdjacentHotKey,
    onSelectAllHotKey
} from "@mendix/widget-plugin-grid/selection";
import { blockUserSelect, unblockUserSelect } from "@mendix/widget-plugin-grid/selection/utils";
import { CellContext } from "./base";

const onClick = (selectFx: SelectFx): EventCaseEntry<CellContext, HTMLDivElement, "onClick"> => ({
    eventName: "onClick",
    filter: ctx => {
        return ctx.selectionMethod === "rowClick" && (ctx.clickTrigger === "none" || ctx.clickTrigger === "double");
    },
    handler: ({ item }, event) => {
        selectFx(item, event.shiftKey);
    }
});

const onSelectItemHotKey = (selectFx: SelectFx): EventCaseEntry<CellContext, HTMLDivElement, "onKeyUp"> => ({
    eventName: "onKeyUp",
    filter: (ctx, event) => ctx.selectionMethod !== "none" && isSelectOneTrigger(event),
    handler: ({ item }) => selectFx(item, false)
});

export function createSelectHandlers(
    selectFx: SelectFx,
    selectAllFx: SelectAllFx,
    selectAdjacentFx: SelectAdjacentFx
): Array<ElementEntry<CellContext, HTMLDivElement>> {
    return [
        onClick(selectFx),
        onSelectItemHotKey(selectFx),
        onSelectAllHotKey(
            () => {
                blockUserSelect();
                selectAllFx("selectAll");
            },
            () => unblockUserSelect()
        ),
        onSelectAdjacentHotKey(selectAdjacentFx)
    ].flat();
}