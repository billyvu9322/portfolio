const express = require('express');
const chalk = require('chalk');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

const asciiArtPath = path.join(__dirname, 'ascii.txt');

// Right side content
const rightLines = [
  "",
  "",
  "",
  "",
  "",
  "",
  "  Binh Vu",
  "  Software Developer & Tech Enthusiast",
  "  ==================================",
  "",
  "  [ About Me ]",
  "  I build fast, responsive web applications",
  "  and creative terminal interfaces.",
  "  I love exploring AI and new web technologies.",
  "",
  "  [ Navigation ]",
  "  > Portfolio : https://billyvu.nimo.io.vn",
  "  > GitHub    : github.com/billyvu9322",
  "  > LinkedIn  : linkedin.com/in/tat-binh-vu-7a28a817b/",
  "  > Email     : binhhp20@gmail.com",
  "",
  ""
];

app.use((req, res) => {
  // Read the user's custom ASCII art dynamically on every request
  let asciiLines = [];
  if (fs.existsSync(asciiArtPath)) {
    const asciiContent = fs.readFileSync(asciiArtPath, 'utf8');
    asciiLines = asciiContent.split('\n');
  }

  // Ensure they have the same number of lines
  const maxLines = Math.max(asciiLines.length, rightLines.length);

  // Generate the final frame
  let combinedFrame = "";

  for (let i = 0; i < maxLines; i++) {
    // Left pads to 85 columns (assuming their new art is 80ish chars wide)
    const left = (asciiLines[i] || "").padEnd(85, " ");
    const right = (rightLines[i] || "");
    combinedFrame += chalk.yellow(left + right) + "\n";
  }

  const userAgent = req.headers['user-agent'] || '';
  
  if (userAgent.includes('curl')) {
    const padding = "\n\n";
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.send(padding + combinedFrame + padding);
  } else {
    res.send('<html><body style="background:black;color:yellow;font-family:monospace;white-space:pre-wrap;">' + combinedFrame + '</body></html>');
  }
});

app.listen(PORT, () => {
  console.log(`Terminal portfolio server running on port ${PORT}`);
});
