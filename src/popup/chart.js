import * as d3 from "d3";
import * as fc from "d3fc";

export default stockName => {
  d3.csv(`./assets/stock-data/${stockName}.csv`)
    .then(data =>
      // CSV downloaded from Yahoo, needs to be adjusted slightly
      data.map(({ Date: date, High, Low, Open, Close, Volume }) => ({
        open: Number(Open),
        low: Number(Low),
        high: Number(High),
        close: Number(Close),
        date: new Date(date),
        volume: Number(Volume)
      }))
    )
    .then(data => {
      // Now we can create the chart (from: https://d3fc.io/introduction/getting-started.html)
      const yExtent = fc.extentLinear().accessors([d => d.high, d => d.low]);

      const xExtent = fc.extentDate().accessors([d => d.date]);

      const gridlines = fc.annotationSvgGridline();
      const candlestick = fc.seriesSvgCandlestick();
      const multi = fc.seriesSvgMulti().series([gridlines, candlestick]);

      const chart = fc
        .chartCartesian(fc.scaleDiscontinuous(d3.scaleTime()), d3.scaleLinear())
        .yDomain(yExtent(data))
        .xDomain(xExtent(data))
        .svgPlotArea(multi);

      d3.select("#chart")
        .datum(data)
        .call(chart);
    });
};
