export interface GitNoteObject {
  object_kind: string;
  user: User;
  project_id: number;
  project: Project;
  repository: Repository;
  object_attributes: ObjectAttributes;
  merge_request: MergeRequest;
}

export interface MergeRequest {
  id: number;
  target_branch: string;
  source_branch: string;
  source_project_id: number;
  author_id: number;
  assignee_id: number;
  title: string;
  created_at: string;
  updated_at: string;
  milestone_id: number;
  state: string;
  merge_status: string;
  target_project_id: number;
  iid: number;
  description: string;
  position: number;
  source: Project;
  target: Project;
  last_commit: LastCommit;
  work_in_progress: boolean;
  assignee: User;
}

export interface User {
  name: string;
  username: string;
  avatar_url: string;
}

export interface LastCommit {
  id: string;
  message: string;
  timestamp: string;
  url: string;
  author: Author;
}

export interface Author {
  name: string;
  email: string;
}

export interface Project {
  name: string;
  description: string;
  web_url: string;
  avatar_url: null;
  git_ssh_url: string;
  git_http_url: string;
  namespace: string;
  visibility_level: number;
  path_with_namespace: string;
  default_branch: string;
  homepage: string;
  url: string;
  ssh_url: string;
  http_url: string;
}

export interface ObjectAttributes {
  id: number;
  note: string;
  noteable_type: string;
  author_id: number;
  created_at: string;
  updated_at: string;
  project_id: number;
  attachment: null;
  line_code: null;
  commit_id: string;
  noteable_id: number;
  system: boolean;
  st_diff: null;
  url: string;
}

export interface Repository {
  name: string;
  url: string;
  description: string;
  homepage: string;
}
