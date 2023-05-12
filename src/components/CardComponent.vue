<template>
    <div class="center-card">
      <h1 class="center">Average Performance</h1>
      <div class="performance">
        <div class="performance-item">
          <span class="performance-item-title">Volts</span>
          <span class="performance-item-value">{{ averageVolts.toFixed(2) }}</span>
        </div>
        <div class="performance-item">
          <span class="performance-item-title">Watts</span>
          <span class="performance-item-value">{{ averageWatts.toFixed(2) }}</span>
        </div>
        <div class="performance-item">
          <span class="performance-item-title">HP</span>
          <span class="performance-item-value">{{ averageHp.toFixed(2) }}</span>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import HeathService from '@/services/healthchecksService'
  
  export default {
    name: 'AveragePerformance',
    data() {
      return {
        healthChecks: [],
        averageVolts: 0,
        averageWatts: 0,
        averageHp: 0
      }
    },
    mounted() {
      this.getHealthChecks()
    },
    methods: {
      getHealthChecks() {
        HeathService.getList()
          .then((response) => {
            this.healthChecks = response
  
            let numberOfData = 0
            let sumVolts = 0
            let sumWatts = 0
            let sumHp = 0
  
            this.healthChecks.forEach((healthCheck) => {
              if (healthCheck.hp !== 0) {
                numberOfData++
                sumVolts += healthCheck.volts
                sumWatts += healthCheck.watts
                sumHp += healthCheck.hp
              }
            })
  
            if (numberOfData > 0) {
              this.averageVolts = sumVolts / numberOfData
              this.averageWatts = sumWatts / numberOfData
              this.averageHp = sumHp / numberOfData
            }
          })
          .catch((error) => {
            console.log(error)
          })
      }
    }
  }
  </script>
  
  <style scoped>
  .center-card {
    margin: 5% auto;
    width: 50%;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 0 5px #ccc;
  }
  
  .center {
    text-align: center;
    padding: 10px 5px;
  }
  
  .performance {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    padding: 1rem;
  }
  
  .performance-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    border-radius: 5px;
    background-color: #f4f4f4;
    height: 100%;
    padding: 1rem;
    width: 30%;
    margin-bottom: 1rem;
  }
  
  .performance-item-title {
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }
  
  .performance-item-value {
    font-size: 2.5rem;
    font-weight: 700;
  }
  </style>