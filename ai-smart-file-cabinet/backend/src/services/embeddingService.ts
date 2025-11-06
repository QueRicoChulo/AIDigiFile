export class EmbeddingService {
    private embeddings: Map<string, number[]>;

    constructor() {
        this.embeddings = new Map();
    }

    public createEmbedding(fileId: string, embedding: number[]): void {
        this.embeddings.set(fileId, embedding);
    }

    public getEmbedding(fileId: string): number[] | undefined {
        return this.embeddings.get(fileId);
    }

    public getAllEmbeddings(): Map<string, number[]> {
        return this.embeddings;
    }
}