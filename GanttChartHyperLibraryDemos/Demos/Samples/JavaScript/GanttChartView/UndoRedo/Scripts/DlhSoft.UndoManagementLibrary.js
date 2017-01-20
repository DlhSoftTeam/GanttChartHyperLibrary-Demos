/**
 * @version 1.0.0.0
 * @copyright Copyright © DlhSoft 2017
 * @compiler Bridge.NET 15.7.0
 */
Bridge.assembly("DlhSoft.UndoManagementLibrary", function ($asm, globals) {
    "use strict";

    Bridge.define("DlhSoft.UndoManagementLibrary.UndoStack", {
        inherits: [System.ComponentModel.INotifyPropertyChanged],
        completedActions: null,
        undoneActions: null,
        config: {
            events: {
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
        getCanUndo: function () {
            return System.Linq.Enumerable.from(this.completedActions).any();
        },
        getCanRedo: function () {
            return System.Linq.Enumerable.from(this.undoneActions).any();
        },
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
        doAndRecord: function (whatToDo, howToUndo) {
            var now = new Date();
            whatToDo();
            this.record(whatToDo, howToUndo, System.Int64.clip32(System.Int64((now).getTime()).mul(10000).div(System.Int64(10000))));
        },
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
