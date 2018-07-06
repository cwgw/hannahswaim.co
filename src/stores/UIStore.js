import { observable, action, decorate } from 'mobx';
import _debounce from 'lodash/debounce'

class UIStore {

  constructor() {
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', _debounce(this.updateViewportDimensions, 50, {trailing: true}))
      this.updateViewportDimensions()
    }
  }

  /**
   * viewport dimensions
   *
   */

  viewportWidth = 0
  viewportHeight = 0

  updateViewportDimensions () {
    this.viewportWidth = window.innerWidth
    this.viewportHeight = window.innerHeight

    if (this.isNavOpen && this.viewportWidth >= 576) {
      this.closeNav()
    }
  }

  /**
   * mobile nav stuff
   *
   */

  isNavOpen = false

  toggleNav () {
    this.isNavOpen = !this.isNavOpen
  }

  closeNav () {
    this.isNavOpen = false
  }

}

decorate(UIStore, {
  viewportWidth: observable,
  viewportHeight: observable,
  updateViewportDimensions: action.bound,
  isNavOpen: observable,
  toggleNav: action.bound,
  closeNav: action.bound,
})

export default new UIStore()
