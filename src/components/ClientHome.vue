<template>
  <div class="client-home">
    <div class="search-container">
      <input type="text" v-model="searchKey" placeholder="Search..." />
      <button @click="search">Search</button>
    </div>

    <table>
      <thead>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Email</th>
          <th>City</th>
          <th>Company</th>
          <th>Job</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="instructor in filteredInstructors" :key="instructor.id">
          <td>{{ instructor.id }}</td>
          <td>{{ instructor.name }}</td>
          <td>{{ instructor.email }}</td>
          <td>{{ instructor.city }}</td>
          <td>{{ instructor.company }}</td>
          <td>{{ instructor.job }}</td>
          <td>{{ instructor.date }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchKey: '',
      instructors: [
        // Assuming this is the data structure you're working with
        // Replace with actual data, possibly fetched from an API
        { id: 16, name: 'Samara Kulb', email: 'benjamin.green@example.net', city: 'Port Coralie', company: 'Deckow Group', job: 'Typesetting Machine Operator', date: '2017-01-13 19:17:16' },
        // ... other instructors
      ],
    };
  },
  computed: {
    filteredInstructors() {
      if (!this.searchKey) {
        return this.instructors;
      }
      return this.instructors.filter((instructor) => {
        return Object.values(instructor).some((value) =>
          value.toString().toLowerCase().includes(this.searchKey.toLowerCase())
        );
      });
    },
  },
  methods: {
    search() {
      // The search action will automatically trigger the computed property to update.
      // This method could be used to fetch new data based on the searchKey.
    },
  },
};
</script>

<style>
/* Add your CSS here */
</style>