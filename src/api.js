const api = {
  request: async function(url, options = {}) {
    try {
      const response = await fetch(url, options);
      return await response.json();
    } catch (e) {
      return e;
    }
  },
  suggestions: {
    fetch: async function(word) {
      return await api.request("https://api.datamuse.com/words?ml=" + word);
    },
  },
};

export default api;
