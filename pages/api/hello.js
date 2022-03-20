export default async function handler(req, res) {
    await res.status(200).json({ text: 'Hello' })
}