import axios from "axios";

const API_BASE_URL = '/api/instructor/course';



/* Delete section */
export async function deleteCourse(sectionId) {
    try {
        const response = await axios.delete(`${API_BASE_URL}/create/?id=${sectionId}`, {
            headers: { "Content-Type": "application/json" },
        });
        console.log("responded", response.data)
        return {'status': true, result: response.data}
    } catch (error) {
        console.error("Error updating section:", error?.response?.data || error.message);
        return {'status': false, result:error?.response?.data?.error || error?.message || "Failed to delete Section"}
    }
  }
  
  