const express = require('express')
const blogRouter = require('./controllers/blog')
const app = express()

app.use(express.json())
app.use('/api/blogs', blogRouter)

app.get('/', (req, res) => {
  res.send('Hello World!')
})


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
