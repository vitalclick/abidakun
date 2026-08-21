const repositories = {
  hasSubFields: false,
  resolve: async (repositories) => {
    if (!Array.isArray(repositories)) return null

    const records = await Promise.all(
      repositories.filter(Boolean).map(async (entry) => {
        // An entry is either "owner/name", or an object whose remaining keys
        // are the values to show on the card, whatever GitHub says.
        const { repo, ...overrides } = typeof entry === 'string' ? { repo: entry } : entry

        if (typeof repo !== 'string' || !repo.includes('/')) return null

        const [owner, name] = repo.split('/')

        // Everything the card needs without reaching GitHub at all, so a
        // missing GITHUB_TOKEN or a failed request costs live counts rather
        // than the whole card.
        const local = { name, owner, url: 'https://github.com/' + repo, stars: 0, forks: 0 }

        let remote = {}

        try {
          const res = await fetch('https://api.github.com/repos/' + repo, {
            headers: process.env.GITHUB_TOKEN
              ? { authorization: 'token ' + process.env.GITHUB_TOKEN }
              : {},
          })
          const json = await res.json()

          if (res.ok && json.owner) {
            remote = {
              name: json.name,
              owner: json.owner.login,
              url: json.html_url,
              description: json.description,
              language: json.language,
              stars: json.stargazers_count,
              forks: json.forks_count,
            }
          } else {
            console.log('Failed to fetch repo ' + repo + ': ' + (json.message || res.statusText))
          }
        } catch (error) {
          console.log('Failed to fetch repo ' + repo + ': ' + error.message)
        }

        // GitHub fills in what it knows; the content file has the last word.
        return { ...local, ...remote, ...overrides }
      })
    )

    return { records: records.filter(Boolean) }
  },
}

export default repositories
