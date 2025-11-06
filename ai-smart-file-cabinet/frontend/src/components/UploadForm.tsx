import React, { useState } from 'react';
import { useConfig } from '../contexts/ConfigContext';

const UploadForm: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setFile(event.target.files[0]);
        }
    };

    const handleUpload = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!file) {
            setError('Please select a file to upload.');
            return;
        }

        setUploading(true);
        setError(null);
        const { config } = useConfig();

        const formData = new FormData();
        formData.append('file', file);

        try {
            const headers: Record<string, string> = {};
            if (config.apiKey) headers['Authorization'] = `Bearer ${config.apiKey}`;
            if (config.modelApiUrl) headers['X-Model-Api-Url'] = config.modelApiUrl;
            if (config.modelType) headers['X-Model-Type'] = config.modelType;
            if (config.customOptions && Object.keys(config.customOptions).length > 0) {
                headers['X-Custom-Options'] = encodeURIComponent(JSON.stringify(config.customOptions));
            }

            const response = await fetch('/api/upload', {
                method: 'POST',
                headers,
                body: formData,
            });

            if (!response.ok) {
                throw new Error('File upload failed.');
            }

            // Handle successful upload (e.g., reset form, show success message)
            setFile(null);
            alert('File uploaded successfully!');
        } catch (err: unknown) {
            // Narrow unknown error to string message
            if (err instanceof Error) setError(err.message);
            else setError(String(err));
        } finally {
            setUploading(false);
        }
    };

    return (
        <form onSubmit={handleUpload}>
            <input type="file" onChange={handleFileChange} />
            <button type="submit" disabled={uploading}>
                {uploading ? 'Uploading...' : 'Upload'}
            </button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
    );
};

export default UploadForm;