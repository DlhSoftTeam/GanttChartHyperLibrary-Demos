"use client"

import { useRef, useEffect } from "react";

export function PertChartView({items, settings, change, style, license, path}) {
    const pertChartViewRef = useRef(null);

    useEffect(() => {
        const pertChartView = pertChartViewRef.current;
        const originalItemPropertyChangeHandler = settings.itemPropertyChangeHandler;
        settings.itemPropertyChangeHandler = (item, propertyName, isDirect, isFinal) => {
            if (originalItemPropertyChangeHandler)
                originalItemPropertyChangeHandler(item, propertyName, isDirect, isFinal);
            if (change)
                change(item, propertyName, isDirect, isFinal);
        };
        DlhSoft.Controls.PertChartView.initialize(pertChartView, items, settings, license);
    });

    return (
        <div ref={pertChartViewRef} style={style}>
            …
            <script src={(path ?? "./") + "DlhSoft.ProjectData.PertChart.HTML.Controls.js"}/>
        </div>);
}

export function NetworkDiagramView({items, settings, change, style, license, path}) {
    const networkDiagramViewRef = useRef(null);

    useEffect(() => {
        const networkDiagramView = newtworkDiagramViewRef.current;
        const originalItemPropertyChangeHandler = settings.itemPropertyChangeHandler;
        settings.itemPropertyChangeHandler = (item, propertyName, isDirect, isFinal) => {
            if (originalItemPropertyChangeHandler)
                originalItemPropertyChangeHandler(item, propertyName, isDirect, isFinal);
            if (change)
                change(item, propertyName, isDirect, isFinal);
        };
        DlhSoft.Controls.NetworkDiagramView.initialize(networkDiagramView, items, settings, license);
    });

    return (
        <div ref={networkDiagramViewRef} style={style}>
            …
            <script src={(path ?? "./") + "DlhSoft.ProjectData.PertChart.HTML.Controls.js"}/>
        </div>);
}