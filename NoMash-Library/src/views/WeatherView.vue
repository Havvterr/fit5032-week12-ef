<template>
  <div class="container">
    <div class="header">
      <h1>WEATHER APP</h1>
      <div class="search-bar">
        <input type="text" v-model="city" placeholder="Enter city name" class="search-input" />
        <button @click="searchByCity" class="search-button">Search</button>
      </div>
    </div>

    <main>
      <div v-if="weatherData">
        <h2>{{ weatherData.name }}, {{ weatherData.sys.country }}</h2>
        <div>
          <img :src="iconUrl" alt="Weather Icon" />
          <p>{{ temperature }} °C</p>
        </div>
        <span>{{ weatherData.weather[0].description }}</span>
      </div>
    </main>
  </div>
</template>

<script>
import axios from 'axios'

const apikey = '04e3b503d28a441563c14440d56af187'

export default {
  name: 'App',
  data() {
    return {
      city: '',
      weatherData: null,
      hourlyForecast: [],
      dailyForecast: []
    }
  },

  computed: {
    temperature() {
      return this.weatherData ? Math.floor(this.weatherData.main.temp - 273) : null
    },
    //Get the current weather icon using the API
    iconUrl() {
      return this.weatherData
        ? `http://api.openweathermap.org/img/w/${this.weatherData.weather[0].icon}.png`
        : null
    }
  },

  mounted() {
    this.fetchCurrentLocationWeather()
  },
  methods: {
    async fetchCurrentLocationWeather() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const { latitude, longitude } = position.coords
          //API link to obtain the current weather based on the current location browser identified
          const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apikey}`
          //await means wait for the fetchWeatherData method to complete before proceeding
          await this.fetchWeatherData(url)
        })
      }
    },
    async searchByCity() {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${apikey}&units=metric`
      await this.fetchWeatherData(url)
    },
    async fetchWeatherData(url) {
      try {
        const response = await axios.get(url)
        //Returned data from API is stored as JSON file in weatherData
        this.weatherData = response.data
      } catch (error) {
        console.error('Error fetching weather data:', error)
      }
    }
  }
}
</script>
