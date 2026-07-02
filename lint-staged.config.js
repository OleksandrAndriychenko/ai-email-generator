/** @type {import("lint-staged").Config} */
const config = {
    "*.{js,jsx,ts,tsx}": ["eslint --fix", "prettier --write"],
    "*.{json,md,css}": ["prettier --write"],
};

export default config;
