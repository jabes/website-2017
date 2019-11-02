interface GithubOwner {
  id: number
  login: string
  type: string
  site_admin: boolean
  avatar_url: string
  html_url: string
}

interface GithubRepo {
  id: number
  name: string
  full_name: string
  description: string
  default_branch: string
  language: string
  size: number
  owner: GithubOwner
  archived: boolean
  private: boolean
  fork: boolean
  html_url: string
  created_at: string
  updated_at: string
  pushed_at: string
  stargazers_count: number
  watchers_count: number
  forks_count: number
  open_issues_count: number
}

interface GithubRepoReadme {
  name: string
  path: string
  sha: string
  size: number
  url: string
  html_url: string
  git_url: string
  download_url: string
  type: string
  content: string
  encoding: string
}

interface CustomGithubRepoReadme {
  heading: string
  introduction: string
  screenshot: string
}

interface GithubObject {
  repo: GithubRepo
  readme: CustomGithubRepoReadme
}
