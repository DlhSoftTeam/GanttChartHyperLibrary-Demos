/// <reference path="./bridge.d.ts" />

declare module DlhSoft.UndoManagementLibrary {
    export interface UndoStack extends System.ComponentModel.INotifyPropertyChanged {
        addPropertyChanged(value: {(sender: Object, e: System.ComponentModel.PropertyChangedEventArgs): void}): void;
        removePropertyChanged(value: {(sender: Object, e: System.ComponentModel.PropertyChangedEventArgs): void}): void;
        getCanUndo(): boolean;
        getCanRedo(): boolean;
        record(whatWasDone: {(): void}, howToUndo: {(): void}, whenWasDone?: number): void;
        doAndRecord(whatToDo: {(): void}, howToUndo: {(): void}): void;
        undo(relatedActionSpan?: number): void;
        redo(relatedActionSpan?: number): void;
        onPropertyChanged(propertyName: string): void;
    }
    export interface UndoStackFunc extends Function {
        prototype: UndoStack;
        ActionRecord: UndoStack.ActionRecordFunc;
        new (): UndoStack;
    }
    var UndoStack: UndoStackFunc;
    module UndoStack {
        export interface ActionRecord {
            whatWasDone: {(): void};
            howToUndo: {(): void};
            whenWasDone: number;
        }
        export interface ActionRecordFunc extends Function {
            prototype: ActionRecord;
            new (): ActionRecord;
        }
    }

}