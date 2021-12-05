<template>
  <div class="information">
    <Panel>
      <template #header><router-link to="/">主页</router-link>/新消息</template>
      <template #content>
        <div v-if="hasnotMessages.length">
          <p v-for="item in hasnotMessages" :key="item.id">
            <router-link :to="`/User/${item.author.loginname}`">{{
              item.author.loginname
            }}</router-link>
            回复了你的话题
            <router-link :to="`/PostContent/${item.topic.id}`">{{
              item.topic.title
            }}</router-link>
          </p>
        </div>
        <div v-else>无消息</div>
      </template>
    </Panel>
    <Panel>
      <template #header>过往消息</template>
      <template #content>
        <div v-if="hasMessages.length">
          <p v-for="item in hasMessages" :key="item.id">
            <router-link :to="`/User/${item.author.loginname}`">{{
              item.author.loginname
            }}</router-link>
            回复了你的话题
            <router-link :to="`/PostContent/${item.topic.id}`">{{
              item.topic.title
            }}</router-link>
          </p>
        </div>

        <div v-else></div>
      </template>
    </Panel>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import Panel from "../containers/Panel.vue";
export default {
  components: { Panel },
  created() {
    this.getInformation();
    this.allInformation();
  },
  computed: {
    ...mapState({
      hasMessages: (state) => state.information.has_read_messages,
      hasnotMessages: (state) => state.information.hasnot_read_messages,
    }),
  },
  methods: {
    ...mapActions(["getInformation", "allInformation"]),
  },
};
</script>

<style>
</style>