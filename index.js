const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.json())

let persons = [
  {
    name: 'Arto Hellas',
    number: '040-123456',
    id: 1,
  },
  {
    name: 'Ada Lovelace',
    number: '39-44-5323523',
    id: 2,
  },
  {
    name: 'Dan Abramov',
    number: '12-43-234345',
    id: 3,
  },
  {
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
    id: 4,
  },
  {
    name: 'Mary Archia',
    number: '39-23-663233122',
    id: 5,
  },
  {
    name: 'jose adwaendieck',
    number: '39-21*55423122',
    id: 6,
  },
  {
    name: 'Ban Armenio',
    number: '39-23-6423122',
    id: 7,
  },
]

const generateRandomID = () => Math.round(Math.random() * 1000000)

const isInDiary = (name) => persons.find((person) => person.name === name)

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/info', (req, res) => {
  const info = `<p>Phonebook has info for ${persons.length} people </p>
                <p>${new Date()} </p>`
  res.send(info)
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find((person) => person.id === id)

  if (person) {
    res.json(person)
  } else {
    res.status(404).end()
  }
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter((person) => person.id !== id)

  res.status(204).end()
})

app.post('/api/persons', (req, res) => {
  const id = generateRandomID()
  let person = req.body

  if (!(person.name && person.number)) {
    return res.status(404).json({
      error: 'Some parameter missing',
    })
  }

  if (isInDiary(person.name)) {
    return res.status(404).json({
      error: 'name must be unique',
    })
  }

  person = { ...person, id }

  persons = persons.concat(person)
  console.log(`-${person.name} is sucefully added!!`)
  res.send(person)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
