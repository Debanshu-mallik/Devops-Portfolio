import { fetchRepos } from "../services/github.service.js";
import { getCache, setCache } from "../services/cache.service.js";
import { getStatus } from "../engines/status.engine.js";
import { getDuration } from "../engines/duration.engine.js";
import { getHealth } from "../engines/health.engine.js";
import { CACHE_TTL } from "../config/env.js";
import {
  recordCacheHit,
  recordCacheMiss,
  recordGithubSync
} from "../services/metrics.service.js";


export async function getPortfolio(req, res) {
  const cached = getCache();
  if (cached) {
    recordCacheHit();
    return res.json(cached);
  }

  recordCacheMiss();


  const repos = await fetchRepos();
  recordGithubSync();

  const projects = repos.map(repo => {
    const status = getStatus(repo.updated_at);

    return {
      name: repo.name,
      description: repo.description,
      url: repo.html_url,
      language: repo.language,
      status,
      duration: getDuration(repo.size),
      health: getHealth({
        status,
        hasDocs: Boolean(repo.description)
      }),
      metrics: {
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        openIssues: repo.open_issues_count
      },
      activity: {
        lastUpdated: repo.updated_at
      }
    };
  });

  const payload = {
    profile: {
      name: "Debanshu Sekhar Mallik",
      role: "DevOps / Cloud Engineer"
    },
    projects
  };

  setCache(payload, CACHE_TTL);
  res.json(payload);
}
