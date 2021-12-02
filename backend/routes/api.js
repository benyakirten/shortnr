const express = require('express');
const Url = require('../models/url');

const { generateShortUrl } = require('../lib/shorten');

const router = express.Router();

router.get('/:link', async (req, res, next) => {
  const { link } = req.params;
  try {
    const retrievedLink = await Url.findOne({ short: link });
    if (retrievedLink) {
      res.status(200).json({
        origin: retrievedLink.origin,
        short: retrievedLink.short
      });
    } else {
      res.status(404).json({
        error: 'Full link not found'
      });
    }
  } catch (e) {
    next(e);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { link } = req.body;
    const preexisting = await Url.findOne({ origin: link });
    if (preexisting) {
      res.status(200).json({
        origin: preexisting.origin,
        short: preexisting.short
      });
      return next();
    }
  
    const newUrl = new Url({ origin: link });
    const short = await generateShortUrl(newUrl);
    newUrl.short = short;

    await newUrl.save();

    res.status(201).json({
      origin: newUrl.origin,
      short: newUrl.short
    });
    next();
  } catch (e) {
    next(e);
  }
});

module.exports = router;
