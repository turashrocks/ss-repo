<template>
  <div
    @click="focusNewTag()"
    :class="{'read-only': readOnly}"
    class="vue-input-tag-wrapper"
  >
    <span v-for="(tag, index) in tags" :key="index" class="input-tag">
      <span>{{ tag }}</span>
      <a
        v-if="!readOnly"
        @click.prevent.stop="remove(index)"
        class="remove"></a>
    </span>

    <input
      v-if="!readOnly"
      v-model="newTag"
      @keydown.delete.stop="removeLastTag()"
      @keydown.enter.188.tab.prevent.stop="addNew(newTag)"
      @blur.stop="addNew(newTag)"
      :placeholder="placeholder"
      type="text"
      class="new-tag"
    />
  </div>
</template>

<script>
  /* eslint-disable */
  const validators = {
    email: new RegExp(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),
    url: new RegExp(/^(https?|ftp|rmtp|mms):\/\/(([A-Z0-9][A-Z0-9_-]*)(\.[A-Z0-9][A-Z0-9_-]*)+)(:(\d+))?\/?/i),
    text: new RegExp(/^[a-zA-Z]+$/),
    digits: new RegExp(/^[\d() \.\:\-\+#]+$/),
    isodate: new RegExp(/^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/)
  }
  /* eslint-enable */

  export default {
    name: 'InputTag',

    props: {
      tags: {
        type: Array,
        default: () => []
      },
      placeholder: {
        type: String,
        default: ''
      },
      onChange: {
        type: Function
      },
      readOnly: {
        type: Boolean,
        default: false
      },
      validate: {
        type: String,
        default: ''
      },
      onPasteSeparator: {
        type: String,
        default: null
      },
      length: {
        type: Object,
        default: null
      }
    },

    data () {
      return {
        newTag: ''
      }
    },

    methods: {
      focusNewTag () {
        if (this.readOnly) { return }
        this.$el.querySelector('.new-tag').focus()
      },

      addNew (tag) {
        if (this.onPasteSeparator && tag.indexOf(this.onPasteSeparator) !== -1) {
          tag.split(this.onPasteSeparator)
            .map(t => t.trim())
            .map(this.addNew)

          return
        }

        if (tag && this.tags.indexOf(tag) === -1 && this.validateIfNeeded(tag) && this.validateLengthIfNeeded(tag)) {
          this.tags.push(tag)
          this.tagChange()
        }
        this.newTag = ''
      },

      validateIfNeeded (tagValue) {
        if (this.validate === '' || this.validate === undefined) {
          return true
        } else if (Object.keys(validators).indexOf(this.validate) > -1) {
          return validators[this.validate].test(tagValue)
        }
        return true
      },

      validateLengthIfNeeded (tagValue) {
        if (this.length === null || this.length === undefined) {
          return true
        } else if (this.length.min && this.length.max) {
          return tagValue.length >= this.length.min && tagValue.length <= this.length.max
        } else if (this.length.min) {
          return tagValue.length >= this.length.min
        } else if (this.length.max) {
          return tagValue.length <= this.length.max
        }
        return true
      },

      remove (index) {
        this.tags.splice(index, 1)
        this.tagChange()
      },

      removeLastTag () {
        if (this.newTag) { return }
        this.tags.pop()
        this.tagChange()
      },

      tagChange () {
        if (this.onChange) {
          // avoid passing the observer
          this.onChange(JSON.parse(JSON.stringify(this.tags)))
        }
      }
    }
  }
</script>

<style lang="scss">
  .vue-input-tag-wrapper {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    background-color: #fff;
    border: 1px solid #ccc;
    overflow: hidden;
    padding-left: 4px;
    padding-top: 4px;
    cursor: text;
    text-align: left;
    -webkit-appearance: textfield;

    .input-tag {
      background-color: #cde69c;
      border-radius: 2px;
      border: 1px solid #a5d24a;
      color: #638421;
      display: inline-block;
      font-size: 13px;
      font-weight: 400;
      margin-bottom: 4px;
      margin-right: 4px;
      padding: 3px;

      .remove {
        cursor: pointer;
        font-weight: bold;
        color: #638421;

        &:hover {
          text-decoration: none;
        }

        &::before {
          content: " x";
        }
      }
    }

    .new-tag {
      flex: 1;
      background: transparent;
      border: 0;
      color: #777;
      font-size: 13px;
      font-weight: 400;
      margin-bottom: 6px;
      margin-top: 1px;
      outline: none;
      padding: 4px;
      padding-left: 0;
    }

    &.read-only {
      cursor: default;
    }
  }
</style>
