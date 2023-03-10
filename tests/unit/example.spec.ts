import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import Timeline from '@/components/Timeline.vue'
import { today, thisWeek, thisMonth } from '../../src/mocks'

describe('Timeline', () => {
  it('renders today post default', () => {
    const wrapper = mount(Timeline)

    expect(wrapper.html()).toContain(today.created.format('Do MMM'))
  })

  it.only('update when the period is click', async () => {
    const wrapper = mount(Timeline)

    await wrapper.get('[data-test="This Week"]').trigger('click')

    expect(wrapper.html()).toContain(today.created.format('Do MMM'))
    expect(wrapper.html()).toContain(thisWeek.created.format('Do MMM'))
  })

  it.only('update when the period is click', async () => {
    const wrapper = mount(Timeline)

    await wrapper.get('[data-test="This Month"]').trigger('click')

    expect(wrapper.html()).toContain(today.created.format('Do MMM'))
    expect(wrapper.html()).toContain(thisWeek.created.format('Do MMM'))
    expect(wrapper.html()).toContain(thisMonth.created.format('Do MMM'))
  })
})