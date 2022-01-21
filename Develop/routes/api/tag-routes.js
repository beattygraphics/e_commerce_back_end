const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    //const tagData = await Tag.findAll({ include:[{ model: Product}]});
    const tagData = await Tag.findAll();
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }  
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const singleTag = await Tag.findByPk(req.params.id, {
      // include: [{ model: Product, through: Tag, as: 'single_product_with_tag' }]
    });

    if (!singleTag) {
      res.status(404).json({ message: 'No tag found with this id!' });
      return;
    }

    res.status(200).json(singleTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const newTag = await Tag.create(req.body);
    res.status(200).json(newTag);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
   //check for product first
  const tagData = await Tag.findByPk(req.params.id, {
    // include: [{ model: Category, model:Tag, as: 'product_tag1'}]
  });

  if (!tagData) {
    res.status(404).json({ message: 'No tag found with this id!' });
    return;
  }

  // update product data
  return Tag.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
  .then(async (tag)=>{
    let updated = await Tag.findByPk(req.params.id, {
      // include: [{ model: Category, model:Tag, as: 'product_tag1'}]
    });
    res.status(200).json(updated)
  })
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!tagData) {
      res.status(404).json({ message: 'No tag found with this id!' });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
