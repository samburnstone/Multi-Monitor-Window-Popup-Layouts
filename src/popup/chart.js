import * as d3 from "d3";
import * as fc from "d3fc";
import closest from "./closest";

export default stockName => {
  d3.csv(`./assets/stock-data/${stockName}.csv`, d => ({
    open: Number(d.Open),
    low: Number(d.Low),
    high: Number(d.High),
    close: Number(d.Close),
    date: new Date(d.Date),
    volume: Number(d.Volume)
  })).then(data => {
    // Now we can create the chart (from: https://d3fc.io/introduction/getting-started.html)
    const yExtent = fc.extentLinear().accessors([d => d.high, d => d.low]);

    const xExtent = fc.extentDate().accessors([d => d.date]);

    const xScale = d3.scaleTime().domain(xExtent);
    const yScale = fc.scaleDiscontinuous(d3.scaleLinear().domain(yExtent));

    const gridlines = fc.annotationSvgGridline();
    const candlestick = fc.seriesSvgCandlestick();
    const multi = fc.seriesSvgMulti().series([gridlines, candlestick]);

    const chart = fc
      .chartCartesian(xScale, yScale)
      .yDomain(yExtent(data))
      .xDomain(xExtent(data))
      .svgPlotArea(multi);

    const render = () => {
      d3.select("#chart")
        .datum(data)
        .call(chart);

      const pointer = fc.pointer().on("point", event =>
        event.forEach(position => {
          const xPos = Math.abs(xScale.invert(position.x).getTime());

          // TODO: send this xPos to other charts

          const closestPoint = closest(data, d =>
            Math.abs(xPos - d.date.getTime())
          );
          console.log(closestPoint);
          return closestPoint;
        })
      );

      d3.select("#chart .plot-area").call(pointer);
    };

    render();
  });
};
