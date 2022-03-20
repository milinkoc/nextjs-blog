// Fake users data
const users = [{ id: 1, name: 'Pera' }, { id: 2, name: 'Mika' }, { id: 3, name: 'Zika' }]

export default function handler(req, res) {
  // Get data from your database
  res.status(200).json(users)
}