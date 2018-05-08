/**
 * store/modules/note.jsのテスト
 */
import * as assert from 'power-assert'
import note from 'store/modules/note'
import { Page } from 'model/page'

describe('store/modules/note:getters', () => {
  it('hasMessage', () => {
    let result = note.getters.hasMessage({
      message: 'test message'
    })
    assert.ok(result)
  })

  it('hasMessage (message is null)', () => {
    let result = note.getters.hasMessage({
      message: null
    })
    assert.ok(!result)
  })

  it('isProgress', () => {
    let result = note.getters.isProgress({
      progress: 'test message'
    })
    assert.ok(result)
  })

  it('isProgress (progress is null)', () => {
    let result = note.getters.isProgress({
      progress: null
    })
    assert.ok(!result)
  })
})

describe('store/modules/note:mutations', () => {
  it('pagesLoaded', () => {
    const stub = 'stub'
    let state = {
      pages: [],
      loaded: false
    }
    let result = note.mutations.pagesLoaded(
      state,
      [stub]
    )
    assert.equal(state.pages[0], stub)
    assert.ok(state.loaded)
  })

  it('pageSelected', () => {
    const stub = 'stub'
    let state = {
      selectedPage: null
    }
    let result = note.mutations.pageSelected(
      state,
      stub
    )
    assert.equal(state.selectedPage, stub)
  })

  it('messageAppeared', () => {
    const message = 'test message'
    let state = {
      message: null
    }
    let result = note.mutations.messageAppeared(
      state,
      message
    )
    assert.equal(state.message, message)
  })

  it('messageResolved', () => {
    const message = 'test message'
    let state = {
      message: message
    }
    let result = note.mutations.messageResolved(
      state
    )
    assert.equal(state.message, null)
  })

  it('reverted', () => {
    let page = new Page
    page.content = 'test'
    page.taint = true
    let state = {
      selectedPage: page
    }
    let result = note.mutations.reverted(
      state
    )
    assert.equal(state.selectedPage.content, '')
    assert.ok(!state.selectedPage.taint)
  })

  it('unsavedPageDestroyed', () => {
    const stub = 'stub'
    let state = {
      pages: [stub],
      selectedPage: stub
    }
    let result = note.mutations.unsavedPageDestroyed(
      state
    )
    assert.equal(state.selectedPage, null)
    assert.equal(state.pages.length, 0)
  })

  it('pageDestroyed', () => {
    const stub = 'stub'
    let state = {
      selectedPage: stub
    }
    let result = note.mutations.pageDestroyed(
      state
    )
    assert.equal(state.selectedPage, null)
  })

  it('newPageCreated', () => {
    let state = {
      pages: [],
      selectedPage: null
    }
    let result = note.mutations.newPageCreated(
      state
    )
    assert.equal(state.pages.length, 1)
    assert.ok(state.selectedPage.taint)
  })

  it('progressStarted', () => {
    const progressMessage = 'test progress'
    let state = {
      progress: null
    }
    let result = note.mutations.progressStarted(
      state,
      progressMessage
    )
    assert.equal(state.progress, progressMessage)
  })

  it('progressFinished', () => {
    const progressMessage = 'test progress'
    let state = {
      progress: progressMessage
    }
    let result = note.mutations.progressFinished(
      state
    )
    assert.equal(state.progress, null)
  })
})
