const fs = require("fs");

/**
 * @param {String[]} suffixes
 * @param {String} string
 * @returns {*}
 */
function endsWithANy(suffixes, string) {
  return suffixes.some(function(suffix) {
    return string.endsWith(suffix);
  });
}

try {
  // Get original file
  const fileData = fs.readFileSync("./parcel-bundle-reports/default.html", "utf8");
  const fileLines = fileData.split("\n");

  let jsonStartLine = 0;
  let jsonEndLine = 0;

  // Find first line of json
  // fine when json ends
  // get middle line(s) where the JSON is
  for (let [index, line] of fileLines.entries()) {
    line = line.trim();
    if (line.includes("application/json")) {
      jsonStartLine = index;
    }
    if (line === "</script>" && jsonStartLine !== 0 && jsonEndLine === 0) {
      jsonEndLine = index;
    }
  }

  const jsonMidpoint = Math.round((jsonStartLine + jsonEndLine) / 2);
  const jsonData = JSON.parse(fileLines[jsonMidpoint]);

  // Load the JSON
  // Ignore the groups that end with flagged suffixes
  const newJsonData = [];
  for (const group of jsonData.groups) {
    if (!endsWithANy(["svg", "png", "xml", "woff", "woff2"], group.label)) {
      newJsonData.push(group);
    }
  }

  // Convert back to String
  fileLines[jsonMidpoint] = JSON.stringify({ groups: newJsonData });
  const newHTML = fileLines.join("\n");

  // Write to new file
  fs.writeFileSync("./parcel-bundle-reports/filtered.html", newHTML);
} catch (e) {
  console.error(e);
}
