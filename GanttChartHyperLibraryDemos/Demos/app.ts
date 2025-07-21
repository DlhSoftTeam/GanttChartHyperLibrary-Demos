declare var angular;

var queryString = window.location.search;
var initialSelection = queryString ? queryString.substr(1).replace('-', ' ') : null;

interface Sample {
    component: string;
    feature: string;
    title: string;
    description: string;
    sourceCodeFiles?: { [key: string]: string[] };
    sourceCodeUrls?: { [key: string]: string };
}

angular.module('Demos', [])
    .controller('MainController', ($scope, $http, $timeout, $window) => {
        var components = ['GanttChartView', 'ScheduleChartView', 'LoadChartView', 'PertChartView', 'NetworkDiagramView'];
        var samples = <Sample[]>[
            {
                component: 'GanttChartView', feature: 'MainFeatures', title: 'Main features', description: 'Complex sample application showing how to use the most important features of the component',
                sourceCodeFiles: {
                    'JavaScript': ['index.html', 'app.css', 'app.js', 'themes.js'],
                    'TypeScript': ['index.html', 'app.css', 'app.ts', 'themes.js'],
                    'AngularJS': ['index.html', 'app.css', 'app.ts', 'themes.js'],
                    'Angular': ['app.html', 'app.css', 'app.ts', 'themes.js'],
                    'React': ['index.html', 'app.css', 'app.jsx', 'themes.js'],
                    'Vue': ['index.html', 'app.css', 'app.js', 'themes.js']
                }
            },
            {
                component: 'GanttChartView', feature: 'Performance', title: 'Performance (large data set)', description: 'Shows app responsiveness and other runtime performance features when loading large sets of hierarchical data',
                sourceCodeFiles: {
                    'JavaScript': ['index.html', 'app.css', 'app.js'],
                    'TypeScript': ['index.html', 'app.css', 'app.ts']
                }
            },
            {
                component: 'GanttChartView', feature: 'AssigningResources', title: 'Assigning resources (with multi-selector combo box)', description: 'Shows how resource assignments work and includes code providing automatic Load Chart synchronization',
                sourceCodeFiles: {
                    'JavaScript': ['index.html', 'app.css', 'app.js'],
                    'TypeScript': ['index.html', 'app.css', 'app.ts']
                }
            },
            {
                component: 'GanttChartView', feature: 'AutomaticScheduling', title: 'Automatic scheduling (dependency constraints)', description: 'Shows how task dependency constraints can be enabled to automatically schedule tasks upon all changes',
                sourceCodeFiles: {
                    'JavaScript': ['index.html', 'app.css', 'app.js'],
                    'TypeScript': ['index.html', 'app.css', 'app.ts']
                }
            },
            {
                component: 'GanttChartView', feature: 'ReadOnlySettings', title: 'Read only, visibility, and other behavioral settings', description: 'Shows how you can set up read only, visibility, and other settings on the component and on specific items',
                sourceCodeFiles: {
                    'JavaScript': ['index.html', 'app.css', 'app.js'],
                    'TypeScript': ['index.html', 'app.css', 'app.ts']
                }
            },
            {
                component: 'GanttChartView', feature: 'Interruptions', title: 'Interruptions and other customizations', description: 'Shows how you can set up task template extensions to draw interruptions and also how to customize miscellaneous chart elements',
                sourceCodeFiles: {
                    'JavaScript': ['index.html', 'app.css', 'app.js'],
                    'TypeScript': ['index.html', 'app.css', 'app.ts']
                }
            },
            {
                component: 'GanttChartView', feature: 'Localization', title: 'Localization', description: 'Example of translating the resources (labels, columns, months, days etc.) and to set up the date format.',
                sourceCodeFiles: {
                    'JavaScript': ['index.html', 'app.css', 'app.js'],
                    //'TypeScript': ['index.html', 'app.css', 'app.ts']
                }
            },
            {
                component: 'GanttChartView', feature: 'Filtering', title: 'Filtering and hiding items', description: 'Shows how you can set up an item visibility filter function and hide individual items when needed',
                sourceCodeFiles: {
                    'JavaScript': ['index.html', 'app.css', 'app.js'],
                    'TypeScript': ['index.html', 'app.css', 'app.ts']
                }
            },
            {
                component: 'GanttChartView', feature: 'PredecessorsSuccessors', title: 'Predecessors and successors columns', description: 'Customizing Predecessors column and adding Successors column',
                sourceCodeFiles: {
                    'JavaScript': ['index.html', 'app.css', 'app.js'],
                    'React': ['index.html', 'app.css', 'app.jsx']
                }
            },
            {
                component: 'GanttChartView', feature: 'ChangeNotifications', title: 'Change notifications (item value update handling)', description: 'Shows how custom code can be executed when changes occur on the data presented by the component',
                sourceCodeFiles: {
                    'JavaScript': ['index.html', 'app.css', 'app.js'],
                    'TypeScript': ['index.html', 'app.css', 'app.ts']
                }
            },
            {
                component: 'GanttChartView', feature: 'MouseEvents', title: 'Mouse event handling', description: 'Shows how custom code can be executed when generic or specific mouse events occur within the component',
                sourceCodeFiles: {
                    'JavaScript': ['index.html', 'app.css', 'app.js'],
                    'TypeScript': ['index.html', 'app.css', 'app.ts']
                }
            },
            {
                component: 'GanttChartView', feature: 'CustomTemplate', title: 'Custom template (drawing item bars using custom SVG)', description: 'Shows how you can write code to customize drawing standard item bars in the chart area using SVG elements',
                sourceCodeFiles: {
                    'JavaScript': ['index.html', 'app.css', 'app.js'],
                    'TypeScript': ['index.html', 'app.css', 'app.ts']
                }
            },
            {
                component: 'GanttChartView', feature: 'ExtraTemplate', title: 'Add elements to the item bars using custom SVG', description: 'Shows how you can write code to add objects to a standard item bar in the chart area using SVG elements',
                sourceCodeFiles: {
                    'JavaScript': ['index.html', 'app.css', 'app.js']
                }
            },
            {
                component: 'GanttChartView', feature: 'BuiltinScales', title: 'Built-in scales (from years to hours)', description: 'Shows how you can combine and use built-in scale types, text header formats, and related settings',
                sourceCodeFiles: {
                    'JavaScript': ['index.html', 'app.css', 'app.js'],
                    'TypeScript': ['index.html', 'app.css', 'app.ts'],
                    'Angular': ['app.html', 'app.css', 'app.ts', 'themes.js']
                }
            },
            {
                component: 'GanttChartView', feature: 'CustomScale', title: 'Custom scale (time intervals and header texts)', description: 'Shows how to define a fully custom chart scale with special time intervals and text headers',
                sourceCodeFiles: {
                    'JavaScript': ['index.html', 'app.css', 'app.js'],
                    'TypeScript': ['index.html', 'app.css', 'app.ts']
                }
            },
            {
                component: 'GanttChartView', feature: 'ContextMenus', title: 'Context menus', description: 'Shows how you can set up item and dependency line context menus',
                sourceCodeFiles: {
                    'JavaScript': ['index.html', 'app.css', 'app.js'],
                    'TypeScript': ['index.html', 'app.css', 'app.ts']
                }
            },
            {
                component: 'GanttChartView', feature: 'Statuses', title: 'Status columns (including color indicator)', description: 'Shows how to add supplemental custom columns for showing task statuses, such as To do, In progress, Behind schedule, and Completed',
                sourceCodeFiles: {
                    'JavaScript': ['index.html', 'app.css', 'app.js'],
                    'TypeScript': ['index.html', 'app.css', 'app.ts']
                }
            },
            {
                component: 'GanttChartView', feature: 'MinuteScale', title: 'Minute scale (zoom in to hour quaters and minutes)', description: 'Shows how to zoom in and display hour quarters and minutes in the chart area',
                sourceCodeFiles: {
                    'JavaScript': ['index.html', 'app.css', 'app.js'],
                    'TypeScript': ['index.html', 'app.css', 'app.ts']
                }
            },
            {
                component: 'GanttChartView', feature: 'DateTimeFormats', title: 'Date and time formats (simple or fully customized)', description: 'Shows how to set up custom formatting for dates, times, and durations',
                sourceCodeFiles: {
                    'JavaScript': ['index.html', 'app.css', 'app.js'],
                    'TypeScript': ['index.html', 'app.css', 'app.ts']
                }
            },
            {
                component: 'GanttChartView', feature: 'DateOnly', title: 'Date Only', description: 'Shows how to set up dateTimePicker to show only date',
                sourceCodeFiles: {
                    'JavaScript': ['index.html', 'app.css', 'app.js'],
                    'TypeScript': ['index.html', 'app.css', 'app.ts']
                }
            },
            {
                component: 'GanttChartView', feature: 'DateTimePickerStyling', title: 'Date and time picker styling', description: 'Shows how to style up elements from date time picker using CSS classes',
                sourceCodeFiles: {
                    'JavaScript': ['index.html', 'app.css', 'app.js'],
                    'TypeScript': ['index.html', 'app.css', 'app.ts']
                }
            },
            {
                component: 'GanttChartView', feature: 'SpecialDays', title: 'Special days (vertically highlight specific time intervals)', description: 'Shows how you can highlight special time intervals in the chart area',
                sourceCodeFiles: {
                    'JavaScript': ['index.html', 'app.css', 'app.js'],
                    'TypeScript': ['index.html', 'app.css', 'app.ts']
                }
            },
            {
                component: 'GanttChartView', feature: 'SummaryUpdating', title: 'Summary updating (using drag operations)', description: 'Shows how to setup a custom template to allow dragging summary items and automatically update child tasks accordingly',
                sourceCodeFiles: {
                    'JavaScript': ['index.html', 'app.css', 'app.js']
                }
            },
            {
                component: 'GanttChartView', feature: 'SummaryBackgroundColors', title: 'Summary background colors', description: 'Shows how to setup a custom template to draw background rectangles of custom colors enclosing summary items and their child tasks',
                sourceCodeFiles: {
                    'JavaScript': ['index.html', 'app.css', 'app.js']
                }
            },
            {
                component: 'GanttChartView', feature: 'MultipleBarsPerItem', title: 'Multiple bars per item (parts)', description: 'Shows how you can define and display multiple bars for each task (i.e. item parts)',
                sourceCodeFiles: {
                    'JavaScript': ['index.html', 'app.css', 'app.js'],
                    'TypeScript': ['index.html', 'app.css', 'app.ts']
                }
            },
            {
                component: 'GanttChartView', feature: 'UndoRedo', title: 'Undo-redo (using Undo Management Library)', description: 'Shows how you can add support for undo and redo operations for the Gantt Chart items – using UndoStack component from DlhSoft Undo Management Library, available separately for free as open source',
                sourceCodeFiles: {
                    'JavaScript': ['index.html', 'app.css', 'app.js'],
                    'TypeScript': ['index.html', 'app.css', 'app.ts']
                }
            },
            {
                component: 'GanttChartView', feature: 'WorkOptimizations', title: 'Work optimizations (reschedule project, level resources)', description: 'Shows how you can optimize project timeline and avoiding resource over-allocation',
                sourceCodeFiles: {
                    'JavaScript': ['index.html', 'app.css', 'app.js'],
                    'TypeScript': ['index.html', 'app.css', 'app.ts']
                }
            },
            {
                component: 'GanttChartView', feature: 'SelectionModes', title: 'Selection mode (single, extended, by clicking)', description: 'Shows how you can set up selection mode and handle item selection changes in the component',
                sourceCodeFiles: {
                    'JavaScript': ['index.html', 'app.css', 'app.js'],
                    'TypeScript': ['index.html', 'app.css', 'app.ts']
                }
            },
            {
                component: 'GanttChartView', feature: 'CriticalPath', title: 'Critical path (tasks that affect project finish)', description: 'Shows how you can determine and highlight critical tasks in your project (i.e. those that would affect the project finish date if their duration would increase)',
                sourceCodeFiles: {
                    'JavaScript': ['index.html', 'app.css', 'app.js'],
                    'TypeScript': ['index.html', 'app.css', 'app.ts']
                }
            },
            {
                component: 'GanttChartView', feature: 'ContinuousSchedule', title: 'Continuous schedule (non-stop working time)', description: 'Shows how to define continuous working time for tasks (24/7)',
                sourceCodeFiles: {
                    'JavaScript': ['index.html', 'app.css', 'app.js'],
                    'TypeScript': ['index.html', 'app.css', 'app.ts']
                }
            },
            {
                component: 'GanttChartView', feature: 'CustomSchedules', title: 'Custom schedules (general and for individual tasks)', description: 'Shows how to define custom working time and special nonworking days for all tasks with individual exceptions',
                sourceCodeFiles: {
                    'JavaScript': ['index.html', 'app.css', 'app.js'],
                    'TypeScript': ['index.html', 'app.css', 'app.ts']
                }
            },
            {
                component: 'GanttChartView', feature: 'Styling', title: 'Styling (with CSS classes)', description: 'Shows how to style up elements defined by the component using CSS classes',
                sourceCodeFiles: {
                    'JavaScript': ['index.html', 'app.css', 'app.js'],
                    'TypeScript': ['index.html', 'app.css', 'app.ts'],
                    'React': ['index.html', 'app.css', 'app.jsx']
                }
            },
            {
                component: 'GanttChartView', feature: 'ResourceImagesAsAssignments', title: 'Resource icons as assignments', description: 'Shows how you can show resource icons in the chart area instead of assigned resource names',
                sourceCodeFiles: {
                    'JavaScript': ['index.html', 'app.css', 'app.js']
                }
            },
            {
                component: 'GanttChartView', feature: 'AssignmentsTemplate', title: 'Assignments template (resource icons)', description: 'Shows how you can customize assignments template and show resource icons in the chart area',
                sourceCodeFiles: {
                    'JavaScript': ['index.html', 'app.css', 'app.js'],
                    'TypeScript': ['index.html', 'app.css', 'app.ts']
                }
            },
            {
                component: 'GanttChartView', feature: 'Labels', title: 'Bar labels', description: 'Shows how to define labels on the standard, summary, and milestone bars and customize their styles.',
                sourceCodeFiles: {
                    'JavaScript': ['index.html', 'app.css', 'app.js']
                }
            },
            {
                component: 'GanttChartView', feature: 'MaterialResources', title: 'Material resources (quantities and costs)', description: 'Shows how you can assign material resources having limited or unlimited available quantities and compute task costs based on the allocations',
                sourceCodeFiles: {
                    'JavaScript': ['index.html', 'app.css', 'app.js'],
                    'TypeScript': ['index.html', 'app.css', 'app.ts']
                }
            },
            {
                component: 'GanttChartView', feature: 'TimeConstraints', title: 'Time constraints (minimum-maximum start and finish)', description: 'Shows how you can set up constraints on item date and times using minimum and/or maximum values',
                sourceCodeFiles: {
                    'JavaScript': ['index.html', 'app.css', 'app.js'],
                    'TypeScript': ['index.html', 'app.css', 'app.ts']
                }
            },
            {
                component: 'GanttChartView', feature: 'WBS', title: 'WBS path (work breakdown structure column)', description: 'Shows how you can easily insert a WBS column to the grid',
                sourceCodeFiles: {
                    'JavaScript': ['index.html', 'app.css', 'app.js'],
                    'TypeScript': ['index.html', 'app.css', 'app.ts']
                }
            },
            {
                component: 'GanttChartView', feature: 'Columns', title: 'Grid columns (built-in and custom)', description: 'Shows how to add supplemental built-in and custom grid columns including a column presenting task icon thumbs that offer vertical drag and drop support',
                sourceCodeFiles: {
                    'JavaScript': ['index.html', 'app.css', 'app.js'],
                    'TypeScript': ['index.html', 'app.css', 'app.ts']
                }
            },
            {
                component: 'GanttChartView', feature: 'MoveUpDown', title: 'Move up-down (hierarchical moving)', description: 'Shows how you can allow the end user to move items up and down without breaking the hierarchy',
                sourceCodeFiles: {
                    'JavaScript': ['index.html', 'app.css', 'app.js'],
                    'TypeScript': ['index.html', 'app.css', 'app.ts']
                }
            },
            {
                component: 'GanttChartView', feature: 'ZoomLevel', title: 'Zoom level (and disabling mouse wheel zooming)', description: 'Shows how you can set up zoom level settings for the chart area',
                sourceCodeFiles: {
                    'JavaScript': ['index.html', 'app.css', 'app.js'],
                    'TypeScript': ['index.html', 'app.css', 'app.ts']
                }
            },
            {
                component: 'GanttChartView', feature: 'Baseline', title: 'Baseline (estimation time bars vs. actual task bars)', description: 'Shows how you can define and display estimation bars for tasks (i.e. project baseline)',
                sourceCodeFiles: {
                    'JavaScript': ['index.html', 'app.css', 'app.js'],
                    'TypeScript': ['index.html', 'app.css', 'app.ts']
                }
            },
            {
                component: 'GanttChartView', feature: 'ProjectXml', title: 'Importing and exporting Microsoft® Project XML', description: 'Shows how you can import and export Microsoft® Project XML schema based content, providing maximum compatibility with other applications',
                sourceCodeFiles: {
                    'JavaScript': ['index.html', 'app.css', 'app.js'],
                    'TypeScript': ['index.html', 'app.css', 'app.ts']
                }
            },
            {
                component: 'GanttChartView', feature: 'Printing', title: 'Printing (virtual printers, e.g. Print to PDF, supported)', description: 'Includes code that initiates a print operation; end user can select the printer to use (virtual printers such as Print to PDF are supported as well)',
                sourceCodeFiles: {
                    'JavaScript': ['index.html', 'app.css', 'app.js'],
                    'TypeScript': ['index.html', 'app.css', 'app.ts'],
                    'React': ['index.html', 'app.css', 'app.jsx']
                }
            },
            {
                component: 'GanttChartView', feature: 'ExportPngImage-PMF', title: 'Export image (using Project Management Framework)', description: 'Shows how to generate PNG images for the current Gantt Chart – using TaskManager component from DlhSoft Project Management Framework, available separately for free to Gantt Chart Hyper Library licensees',
                sourceCodeFiles: {
                    'JavaScript': ['index.html', 'app.css', 'app.js', 'GetPng.aspx.cs'],
                    'TypeScript': ['index.html', 'app.css', 'app.ts', 'GetPng.aspx.cs']
                }
            },
            {
                component: 'GanttChartView', feature: 'HierarchicalVirtualization', title: 'Hierarchical virtualization (lazy loading)', description: 'Shows how to develop summary task virtualization and lazy load child tasks only upon parent node expansion',
                sourceCodeFiles: {
                    'JavaScript': ['index.html', 'app.css', 'app.js']
                }
            },
            {
                component: 'GanttChartView', feature: 'AssignmentsTree-HL', title: 'Assignments tree (using TreeGrid from Hyper Library)', description: 'Shows how to show a custom popup allowing the end user to select assigned resources (or departments) from an organizational hierarchy – using TreeGrid control from DlhSoft Hyper Library, sold separately',
                sourceCodeFiles: {
                    'JavaScript': ['index.html', 'app.css', 'app.js']
                }
            },
            {
                component: 'ScheduleChartView', feature: 'MainFeatures', title: 'Main features', description: 'Complex sample application showing how to use the most important features of the component',
                sourceCodeFiles: {
                    'JavaScript': ['index.html', 'app.css', 'app.js', 'themes.js'],
                    'Angular': ['app.html', 'app.css', 'app.ts', 'themes.js'],
                    'React': ['index.html', 'app.css', 'app.jsx', 'themes.js'],
                    'Vue': ['index.html', 'app.css', 'app.js', 'themes.js']
                }
            },
            {
                component: 'ScheduleChartView', feature: 'BasicUsage', title: 'Basic usage', description: 'Sample application showing how to use the component',
                sourceCodeFiles: {
                    'TypeScript': ['index.html', 'app.css', 'app.ts', 'themes.js'],
                    'AngularJS': ['index.html', 'app.css', 'app.ts', 'themes.js']
                }
            },
            {
                component: 'ScheduleChartView', feature: 'AssigningTasks', title: 'Assigning tasks (drag unassigned items)', description: 'Shows how you can define a Gantt Chart displaying unassigned items and allowing the end user to drag items from that area to a Schedule Chart and assign tasks to specific resources',
                sourceCodeFiles: {
                    'JavaScript': ['index.html', 'app.css', 'app.js'],
                    'TypeScript': ['index.html', 'app.css', 'app.ts']
                }
            },
            {
                component: 'ScheduleChartView', feature: 'HierarchyLabelsAndImages', title: 'Hierarchy + task labels & resource icons', description: 'Sample application showing how to display expandable groups of resources in a hierarchical fashion and adding labels to the task bars, dependencies between them, and a resource image grid column as well.',
                sourceCodeFiles: {
                    'JavaScript': ['index.html', 'app.css', 'app.js'],
                }
            },
            {
                component: 'ScheduleChartView', feature: 'GanttChartIntegration', title: 'Gantt Chart integration', description: 'Sample application showing how to generate a Schedule Chart view from Gantt Chart data',
                sourceCodeFiles: {
                    'JavaScript': ['index.html', 'app.css', 'app.js'],
                    'TypeScript': ['index.html', 'app.css', 'app.ts'],
                    'AngularJS': ['index.html', 'app.css', 'app.ts']
                }
            },
            {
                component: 'ScheduleChartView', feature: 'Filtering', title: 'Filtering and hiding items', description: 'Shows how you can set up an item visibility filter function and hide individual items when needed',
                sourceCodeFiles: {
                    'JavaScript': ['index.html', 'app.css', 'app.js'],
                    'TypeScript': ['index.html', 'app.css', 'app.ts']
                }
            },
            {
                component: 'ScheduleChartView', feature: 'Hierarchy', title: 'Hierarchy (resource groups)', description: 'Sample application showing how to display expandable groups of resources in a hierarchical fashion',
                sourceCodeFiles: {
                    'JavaScript': ['index.html', 'app.css', 'app.js'],
                    'TypeScript': ['index.html', 'app.css', 'app.ts']
                }
            },
            {
                component: 'ScheduleChartView', feature: 'Columns', title: 'Grid columns (custom)', description: 'Shows how to add supplemental custom grid columns',
                sourceCodeFiles: {
                    'JavaScript': ['index.html', 'app.css', 'app.js'],
                    'TypeScript': ['index.html', 'app.css', 'app.ts']
                }
            },
            {
                component: 'ScheduleChartView', feature: 'ReadOnlySettings', title: 'Read only, visibility, and other behavioral settings', description: 'Shows how you can set up read only, visibility, and other settings on the component and on specific items',
                sourceCodeFiles: {
                    'JavaScript': ['index.html', 'app.css', 'app.js'],
                    'TypeScript': ['index.html', 'app.css', 'app.ts']
                }
            },
            {
                component: 'ScheduleChartView', feature: 'MouseEvents', title: 'Mouse event handling', description: 'Shows how custom code can be executed when generic or specific mouse events occur within the component',
                sourceCodeFiles: {
                    'JavaScript': ['index.html', 'app.css', 'app.js'],
                    'TypeScript': ['index.html', 'app.css', 'app.ts']
                }
            },
            {
                component: 'ScheduleChartView', feature: 'ChangeNotifications', title: 'Change notifications (item value update handling)', description: 'Shows how custom code can be executed when changes occur on the data presented by the component',
                sourceCodeFiles: {
                    'JavaScript': ['index.html', 'app.css', 'app.js'],
                    'TypeScript': ['index.html', 'app.css', 'app.ts']
                }
            },
            {
                component: 'ScheduleChartView', feature: 'BuiltinScales', title: 'Built-in scales (from years to hours)', description: 'Shows how you can combine and use built-in scale types, text header formats, and related settings',
                sourceCodeFiles: {
                    'JavaScript': ['index.html', 'app.css', 'app.js'],
                    'TypeScript': ['index.html', 'app.css', 'app.ts']
                }
            },
            {
                component: 'ScheduleChartView', feature: 'ZoomLevel', title: 'Zoom level (and disabling mouse wheel zooming)', description: 'Shows how you can set up zoom level settings for the chart area',
                sourceCodeFiles: {
                    'JavaScript': ['index.html', 'app.css', 'app.js'],
                    'TypeScript': ['index.html', 'app.css', 'app.ts']
                }
            },
            {
                component: 'ScheduleChartView', feature: 'CustomScale', title: 'Custom scale (time intervals and header texts)', description: 'Shows how to define a fully custom chart scale with special time intervals and text headers',
                sourceCodeFiles: {
                    'JavaScript': ['index.html', 'app.css', 'app.js'],
                    'TypeScript': ['index.html', 'app.css', 'app.ts']
                }
            },
            {
                component: 'ScheduleChartView', feature: 'SpecialDays', title: 'Special days (vertically highlight specific time intervals)', description: 'Shows how you can highlight special time intervals in the chart area',
                sourceCodeFiles: {
                    'JavaScript': ['index.html', 'app.css', 'app.js'],
                    'TypeScript': ['index.html', 'app.css', 'app.ts']
                }
            },
            {
                component: 'ScheduleChartView', feature: 'HighlightingNonworkingTimeForSpecificResources', title: 'Nonworking time for specific resources', description: 'Shows how you can highlight special time intervals in the chart area for a specific resources',
                sourceCodeFiles: {
                    'JavaScript': ['index.html', 'app.css', 'app.js']
                }
            },
            {
                component: 'ScheduleChartView', feature: 'ContinuousSchedule', title: 'Continuous schedule (non-stop working time)', description: 'Shows how to define continuous working time for tasks (24/7)',
                sourceCodeFiles: {
                    'JavaScript': ['index.html', 'app.css', 'app.js'],
                    'TypeScript': ['index.html', 'app.css', 'app.ts']
                }
            },
            {
                component: 'ScheduleChartView', feature: 'Styling', title: 'Styling (with CSS classes)', description: 'Shows how to style up elements defined by the component using CSS classes',
                sourceCodeFiles: {
                    'JavaScript': ['index.html', 'app.css', 'app.js'],
                    'TypeScript': ['index.html', 'app.css', 'app.ts']
                }
            },
            {
                component: 'ScheduleChartView', feature: 'ResourceStatus', title: 'Status displaying (resource timeline)', description: 'Sample application showing how you can display multiple resources and their status at different times using chart bars of different colors',
                sourceCodeFiles: {
                    'JavaScript': ['index.html', 'app.css', 'app.js'],
                    'TypeScript': ['index.html', 'app.css', 'app.ts'],
                }
            },
            {
                component: 'ScheduleChartView', feature: 'ShiftScheduling', title: 'Shift scheduling (assigning employees on time shifts)', description: 'Shows how you can define shifts as resource assignments so that the end user can drag and drop them vertically to change shifts as needed',
                sourceCodeFiles: {
                    'JavaScript': ['index.html', 'app.css', 'app.js'],
                    'TypeScript': ['index.html', 'app.css', 'app.ts']
                }
            },
            {
                component: 'ScheduleChartView', feature: 'CustomTemplate', title: 'Custom template (drawing item bars using custom SVG)', description: 'Shows how you can write code to customize drawing standard item bars in the chart area using SVG elements',
                sourceCodeFiles: {
                    'JavaScript': ['index.html', 'app.css', 'app.js'],
                    'TypeScript': ['index.html', 'app.css', 'app.ts']
                }
            },
            {
                component: 'ScheduleChartView', feature: 'Printing', title: 'Printing (virtual printers, e.g. Print to PDF, supported)', description: 'Includes code that initiates a print operation; end user can select the printer to use (virtual printers such as Print to PDF are supported as well)',
                sourceCodeFiles: {
                    'JavaScript': ['index.html', 'app.css', 'app.js'],
                    'TypeScript': ['index.html', 'app.css', 'app.ts']
                }
            },
            {
                component: 'LoadChartView', feature: 'MainFeatures', title: 'Main features', description: 'Complex sample application showing how to use the most important features of the component',
                sourceCodeFiles: {
                    'JavaScript': ['index.html', 'app.css', 'app.js', 'themes.js'],
                    'Angular': ['app.html', 'app.css', 'app.ts', 'themes.js'],
                    'React': ['index.html', 'app.css', 'app.jsx', 'themes.js'],
                    'Vue': ['index.html', 'app.css', 'app.js', 'themes.js']
                }
            },
            {
                component: 'LoadChartView', feature: 'BasicUsage', title: 'Basic usage', description: 'Sample application showing how to use the component',
                sourceCodeFiles: {
                    'TypeScript': ['index.html', 'app.css', 'app.ts', 'themes.js'],
                    'AngularJS': ['index.html', 'app.css', 'app.ts', 'themes.js']
                }
            },
            {
                component: 'LoadChartView', feature: 'SingleItem', title: 'Single item', description: 'Sample application showing how to display a single item with multiple allocations',
                sourceCodeFiles: {
                    'JavaScript': ['index.html', 'app.css', 'app.js'],
                    'TypeScript': ['index.html', 'app.css', 'app.ts'],
                    'AngularJS': ['index.html', 'app.css', 'app.ts']
                }
            },
            {
                component: 'LoadChartView', feature: 'GanttChartIntegration', title: 'Gantt Chart integration', description: 'Sample application showing how to generate a Load Chart view from Gantt Chart data',
                sourceCodeFiles: {
                    'JavaScript': ['index.html', 'app.css', 'app.js'],
                    'TypeScript': ['index.html', 'app.css', 'app.ts'],
                    'AngularJS': ['index.html', 'app.css', 'app.ts']
                }
            },
            {
                component: 'LoadChartView', feature: 'BuiltinScales', title: 'Built-in scales (from years to hours)', description: 'Shows how you can combine and use built-in scale types, text header formats, and related settings',
                sourceCodeFiles: {
                    'JavaScript': ['index.html', 'app.css', 'app.js'],
                    'TypeScript': ['index.html', 'app.css', 'app.ts']
                }
            },
            {
                component: 'LoadChartView', feature: 'Styling', title: 'Styling (with CSS classes)', description: 'Shows how to style up elements defined by the component using CSS classes',
                sourceCodeFiles: {
                    'JavaScript': ['index.html', 'app.css', 'app.js'],
                    'TypeScript': ['index.html', 'app.css', 'app.ts']
                }
            },
            {
                component: 'LoadChartView', feature: 'Printing', title: 'Printing (virtual printers, e.g. Print to PDF, supported)', description: 'Includes code that initiates a print operation; end user can select the printer to use (virtual printers such as Print to PDF are supported as well)',
                sourceCodeFiles: {
                    'JavaScript': ['index.html', 'app.css', 'app.js'],
                    'TypeScript': ['index.html', 'app.css', 'app.ts']
                }
            },
            {
                component: 'PertChartView', feature: 'MainFeatures', title: 'Main features', description: 'Complex sample application showing how to use the most important features of the component',
                sourceCodeFiles: {
                    'JavaScript': ['index.html', 'app.css', 'app.js', 'themes.js'],
                    'Angular': ['app.html', 'app.css', 'app.ts', 'themes.js'],
                    'React': ['index.html', 'app.css', 'app.jsx', 'themes.js'],
                    'Vue': ['index.html', 'app.css', 'app.js', 'themes.js']
                }
            },
            {
                component: 'PertChartView', feature: 'BasicUsage', title: 'Basic usage', description: 'Sample application showing how to use the component',
                sourceCodeFiles: {
                    'TypeScript': ['index.html', 'app.css', 'app.ts',  'themes.js'],
                    'AngularJS': ['index.html', 'app.css', 'app.ts', 'themes.js']
                }
            },
            {
                component: 'PertChartView', feature: 'GanttChartIntegration', title: 'Gantt Chart integration', description: 'Sample application showing how to generate a PERT Chart view from Gantt Chart data',
                sourceCodeFiles: {
                    'JavaScript': ['index.html', 'app.css', 'app.js'],
                    'TypeScript': ['index.html', 'app.css', 'app.ts'],
                    'AngularJS': ['index.html', 'app.css', 'app.ts']
                }
            },
            {
                component: 'PertChartView', feature: 'Styling', title: 'Styling (with CSS classes)', description: 'Shows how to style up elements defined by the component using CSS classes',
                sourceCodeFiles: {
                    'JavaScript': ['index.html', 'app.css', 'app.js'],
                    'TypeScript': ['index.html', 'app.css', 'app.ts']
                }
            },
            {
                component: 'PertChartView', feature: 'Printing', title: 'Printing (virtual printers, e.g. Print to PDF, supported)', description: 'Includes code that initiates a print operation; end user can select the printer to use (virtual printers such as Print to PDF are supported as well)',
                sourceCodeFiles: {
                    'JavaScript': ['index.html', 'app.css', 'app.js'],
                    'TypeScript': ['index.html', 'app.css', 'app.ts']
                }
            },
            {
                component: 'NetworkDiagramView', feature: 'MainFeatures', title: 'Main features', description: 'Complex sample application showing how to use the most important features of the component',
                sourceCodeFiles: {
                    'JavaScript': ['index.html', 'app.css', 'app.js', 'themes.js'],
                    'Angular': ['app.html', 'app.css', 'app.ts', 'themes.js'],
                    'React': ['index.html', 'app.css', 'app.jsx', 'themes.js'],
                    'Vue': ['index.html', 'app.css', 'app.js', 'themes.js']
                }
            },
            {
                component: 'NetworkDiagramView', feature: 'BasicUsage', title: 'Basic usage', description: 'Sample application showing how to use the component',
                sourceCodeFiles: {
                    'TypeScript': ['index.html', 'app.css', 'app.ts', 'themes.js'],
                    'AngularJS': ['index.html', 'app.css', 'app.ts', 'themes.js']
                }
            },
            {
                component: 'NetworkDiagramView', feature: 'GanttChartIntegration', title: 'Gantt Chart integration', description: 'Sample application showing how to generate a Network Diagram view from Gantt Chart data',
                sourceCodeFiles: {
                    'JavaScript': ['index.html', 'app.css', 'app.js'],
                    'TypeScript': ['index.html', 'app.css', 'app.ts'],
                    'AngularJS': ['index.html', 'app.css', 'app.ts']
                }
            },
            {
                component: 'NetworkDiagramView', feature: 'Styling', title: 'Styling (with CSS classes)', description: 'Shows how to style up elements defined by the component using CSS classes',
                sourceCodeFiles: {
                    'JavaScript': ['index.html', 'app.css', 'app.js'],
                    'TypeScript': ['index.html', 'app.css', 'app.ts']
                }
            },
            {
                component: 'NetworkDiagramView', feature: 'Printing', title: 'Printing (virtual printers, e.g. Print to PDF, supported)', description: 'Includes code that initiates a print operation; end user can select the printer to use (virtual printers such as Print to PDF are supported as well)',
                sourceCodeFiles: {
                    'JavaScript': ['index.html', 'app.css', 'app.js'],
                    'TypeScript': ['index.html', 'app.css', 'app.ts']
                }
            },
            {
                component: 'GanttChartView', feature: 'SinglePageDatabase', title: 'SQL Server® + ASP .NET WebAPI', description: 'Single page app accessing data using ASP .NET WebAPI from a SQL Server® database',
                sourceCodeUrls: {
                    'JavaScript': 'https://DlhSoft.com/KnowledgeBase/GanttChartSinglePageDatabaseSample.zip',
                    'AngularJS': 'https://GitHub.com/DlhSoftTeam/Angular-GanttChartViewSampleApp/archive/master.zip'
                }
            },
            {
                component: 'GanttChartView', feature: 'PHP', title: 'PHP', description: 'PHP based sample application with server side change handling',
                sourceCodeUrls: {
                    'JavaScript': 'https://GitHub.com/DlhSoftTeam/Php-GanttChartViewSampleApp/archive/master.zip'
                }
            },
            {
                component: 'GanttChartView', feature: 'NodeJS', title: 'Node.js® + Express + pug', description: 'Simple Node.js® based application developed using pug template engine and Express framework',
                sourceCodeUrls: {
                    'JavaScript': 'https://github.com/DlhSoftTeam/NodeJS-GanttChartViewSampleApp/archive/master.zip'
                }
            },
            {
                component: 'GanttChartView', feature: 'Python', title: 'Python™ + Flask', description: 'Simple Python™ based application developed using Flask Web framework',
                sourceCodeUrls: {
                    'JavaScript': 'https://github.com/DlhSoftTeam/Python-GanttChartViewSampleApp/archive/master.zip'
                }
            },
            {
                component: 'GanttChartView', feature: 'LightSwitch', title: 'LightSwitch® (HTML)', description: 'HTML based LightSwitch® app',
                sourceCodeUrls: {
                    'JavaScript': 'https://DlhSoft.com/KnowledgeBase/GanttChartHtmlSample.zip'
                }
            },
            {
                component: 'GanttChartView', feature: 'WindowsStoreApp', title: 'Windows® Store app (UWP)', description: 'Windows® Universal Platform (UWP) app using JavaScript®',
                sourceCodeUrls: {
                    'JavaScript': 'https://DlhSoft.com/KnowledgeBase/GanttChartJavaScriptStoreAppSample.zip'
                }
            },
            {
                component: 'GanttChartView', feature: 'Cordova', title: 'Multi-device (Cordova™)', description: 'Cordova™ tools based multi-device hybrid app targeting Windows (UWP), Android, and iOS',
                sourceCodeUrls: {
                    'JavaScript': 'https://DlhSoft.com/KnowledgeBase/GanttChartMDHASample.zip'
                }
            }
        ];
        var themes = ['Default', 'Generic-bright', 'Generic-blue', 'Blue-green', 'Royal-blue', 'DlhSoft-gray', 'Purple-green', 'Steel-blue', 'Dark-black', 'Cyan-green', 'Blue-navy', 'Orange-brown', 'Teal-green', 'Purple-beige', 'Gray-blue', 'Aero'];
        $scope.themes = themes;
        $scope.selectedTheme = themes[3];
        $scope.selectTheme = (theme) => {
            if (theme == $scope.selectedTheme)
                return;
            $scope.applyingTheme = theme;
            $scope.selectedTheme = null;
            $timeout(() => {
                $scope.selectedTheme = theme;
                $scope.applyingTheme = null;
                $scope.run();
            });
        };
        var technologies = [{ name: 'JavaScript', title: 'HTML + JavaScript®' }, { name: 'TypeScript', title: 'HTML + TypeScript' }, { name: 'AngularJS', title: 'AngularJS' }, { name: 'Angular', title: 'Angular 8' }, { name: 'React', title: 'React' }, { name: 'Vue', title: 'Vue' }];
        $scope.technologies = technologies;
        $scope.selectedTechnology = technologies[0];
        var getSamples = (component, selectedTechnology) => {
            var componentSamples = [];
            for (var i = 0; i < samples.length; i++) {
                var sample = samples[i];
                if (sample.component == component &&
                    ((sample.sourceCodeFiles && sample.sourceCodeFiles[selectedTechnology.name]) ||
                     (sample.sourceCodeUrls && sample.sourceCodeUrls[selectedTechnology.name])))
                    componentSamples.push(sample);
            }
            return componentSamples;
        };
        var getComponents = (selectedTechnology) => {
            var components = [];
            for (var i = 0; i < samples.length; i++) {
                var sample = samples[i];
                var component = sample.component;
                if (components.indexOf(component) < 0 &&
                    ((sample.sourceCodeFiles && sample.sourceCodeFiles[selectedTechnology.name]) ||
                     (sample.sourceCodeUrls && sample.sourceCodeUrls[selectedTechnology.name])))
                    components.push(component);
            }
            return components;
        };
        var selectSample = (sample) => {
            $scope.selectedSample = sample;
            $scope.run();
        };
        var selectComponent = (component) => {
            var firstComponentSample;
            for (var i = 0; i < samples.length; i++) {
                var sample = samples[i];
                if (sample.component == component) {
                    if (sample.feature == $scope.selectedSample.feature && sample.sourceCodeFiles[$scope.selectedTechnology.name]) {
                        selectSample(sample);
                        return;
                    }
                    if (!firstComponentSample && sample.sourceCodeFiles[$scope.selectedTechnology.name])
                        firstComponentSample = sample;
                }
            }
            selectSample(firstComponentSample);
        };
        $scope.selectTechnology = (technology) => {
            if (technology == $scope.selectedTechnology)
                return;
            if (technology.url != null) {
                $window.open(technology.url, technology.name);
                return;
            }
            $scope.selectedTechnology = technology;
            var selectedSample = $scope.selectedSample;
            var selectedComponent = selectedSample.component;
            var selectedFeature = selectedSample.feature;
            if (getComponents(technology).indexOf(selectedComponent) < 0)
                selectComponent(selectedComponent = components[0]);
            var componentSamples = getSamples(selectedComponent, technology);
            var featureSampleFound = false;
            for (var i = 0; i < componentSamples.length; i++) {
                var sample = componentSamples[i];
                if (sample.feature == selectedFeature && sample.sourceCodeFiles && sample.sourceCodeFiles[technology.name]) {
                    featureSampleFound = true;
                    selectSample(sample);
                    break;
                }
            }
            if (!featureSampleFound)
                selectSample(componentSamples[0]);
            $scope.run();
        };
        $scope.components = components;
        $scope.samples = samples;
        $scope.selectedSample = samples[0];
        $scope.getComponents = getComponents;
        $scope.getSamples = getSamples;
        $scope.selectSample = selectSample;
        $scope.selectComponent = selectComponent;
        $scope.getSourceCodeFiles = (selectedSample, selectedTechnology) => {
            return selectedSample.sourceCodeFiles ? selectedSample.sourceCodeFiles[selectedTechnology.name] : null;
        };
        $scope.selectedSourceCodeFile = null;
        $scope.selectedSourceCodeFileContents = null;
        $scope.selectSourceCodeFile = (selectedSample, selectedTechnology, sourceCodeFile) => {
            $scope.selectedSourceCodeFile = sourceCodeFile;
            $scope.selectedSourceCodeFileContents = '…';
            var sourceCodeFileUrl = 'Samples/' + selectedTechnology.name + '/' + selectedSample.component + '/' + selectedSample.feature + '/' + sourceCodeFile.replace('.aspx', '.aspx.txt').replace('.aspx.txt.cs', '.aspx.cs.txt');
            $http.get(sourceCodeFileUrl).then((response) => {
                $scope.selectedSourceCodeFileContents = response.data;
            });
        };
        $scope.forceRun = false;
        $scope.run = (allowRefreshing) => {
            if (allowRefreshing && $scope.selectedSourceCodeFile == null) {
                var technology = $scope.selectedTechnology;
                $scope.selectedTechnology = null;
                $timeout(() => {
                    $scope.selectedTechnology = technology;
                });
            }
            $scope.selectedSourceCodeFile = null;
            $scope.selectedSourceCodeFileContents = null;
        };
        $scope.getSampleUrl = (selectedSample, selectedTechnology, selectedTheme) => {
            return 'Samples/' + (selectedTechnology ? selectedTechnology.name : '') + '/' + selectedSample.component + '/' + selectedSample.feature + '/index.html?' + (selectedTheme ? selectedTheme : $scope.applyingTheme);
        };
        var pathIndex = initialSelection ? initialSelection.indexOf('/') : -1;
        if (initialSelection == 'AngularJS')
            $scope.selectedTechnology = technologies[2];
        else if (initialSelection == 'Angular')
            $scope.selectedTechnology = technologies[3];
        else if (initialSelection == 'React')
            $scope.selectedTechnology = technologies[4];
        else if (initialSelection == 'Vue')
            $scope.selectedTechnology = technologies[5];
        else if (pathIndex >= 0) {
            var selection1 = initialSelection.substr(0, pathIndex), selection2, selection3;
            initialSelection = initialSelection.substr(pathIndex + 1);
            pathIndex = initialSelection.indexOf('/');
            if (pathIndex >= 0) {
                selection2 = initialSelection.substr(0, pathIndex);
                selection3 = initialSelection.substr(pathIndex + 1);
            } else {
                selection2 = selection1;
                selection3 = initialSelection;
                selection1 = "JavaScript";
            }
            for (var i = 0; i < technologies.length; i++) {
                var technology = technologies[i];
                if (technology.name == selection1) {
                    $scope.selectedTechnology = technology;
                    break;
                }
            }
            for (var i = 0; i < samples.length; i++) {
                var sample = samples[i];
                if (sample.component == selection2 && sample.feature == selection3) {
                    selectSample(sample);
                    break;
                }
            }
        }
        else if (initialSelection)
            selectComponent(initialSelection);
    })
    .directive('dsSample', ($timeout) => {
        return {
            restrict: 'E',
            replace: true,
            bindToController: {
                html: '='
            },
            controller: ($scope) => {
            },
            controllerAs: 'dss',
            templateUrl: 'Templates/Sample.html'
        };
    })
    .directive('dsSourceCode', ($timeout) => {
        return {
            restrict: 'E',
            replace: true,
            bindToController: {
                contents: '='
            },
            controller: ($scope) => {
            },
            controllerAs: 'dssc',
            templateUrl: 'Templates/SourceCode.html'
        };
    });

// Support for Safari.
declare var $;
$(document).ready(() => {
    var body = $(document).find('body');
    var shouldSyncSize = false;
    var syncSizeTimer = setInterval(() => {
        var sampleFrame = $('#sample-frame');
        var sampleBody = sampleFrame.contents().find('body');
        var bodyWidth = body.width(), sampleBodyWidth = sampleBody.width();
        if (sampleBodyWidth > bodyWidth)
            shouldSyncSize = true;
        if (shouldSyncSize && sampleBodyWidth != bodyWidth)
            sampleBody.width(bodyWidth + 'px');
        if (!shouldSyncSize)
            clearInterval(syncSizeTimer);
    }, 500);
});
