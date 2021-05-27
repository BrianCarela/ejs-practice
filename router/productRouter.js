const express = require("express");
const router = express.Router();
const uuidv4 = require("uuid").v4;

let productsArray = [
    {
      id: uuidv4(),
      name: "pants",
    },
    {
      id: uuidv4(),
      name: "shorts",
    },
    {
      id: uuidv4(),
      name: "shirts",
    },
  ];

router.get("/", function (req, res) {
    res.json({ payload: productsArray})
})

router.get("/get-product-by-id/:id", function (req, res) {
    console.log(req.params)

    // this is called destructuring. same as const id = req.params.id
    const { id } = req.params;

    // const { id, name, type } = req.params // this assigns a variable to all 3 keys smoothly

    // this loops through and returns true if it matches the id.
    let foundProductIndex = productsArray.findIndex(item => {
        return item.id == id
    })

    // -1 means it wasn't found, so this is the error case
    if (foundProductIndex === -1) {
        // the .status makes sure that the response knows it's a 404 error
        res.status(404).json({ message: "Sorry not found"})
    } else {
        res.json({ payload: productsArray[foundProductIndex]})
    }
})

router.get("/get-product-by-name/:name", function (req, res) {
    console.log(req.params)

    // this is called destructuring. same as const id = req.params.id
    const { name } = req.params;

    // const { id, name, type } = req.params // this assigns a variable to all 3 keys smoothly

    // this loops through and returns true if it matches the id.
    let foundProductIndex = productsArray.findIndex(item => {
        return item.name == name
    })

    // -1 means it wasn't found, so this is the error case
    if (foundProductIndex === -1) {
        // the .status makes sure that the response knows it's a 404 error
        res.status(404).json({ message: "Sorry not found"})
    } else {
        res.json({ payload: productsArray[foundProductIndex]})
    }
})

router.post("/create-product", function (req, res) {

    const { name } = req.body;

    // automate a new id, and name is based on body
    let newProductObj = { id: uuidv4(), name}

    productsArray.push(newProductObj);

    res.json({ payload: productsArray });
})

router.put("/update-product-by-id/:id", function (req, res) {

    const { id } = req.params;
    const { newName } = req.body;

    let foundProductIndex = productsArray.findIndex(item => {
        return item.id == id
    });

    if (foundProductIndex === -1) {
        res.status(404).json({ message: "Sorry not found"})
    } else {
        productsArray[foundProductIndex].name = newName;
        res.json({ payload: productsArray})
    }

})

router.delete("/delete-product-by-id/:id", function (req, res) {

    const { id } = req.params;

    let foundProductIndex = productsArray.findIndex((item) => {
      return item.id === id;
    });

    if (foundProductIndex === -1) {
      res.status(404).json({ message: "Sorry not found!" });
    } else {
      productsArray.splice(foundProductIndex, 1);
      res.json({ payload: productsArray });
    }
    
  });

module.exports = router;