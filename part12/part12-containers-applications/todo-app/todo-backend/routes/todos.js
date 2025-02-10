const express = require('express');
const { Todo } = require('../mongo')
const router = express.Router();
const { getAsync, setAsync } = require('../redis');

const COUNTER_KEY = 'added_todos';

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos);
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  try {
    const todo = await Todo.create({
      text: req.body.text,
      done: false
    })
    
    let currentCount = await getAsync(COUNTER_KEY);
    currentCount = currentCount ? Number(currentCount) + 1 : 1;
    await setAsync(COUNTER_KEY, currentCount);

    res.status(201).send(todo);
  
  } catch (error) {
    console.error('Error creating todo:', error);
    res.status(500).send('Error creating todo');
  }
});

router.get('/statistics', async (req, res) => {
  try {
    let count = await getAsync(COUNTER_KEY);
    count = count ? Number(count) : 0;
    console.log({added_todos: count});
    res.json({ added_todos: count });
  } catch (error) {
    console.error('Error getting statistics:', error);
    res.status(500).send('Error getting statistics');
  }
});


const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()  
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  res.send(req.todo);
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  req.todo.text = req.body.text
  req.todo.done = req.body.done
  await req.todo.save()
  res.send(req.todo);
});

router.use('/:id', findByIdMiddleware, singleRouter)


module.exports = router;
