import React from 'react';

const FileList: React.FC<{ files: Array<{ id: string; name: string; date: string }> }> = ({ files }) => {
    return (
        <div>
            <h2>Uploaded Files</h2>
            <ul>
                {files.map(file => (
                    <li key={file.id}>
                        <span>{file.name}</span> - <span>{file.date}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FileList;