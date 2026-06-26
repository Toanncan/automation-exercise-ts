import fs from 'fs';
import path from 'path';
import { ENV } from '../src/config/env';

const resultsDir = path.resolve(process.cwd(), 'allure-results');

const githubRunUrl = (): string | undefined => {
  const server = process.env.GITHUB_SERVER_URL;
  const repository = process.env.GITHUB_REPOSITORY;
  const runId = process.env.GITHUB_RUN_ID;

  if (!server || !repository || !runId) {
    return undefined;
  }

  return `${server}/${repository}/actions/runs/${runId}`;
};

async function globalSetup(): Promise<void> {
  fs.mkdirSync(resultsDir, { recursive: true });

  const buildName = process.env.GITHUB_RUN_NUMBER
    ? `GitHub Actions #${process.env.GITHUB_RUN_NUMBER}`
    : `Local run - ${ENV.ENV_NAME}`;

  const executor = {
    name: process.env.CI ? 'CI' : 'Local Playwright',
    type: process.env.CI ? 'ci' : 'local',
    buildName,
    buildUrl: githubRunUrl(),
    reportName: `Allure Report - ${ENV.ENV_NAME}`,
  };

  fs.writeFileSync(
    path.join(resultsDir, 'executor.json'),
    JSON.stringify(executor, null, 2),
    'utf-8',
  );
}

export default globalSetup;
