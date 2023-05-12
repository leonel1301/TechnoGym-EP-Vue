<template>
  <div class="card">
    <pv-toolbar
      :pt="{
        root: { style: { background: 'linear-gradient(to right, #8e2de2, #4a00e0)', borderRadius: '24px' } }
      }"
    >
      <template #start>
        <h3 class="text-white">TechnoGym TechnoRun Analytics</h3>
      </template>

      <template #end>
        <pv-button icon="pi pi-home" class="mr-2"></pv-button>
        <router-link to="/analytics/health-checks">
          <pv-button>Health Checks</pv-button>
        </router-link>
      </template>
    </pv-toolbar>
  </div>
</template>

<script>
export default {
  name: 'ToolbarComponent',
};
</script>

<style scoped>
.text-white {
  color: #fff;
}

.pv-button:first-child {
  margin-right: 10px;
}
</style>