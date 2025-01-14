import lighthouse from 'lighthouse';
import { launch } from 'chrome-launcher';
import fs from 'fs';
import path from 'path';
import open from 'open';

(async () => {
  const chrome = await launch({ chromeFlags: ['--headless'] });
  const options = {
    logLevel: 'info',
    output: 'html',
    onlyCategories: ['performance', 'accessibility'],
    port: chrome.port,
  };

  const runnerResult = await lighthouse('https://automationexercise.com/', options);

  const reportDir = path.resolve('lighthouse-report');
  if (!fs.existsSync(reportDir)) {
    fs.mkdirSync(reportDir);
  }

  const reportPath = path.join(reportDir, 'lighthouse-report.html');
  fs.writeFileSync(reportPath, runnerResult.report);

  const performanceScore = runnerResult.lhr.categories.performance.score * 100;
  const accessibilityScore = runnerResult.lhr.categories.accessibility.score * 100;

  console.log('Report saved at:', reportPath);
  console.log('Performance score:', performanceScore);
  console.log('Accessibility score:', accessibilityScore);

  await open(reportPath);

  await chrome.kill();
})();