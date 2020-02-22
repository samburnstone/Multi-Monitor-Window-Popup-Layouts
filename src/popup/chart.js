// From: https://d3fc.io/introduction/getting-started.html
import * as d3 from "d3";
import * as fc from "d3fc";

const data = fc.randomFinancial()(50);

console.log(data);

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
