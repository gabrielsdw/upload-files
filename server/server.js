
// const ImageTransformer = require('./imagetransformer.js')
// const express          = require("express")
// const cors             = require("cors")
// const multer           = require("multer")
// const uuid             = require("uuid")
// const path             = require("path")
// const fs               = require("fs")

import { ImageTransformer } from "./imagetransformer.js"
import { configDotenv } from "dotenv"
import { v4 } from "uuid"
import express from "express"
import multer from "multer"
import cors from "cors"
import path from "path"

configDotenv()

const PORT = process.env.PORT ?? 8000

const storageFunction = multer.diskStorage(({
    destination: (req, file, cb) => { // cb -> callback
        cb(null, 'files/')
    },
    filename: (req, file, cb) => {
        let newName = v4()
        cb(null, newName + path.extname(file.originalname))
    }
}))

const upload = multer({storage: storageFunction})

const app = express()
app.use(cors(), express.json())

app.post('/register', upload.single("photo"), async (req, res) => {
    let username = req.body.username
    let filename = req.file.filename

    const imageTransformer = new ImageTransformer(filename)
    await imageTransformer.toSmall()
    await imageTransformer.toAverage()
    await imageTransformer.toMirrored()
    await imageTransformer.toBlackAndWhite()
    await imageTransformer.toVerticallyInverted()

    const response = {
        username: username,
        filename: filename
    }

    res.send(response)
})

app.listen(PORT, () => {
    console.log(`Server running in port: ${PORT}`)
})
