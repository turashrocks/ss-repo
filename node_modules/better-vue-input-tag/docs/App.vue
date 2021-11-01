<script>
  import BetterInputTag from '@/BetterInputTag.vue'

  export default {
    name: 'app',

    components: { BetterInputTag },

    data () {
      return {
        readOnly: false,
        placeholder: 'Add Tag',
        onPasteSeparator: '',
        tags: ['Jerry', 'Kramer', 'Elaine', 'George'],
        htmlCode: '',
        validate: '',
        length: {min: null, max: null}
      }
    },

    methods: {
      newTag (tags) {
        console.log({ tags })
      },

      getPreviewHTML () {
        let html = '<better-input-tag'
        html += this.placeholder ? ` placeholder="${this.placeholder}"` : ''
        html += this.onPasteSeparator ? ` on-paste-separator="${this.onPasteSeparator}"` : ''
        html += this.tags ? ' :tags="tags"' : ''
        html += this.readOnly ? ' :read-only="true"' : ''
        html += this.validate ? ` validate="${this.validate}"` : ''
        html += this.length.min || this.length.max ? ` length="{min: ${this.length.min}, max: ${this.length.max}}"` : ''
        return `${html}></input-tag>`
      }
    }
  }
</script>

<template lang="pug">
  #app

    section.page-header
      h1.project-name Vue.js Better Input Tag
      h2.project-tagline
      a.btn(href='https://github.com/Yproximite/better-vue-input-tag' target='_blank') GitHub
      a.btn(href='https://www.npmjs.com/package/better-vue-input-tag' target='_blank') NPM

    section.main-content

      p
        | Vue.js 2.0 component, an improved version of&nbsp;
        a(href='https://tucci.me/vue-input-tag' target='_blank') vue-input-tag
        | , inspired in&nbsp;
        a(href='https://github.com/olahol/react-tagsinput' target='_blank') react-tagsinput&nbsp;

      h3
        a#install.anchor(href='#install', aria-hidden='true')
          span.octicon.octicon-link(aria-hidden='true')
        | Install

      p
        code npm install better-vue-input-tag --save

      h3 
        a#demo.anchor(href='#demo', aria-hidden='true')
          span.octicon.octicon-link(aria-hidden='true')
        | Demo

      .demo

        better-input-tag(
          :on-change='newTag',
          :tags='tags',
          :placeholder='placeholder',
          :on-paste-separator='onPasteSeparator',
          :read-only='readOnly',
          :validate='validate',
          :length='length'
        )

      h3
        a#configuration.anchor(href='#configuration', aria-hidden='true')
          span.octicon.octicon-link(aria-hidden='true')
        | Configuration

      .configuration

        .form-group
          p.label placeholder:
          input(v-model='placeholder' type='text')

        .form-group
          p.label onPasteSeparator:
          input(v-model='onPasteSeparator' type='text')

        .form-group
          p.label readOnly:
          input(v-model='readOnly' type='checkbox')

        .form-group
          p.label validate:
          select(v-model='validate')
            option(value='') No validate
            option(value='text') Text
            option(value='email') Email
            option(value='url') Url
            option(value='digits') Digits
            option(value='isodate') ISO Date

        .form-group
          p.label min tag length:
          input(v-model='length.min' type='number')
          br
          p.label max tag length:
          input(v-model='length.max' type='number')

        .form-group
          p.label tags:
          code {{ tags }}

      h3
        a#code.anchor(href='#code', aria-hidden='true')
          span.octicon.octicon-link(aria-hidden='true')
        | Code

      .code
        
        code {{ getPreviewHTML() }}

      footer.site-footer
        p.site-footer-credits
          | Original package by&nbsp;
          a(href='https://twitter.com/TucciMatias' target='_blank') @TucciMatias
          | &nbsp;-&nbsp;
          a(href='https://tucci.me' target='_blank') tucci.me,
          | &nbsp;improved by&nbsp;
          a(href='https://github.com/Kocal' target='_blank') @Kocal
</template>

<style lang="scss">
  @import 'style/github-light';
  @import 'style/normalize';
  @import 'style/stylesheet';

  .form-group {
    p.label {
      display: inline-block;
      margin-right: 1rem;
      width: 140px;
    }
    input {
      padding: 5px;
    }
  }
  .playground {
    .vue-input-tag {
      margin-bottom: 20px;
    }
  }
</style>
