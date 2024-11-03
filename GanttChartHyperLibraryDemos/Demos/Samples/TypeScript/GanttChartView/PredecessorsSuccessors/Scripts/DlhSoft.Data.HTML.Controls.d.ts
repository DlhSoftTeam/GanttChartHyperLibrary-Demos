/// <reference path="DlhSoft.HierarchicalData.HTML.Controls.d.ts" />
declare module DlhSoft.Controls {
    module ContentControl {
        function initialize(element: HTMLElement, settings?: Settings, license?: String): Element;
        function get(element: HTMLElement): Element;
        class Element implements IControlElement, IContentContainer {
            host: HTMLElement;
            settings: Settings;
            constructor(host: HTMLElement, settings?: Settings, license?: String);
            isInitialized: boolean;
            static initializeSettings(settings: Settings): void;
            static getContent(host: HTMLElement): HTMLElement;
            refresh(): void;
            content: any;
            setContent(content: any): void;
            contentContainer: HTMLElement;
        }
        interface Settings {
            theme?: string;
            containerStyle?: string;
            containerClass?: string;
            content?: any;
            contentTemplate?(document: HTMLDocument, content: any): HTMLElement;
        }
    }
    module ItemsControl {
        function initialize(element: HTMLElement, items?: any[], settings?: Settings, license?: String): Element;
        function get(element: HTMLElement): Element;
        class Element implements IControlElement, IItemsContainer {
            host: HTMLElement;
            settings: Settings;
            constructor(host: HTMLElement, items?: any[], settings?: Settings, license?: String);
            isInitialized: boolean;
            static initializeSettings(settings: Settings): void;
            static getItems(host: HTMLElement): HTMLElement[];
            refresh(): void;
            items: any[];
            setItems(items: any[]): void;
            itemContainers: HTMLElement[];
        }
        interface Settings {
            theme?: string;
            itemContainerStyle?: string;
            itemContainerClass?: string;
            items?: any[];
            itemTemplate?(document: HTMLDocument, item: any): HTMLElement;
        }
    }
    module Button {
        function initialize(element: HTMLElement, clickHandler?: () => void, settings?: Settings, license?: String): Element;
        function get(element: HTMLElement): Element;
        class Element implements IControlElement, IContentContainer, IHoverable, IPressable, IClickable, ISupportsDisabling {
            host: HTMLElement;
            clickHandler: () => void;
            settings: Settings;
            constructor(host: HTMLElement, clickHandler?: () => void, settings?: Settings, license?: String);
            isInitialized: boolean;
            static initializeSettings(settings: Settings): void;
            refresh(): void;
            content: any;
            setContent(content: any): void;
            isEnabled: boolean;
            enable(): void;
            disable(): void;
            isHovering: boolean;
            isPressed: boolean;
            contentControlHost: HTMLElement;
            contentControl: ContentControl.Element;
            private inputHost;
            inputElement: HTMLInputElement;
            contentControlSettings: ContentControl.Settings;
            contentContainer: HTMLElement;
            hoverableContainer: HTMLElement;
            pressableContainer: HTMLElement;
        }
        interface Settings extends ContentControl.Settings {
            inputName?: string;
            inputType?: string;
            isEnabled?: boolean;
            disabledStyle?: string;
            disabledClass?: string;
            hoveringStyle?: string;
            hoveringClass?: string;
            pressedStyle?: string;
            pressedClass?: string;
            contentStyle?: string;
            contentClass?: string;
            hoveringHandler?(target: IHoverable): void;
            unhoveringHandler?(target: IHoverable): void;
            pressedHandler?(target: IPressable): void;
            unpressedHandler?(target: IPressable): void;
        }
    }
    module ToggleButton {
        function initialize(element: HTMLElement, toggleHandler?: (isPressed: boolean) => void, settings?: Settings, license?: String): Element;
        function get(element: HTMLElement): Element;
        class Element extends Button.Element implements IControlElement, IContentContainer, IHoverable, IPressable, IClickable {
            toggleHandler: (isPressed: boolean) => void;
            constructor(host: HTMLElement, toggleHandler?: (isPressed: boolean) => void, settings?: Settings, license?: String);
            isInitialized: boolean;
        }
        interface Settings extends Button.Settings {
        }
    }
    module TextBox {
        function initialize(element: HTMLElement, settings?: Settings, license?: String): Element;
        function get(element: HTMLElement): Element;
        class Element implements IControlElement, ITextEditor, ISupportsDisabling {
            host: HTMLElement;
            settings: Settings;
            constructor(host: HTMLElement, settings?: Settings, license?: String);
            isInitialized: boolean;
            static initializeSettings(settings: Settings): void;
            refresh(): void;
            value: string;
            getValue(): string;
            setValue(value: string): void;
            isEnabled: boolean;
            enable(): void;
            disable(): void;
            private inputHost;
            inputElement: HTMLInputElement;
        }
        interface Settings {
            theme?: string;
            isEnabled?: boolean;
            isReadOnly?: boolean;
            value?: string;
            inputName?: string;
            inputType?: string;
            inputStyle?: string;
            inputClass?: string;
            raiseChangeOnBlur?: boolean;
            clickHandler?(): void;
            changeHandler?(value: string): void;
        }
    }
    module CalendarSelector {
        function initialize(element: HTMLElement, selectedTime?: number, settings?: Settings, license?: String): Element;
        function get(element: HTMLElement): Element;
        class Element implements IControlElement, INumberEditor {
            host: HTMLElement;
            selectedTime: number;
            settings: Settings;
            constructor(host: HTMLElement, selectedTime?: number, settings?: Settings, license?: String);
            isInitialized: boolean;
            static initializeSettings(settings: Settings): void;
            refresh(): void;
            getValue(): number;
            setValue(value: number): void;
            setDisplayedValue(value: number): void;
        }
        interface Settings {
            theme?: string;
            headerProvider?(document: HTMLDocument, displayedTime: number): Node;
            containerStyle?: string;
            containerClass?: string;
            headerStyle?: string;
            headerClass?: string;
            timeStyle?: string;
            timeClass?: string;
            selectedTimeStyle?: string;
            selectedTimeClass?: string;
            timeFormatter?(value: number): string;
            displayedTime?: number;
            rows?: number;
            columns?: number;
            invertMatrix?: boolean;
            minValue?: number;
            scrollingHeight?: string;
            displayedTimeChangeHandler?(displayedTime: number): void;
            selectedTimeChangeHandler?(selectedTime: number): void;
        }
    }
    module Calendar {
        function initialize(element: HTMLElement, selectedDate?: Date, settings?: Settings, license?: String): Element;
        function get(element: HTMLElement): Element;
        class Element implements IControlElement, IDateEditor, IMultipleDateEditor, IDateRangeEditor, IMultipleDateRangeEditor {
            host: HTMLElement;
            selectedDate: Date;
            settings: Settings;
            constructor(host: HTMLElement, selectedDate?: Date, settings?: Settings, license?: String);
            isInitialized: boolean;
            private static secondDuration;
            private static minuteDuration;
            private static hourDuration;
            private static dayDuration;
            private static weekDuration;
            private static initialSundayDateTimeValue;
            static initializeSettings(settings: Settings): void;
            refresh(): void;
            private draggingFromDate;
            private draggingToDate;
            getValue(): Date;
            setValue(value: Date): void;
            setDisplayedValue(value: Date): void;
            getValues(): Date[];
            setValues(values: Date[]): void;
            getValueRange(): DateInterval;
            setValueRange(valueRange: DateInterval): void;
            getValueRanges(): DateInterval[];
            setValueRanges(valueRanges: DateInterval[]): void;
            isValueSelected(date: Date): boolean;
            invertValueSelection(date: Date): void;
            selectedDates: Date[];
            selectedDateRange: DateInterval;
            selectedDateRanges: DateInterval[];
            private static getDate(dateTime);
            private static getPreviousWeekStart(dateTime, weekStart);
            private static addDay(date);
            private static subtractDay(date);
            private static addTimeOfDay(date, timeOfDay);
            private static getFirstDayOfMonth(dateTime);
        }
        interface Settings {
            theme?: string;
            isReadOnly?: boolean;
            displayedDate?: Date;
            isTodayLinkVisible?: boolean;
            defaultTimeOfDay?: number;
            calendarSelectorLevels?: number;
            calendarSelectorPopupStyle?: string;
            calendarSelectorPopupClass?: string;
            containerStyle?: string;
            containerClass?: string;
            monthYearHeaderStyle?: string;
            monthYearHeaderClass?: string;
            dayOfWeekHeaderStyle?: string;
            dayOfWeekHeaderClass?: string;
            dayStyle?: string;
            dayClass?: string;
            otherMonthDayStyle?: string;
            otherMonthDayClass?: string;
            selectedDayStyle?: string;
            selectedDayClass?: string;
            todayLinkStyle?: string;
            todayLinkClass?: string;
            months?: string[];
            daysOfWeek?: string[];
            weekStart?: number;
            todayString?: string;
            forceSetOnClick?: boolean;
            displayedDateChangeHandler?(displayedDate: Date): void;
            selectedDateChangeHandler?(selectedDate: Date): void;
            monthRows?: number;
            monthColumns?: number;
            monthCellSpacing?: string;
            monthCellStyle?: string;
            monthCellClass?: string;
            applyMonthStyleForSingleCell?: boolean;
            applyNextMonthButtonToLastColumn?: boolean;
            applyNextMonthButtonToLastRow?: boolean;
            highlightingStyleSelector?: (Date, boolean) => string;
            highlightingClassSelector?: (Date, boolean) => string;
            disabledDayStyle?: string;
            disabledDayClass?: string;
            disabledDateSelector?: (Date) => boolean;
            allowMultipleSelection?: boolean;
            allowRangeSelection?: boolean;
            selectionChangedHandler?(): void;
            minValue?: Date;
        }
    }
    module DatePicker {
        function initialize(element: HTMLElement, value?: Date, settings?: Settings, license?: String): Element;
        function get(element: HTMLElement): Element;
        class Element implements IControlElement, IDateEditor, IDropDown {
            host: HTMLElement;
            value: Date;
            settings: Settings;
            constructor(host: HTMLElement, value?: Date, settings?: Settings, license?: String);
            isInitialized: boolean;
            static initializeSettings(settings: Settings): void;
            refresh(): void;
            private recordClick();
            private isDuringRecordedClick();
            getValue(): Date;
            setValue(value: Date): void;
            setDisplayedValue(value: Date): void;
            refreshValue(): void;
            private resetValue(value?);
            openDropDown(): void;
            closeDropDown(): void;
            private toggleDropDown();
            private inputHost;
            inputElement: HTMLInputElement;
            dropDownButtonElement: HTMLElement;
            popupElement: HTMLElement;
            calendarHost: HTMLElement;
            calendar: Calendar.Element;
            isOpen: boolean;
        }
        interface Settings extends Calendar.Settings {
            dateTimeFormatter?(value: Date): string;
            dateTimeParser?(value: string): Date;
            isNullValueAccepted?: boolean;
            openDropDownOnInputClick?: boolean;
            isDropDownButtonVisible?: boolean;
            dropDownButtonDefinition?: string;
            inputStyle?: string;
            inputClass?: string;
            popupStyle?: string;
            popupClass?: string;
            valueChangeHandler?(value: Date): void;
            dropDownOpenedHandler?(): void;
            dropDownClosedHandler?(): void;
        }
    }
    module CalendarDay {
        class Element implements IControlElement, INumberEditor {
            host: HTMLElement;
            selectedTime: number;
            header: string;
            settings: Settings;
            constructor(host: HTMLElement, selectedTime?: number, header?: string, settings?: Settings, license?: String);
            isInitialized: boolean;
            private static secondDuration;
            private static minuteDuration;
            private static hourDuration;
            private static dayDuration;
            static initializeSettings(settings: Settings): void;
            refresh(): void;
            getValue(): number;
            setValue(value: number): void;
            private static getTime(time, hourDivisions);
        }
        interface Settings {
            theme?: string;
            header?: string;
            isHeaderVisible?: boolean;
            isReadOnly?: boolean;
            isNowLinkVisible?: boolean;
            containerStyle?: string;
            containerClass?: string;
            headerStyle?: string;
            headerClass?: string;
            timeStyle?: string;
            timeClass?: string;
            selectedTimeStyle?: string;
            selectedTimeClass?: string;
            nowLinkStyle?: string;
            nowLinkClass?: string;
            nowString?: string;
            hourDivisions?: number;
            timeFormatter?(value: number): string;
            hourColumns?: number;
            scrollingHeight?: string;
            forceSetOnClick?: boolean;
            selectedTimeChangeHandler?(selectedTime: number): void;
            highlightingStyleSelector?: (number, boolean) => string;
            highlightingClassSelector?: (number, boolean) => string;
            disabledTimeStyle?: string;
            disabledTimeClass?: string;
            disabledTimeSelector?: (number) => boolean;
        }
    }
    module TimePicker {
        function initialize(element: HTMLElement, value?: number, header?: string, settings?: Settings, license?: String): Element;
        function get(element: HTMLElement): Element;
        class Element implements IControlElement, INumberEditor, IDropDown {
            host: HTMLElement;
            value: number;
            header: string;
            settings: Settings;
            constructor(host: HTMLElement, value?: number, header?: string, settings?: Settings, license?: String);
            isInitialized: boolean;
            private static secondDuration;
            private static minuteDuration;
            private static hourDuration;
            private static dayDuration;
            static initializeSettings(settings: Settings): void;
            refresh(): void;
            private recordClick();
            private isDuringRecordedClick();
            private isMouseWheelScrollingPopup(e);
            getValue(): number;
            setValue(value: number): void;
            refreshValue(): void;
            private resetValue(value?);
            openDropDown(): void;
            closeDropDown(): void;
            private toggleDropDown();
            private inputHost;
            inputElement: HTMLInputElement;
            dropDownButtonElement: HTMLElement;
            popupElement: HTMLElement;
            calendarDayHost: HTMLElement;
            calendarDay: CalendarDay.Element;
            isOpen: boolean;
        }
        interface Settings extends CalendarDay.Settings {
            timeParser?(value: string): number;
            isNullValueAccepted?: boolean;
            openDropDownOnInputClick?: boolean;
            isDropDownButtonVisible?: boolean;
            dropDownButtonDefinition?: string;
            inputStyle?: string;
            inputClass?: string;
            popupStyle?: string;
            popupClass?: string;
            defaultPrefix?: string;
            valueChangeHandler?(value: number): void;
            dropDownOpenedHandler?(): void;
            dropDownClosedHandler?(): void;
        }
    }
    module DateTimePicker {
        function initialize(element: HTMLElement, value?: Date, settings?: Settings, license?: String): Element;
        function get(element: HTMLElement): Element;
        class Element implements IElement, IDateEditor, IDropDown {
            host: HTMLElement;
            value: Date;
            settings: Settings;
            constructor(host: HTMLElement, value?: Date, settings?: Settings, license?: String);
            isInitialized: boolean;
            private static secondDuration;
            private static minuteDuration;
            private static hourDuration;
            private static dayDuration;
            static initializeSettings(settings: Settings): void;
            datePicker: DatePicker.Element;
            timePicker: TimePicker.Element;
            inputElement: HTMLInputElement;
            refreshValue(): void;
            getValue(): Date;
            setValue(value: Date): void;
            getTimeValue(): number;
            setTimeValue(value: number): void;
            isOpen: boolean;
            openDropDown(): void;
            closeDropDown(): void;
            isTimeOpen: boolean;
            openTimeDropDown(): void;
            closeTimeDropDown(): void;
            getCurrentValuePart(): string;
        }
        interface Settings {
            theme?: string;
            isReadOnly?: boolean;
            areCurrentLinksVisible?: boolean;
            defaultTimeOfDay?: number;
            dateTimeFormatter?(value: Date): string;
            dateTimeParser?(value: string): Date;
            isNullValueAccepted?: boolean;
            popupStyle?: string;
            popupClass?: string;
            inputStyle?: string;
            inputClass?: string;
            openDropDownOnInputClick?: boolean;
            areDropDownButtonsVisible?: boolean;
            disabledDateSelector?(value: Date): boolean;
            disabledTimeSelector?(value: number): boolean;
            valueChangeHandler?(value: Date): void;
            calendarSelectorLevels?: number;
            months?: string[];
            daysOfWeek?: string[];
            datePickerSettings?: DatePicker.Settings;
            timePickerSettings?: TimePicker.Settings;
        }
    }
    module MultiSelectorComboBox {
        function initialize(element: HTMLElement, availableChoices?: string[], value?: string, settings?: Settings, license?: String): Element;
        function get(element: HTMLElement): Element;
        class Element implements IControlElement, ITextEditor, ITextSelector, IDropDown {
            host: HTMLElement;
            availableChoices: string[];
            value: string;
            settings: Settings;
            constructor(host: HTMLElement, availableChoices?: string[], value?: string, settings?: Settings, license?: String);
            isInitialized: boolean;
            static initializeSettings(settings: Settings): void;
            refresh(): void;
            private recordClick();
            private isDuringRecordedClick();
            private isMouseWheelScrollingPopup(e);
            getValue(): string;
            setValue(value: string): void;
            refreshValue(): void;
            private resetValue(value?);
            private setValueInternal(value?, refresh?);
            refreshAvailableChoices(): void;
            getSelectedChoice(availableOnly?: boolean): string;
            getSelectedChoices(availableOnly?: boolean): string[];
            refreshSelectedChoices(): void;
            selectChoice(choice: string): void;
            unselectChoice(choice: string): void;
            private setSelectedChoice(choice, isSelected, closeDropDown?);
            openDropDown(): void;
            closeDropDown(): void;
            private toggleDropDown();
            private inputHost;
            inputElement: HTMLInputElement;
            dropDownButtonElement: HTMLElement;
            popupElement: HTMLElement;
            checkBoxListElement: HTMLElement;
            checkBoxElements: HTMLElement[];
            isOpen: boolean;
        }
        interface Settings {
            theme?: string;
            isReadOnly?: boolean;
            autoAppendAvailableChoices?: boolean;
            openDropDownOnInputClick?: boolean;
            isDropDownButtonVisible?: boolean;
            dropDownButtonDefinition?: string;
            separator?: string;
            isSpaceSeparated?: boolean;
            delimiters?: string[];
            inputStyle?: string;
            inputClass?: string;
            popupStyle?: string;
            popupClass?: string;
            choiceStyle?: string;
            choiceClass?: string;
            selectedChoiceStyle?: string;
            selectedChoiceClass?: string;
            areCheckBoxesVisible?: boolean;
            valueChangeHandler?(value: string): void;
            dropDownOpenedHandler?(): void;
            dropDownClosedHandler?(): void;
        }
    }
    module ComboBox {
        function initialize(element: HTMLElement, availableChoices?: string[], value?: string, settings?: Settings, license?: String): Element;
        function get(element: HTMLElement): Element;
        class Element extends MultiSelectorComboBox.Element {
            constructor(host: HTMLElement, availableChoices?: string[], value?: string, settings?: Settings, license?: String);
            isInitialized: boolean;
        }
        interface Settings extends MultiSelectorComboBox.Settings {
        }
    }
    module DropDownList {
        function initialize(element: HTMLElement, availableChoices: string[], value?: string, settings?: Settings, license?: String): Element;
        function get(element: HTMLElement): Element;
        class Element extends ComboBox.Element {
        }
        interface Settings extends ComboBox.Settings {
        }
    }
    module ToolTip {
        function initialize(content: any, targetElement: HTMLElement, settings?: Settings, license?: String): Element;
        function get(element: HTMLElement): Element;
        class Element implements IControlElement, IAttached, ISupportsDisabling, ISupportsHiding, ISupportsPositioning, IContentContainer {
            content: any;
            targetElement: HTMLElement;
            settings: Settings;
            constructor(content: any, targetElement: HTMLElement, settings?: Settings, license?: String);
            host: HTMLElement;
            contentContainer: HTMLElement;
            isInitialized: boolean;
            isEnabled: boolean;
            isVisible: boolean;
            static initializeSettings(settings: Settings): void;
            x: number;
            y: number;
            refresh(): void;
            setPosition(x: number, y: number): void;
            setHorizontalPosition(x: number): void;
            setVerticalPosition(y: number): void;
            enable(): void;
            disable(): void;
            show(): void;
            hide(): void;
            private static previouslyShown;
            setContent(content: any): void;
        }
        interface Settings {
            theme?: string;
            isEnabled?: boolean;
            duration?: number;
            isVisible?: boolean;
            containerStyle?: string;
            containerClass?: string;
            shownHandler?(): void;
            hiddenHandler?(): void;
        }
    }
    module Grid {
        function initialize(element: HTMLElement, items?: Item[], settings?: Settings, license?: String): Element;
        function getDefaultColumns(items?: Item[], settings?: Settings): Column[];
        interface Element extends TreeGrid.Element {
        }
        interface Settings extends TreeGrid.Settings {
        }
        interface Column extends TreeGrid.Column {
        }
        interface Item extends TreeGrid.Item {
        }
    }
    interface DateInterval {
        start: Date;
        finish: Date;
    }
    interface IElement {
        isInitialized: boolean;
    }
    interface IControlElement extends IElement {
        refresh(): void;
    }
    interface IContentContainer {
        content: any;
        setContent(content: any): void;
    }
    interface IItemsContainer {
        items: any[];
        setItems(items: any[]): void;
    }
    interface IHoverable {
        isHovering: boolean;
    }
    interface IPressable {
        isPressed: boolean;
    }
    interface IClickable {
        clickHandler(): void;
    }
    interface IChangeable {
        changeHandler(value: any): void;
    }
    interface IEditor {
        getValue(): any;
        setValue(value: any): void;
    }
    interface INumberEditor extends IEditor {
        getValue(): number;
        setValue(value: number): void;
    }
    interface IDateEditor extends IEditor {
        getValue(): Date;
        setValue(value: Date): void;
    }
    interface IMultipleDateEditor extends IDateEditor {
        getValues(): Date[];
        setValues(values: Date[]): void;
    }
    interface IDateRangeEditor extends IDateEditor {
        getValueRange(): DateInterval;
        setValueRange(valueRange: DateInterval): void;
    }
    interface IMultipleDateRangeEditor extends IDateRangeEditor, IMultipleDateEditor {
        getValueRanges(): DateInterval[];
        setValueRanges(valueRanges: DateInterval[]): void;
    }
    interface ITextEditor extends IEditor {
        getValue(): string;
        setValue(value: string): void;
    }
    interface ITextSelector {
        getSelectedChoice(): string;
        getSelectedChoices(): string[];
        selectChoice(value: string): void;
        unselectChoice(value: string): void;
    }
    interface IDropDown {
        isOpen: boolean;
        openDropDown(): void;
        closeDropDown(): void;
    }
    interface IAttached {
        targetElement: HTMLElement;
    }
    interface ISupportsDisabling {
        isEnabled: boolean;
        enable(): void;
        disable(): void;
    }
    interface ISupportsHiding {
        isVisible: boolean;
        show(): void;
        hide(): void;
    }
    interface ISupportsPositioning {
        x: number;
        y: number;
        setPosition(x: number, y: number): void;
        setHorizontalPosition(x: number): void;
        setVerticalPosition(y: number): void;
    }
}
