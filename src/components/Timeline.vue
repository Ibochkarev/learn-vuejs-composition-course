<template>
  <nav class="is-primary panel">
    <span class="panel-tabs">
      <a
        v-for="period in periods"
        :key="period"
        :class="{ 'is-active': period === currentPeriod }"
        @click="setPeriod(period)"
        data-test="period"
      >
        {{ period }}
      </a>
    </span>

    <a data-test="post" class="panel-block" v-for="post in posts" :key="post.id">
      <div>
        <a>{{post.title}}</a>
        <div>{{ post.created.format('Do MMM') }}</div>
      </div>
    </a>
  </nav>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import moment from 'moment'
import { today, thisWeek, thisMonth } from '../mocks'

type Period = 'Today' | 'This Week' | 'This Month'

export default defineComponent({
  name: 'Timeline',

  setup() {
    const periods: Period[] = ['Today', 'This Week', 'This Month']
    const currentPeriod = ref<Period>('Today')
    const posts = computed(() => {
      return [today, thisWeek, thisMonth].filter(post => {
        if (currentPeriod.value === 'Today') {
          return post.created.isAfter(moment().subtract(1, 'days'))
        }

        if (currentPeriod.value === 'This Week') {
          return post.created.isAfter(moment().subtract(1, 'week'))
        }

        if (currentPeriod.value === 'This Month') {
          return post.created.isAfter(moment().subtract(1, 'month'))
        }

        return false
      })
    })

    const setPeriod = (period: Period) => {
      currentPeriod.value = period
    }

    return {
      posts,
      periods,
      currentPeriod,
      setPeriod
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
