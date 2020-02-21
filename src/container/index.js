import testPopupsEnabled from "./testPopupsEnabled";
import createContainerUI from "./createContainerUI";

if (testPopupsEnabled()) {
  createContainerUI();
} else {
  document.writeln("<h1>Looks like your browser is blocking pop-ups.</h1>");
  document.writeln("<p>Please enable them and then refresh the page.</p>");
}
