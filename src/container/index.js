import testPopupsEnabled from "./testPopupsEnabled";
import popupHandler from "./popupHandling";

if (testPopupsEnabled()) {
  popupHandler();
} else {
  document.writeln("<h1>Looks like your browser is blocking pop-ups.</h1>");
  document.writeln("<p>Please enable them and then refresh the page.</p>");
}
