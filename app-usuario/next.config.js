/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone",
    images: {
        domains: [
            'ibb.co','i.ibb.co', 'drive.google.com', 'distribuidorabebidas.com.uy', 'salus.com.uy', 'lh3.googleusercontent.com'
        ]
    },
    env: {
        mercadoPagoPublicKey: 'TEST-54765a41-982b-4463-81ed-79422f7013ca',
    }
}

module.exports = nextConfig
