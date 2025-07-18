// Query string syntax: ?theme
// Supported themes: Default, Generic-bright, Generic-blue, Blue-green, Royal-blue, DlhSoft-gray, Purple-green, Steel-blue, Dark-black, Cyan-green, Blue-navy, Orange-brown, Teal-green, Purple-beige, Gray-blue, Aero.
var queryString = window.location.search;
var theme = queryString ? queryString.substr(1) : null;

//define strings and settings for localization
const localizationData = {
    "en": {
        "Language": "Language",
        "TaskColumn": "Task",
        "StartColumn": "Start",
        "FinishColumn": "Finish",
        "MilestoneColumn": "Milestone",
        "CompletedColumn": "Completed",
        "AssignmentsColumn": "Assignments",
        "Months": ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"],
        "DaysOfWeek": ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "TodayLabel": "Today",
        "TimeOfDayLabel": "Time of day",
        "NowLabel": "Current",
    },
    "fr": {
        "Language": "Langue",
        "TaskColumn": "Tâche",
        "StartColumn": "Début",
        "FinishColumn": "Fin",
        "MilestoneColumn": "Jalon",
        "CompletedColumn": "Terminé",
        "AssignmentsColumn": "Affectations",
        "Months": ["janvier", "février", "mars", "avril", "mai", "juin",
            "juillet", "août", "septembre", "octobre", "novembre", "décembre"],
        "DaysOfWeek": ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"],
        "TodayLabel": "aujourd'hui",
        "TimeOfDayLabel": "Heure",
        "NowLabel": "Actuelle",
        "DateFormatter": function (date) {
            date = DlhSoft.Controls.GanttChartView.getInputDate(date);
            var value = DlhSoft.Controls.GanttChartView.defaultDateFormatter(date);
            var month = value.substr(0, 2);
            var day = value.substr(3, 2);
            var rest = value.substr(6);
            return day + '.' + month + '.' + rest;
        },
       "DateTimeParser": function (value) {
            var day = value.substr(0, 2);
            var month = value.substr(3, 2);
            var rest = value.substr(6);
            value = month + '/' + day + '/' + rest;
           var date = DlhSoft.Controls.GanttChartView.defaultDateTimeParser(value);
            return DlhSoft.Controls.GanttChartView.getOutputDate(date);
        },
    },
};

const defaultLocalizationData = localizationData["en"];

var ganttChartView = document.querySelector('#ganttChartView');

var date = new Date(), year = date.getFullYear(), month = date.getMonth();
var items = [{ content: 'Task 1', isExpanded: false },
             { content: 'Task 1.1', indentation: 1, start: new Date(year, month, 3, 8, 0, 0), finish: new Date(year, month, 5, 16, 0, 0) },
             { content: 'Task 1.2', indentation: 1, start: new Date(year, month, 4, 8, 0, 0), finish: new Date(year, month, 6, 12, 0, 0) },
             { content: 'Task 2', isExpanded: true },
             { content: 'Task 2.1', indentation: 1, start: new Date(year, month, 2, 8, 0, 0), finish: new Date(year, month, 8, 16, 0, 0), completedFinish: new Date(year, month, 5, 16, 0, 0), assignmentsContent: 'Resource 1, Resource 2 [50%]' },
             { content: 'Task 2.2', indentation: 1 },
             { content: 'Task 2.2.1', indentation: 2, start: new Date(year, month, 2, 8, 0, 0), finish: new Date(year, month, 3, 16, 0, 0), completedFinish: new Date(year, month, 12, 16, 0, 0), assignmentsContent: 'Resource 2' },
             { content: 'Task 2.2.2', indentation: 2, start: new Date(year, month, 3, 12, 0, 0), finish: new Date(year, month, 6, 16, 0, 0), assignmentsContent: 'Resource 2' },
             { content: 'Task 3', indentation: 1, start: new Date(year, month, 4, 16, 0, 0), isMilestone: true }];
items[3].predecessors = [{ item: items[0], dependencyType: 'SS' }];
items[7].predecessors = [{ item: items[6], lag: 2 * 60 * 60 * 1000 }];
items[8].predecessors = [{ item: items[4] }, { item: items[5] }];
for (var i = 4; i <= 16; i++)
    items.push({ content: 'Task ' + i, indentation: i >= 8 && i % 3 == 2 ? 0 : 1, start: new Date(year, month, 2 + (i <= 8 ? (i - 4) * 3 : i - 8), 8, 0, 0), finish: new Date(year, month, 2 + (i <= 8 ? (i - 4) * 3 + (i > 8 ? 6 : 1) : i - 2), 16, 0, 0) });

var settings = { currentTime: new Date(year, month, 2, 12, 0, 0) };
settings.itemClass = "grid-item";

function setDatePickerLabels(langData) {
    settings.todayString = langData["TodayLabel"];
    settings.timeOfDayString = langData["TimeOfDayLabel"];
    settings.nowString = langData["NowLabel"];
}

setDatePickerLabels(defaultLocalizationData);

function setColumns(langData) {
    // Prepare the columns collection.
    var columns = DlhSoft.Controls.GanttChartView.getDefaultColumns(items, settings);
    columns[0].header = langData["TaskColumn"];
    columns[1].header = langData["StartColumn"];
    columns[2].header = langData["FinishColumn"];
    columns[3].header = langData["MilestoneColumn"];
    columns[4].header = langData["CompletedColumn"];
    columns[5].header = langData["AssignmentsColumn"];
    settings.columns = columns;
}

setColumns(defaultLocalizationData);

function setDateFormat(langData) {
    settings.months = langData["Months"];
    settings.daysOfWeek = langData["DaysOfWeek"];
    settings.dateFormatter = langData["DateFormatter"];
    settings.dateTimeParser = langData["DateTimeParser"];
}

setDateFormat(defaultLocalizationData);

// for both languages when we have both date and time e.g. grid
settings.dateTimeFormatter = function (date) {
    var dateValue = settings.dateFormatter(date);
    date = DlhSoft.Controls.GanttChartView.getInputDate(date);
    var timeValue = DlhSoft.Controls.GanttChartView.defaultDateTimeFormatter(date).substr(10);
    return dateValue + timeValue;
};

// Optionally, initialize custom themes (themes.js).
initializeGanttChartTheme(settings, theme);

DlhSoft.Controls.GanttChartView.initialize(ganttChartView, items, settings);

// Function to update content based on selected language
function updateContent(langData) {
    document.querySelectorAll('[data-lang]').forEach(element => {
        const key = element.getAttribute('data-lang');
        element.innerHTML = langData[key];
    });
}
// Function to change language
function changeLanguage(lang) {
    const langData = localizationData[lang];
    toggleENCommand.className = lang == 'en' ? "ribbonCommand toggle pressed" : "ribbonCommand toggle";
    toggleFRCommand.className = lang == 'fr' ? "ribbonCommand toggle pressed" : "ribbonCommand toggle";
    updateContent(langData);
    setColumns(langData);
    setDateFormat(langData);
    setDatePickerLabels(langData);
    ganttChartView.refresh();
}
// Call updateContent() on page load
window.addEventListener('DOMContentLoaded', () => {
    updateContent(defaultLocalizationData);
});
