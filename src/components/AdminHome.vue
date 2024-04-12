<template>
    <div class="instructors-page">
      <h4>Admin Home</h4>
      <table class="instructors-table">
        <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Expertise</th>
          <th>Qualification</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="instructor in instructors" :key="instructor.id">
          <td>{{ instructor.id }}</td>
          <td>{{ instructor.f_name }} {{ instructor.l_name }}</td>
          <td>{{ instructor.email }}</td>
          <td>{{ instructor.expertise }}</td>
          <td>{{ instructor.qualification }}</td>
          <td>{{ instructor.status }}</td>
          <td>
            <button 
                @click="toggleInstructorStatus(instructor.id, instructor.status)" 
                class="action-button"
            >
                {{ instructor.status === 'Active' ? 'Deactivate' : 'Activate' }}
            </button>
          </td>
        </tr>
      </tbody>
      </table>
    </div>
</template>

<script>
import InstructorService from '@/services/InstructorService';
import AdminService from '@/services/AdminService';

export default {
  data() {
    return {
      instructors: [],
    };
  },
  created() {
    this.fetchInstructors();
  },
  methods: {
    fetchInstructors() {
    console.log('Test');
    if (!this.searchQuery) {
        InstructorService.getData()
          .then(response => {
            console.log('API Response:', response); 
            if (response && response.data) {
              this.instructors = response.data.instructors;
            } else {
              console.error("Invalid response format:", response);
            }
          })
          .catch(e => {
            console.error("Error fetching instructors:", e);
          });
        }
    },
    approveInstructor(instructorId) {
        console.log('instructorId ' + instructorId);
      AdminService.approveInstructor(instructorId)
        .then(() => {
          this.fetchInstructors(); // Refresh the list after approval
        })
        .catch(error => {
          console.error('Error approving instructor:', error);
          alert('Error approving instructor');
        });
    },

    deactivateInstructor(instructorId) {
        console.log('instructorId ' + instructorId);
      AdminService.deactivateInstructor(instructorId)
        .then(() => {
          this.fetchInstructors(); // Refresh the list after approval
        })
        .catch(error => {
          console.error('Error deactivate instructor:', error);
        });
    },
    toggleInstructorStatus(instructorId, currentStatus) {
      console.log(`Toggling status for instructor ID ${instructorId}`);
      const action = currentStatus === 'Active' ? 'deactivateInstructor' : 'approveInstructor';
      AdminService[action](instructorId)
        .then(() => {
          console.log(`Instructor status changed to ${currentStatus === 'Active' ? 'Inactive' : 'Active'}`);
          this.fetchInstructors(); // Refresh the list after changing status
        })
        .catch(error => {
          console.error(`Error changing status for instructor:`, error);
          //alert(`Error changing status for instructor: ${error.message}`);
        });
    },
  }
};
</script>
<style scope>
.instructors-page {
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .instructors-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
  }
  
  .instructors-table th,
  .instructors-table td {
    border: 1px solid #ddd;
    padding: 8px;
  }
  
  .action-button {
    padding: 5px 10px;
    font-size: 14px;
    cursor: pointer;
    border-radius: 3px;
  }
  
</style>