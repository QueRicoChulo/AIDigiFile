import React from 'react';
import FileList from '../components/FileList';
import UploadForm from '../components/UploadForm';

const Dashboard: React.FC = () => {
    const files: Array<{ id: string; name: string; date: string }> = [];
    return (
        <div>
            <h1>AI Smart Digital File Cabinet</h1>
            <UploadForm />
            <FileList files={files} />
        </div>
    );
};

export default Dashboard;