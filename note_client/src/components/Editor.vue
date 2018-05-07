<template>
<div class="form-group">
  <input type="text" class="form-control" placeholder="タイトルを入力" v-model="page.title">
  <textarea class="form-control" rows="15" placeholder="内容" v-model="page.content"></textarea>
</div>
</template>

<script>
import { mapGetters } from 'vuex'

module.exports = {
  computed: mapGetters({
    page: 'selectedPage'
  })
}
</script>
