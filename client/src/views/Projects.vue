<template>
  <div class="projects">
    <TabsMenu :create="toggleForm">
      <Tab 
        v-for="project in projects" 
        :project="project" 
        :key="project.id"
        :selected="project.id == currentProjectID"
        @click.native="setCurrentProject(project.id)"
      />
    </TabsMenu>
    <router-view />
  </div>
</template>

<script>
import TabsMenu from '@/components/TabsMenu';
import Tab from '@/components/Tab';
import NewProjectForm from '../components/Forms/NewProjectForm.vue';
import ModalBus from '@/Bus';
import { createNamespacedHelpers } from 'vuex';
const { mapState, mapActions } = createNamespacedHelpers('project')
export default {
  name: "Projects",
  components: {
    TabsMenu,
    Tab
   },
  computed: {
    ...mapState([
      'currentProjectID',
      'projects'
    ])
  },
  methods: {
    ...mapActions([
      'setCurrentProject'
    ]),
    toggleForm() {
      ModalBus.$emit('open', {
        component: NewProjectForm,
        title: "Start a new Project"
      })
    }
  },
  created() {
    this.$store.dispatch('project/getAllProjects');
    this.$store.dispatch('project/setCurrentProject', "");
  },
  beforeDestroy() {
  }
}
</script>

<style lang="scss" scoped>
  .projects {
    height: 100%;
    background-color: #eee;
  }
</style>