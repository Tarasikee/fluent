/** @type {import('next').NextConfig} */
const config = {
    experimental: {
        swcPlugins: [['@swc-jotai/react-refresh', {}]],
    },
}

export default config
