<template>
    <div class="table-wrapper">
      <pv-dataTable
        :value="checkHealths"
        :columns="columns"
        :paginator="true"
        :rows="10"
        :rows-per-page-options="[5, 10, 25]"
        :filters="filters"
      >
        <template #header>
          <div class="header">
            <pv-button
              type="button"
              icon="pi pi-filter-slash"
              label="Clear"
              outlined
              @click="clearFilter()"
            />
            <span>
              <i class="pi pi-search" />
              <pv-inputtext
                v-model="filters['global'].value"
                placeholder="Keyword Search"
              />
            </span>
          </div>
        </template>
  
        <pv-column sortable field="id" :header="'record-id'"></pv-column>
        <pv-column
          sortable
          field="treadmillId"
          :header="treadmill-id"
        ></pv-column>
        <pv-column
          sortable
          field="serialNumber"
          :header="serial-number"
        ></pv-column>
        <pv-column
          sortable
          field="centerName"
          :header="center-name"
        ></pv-column>
        <pv-column sortable field="date" :header="'date'"></pv-column>
        <pv-column sortable field="time" :header="'time'"></pv-column>
        <pv-column sortable field="volts" :header="'volts'"></pv-column>
        <pv-column sortable field="watts" :header="'watts'"></pv-column>
        <pv-column sortable field="hp" :header="'hp'"></pv-column>
      </pv-dataTable>
    </div>
  </template>
  <script setup>
  import HealthCheckService from "../services/healthchecksService";
  import TreadmillService from "../services/TreadMillService"
  import MarathonCenterService from "../services/centersService";
  import { ref, onMounted } from "vue";
  
  const checkHealths = ref([]);
  const columns = ref(null);
  
  const filters = ref({
    global: {
      value: "",
      matchMode: "contains",
    },
  });
  
  const initFilters = () => {
    for (const key in filters.value) {
      filters.value[key].value = "";
    }
  };
  
  const clearFilter = () => {
    initFilters();
  };
  //applyGlobalFilter
  const applyGlobalFilter = () => {
    const value = filters.value["global"].value;
    const matchMode = filters.value["global"].matchMode;
  
    checkHealths.value = checkHealths.value.filter((item) => {
      let match = true;
      if (value) {
        match = String(item.id).toLowerCase().includes(value.toLowerCase());
      }
  
      return match;
    });
  };
  const getHealthChecks = async () => {
    try {
      const response = await HealthCheckService.getList();
      checkHealths.value = response;
  
      await Promise.all(
        checkHealths.value.map(async (item) => {
          item.date = `${item.year}-${item.month}-${item.day}`;
          item.time = `${item.hour}:${item.minutes}:${item.seconds}`;
  
          const treadmillResponse = await TreadmillService.getItem(
            item.treadmillId
          );
          item.serialNumber = treadmillResponse.serialNumber;
  
          const centerResponse = await MarathonCenterService.getCenter(
            treadmillResponse.centerId
          );
          item.centerName = centerResponse.name;
        })
      );
    } catch (error) {
      console.error(error);
    }
  };
  
  onMounted(getHealthChecks);
  
  columns.value = [
    { field: "id", header: "Record ID" },
    { field: "treadmillId", header: "Treadmill ID" },
    { field: "serialNumber", header: "Serial Number" },
    { field: "centerName", header: "Center Name" },
    { field: "date", header: "Date" },
    { field: "time", header: "Time" },
    { field: "volts", header: "Volts" },
    { field: "watts", header: "Watts" },
    { field: "hp", header: "HP" },
  ];
  </script>
  
  <style scoped>
  .table-wrapper {
    max-width: 800px;
    margin: 0 auto;
  }
  
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    background-color: #f5f5f5;
  }
  
  .header span {
    display: flex;
    align-items: center;
  }
  
  .header i {
    margin-right: 5px;
  }
  
  .p-datatable {
    font-size: 14px;
    border-collapse: collapse;
    border-spacing: 0;
    width: 100%;
    text-align: left;
    background-color: #fff;
    margin-top: 20px;
  }
  
  .p-datatable thead tr th {
    background-color: #f5f5f5;
    border-bottom: 1px solid #ddd;
    color: #333;
    padding: 10px;
  }
  
  .p-datatable tbody tr:nth-child(even) {
    background-color: #f9f9f9;
  }
  
  .p-datatable tbody tr td {
    border-bottom: 1px solid #ddd;
    padding: 10px;
  }
  
  .p-paginator {
    margin-top: 10px;
  }
  
  .p-dropdown {
    width: 100%;
    margin-right: 10px;
    margin-bottom: 10px;
  }
  
  </style>