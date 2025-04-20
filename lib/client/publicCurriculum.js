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
  
  export function useCurriculum(url) {
    const { data, error, mutate } = useSWR(url, fetcher);
  
    return {
      result: data,
      isLoading: !data && !error,
      isError: error,
      mutate,
    };
  }

/* Get Curriculum */
export async function getCurriculum(courseId) {
    try {
        const response = await axios.get(`$/api/user/curriculum/?id=${courseId}`);
        console.log("responded", response.data)
        return {'status': true, result: response.data}
    } catch (error) {
        console.error("Error fetching curriculum:", error?.response?.data || error.message);
        return {'status': false, result:error?.response?.data?.error || error?.message || "Failed to fetch curriculum"}
    }
  }
  