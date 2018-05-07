<template>
<ul class="list-group">
  <li
    class="list-group-item"
    v-for="(page, index) in pages"
    :class="{active: selected(page)}"
    @click="selectPage(page)">
    <i class="fa" :class="{'fa-edit': page.taint, 'fa-file': !page.taint}"> {{ page.title }}&nbsp;</i>
  </li>
</ul>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

module.exports = {
  computed: mapGetters([
    'pages',
    'selectedPage'
  ]),
  methods: {
    selected(page) {
      return this.selectedPage == page
    },
    ...mapActions([
      'selectPage'
    ])
  }
}
</script>
