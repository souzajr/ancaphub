const { fileService } = require('../services')
const { insertFile, getManyFiles } = fileService

const insert = async (req, res, next) => {
  try {
    const { originalname, name, size, location: url = '' } = req.file;
    const result = await insertFile({originalname, name, size, url})
    res.status(200).json(result);
    next()
  } catch (e) {
    res.sendStatus(500) && next(e)
  }
}

const get = async (req, res, next) => {
  try {
    const filesToLoad = JSON.parse(req.query['files']);
    const result = await getManyFiles(filesToLoad)
    res.status(200).send(result);
    next()
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = { insert, get };
