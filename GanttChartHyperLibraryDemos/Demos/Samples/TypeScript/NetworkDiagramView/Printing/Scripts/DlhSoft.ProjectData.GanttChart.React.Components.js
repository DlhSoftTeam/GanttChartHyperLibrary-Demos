"use client"

import { useRef, useEffect } from "react";

export function GanttChartView({items, settings, change, style, license, path}) {
    const ganttChartViewRef = useRef(null);

    useEffect(() => {
        const ganttChartView = ganttChartViewRef.current;
        const originalItemPropertyChangeHandler = settings.itemPropertyChangeHandler;
        settings.itemPropertyChangeHandler = (item, propertyName, isDirect, isFinal) => {
            if (originalItemPropertyChangeHandler)
                originalItemPropertyChangeHandler(item, propertyName, isDirect, isFinal);
            if (change)
                change(item, propertyName, isDirect, isFinal);
        };
        DlhSoft.Controls.GanttChartView.initialize(ganttChartView, items, settings, license);
    });

    return (
        <div ref={ganttChartViewRef} style={style}>
            …
            <script src={(path ?? "./") + "DlhSoft.ProjectData.GanttChart.HTML.Controls.js"}/>
            <script src={(path ?? "./") + "DlhSoft.Data.HTML.Controls.js"}/>
            <script src={(path ?? "./") + "DlhSoft.ProjectData.GanttChart.HTML.Controls.Extras.js"}/>
        </div>);
}

export function ScheduleChartView({items, settings, change, style, license, path}) {
    const scheduleChartViewRef = useRef(null);

    useEffect(() => {
        const scheduleChartView = scheduleChartViewRef.current;
        const originalItemPropertyChangeHandler = settings.itemPropertyChangeHandler;
        settings.itemPropertyChangeHandler = (item, propertyName, isDirect, isFinal) => {
            if (originalItemPropertyChangeHandler)
                originalItemPropertyChangeHandler(item, propertyName, isDirect, isFinal);
            if (change)
                change(item, propertyName, isDirect, isFinal);
        };
        DlhSoft.Controls.ScheduleChartView.initialize(scheduleChartView, items, settings, license);
    });

    return (
        <div ref={scheduleChartViewRef} style={style}>
            …
            <script src={(path ?? "./") + "DlhSoft.ProjectData.GanttChart.HTML.Controls.js"}/>
        </div>);
}

export function LoadChartView({items, settings, change, style, license, path}) {
    const loadChartViewRef = useRef(null);

    useEffect(() => {
        const loadChartView = loadChartViewRef.current;
        const originalItemPropertyChangeHandler = settings.itemPropertyChangeHandler;
        settings.itemPropertyChangeHandler = (item, propertyName, isDirect, isFinal) => {
            if (originalItemPropertyChangeHandler)
                originalItemPropertyChangeHandler(item, propertyName, isDirect, isFinal);
            if (change)
                change(item, propertyName, isDirect, isFinal);
        };
        DlhSoft.Controls.LoadChartView.initialize(loadChartView, items, settings, license);
    });

    return (
        <div ref={loadChartViewRef} style={style}>
            …
            <script src={(path ?? "./") + "DlhSoft.ProjectData.GanttChart.HTML.Controls.js"}/>
        </div>);
}