export class IngestionService {
    private fileStoragePath: string;

    constructor(fileStoragePath: string) {
        this.fileStoragePath = fileStoragePath;
    }

    // Minimal uploaded file shape to avoid depending on multer types here
    public async ingestFile(file: { originalname: string; buffer: Buffer }): Promise<string> {
        const filePath = `${this.fileStoragePath}/${file.originalname}`;
        await this.saveFile(file.buffer, filePath);
        return filePath;
    }

    private async saveFile(buffer: Buffer, filePath: string): Promise<void> {
        const fs = require('fs').promises;
        await fs.writeFile(filePath, buffer);
    }

    public async deleteFile(fileName: string): Promise<void> {
        const fs = require('fs').promises;
        const filePath = `${this.fileStoragePath}/${fileName}`;
        await fs.unlink(filePath);
    }
}