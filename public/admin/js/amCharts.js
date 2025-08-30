am5.ready(function () {
  const chartDiv = document.getElementById("chartdiv");
  if (!chartDiv) {
    return;
  }

  // Create root and chart
  var root = am5.Root.new("chartdiv");

  root.setThemes([
    am5themes_Animated.new(root)
  ]);

  var chart = root.container.children.push(am5xy.XYChart.new(root, {
    panX: true,
    panY: true,
    wheelY: "zoomX",
    layout: root.verticalLayout,
    pinchZoomX: true
  }));

  // Create Y-axis (Doanh thu)
  var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
    maxDeviation: 1,
    renderer: am5xy.AxisRendererY.new(root, {
      pan: "zoom"
    })
  }));

  // Create X-axis (Ngày)
  var xAxis = chart.xAxes.push(am5xy.DateAxis.new(root, {
    groupData: true,
    baseInterval: { timeUnit: "day", count: 1 }, // để theo ngày
    renderer: am5xy.AxisRendererX.new(root, {
      minGridDistance: 60,
      pan: "zoom",
      minorGridEnabled: true
    })
  }));

  // Tạo dữ liệu mẫu 365 ngày
  function generateChartData() {
    var chartData = [];
    var currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    currentDate.setDate(currentDate.getDate() - 364); // quay về trước 1 năm

    var revenue = 100000; // bắt đầu với doanh thu 100k
    for (var i = 0; i < 365; i++) {
      var newDate = new Date(currentDate);
      newDate.setDate(currentDate.getDate() + i);
      revenue += Math.round((Math.random() - 0.5) * 10000); // biến động doanh thu
      chartData.push({
        date: newDate.getTime(),
        visits: revenue
      });
    }
    return chartData;
  }

  var data = generateChartData();

  // Tạo series
  var series = chart.series.push(am5xy.LineSeries.new(root, {
    name: "Doanh thu",
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "visits",
    valueXField: "date",
    tooltip: am5.Tooltip.new(root, {
      pointerOrientation: "horizontal",
      labelText: "[bold]{name}[/]\n{valueX.formatDate('dd/MM/yyyy')}: {valueY}"
    })
  }));

  // Đổ màu dưới line như area chart
  series.fills.template.setAll({
    visible: true,
    fillOpacity: 0.3
  });
  series.strokes.template.set("strokeWidth", 2);
  series.data.setAll(data);

  // Zoom mặc định 30 ngày gần nhất
  series.events.once("datavalidated", function () {
    var lastDate = new Date(data[data.length - 1].date);
    var firstDate = new Date(lastDate);
    firstDate.setDate(firstDate.getDate() - 30);
    xAxis.zoomToDates(firstDate, lastDate);
  });

  // Cursor
  chart.set("cursor", am5xy.XYCursor.new(root, {
    behavior: "none",
    xAxis: xAxis
  }));

  // Tooltip trục
  xAxis.set("tooltip", am5.Tooltip.new(root, {}));
  yAxis.set("tooltip", am5.Tooltip.new(root, {}));

  // Scrollbar ngang
  var scrollbarX = am5xy.XYChartScrollbar.new(root, {
    orientation: "horizontal",
    height: 50
  });

  chart.set("scrollbarX", scrollbarX);

  var sbxAxis = scrollbarX.chart.xAxes.push(am5xy.DateAxis.new(root, {
    baseInterval: { timeUnit: "day", count: 1 },
    renderer: am5xy.AxisRendererX.new(root, {
      strokeOpacity: 0,
      minGridDistance: 60
    })
  }));

  var sbyAxis = scrollbarX.chart.yAxes.push(am5xy.ValueAxis.new(root, {
    renderer: am5xy.AxisRendererY.new(root, {})
  }));

  var sbSeries = scrollbarX.chart.series.push(am5xy.LineSeries.new(root, {
    xAxis: sbxAxis,
    yAxis: sbyAxis,
    valueYField: "visits",
    valueXField: "date"
  }));

  sbSeries.data.setAll(data);
});
