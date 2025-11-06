import { IngestionService } from '../services/ingestionService';
import { Queue } from 'bull';
import { Job } from 'bull';

const ingestionQueue = new Queue('ingestionQueue');

ingestionQueue.process(async (job: Job) => {
    const ingestionService = new IngestionService();
    const { filePath } = job.data;

    try {
        await ingestionService.ingestFile(filePath);
        console.log(`Successfully ingested file: ${filePath}`);
    } catch (error) {
        console.error(`Failed to ingest file: ${filePath}`, error);
    }
});

export const addFileToIngestionQueue = (filePath: string) => {
    ingestionQueue.add({ filePath });
};