import sharp from "sharp"

export class ImageTransformer {
   
    constructor(filename) {
        this.filename = filename
        this.path = "./files"

        this.map = {
            small: "sm",
            average: "md",
            mirrored: "mirror",
            blackAndWhite: "pb",
            verticallyInverted: "rot"
        }
    }

    async getOriginPath() {
        return `${this.path}/${this.filename}`
    }
    
    async getFinallyPath(prefix) {
        return `${this.path}/${prefix}_${this.filename}`
    }

    async toSmall() {
        sharp(await this.getOriginPath()).resize(150, 150).toFile(await this.getFinallyPath(this.map.small))    
    }

    async toAverage() {
        sharp(await this.getOriginPath()).resize(400, 400).toFile(await this.getFinallyPath(this.map.average))
    }

    async toMirrored() {
        sharp(await this.getOriginPath()).flop().toFile(await this.getFinallyPath(this.map.mirrored))    
    }

    async toBlackAndWhite() {
        sharp(await this.getOriginPath()).greyscale().toFile(await this.getFinallyPath(this.map.blackAndWhite))    
    }

    async toVerticallyInverted() {
        sharp(await this.getOriginPath()).rotate(180).toFile(await this.getFinallyPath(this.map.verticallyInverted))
    }

}
