import React, { useState } from 'react';
import axios from 'axios';

function App() {
    const [file, setFile] = useState(null);
    const [description, setDescription] = useState('');
    const [analysis, setAnalysis] = useState(null);
    const [loading, setLoading] = useState(false); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setAnalysis(null);

        try {
            // Step 1: Get pre-signed URL
            const urlResponse = await axios.get(
                `https://rw29wxxafj.execute-api.ap-southeast-1.amazonaws.com/upload?filename=${encodeURIComponent(file.name)}`
            );
            const { uploadUrl, fileKey, contentType } = urlResponse.data;

            // Step 2: Upload to S3
            const uploadResponse = await fetch(uploadUrl, {
                method: 'PUT',
                headers: {
                    'Content-Type': contentType
                },
                body: file
            });

            if (!uploadResponse.ok) {
                throw new Error(`Upload failed: ${uploadResponse.statusText}`);
            }

            // Step 3: Trigger AI analysis
            const analysisResponse = await axios.post(
                'https://rw29wxxafj.execute-api.ap-southeast-1.amazonaws.com/analyze',
                { fileKey, description }
            );

            setAnalysis(analysisResponse.data.analysis);

        } catch (error) {
            console.error('Error details:', error);
            alert('Something went wrong. Check the console for details.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
            <div className="max-w-xl w-full bg-white p-6 rounded-lg shadow-lg">
                <h1 className="text-2xl font-semibold mb-4 text-gray-800">
                    Vehicle Damage Analyzer
                </h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Upload Image
                        </label>
                        <input 
                            type="file" 
                            accept="image/*"
                            onChange={(e) => setFile(e.target.files[0])}
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Accident Description
                        </label>
                        <textarea 
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Describe the accident..."
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                            rows={4}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={!file || !description || loading}
                        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
                    >
                        {loading ? 'Analyzing...' : 'Analyze Claim'}
                    </button>
                </form>

                {analysis && (
                    <div className="mt-6 p-4 bg-gray-100 rounded-lg border border-gray-300 space-y-3">
                        <h3 className="text-lg font-semibold text-gray-800">
                            🚗 Damage Analysis Summary
                        </h3>
                        <p>
                            <span className="font-medium text-gray-700">Severity:</span>{' '}
                            <span className="text-gray-900">{analysis.damage_severity}</span>
                        </p>
                        <p>
                            <span className="font-medium text-gray-700">Estimated Repair Cost:</span>{' '}
                            <span className="text-gray-900">{analysis.estimated_cost_range}</span>
                        </p>
                        <p>
                            <span className="font-medium text-gray-700">Affected Parts:</span>{' '}
                            <span className="text-gray-900">
                                {Array.isArray(analysis.affected_parts)
                                    ? analysis.affected_parts.join(', ')
                                    : analysis.affected_parts}
                            </span>
                        </p>
                        <p>
                            <span className="font-medium text-gray-700">Safety Concerns:</span>{' '}
                            <span className="text-gray-900">{analysis.safety_concerns}</span>
                        </p>
                        <p>
                            <span className="font-medium text-gray-700">Recommendation:</span>{' '}
                            <span className="text-gray-900">{analysis.recommended_action}</span>
                        </p>
                        <div className="mt-4">
                            <h4 className="font-medium text-gray-700 mb-1">📝 Summary</h4>
                            <p className="text-gray-800 whitespace-pre-wrap">{analysis.summary}</p>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">
                            Processed by: {analysis.model_used} • Method: {analysis.processing_method}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
