import React from 'react';
const DlhSoft = window.DlhSoft;

export var PertChartView = React.forwardRef(function(props, ref) {
    if (!ref) ref = React.createRef();
    var element = <div ref={ref} style={props.style}>{props.children}</div>;
    var changeHandler = props.settings.itemPropertyChangeHandler;
    setTimeout(function() {
        DlhSoft.Controls.Pert.PertChartView.initialize(ref.current, props.items, props.settings, props.license);
        if (props.change) {
            props.settings.itemPropertyChangeHandler = function(item, propertyName, isDirect, isFinal) {
                if (changeHandler)
                    changeHandler(item, propertyName, isDirect, isFinal);
                props.change(item, propertyName, isDirect, isFinal);
            }
        }
    });
    return element;
});

export var NetworkDiagramView = React.forwardRef(function(props, ref) {
    if (!ref) ref = React.createRef();
    var element = <div ref={ref} style={props.style}>{props.children}</div>;
    var changeHandler = props.settings.itemPropertyChangeHandler;
    setTimeout(function() {
        DlhSoft.Controls.Pert.NetworkDiagramView.initialize(ref.current, props.items, props.settings, props.license);
        if (props.change) {
            props.settings.itemPropertyChangeHandler = function(item, propertyName, isDirect, isFinal) {
                if (changeHandler)
                    changeHandler(item, propertyName, isDirect, isFinal);
                props.change(item, propertyName, isDirect, isFinal);
            }
        }
    });
    return element;
});
