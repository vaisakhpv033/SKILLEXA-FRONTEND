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

export function useCourse(url) {
  const { data, error, mutate } = useSWR(url, fetcher);

  return {
    course: data,
    isLoading: !data && !error,
    isError: error,
    mutate,
  };
}
