using System;
using System.Web;
using System.Windows.Media;
using DlhSoft.Windows.Data;
using DlhSoft.Windows.Controls;
using DlhSoft.Windows.Services;

namespace Demos.Samples.JavaScript.GanttChartView.ExportPngImage_PMF
{
    public partial class GetPng : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            // Get client side theme.
            var theme = Request.QueryString["theme"];
            // Get Project XML content and decode it to a plain XML string.
            var projectXml = Request.Params["ProjectXml"];
            projectXml = HttpUtility.UrlDecode(projectXml);
            // Use TaskManager to load Project XML content.
            var taskManager = new TaskManager();
            taskManager.LoadProjectXml(projectXml);
            // Initialize GanttChartExporter based on TaskManager component.
            using (var ganttChartExporter = new GanttChartExporter(taskManager, (GanttChartDataGrid control) =>
            {
                // Configure timeline to export.
                control.TimelinePageStart = taskManager.GetProjectStart().Date.AddDays(-2);
                control.TimelinePageFinish = taskManager.GetProjectFinish().Date.AddDays(3);
                // Configure internal provider control to support custom themes .
                control.HeaderHeight = 80;
                control.ScaleHeaderHeight = 40;
                control.ItemHeight = 40;
                control.HourWidth = 5;
                if (theme == null || theme == "null" || theme == "Default" || theme == "Aero")
                    return;
                // Optionally, also set StandardBarFill, StandardBarStroke, and other appearance settings depending on the theme.
                control.BarHeight = 24;
                control.CompletedBarHeight = control.BarHeight - 1;
                control.StandardBarCornerRadius = 1;
                control.StandardCompletedBarCornerRadius = 0;
                control.HourWidth = 5;
                control.StandardBarFill = Brushes.White;
                control.StandardBarStroke = new SolidColorBrush(Color.FromRgb(0x00, 0x5c, 0x9e));
                control.StandardCompletedBarFill = control.StandardBarStroke;
                control.StandardCompletedBarStroke = control.StandardCompletedBarFill;
                control.DependencyLineStroke = control.StandardBarStroke;
            }))
            {
                // Obtain and send the PNG image bytes to the client browser as binary response content.
                byte[] imageBytes = ganttChartExporter.GetImageBytes(resolution: 96);
                Response.ContentType = "image/png";
                Response.BinaryWrite(imageBytes);
            }
        }
    }
}
