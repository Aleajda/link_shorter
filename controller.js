import db from './db.js';
import * as url from "node:url";
import shortID from "short-id";

class Controller {
    async createShortUrl(req, res) {
        if (!req.body.link){
            return res.status(400).send({error: 'You must provide a link to the shortUrl'});
        }
        const checkUrl = await db.findOne({
            link: req.body.link
        })

        if (checkUrl){
            const urlObj = checkUrl.toObject()
            return res.status(200).send({shortLink: urlObj.shortLink});
        }else {
            const shortLink = await db.create({
                link: req.body.link
            })
            const urlObj = shortLink.toObject()
            return res.status(200).send({shortLink: urlObj.shortLink});
        }
    }

    async getFullUrl (req, res) {
        const shortId = req.params.shortId;
        const shortUrl = await db.findOne({
            shortLink: shortId
        })
        if (shortUrl){
            shortUrl.clicks++
            shortUrl.save()

            const fullUrl = shortUrl.toObject().link
            return res.redirect(fullUrl);

        }
    }
}

export default new Controller();