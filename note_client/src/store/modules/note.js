import { Page } from '../../model/page'
import { pageApi } from '../../api/page'

const state = {
  pages: [],
  loaded: false
  selectedPage: null,
  message: null,
  progress: null
}

const getters = {
  /**
   * メッセージがある
   */
  hasMessage(state) => {
    return state.message != null
  }

  /**
   * 処理中である
   */
  isProgress(state) => {
    return state.progress != null
  }
}

const actions = {
  /**
   * ページ一覧をロードする
   */
  load({commit}) {
    pageApi.list()
    .then((instances) => {
      commit('pagesLoaded', instances)
    })
  },

  /**
   * ページを選択した
   */
  selectPage({commit, state}, page) {
    if (state.selectedPage && state.selectedPage.taint) {
      commit('messageAppeared', "変更が保存されていません。")
      return
    }
    commit('pageSelected', page)
  }

  /**
   * 現在のページを保存する
   */
  save({commit, state}, csrfToken) {
    if (!state.selectedPage.title || !state.selectedPage.content) {
      commit('messageAppeared', "タイトルと内容は必須です。")
      return
    }
    commit('progressStated', "保存しています...")
    pageApi.save(state.selectedPage, csrfToken)
    .then((instance) => {
      state.selectedPage = { ...state.selectedPage, ...instance}
      commit('progressFinished')
    })
  }

  /**
   * 現在のページを削除する
   */
  destroy({commit, state, dispatch}, csrfToken) {
    if (state.selectedPage.id == null) {
      commit('unsavedPageDestroyed')
      return
    }
    commit('progressStated', "削除しています...")
    pageApi.destroy(state.selectedPage, csrfToken)
    .then(() => {
      commit('pageDestroyed')
      dispatch('load').then(() => {
        commit('progressFinished')
      })
    })
  }
}

const mutations = {
  /**
   * ページ一覧がロードされた
   */
  pagesLoaded(state, instances) {
    state.pages = instances
    state.loaded = true
  }

  /**
   * ページが選択された
   */
  pageSelected(state, page) {
    state.selectedPage = page
  },

  /**
   * メッセージが出現した
   */
  messageAppeared(state, message) {
    state.message = message
  }

  /**
   * メッセージを承諾した
   */
  messageResolved(state) {
    state.message = null
  },

  /**
   * 変更が破棄された
   */
  reverted(state) {
    if (this.selectedPage) {
      this.selectedPage.revert()
    }
  },

  /**
   * 未保存のページが破棄された
   */
  unsavedPageDestroyed(state) {
    state.pages.pop()
    state.selectedPage = null
  }

  /**
   * ページが破棄された
   */
  pageDestroyed(state) {
    state.selectedPage = null
  }

  /**
   * 処理が開始された
   */
  progressStated(state, progressMessage) {
    state.progress = progressMessage
  }

  /**
   * 処理が終了した
   */
  progressFinished(state) {
    state.progress = null
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
