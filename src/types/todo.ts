export enum Status {
  ALL = 'all',
  ACTIVE = 'active',
  DONE = 'done'
}

export type FilterType = Status.ACTIVE | Status.ALL | Status.DONE

export interface Todo {
  id: string
  text: string
  completed: boolean
  createdAt: string
  isDeleting?: boolean
}

export interface TodosState {
  items: Todo[]
  filter: FilterType
  searchQuery: string
}

export interface RootState {
  todos: TodosState
}
