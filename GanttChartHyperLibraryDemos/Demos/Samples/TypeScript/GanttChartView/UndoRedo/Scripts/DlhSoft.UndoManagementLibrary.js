/**
 * @version 1.0.0.0
 * @copyright Copyright © DlhSoft 2017
 * @compiler Bridge.NET 15.7.0
 */
Bridge.assembly("DlhSoft.UndoManagementLibrary", function ($asm, globals) {
    "use strict";

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

    /** @namespace DlhSoft.UndoManagementLibrary */

    /**
     * Provides support for recording (or executing and automatically recording) and undoing or redoing actions.
     *
     * @public
     * @class DlhSoft.UndoManagementLibrary.UndoStack
     * @implements  System.ComponentModel.INotifyPropertyChanged
     */
    Bridge.define("DlhSoft.UndoManagementLibrary.UndoStack", {
        inherits: [System.ComponentModel.INotifyPropertyChanged],
        completedActions: null,
        undoneActions: null,
        config: {
            events: {
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
                PropertyChanged: null
            },
            alias: [
            "addPropertyChanged", "System$ComponentModel$INotifyPropertyChanged$addPropertyChanged",
            "removePropertyChanged", "System$ComponentModel$INotifyPropertyChanged$removePropertyChanged"
            ],
            init: function () {
                this.completedActions = new (System.Collections.Generic.List$1(DlhSoft.UndoManagementLibrary.UndoStack.ActionRecord))();
                this.undoneActions = new (System.Collections.Generic.List$1(DlhSoft.UndoManagementLibrary.UndoStack.ActionRecord))();
            }
        },
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
        getCanUndo: function () {
            return System.Linq.Enumerable.from(this.completedActions).any();
        },
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
        getCanRedo: function () {
            return System.Linq.Enumerable.from(this.undoneActions).any();
        },
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
        record: function (whatWasDone, howToUndo, whenWasDone) {
            var $t;
            if (whenWasDone === void 0) { whenWasDone = null; }
            var originallyCanUndo = this.getCanUndo();
            var originallyCanRedo = this.getCanRedo();
            this.undoneActions.clear();
            this.completedActions.insert(0, Bridge.merge(new DlhSoft.UndoManagementLibrary.UndoStack.ActionRecord(), {
                whatWasDone: whatWasDone,
                howToUndo: howToUndo,
                whenWasDone: ($t = whenWasDone, $t != null ? $t : System.Int64.clip32(System.Int64((new Date()).getTime()).mul(10000).div(System.Int64(10000))))
            } ));
            if (!originallyCanUndo) {
                this.onPropertyChanged("canUndo");
            }
            if (originallyCanRedo) {
                this.onPropertyChanged("canRedo");
            }
        },
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
        doAndRecord: function (whatToDo, howToUndo) {
            var now = new Date();
            whatToDo();
            this.record(whatToDo, howToUndo, System.Int64.clip32(System.Int64((now).getTime()).mul(10000).div(System.Int64(10000))));
        },
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
        undo: function (relatedActionSpan) {
            if (relatedActionSpan === void 0) { relatedActionSpan = null; }
            if (!this.getCanUndo()) {
                return;
            }
            if (relatedActionSpan == null) {
                relatedActionSpan = 0;
            }
            var originallyCanRedo = this.getCanRedo();
            while (true) {
                var lastCompletedAction = System.Linq.Enumerable.from(this.completedActions).first();
                this.completedActions.removeAt(0);
                lastCompletedAction.howToUndo();
                this.undoneActions.insert(0, lastCompletedAction);
                var previouslyCompletedAction = System.Linq.Enumerable.from(this.completedActions).firstOrDefault(null, null);
                if (previouslyCompletedAction == null || System.Nullable.gt(Bridge.Int.clip32(lastCompletedAction.whenWasDone - previouslyCompletedAction.whenWasDone), relatedActionSpan)) {
                    break;
                }
            }
            if (!this.getCanUndo()) {
                this.onPropertyChanged("canUndo");
            }
            if (!originallyCanRedo) {
                this.onPropertyChanged("canRedo");
            }
        },
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
        redo: function (relatedActionSpan) {
            if (relatedActionSpan === void 0) { relatedActionSpan = null; }
            if (!this.getCanRedo()) {
                return;
            }
            if (relatedActionSpan == null) {
                relatedActionSpan = 0;
            }
            var originallyCanUndo = this.getCanUndo();
            while (true) {
                var lastUndoneAction = System.Linq.Enumerable.from(this.undoneActions).first();
                this.undoneActions.removeAt(0);
                lastUndoneAction.whatWasDone();
                this.completedActions.insert(0, lastUndoneAction);
                var previouslyUndoneAction = System.Linq.Enumerable.from(this.undoneActions).firstOrDefault(null, null);
                if (previouslyUndoneAction == null || System.Nullable.gt(Bridge.Int.clip32(previouslyUndoneAction.whenWasDone - lastUndoneAction.whenWasDone), relatedActionSpan)) {
                    break;
                }
            }
            if (!this.getCanRedo()) {
                this.onPropertyChanged("canRedo");
            }
            if (!originallyCanUndo) {
                this.onPropertyChanged("canUndo");
            }
        },
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
        onPropertyChanged: function (propertyName) {
            !Bridge.staticEquals(this.PropertyChanged, null) ? this.PropertyChanged(this, new System.ComponentModel.PropertyChangedEventArgs(propertyName)) : null;
        }
    });

    Bridge.define("DlhSoft.UndoManagementLibrary.UndoStack.ActionRecord", {
        whatWasDone: null,
        howToUndo: null,
        whenWasDone: 0
    });
});
