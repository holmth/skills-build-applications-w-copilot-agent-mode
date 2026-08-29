const getApiBaseUrl = () => {
  const codeSpaceName = import.meta.env.VITE_CODESPACE_NAME;

  if (codeSpaceName && codeSpaceName !== 'undefined') {
    return `https://${codeSpaceName}-8000.app.github.dev/api`;
  }

  return 'http://localhost:8000/api';
};

const getArrayData = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (payload && Array.isArray(payload.results)) return payload.results;
  if (payload && Array.isArray(payload.data)) return payload.data;
  return [];
};

const api = {
  getBaseUrl: getApiBaseUrl,
  getArrayData,
  getJson: async (path) => {
    const response = await fetch(`${getApiBaseUrl()}${path}`);
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }
    return response.json();
  },
};

export default api;
