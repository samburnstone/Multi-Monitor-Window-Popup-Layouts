import * as d3 from "d3";
import * as fc from "d3fc";
import closest from "./closest";

export default (stockName, onCrosshairPositionChange) =>
  d3
    .csv(`./assets/stock-data/${stockName}.csv`, d => ({
      open: Number(d.Open),
      low: Number(d.Low),
      high: Number(d.High),
      close: Number(d.Close),
      date: new Date(d.Date),
      volume: Number(d.Volume)
    }))
    .then(data => {
      let annotationData = [];

      // Now we can create the chart (from: https://d3fc.io/introduction/getting-started.html)
      const yExtent = fc.extentLinear().accessors([d => d.high, d => d.low]);

      const xExtent = fc.extentDate().accessors([d => d.date]);

      const xScale = d3.scaleTime().domain(xExtent);
      const yScale = fc.scaleDiscontinuous(d3.scaleLinear().domain(yExtent));

      const gridlines = fc.annotationSvgGridline();
      const candlestick = fc.seriesSvgCandlestick();
      const annotation = fc
        .annotationSvgLine()
        .orient("vertical")
        .value(d => d.date)
        .label("");

      const multi = fc
        .seriesSvgMulti()
        .series([gridlines, candlestick, annotation])
        .mapping((seriesData, index, series) => {
          if (series[index] === annotation) {
            return annotationData;
          }
          return seriesData;
        });

      const chart = fc
        .chartCartesian(xScale, yScale)
        .yDomain(yExtent(data))
        .xDomain(xExtent(data))
        .svgPlotArea(multi);

      const snapCrosshairToClosestDataPoint = xValue => {
        if (!xValue) {
          // Hide annotation if value undefined
          annotationData = [];
          return;
        }

        const closestDataPoint = closest(data, d =>
          Math.abs(xValue - d.date.getTime())
        );

        annotationData = [closestDataPoint];
      };

      const render = () => {
        d3.select("#chart")
          .datum(data)
          .call(chart);

        const pointer = fc.pointer().on("point", event => {
          event.forEach(position => {
            const pointerXValue = xScale.invert(position.x).getTime();

            snapCrosshairToClosestDataPoint(pointerXValue);

            // Inform callback that annotation position has changed
            onCrosshairPositionChange(annotationData[0].date);
          });
          render();
        });

        d3.select("#chart .plot-area")
          .call(pointer)
          .on("mouseout", () => {
            annotationData = [];
            // Undefined indicates annotation should be hidden
            onCrosshairPositionChange();
          });
      };

      render();

      return {
        updateCrosshairPosition: xValue => {
          snapCrosshairToClosestDataPoint(xValue);
          render();
        }
      };
    });
