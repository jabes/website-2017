/* SystemJS module definition */

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
