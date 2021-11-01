/* globals describe it beforeEach expect */

import Vue from 'vue'
import jsdom from 'jsdom'
import BetterInputTag from '../src/BetterInputTag.vue'

const renderer = require('vue-server-renderer').createRenderer()

describe('BetterInputTag.vue', () => {
  const ClonedComponent = Vue.extend(BetterInputTag)
  let BetterInputTagComponent

  beforeEach((cb) => {
    BetterInputTagComponent = new ClonedComponent({
      propsData: { tags: [] }
    }).$mount()
    cb()
  })

  it('should have a new tag input without placeholder', () => {
    renderer.renderToString(BetterInputTagComponent, (err, str) => {
      if (err) { throw err }

      const dom = new jsdom.JSDOM(str)
      const input = dom.window.document.querySelector('input.new-tag')

      expect.anything(input)
      expect(input.placeholder).toEqual('')
    })
  })

  describe('addNew()', () => {
    it('should add a new tag', () => {
      BetterInputTagComponent.addNew('foo bar')
      BetterInputTagComponent.addNew('foo')
      BetterInputTagComponent.addNew('bar')

      expect(BetterInputTagComponent.tags.length).toEqual(3)
    })
  })

  describe('remove(index)', () => {
    it('should remove a tag', () => {
      BetterInputTagComponent.addNew('foo bar')
      BetterInputTagComponent.addNew('foo')
      BetterInputTagComponent.addNew('bar')
      BetterInputTagComponent.remove(0)

      expect(BetterInputTagComponent.tags.length).toEqual(2)
    })
  })

  describe('removeLastTag()', () => {
    it('should remove the last tag', () => {
      BetterInputTagComponent.addNew('foo bar')
      BetterInputTagComponent.addNew('foo')
      BetterInputTagComponent.addNew('bar')
      BetterInputTagComponent.removeLastTag()

      expect(BetterInputTagComponent.tags.length).toEqual(2)
    })
  })

  describe('read-only="true"', () => {
    const BetterInputTagComponentReadOnly = new ClonedComponent({
      propsData: { tags: [], readOnly: true }
    }).$mount()

    it('should have a read-only CSS class and shouldn\'t have a remove tag button', () => {
      renderer.renderToString(BetterInputTagComponentReadOnly, (err, str) => {
        if (err) { throw err }

        const dom = new jsdom.JSDOM(str)
        const input = dom.window.document.querySelector('.read-only')

        expect.anything(input)
        expect(input.querySelector('a.remove')).toEqual(null)
      })
    })

    it('shouldn\'t have a new tag input', () => {
      renderer.renderToString(BetterInputTagComponentReadOnly, (err, str) => {
        if (err) { throw err }

        const dom = new jsdom.JSDOM(str)
        const input = dom.window.document.querySelector('input.new-tag')

        expect(input).toEqual(null)
      })
    })
  })

  describe('tags="[1,2,3]"', () => {
    const BetterInputTagComponentWithTags = new ClonedComponent({
      propsData: { tags: ['Jerry', 'Kramer', 'Elaine'] }
    }).$mount()

    it('should load the tags', () => {
      expect(BetterInputTagComponentWithTags.tags.length).toEqual(3)
    })

    it('should have remove buttons', () => {
      renderer.renderToString(BetterInputTagComponentWithTags, (err, str) => {
        if (err) { throw err }

        const dom = new jsdom.JSDOM(str)
        const removeButtons = dom.window.document.querySelectorAll('a.remove')

        expect(removeButtons.length).toEqual(3)
      })
    })
  })

  describe('placeholder="Add Tag"', () => {
    const placeholder = 'Add Tag'
    const BetterInputTagComponentWithPlaceholder = new ClonedComponent({
      propsData: { placeholder }
    }).$mount()

    it('should have a placeholder', () => {
      renderer.renderToString(BetterInputTagComponentWithPlaceholder, (err, str) => {
        if (err) { throw err }

        const dom = new jsdom.JSDOM(str)
        const input = dom.window.document.querySelector('input.new-tag')

        expect(input.placeholder).toEqual(placeholder)
      })
    })
  })

  describe('validate="text"', () => {
    const BetterInputTagTextOnly = new ClonedComponent({
      propsData: { validate: 'text' }
    }).$mount()

    it('should only add text values', () => {
      BetterInputTagTextOnly.addNew('foo')
      BetterInputTagTextOnly.addNew('123')
      BetterInputTagTextOnly.addNew('mati@tucci.me')
      BetterInputTagTextOnly.addNew('https://tucci.me')
      BetterInputTagTextOnly.addNew('2002-04-03')

      expect(BetterInputTagTextOnly.tags.length).toEqual(1)
    })
  })

  describe('validate="digits"', () => {
    const BetterInputTagDigitsOnly = new ClonedComponent({
      propsData: { validate: 'digits' }
    }).$mount()

    it('should only add digits values', () => {
      BetterInputTagDigitsOnly.addNew('foo')
      BetterInputTagDigitsOnly.addNew('123')
      BetterInputTagDigitsOnly.addNew('mati@tucci.me')
      BetterInputTagDigitsOnly.addNew('https://tucci.me')

      expect(BetterInputTagDigitsOnly.tags.length).toEqual(1)
    })
  })

  describe('validate="email"', () => {
    const BetterInputTagEmailOnly = new ClonedComponent({
      propsData: { validate: 'email' }
    }).$mount()

    it('should only add text values', () => {
      BetterInputTagEmailOnly.addNew('foo')
      BetterInputTagEmailOnly.addNew('123')
      BetterInputTagEmailOnly.addNew('mati@tucci.me')
      BetterInputTagEmailOnly.addNew('https://tucci.me')
      BetterInputTagEmailOnly.addNew('2002-04-03')

      expect(BetterInputTagEmailOnly.tags.length).toEqual(1)
    })
  })

  describe('validate="url"', () => {
    const BetterInputTagUrlOnly = new ClonedComponent({
      propsData: { validate: 'url' }
    }).$mount()

    it('should only add text values', () => {
      BetterInputTagUrlOnly.addNew('foo')
      BetterInputTagUrlOnly.addNew('123')
      BetterInputTagUrlOnly.addNew('mati@tucci.me')
      BetterInputTagUrlOnly.addNew('https://tucci.me')
      BetterInputTagUrlOnly.addNew('2002-04-03')

      expect(BetterInputTagUrlOnly.tags.length).toEqual(1)
    })
  })

  describe('validate="isodate"', () => {
    const BetterInputTagISODateOnly = new ClonedComponent({
      propsData: { validate: 'isodate' }
    }).$mount()

    it('should only add text values', () => {
      BetterInputTagISODateOnly.addNew('foo')
      BetterInputTagISODateOnly.addNew('123')
      BetterInputTagISODateOnly.addNew('mati@tucci.me')
      BetterInputTagISODateOnly.addNew('https://tucci.me')
      BetterInputTagISODateOnly.addNew('2002-04-03')

      expect(BetterInputTagISODateOnly.tags.length).toEqual(1)
    })
  })

  describe('validate length of tag', () => {
    const BetterInputTagMinMaxOnly = new ClonedComponent({
      propsData: { length: {min: 1, max: 5} }
    }).$mount()

    it('should only tags with length >= 1 and <= 5 characters', () => {
      BetterInputTagMinMaxOnly.addNew('foo')
      BetterInputTagMinMaxOnly.addNew('123')
      BetterInputTagMinMaxOnly.addNew('mati@tucci.me')
      BetterInputTagMinMaxOnly.addNew('https://tucci.me')
      BetterInputTagMinMaxOnly.addNew('2002-04-03')

      expect(BetterInputTagMinMaxOnly.tags.length).toEqual(2)
    })
  })

  describe('validate length of tag', () => {
    const BetterInputTagMinOnly = new ClonedComponent({
      propsData: { length: {min: 1} }
    }).$mount()

    it('should only tags with length >= to 1 characters', () => {
      BetterInputTagMinOnly.addNew('foo')
      BetterInputTagMinOnly.addNew('123')
      BetterInputTagMinOnly.addNew('mati@tucci.me')
      BetterInputTagMinOnly.addNew('https://tucci.me')
      BetterInputTagMinOnly.addNew('2002-04-03')

      expect(BetterInputTagMinOnly.tags.length).toEqual(5)
    })
  })

  describe('validate length of tag', () => {
    const BetterInputTagMaxOnly = new ClonedComponent({
      propsData: { length: {max: 7} }
    }).$mount()

    it('should only tags with length <= 5 characters', () => {
      BetterInputTagMaxOnly.addNew('foo')
      BetterInputTagMaxOnly.addNew('123')
      BetterInputTagMaxOnly.addNew('mati@tucci.me')
      BetterInputTagMaxOnly.addNew('https://tucci.me')
      BetterInputTagMaxOnly.addNew('2002-04-03')

      expect(BetterInputTagMaxOnly.tags.length).toEqual(2)
    })
  })
})
