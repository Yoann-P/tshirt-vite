const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();
const sharp = require('sharp');
app.use(cors());
app.use(express.json({ limit: '10mb' }));
const port = 3003;

app.post('/api/save-image', async (req, res) => {
    const base64Data = req.body.base64Data;
    const filename = req.body.filename;

    // Convertissez la base64 en données binaires
    const binaryData = Buffer.from(base64Data.split(',')[1], 'base64');

    // Toujours convertir l'image en PNG
    sharp(binaryData)
        .toFormat('png')
        .toFile(`../public/upload/${filename}.png`, (convertErr) => {
            if (convertErr) {
                console.error(convertErr);
                return res.status(500).send("Erreur lors de la conversion en PNG.");
            }

            // Créez une miniature de 64x64 pixels
            sharp(binaryData)
                .resize(64, 64)
                .toFormat('png') // Assurez-vous que la miniature est toujours en PNG
                .toFile(`../public/upload/${filename}_thumb.png`, (resizeErr) => {
                    if (resizeErr) {
                        console.error(resizeErr);
                        return res.status(500).send("Erreur lors de la création de la miniature.");
                    }
                    res.send(`${filename}.png`);
                });
        });
});

app.listen(port, () => {
    console.log(`Serveur démarré sur le port ${port}`);
});
