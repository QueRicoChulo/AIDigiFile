import fs from 'fs';
import path from 'path';

/**
 * Lightweight ingestion worker (no external queue dependency).
 * This will read the given filePath and copy it into the configured
 * FILE_STORAGE_PATH (default /tmp/uploads). This keeps the worker
 * self-contained for simple deployments.
 */
export const addFileToIngestionQueue = async (filePath: string) => {
    const storageDir = process.env.FILE_STORAGE_PATH || '/tmp/uploads';
    try {
        const buffer = await fs.promises.readFile(filePath);
        const originalname = path.basename(filePath);
        const destDir = storageDir;
        await fs.promises.mkdir(destDir, { recursive: true });
        const destPath = path.join(destDir, originalname);
        await fs.promises.writeFile(destPath, buffer);
        console.log(`Successfully ingested file to: ${destPath}`);
    } catch (error) {
        console.error(`Failed to ingest file: ${filePath}`, error);
        throw error;
    }
};