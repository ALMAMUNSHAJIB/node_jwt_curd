const router = require('express').Router();
const Todo = require('../models/Todo');
const {checkLogin} = require('../middleware/auth');

router.get('/', checkLogin, async (req, res) => {
    try {
        const todos = await Todo.find({ status: "inactive" }).select({
            _id: 0,

        }).limit(2);

        res.status(200).json({
            data: todos
        })

    } catch (err) {
        res.status(500).json({
            message: err
        });
    }
});


router.get('/:id', async (req, res) => {
    try {
        const todos = await Todo.findById({ _id: req.params.id }).select({
            _id: 0,
        }).limit(2);
        res.status(200).json({
            data: todos
        })
    } catch (err) {
        res.status(500).json({
            message: err
        });
    }
});

router.post('/', async (req, res) => {
    try {
        const todos = new Todo(req.body);
        await todos.save();
        res.status(201).json({
            message: "Inserted was successfull!!"
        })

    } catch (err) {
        res.status(500).json({
            message: err
        })
    }

});


router.put('/:id', async (req, res) => {
    const { status } = new Todo(req.body);
    try {
        await Todo.findByIdAndUpdate({ _id: req.params.id }, {
            $set: {
                status
            }
        })
        res.status(200).json({
            message: "Update was successfull!!"
        })

    } catch (err) {
        res.status(500).json({
            message: err
        });
    };

});

router.delete('/:id', async(req, res) => {
    try{
        await Todo.findByIdAndRemove({_id: req.params.id})
        res.status(200).json({
           message: "Delete was successful!!"  
        })
        }catch(err){
            res.status(500).json({
              message: err
            });
        }

});

module.exports = router;