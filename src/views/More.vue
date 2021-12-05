<template>
  <div class="more">
    <Panel>
      <template #header>
        <router-link to="/">主页</router-link>/<router-link :to="`/User/${$route.params.loginname}`">{{$route.params.loginname}}</router-link>
      </template>
      <template #content v-if="user">
        <Tabless
          v-for="item in user.recent_topics"
          v-bind="item"
          :key="item.id"
        />
      </template>
    </Panel>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import Tabless from "../components/Tabless.vue";
import Panel from "../containers/Panel.vue";
export default {
  components: { Panel, Tabless },
  created () {
    this.getUser(this.$route.params.loginname)
  },
  computed: {
    ...mapState({
      user: (state) => state.user.user,
    }),
  },
  methods: {
    ...mapActions(['getUser'])
  },
};
</script>

<style>
</style>