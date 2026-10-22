import cloudSea, { meta as original } from 'https://ascii.rest/pieces/cloud-sea.js';

// Keep the original sunset colours against the site's background.
const theme = getComputedStyle(document.documentElement);
const ground = theme.getPropertyValue('--oxide').trim();

export const meta = {
  ...original,
  ground,
};

export default cloudSea;
