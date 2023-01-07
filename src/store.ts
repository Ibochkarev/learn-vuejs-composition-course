import { reactive, readonly } from "vue";
import { Post } from "./mocks";

interface State {
  posts: PostState;
}

interface PostState {
  ids: string[]

  all: Map<string, Post>

  loaded: boolean
}

class Store {
  private state: State

  constructor(initial: State) {
    this.state = reactive(initial)
  }

  getState() {
    return readonly(this.state)
  }
}

const store = new Store({
  posts: {
    all: new Map(),
    ids: [],
    loaded: false
  },
})

store.getState().posts.loaded