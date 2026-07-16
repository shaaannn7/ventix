// Mock wrapper to mapbox-gl to prevent loading crashes during testing/simulation
export const mapboxConfig = {
  token: import.meta.env.VITE_MAPBOX_ACCESS_TOKEN || 'mock_mapbox_token',
  styles: {
    dark: 'mapbox://styles/mapbox/dark-v11',
  },
};
