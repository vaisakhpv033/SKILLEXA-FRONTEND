import axios from "axios";
import useSWR from "swr";

const fetcher = async (url) => {
  const res = await fetch(url);

  if (!res.ok) {
    let errorMessage = `HTTP error! Status: ${res.status}`;
    try {
      const errorData = await res.json(); // Try parsing JSON error
      errorMessage = errorData?.error || errorMessage;
    } catch {
      errorMessage = await res.text(); // Fallback to text if JSON fails
    }

    throw new Error(errorMessage);
  }

  return res.json();
};

export function useSection(url) {
  const { data, error, mutate } = useSWR(url, fetcher);

  return {
    result: data,
    isLoading: !data && !error,
    isError: error,
    mutate,
  };
}

const API_BASE_URL = '/api/instructor/course';
/* Create section */
export async function createSection(sectionData) {
  try {
      const response = await axios.post(`${API_BASE_URL}/section/`, sectionData, {
          headers: { "Content-Type": "application/json" },
      });
      console.log("responded", response.data)
      return {'status': true, result: response.data}
  } catch (error) {
      console.error("Error creating section:", error?.response?.data || error.message);
      return {'status': false, result:error?.response?.data?.error || error?.message || "Failed to create Section"}
  }
}


/* Update section */
export async function updateSection(sectionData, sectionId) {
  try {
      const response = await axios.patch(`${API_BASE_URL}/section/?id=${sectionId}`, sectionData, {
          headers: { "Content-Type": "application/json" },
      });
      console.log("responded", response.data)
      return {'status': true, result: response.data}
  } catch (error) {
      console.error("Error updating section:", error?.response?.data || error.message);
      return {'status': false, result:error?.response?.data?.error || error?.message || "Failed to update Section"}
  }
}