<template>
  <div>
    <h1>Instructors</h1>
    <table  style="width: 80%;margin: 0 auto;">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Qualification</th>
          <th>Availability</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="instructor in instructors" :key="instructor.id">
          <td>{{ instructor.fName }} {{ instructor.lName }}</td>
          <td>{{ instructor.email }}</td>
          <td>{{ instructor.qualification }}</td>
          <td>
            <ul v-if="instructor.availability.length > 0">
              <li v-for="availability in instructor.availability" :key="availability.id">
                {{ availability.weekDay }}: {{ availability.startTime }} - {{ availability.endTime }}
              </li>
            </ul>
            <span v-else>No availability information</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
// Assuming the instructors data is imported from your JSON file
import instructorsData from './instructors.json';

export default {
  name: 'ClientHome',
  data() {
    return {
      instructors: []
    };
  },
  created() {
    // Assuming 'instructorsData' contains the JSON structure you provided
    this.instructors = instructorsData.instructors;
  }
};
</script>

<style>
/* Add this CSS to your component's style section or to your global CSS */
table {
  border-collapse: collapse;
  width: 100%;
}

th, td {
  border: 1px solid #dddddd;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
}

/* Apply alternating row colors */
tr:nth-child(even) {
  background-color: #f9f9f9;
}

tr:nth-child(odd) {
  background-color: #ffffff;
}

</style>
