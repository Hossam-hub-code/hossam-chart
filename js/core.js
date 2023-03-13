//Animation Function

Math.easeOutBounce = (pos) => {
  if (pos < 1 / 2.75) {
    return 7.5625 * pos * pos;
  } else if (pos < 2 / 2.75) {
    return 7.5625 * (pos -= 1.5 / 2.75) * pos + 0.75;
  } else if (pos < 2.5 / 2.75) {
    return 7.5625 * (pos -= 2.25 / 2.75) * pos + 0.9375;
  } else {
    return 7.5625 * (pos -= 2.625 / 2.75) * pos + 0.984375;
  }
};

let heads = [];
let arrCategories = [];
let arrSeries1 = [];
let arrSeries2 = [];

document.getElementById("btn-submit").addEventListener("click", () => {
  let upload = document.getElementById("file");
  readXlsxFile(upload.files[0]).then((data) => {
    heads.push(data[0]);

    data.forEach((r) => {
      if (r[0] != "Customer") {
        arrCategories.push(r[0]);
      }
    });
    data.forEach((r) => {
      if (r[0] != "Customer") {
        arrSeries1.push(r[2]);
      }
    });
    data.forEach((r) => {
      if (r[0] != "Customer") {
        arrSeries2.push(r[3]);
      }
    });
  });
  upload.value = "";
});

document.getElementById("btn-refresh").addEventListener("click", () => {
  let chart = Highcharts.chart("container", {
    chart: {
      alignThresholds: true,
      type: "column",
      zoomType: "x",
      panning: true,
      panKey: "shift",
    },

    credits: false,

    title: {
      text: "Installation/ Turnover YTD",
    },
    xAxis: {
      categories: arrCategories,
    },

    plotOptions: {
      series: {
        dataLabels: {
          enabled: true,
        },
      },
    },
    yAxis: [
      {
        title: {
          text: "Installation Raise",
        },
        plotLines: [
          {
            value: 0,
            width: 0,
            zIndex: 1,
          },
        ],
        gridLineWidth: 0,
      },
      {
        title: {
          text: "Removed Raise",
        },
        opposite: true,
      },
    ],
    series: [
      {
        name: heads[0][2],
        data: arrSeries1,
        yAxis: 0,
        animation: {
          duration: 1500,
        },
        color: "#00c9a7",
      },
      {
        name: heads[0][3],
        data: arrSeries2,
        yAxis: 1,
        animation: {
          duration: 1500,
          // Uses Math.easeOutBounce
          easing: "easeOutBounce",
        },
        color: "#ff3e41",
      },
    ],
  });
});
