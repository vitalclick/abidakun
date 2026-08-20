const repositories = {
  hasSubFields: false,
  resolve: async (repositories) => {
    if (!Array.isArray(repositories) || !process.env.GITHUB_TOKEN) return null

    const records = await Promise.all(
      repositories.filter(Boolean).map(async (entry) => {
        // An entry is either "owner/name", or an object carrying the field
        // overrides to apply on top of what GitHub returns - used when a repo
        // has no description of its own, or a better one to show here.
        const { repo, ...overrides } = typeof entry === 'string' ? { repo: entry } : entry

        if (!repo) return null

        let res, json
        try {
          res = await fetch('https://api.github.com/repos/' + repo, {
            headers: {
              authorization: process.env.GITHUB_TOKEN
                ? 'token ' + process.env.GITHUB_TOKEN
                : undefined,
            },
          })
          json = await res.json()
        } catch (error) {
          console.log(error)
          return null
        }

        if (!res.ok || !json.owner) {
          console.log('Failed to fetch repo ' + repo + ': ' + (json.message || res.statusText))
          return null
        }

        return {
          name: json.name,
          owner: json.owner.login,
          url: json.html_url,
          description: json.description,
          language: json.language,
          stars: json.stargazers_count,
          forks: json.forks_count,
          ...overrides,
        }
      })
    )
    return { records: records.filter(Boolean) }
  },
}

export default repositories
