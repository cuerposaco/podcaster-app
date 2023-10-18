const bypassCors = (url: string): string => {
  return `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;
};

const parseJSON = (data: any) => {
  try {
    return JSON.parse(data);
  } catch (error) {
    return data;
  }
};

/**
 * Base request with cache strategy
 */
export const request = (url: string, bypassCORS: boolean = false, retried:boolean = false): Promise<any> => {
  return fetch(bypassCORS ? bypassCors(url) : url)
    .then(response => response.json())
    .then(result => bypassCORS ? parseJSON(result.contents) : result)
    .catch(error => {
      if (retried) {
        return Promise.reject(error);
      }
      console.log('retrying request due error....', error);
      return request(url, bypassCORS, true);
    });
};
