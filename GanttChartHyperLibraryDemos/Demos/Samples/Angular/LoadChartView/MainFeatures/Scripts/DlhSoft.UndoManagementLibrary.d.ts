    /** @namespace System */

    /**
     * @memberof System
     * @callback System.Action
     * @return  {void}
     */

    /** @namespace System.ComponentModel */

    /**
     * @memberof System.ComponentModel
     * @callback System.ComponentModel.PropertyChangedEventHandler
     * @param   {Object}                                            sender    
     * @param   {System.ComponentModel.PropertyChangedEventArgs}    e
     * @return  {void}
     */

/// <reference path="./bridge.d.ts" />

declare module DlhSoft.UndoManagementLibrary {
    /** @namespace DlhSoft.UndoManagementLibrary */

    /**
     * Provides support for recording (or executing and automatically recording) and undoing or redoing actions.
     *
     * @public
     * @class DlhSoft.UndoManagementLibrary.UndoStack
     * @implements  System.ComponentModel.INotifyPropertyChanged
     */
    export interface UndoStack extends System.ComponentModel.INotifyPropertyChanged {
        /**
         * Occurs when CanUndo/CanRedo property values change.
         *
         * @instance
         * @public
         * @this DlhSoft.UndoManagementLibrary.UndoStack
         * @memberof DlhSoft.UndoManagementLibrary.UndoStack
         * @function addPropertyChanged
         * @param   {System.ComponentModel.PropertyChangedEventHandler}    value
         * @return  {void}
         */
        addPropertyChanged(value: {(sender: Object, e: System.ComponentModel.PropertyChangedEventArgs): void}): void;
        /**
         * Occurs when CanUndo/CanRedo property values change.
         *
         * @instance
         * @public
         * @this DlhSoft.UndoManagementLibrary.UndoStack
         * @memberof DlhSoft.UndoManagementLibrary.UndoStack
         * @function removePropertyChanged
         * @param   {System.ComponentModel.PropertyChangedEventHandler}    value
         * @return  {void}
         */
        removePropertyChanged(value: {(sender: Object, e: System.ComponentModel.PropertyChangedEventArgs): void}): void;
        /**
         * Indicates whether there are any completed operations that can be undone.
         *
         * @instance
         * @public
         * @this DlhSoft.UndoManagementLibrary.UndoStack
         * @memberof DlhSoft.UndoManagementLibrary.UndoStack
         * @function getCanUndo
         * @return  {boolean}
         */
        /**
         * Indicates whether there are any completed operations that can be undone.
         *
         * @instance
         * @function setCanUndo
         */
        getCanUndo(): boolean;
        /**
         * Indicates whether there are any undone operations that can be redone.
         *
         * @instance
         * @public
         * @this DlhSoft.UndoManagementLibrary.UndoStack
         * @memberof DlhSoft.UndoManagementLibrary.UndoStack
         * @function getCanRedo
         * @return  {boolean}
         */
        /**
         * Indicates whether there are any undone operations that can be redone.
         *
         * @instance
         * @function setCanRedo
         */
        getCanRedo(): boolean;
        /**
         * Records an already executed action to the undo stack.
         *
         * @instance
         * @public
         * @this DlhSoft.UndoManagementLibrary.UndoStack
         * @memberof DlhSoft.UndoManagementLibrary.UndoStack
         * @param   {System.Action}    whatWasDone    
         * @param   {System.Action}    howToUndo      
         * @param   {?number}          whenWasDone
         * @return  {void}
         */
        record(whatWasDone: {(): void}, howToUndo: {(): void}, whenWasDone?: number): void;
        /**
         * Executes an action and records it to the undo stack.
         *
         * @instance
         * @public
         * @this DlhSoft.UndoManagementLibrary.UndoStack
         * @memberof DlhSoft.UndoManagementLibrary.UndoStack
         * @param   {System.Action}    whatToDo     
         * @param   {System.Action}    howToUndo
         * @return  {void}
         */
        doAndRecord(whatToDo: {(): void}, howToUndo: {(): void}): void;
        /**
         * Undoes the last completed action and related actions.
         *
         * @instance
         * @public
         * @this DlhSoft.UndoManagementLibrary.UndoStack
         * @memberof DlhSoft.UndoManagementLibrary.UndoStack
         * @param   {?number}    relatedActionSpan    Maximum time span in milliseconds to consider for determining related actions.
         * @return  {void}
         */
        undo(relatedActionSpan?: number): void;
        /**
         * Redoes the last undone action and related actions.
         *
         * @instance
         * @public
         * @this DlhSoft.UndoManagementLibrary.UndoStack
         * @memberof DlhSoft.UndoManagementLibrary.UndoStack
         * @param   {?number}    relatedActionSpan    Maximum time span in milliseconds to consider for determining related actions.
         * @return  {void}
         */
        redo(relatedActionSpan?: number): void;
        /**
         * Raises PropertyChanged event.
         *
         * @instance
         * @protected
         * @this DlhSoft.UndoManagementLibrary.UndoStack
         * @memberof DlhSoft.UndoManagementLibrary.UndoStack
         * @param   {string}    propertyName
         * @return  {void}
         */
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