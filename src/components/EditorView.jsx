import React from 'react';
import Header from './Header.jsx';
import AIAssistant from './AIAssistant.jsx';
import '../styles/EditorView.css';

const EditorView = ({ initialData }) => {
    const [data, setData] = React.useState(JSON.parse(JSON.stringify(initialData))); // Deep copy
    const [generatedJson, setGeneratedJson] = React.useState('');
    const [showAssistant, setShowAssistant] = React.useState(false);
    const [copyButtonText, setCopyButtonText] = React.useState('Copy');

    const handlePersonalInfoChange = (e) => {
        const { name, value } = e.target;
        setData(prev => ({ ...prev, personalInfo: { ...prev.personalInfo, [name]: value } }));
    };

    const handleItemChange = (section, index, e) => {
        const { name, value } = e.target;
        const items = [...data[section]];
        items[index][name] = value;
        setData(prev => ({ ...prev, [section]: items }));
    };
    
    const handleSkillsChange = (e) => {
        setData(prev => ({ ...prev, skills: e.target.value.split(',').map(s => s.trim()) }));
    };

    const handleAddItem = (section) => {
        let newItem;
        if (section === 'experience') newItem = { company: '', title: '', period: '', description: '' };
        else if (section === 'projects') newItem = { name: '', description: '', link: '' };
        else if (section === 'certificates') newItem = { name: '', link: '' };
        else if (section === 'badges') newItem = { name: '', imageUrl: '', link: '' };
        
        if (newItem) {
            setData(prev => ({ ...prev, [section]: [...prev[section], newItem] }));
        }
    };

    const handleRemoveItem = (section, index) => {
        setData(prev => ({ ...prev, [section]: prev[section].filter((_, i) => i !== index) }));
    };
    
    const handleAddItemFromAI = (section, newItemData) => {
        if(data[section]) {
            setData(prev => ({ ...prev, [section]: [...prev[section], newItemData] }));
        }
    };
    
    const generateJson = () => {
        const jsonString = JSON.stringify(data, null, 2);
        setGeneratedJson(jsonString);
        setCopyButtonText('Copy'); // Reset button text when new JSON is generated
    };
    
    const handleCopyJson = () => {
        if (generatedJson) {
            navigator.clipboard.writeText(generatedJson).then(() => {
                setCopyButtonText('Copied!');
                setTimeout(() => setCopyButtonText('Copy'), 2000);
            }).catch(err => {
                console.error('Failed to copy text: ', err);
            });
        }
    };

    const renderEditableSection = (section, fields) => (
      <div className="editor-section">
        <h2>{section.charAt(0).toUpperCase() + section.slice(1)}</h2>
        {data[section].map((item, index) => (
          <div key={index} className="editor-item">
            <button onClick={() => handleRemoveItem(section, index)} className="remove-button">X</button>
            {fields.map(field => (
              field.type === 'textarea'
                ? <textarea key={field.name} name={field.name} value={item[field.name]} onChange={e => handleItemChange(section, index, e)} placeholder={field.placeholder} />
                : <input key={field.name} name={field.name} value={item[field.name]} onChange={e => handleItemChange(section, index, e)} placeholder={field.placeholder} />
            ))}
          </div>
        ))}
        <button className="button" onClick={() => handleAddItem(section)}>Add {section.slice(0, -1)}</button>
      </div>
    );

    return (
        <React.Fragment>
            <Header name="Portfolio Editor" showEditorLink={false} />
            <div className="editor-view app-container">
                <h1>Portfolio Editor</h1>
                <p>Modify the content below directly, or use the AI Assistant to add new items conversationally. When you're done, click "Generate Configuration" to get the updated data object. Copy it and paste it into the <code>portfolioData.json</code> file.</p>
                
                 <div className="editor-section">
                    <h2>AI Assistant</h2>
                    <p>Use our AI assistant to add new items to your portfolio by simply describing what you want to add.</p>
                    <button className="button" onClick={() => setShowAssistant(!showAssistant)}>
                        {showAssistant ? 'Hide' : 'Show'} AI Assistant
                    </button>
                    {showAssistant && <AIAssistant onAddItem={handleAddItemFromAI} />}
                </div>

                {/* Personal Info */}
                <div className="editor-section">
                    <h2>Personal Info</h2>
                    {Object.keys(data.personalInfo).map(key => {
                         const label = (key.charAt(0).toUpperCase() + key.slice(1)).replace(/([A-Z])/g, ' $1').trim();
                         return (
                            <div key={key} className="editor-form-group">
                                <label htmlFor={`personal-${key}`}>{label}</label>
                                <input type="text" id={`personal-${key}`} name={key} value={data.personalInfo[key]} onChange={handlePersonalInfoChange} />
                            </div>
                        );
                    })}
                </div>

                {renderEditableSection('experience', [
                    { name: 'company', placeholder: 'Company' },
                    { name: 'title', placeholder: 'Title' },
                    { name: 'period', placeholder: 'Period' },
                    { name: 'description', placeholder: 'Description', type: 'textarea' },
                ])}
                
                {renderEditableSection('projects', [
                    { name: 'name', placeholder: 'Project Name' },
                    { name: 'description', placeholder: 'Description', type: 'textarea' },
                    { name: 'link', placeholder: 'Project Link' },
                ])}

                {renderEditableSection('certificates', [
                    { name: 'name', placeholder: 'Certificate Name' },
                    { name: 'link', placeholder: 'Certificate Link' },
                ])}

                {renderEditableSection('badges', [
                    { name: 'name', placeholder: 'Badge Name' },
                    { name: 'imageUrl', placeholder: 'Image URL' },
                    { name: 'link', placeholder: 'Badge Link' },
                ])}

                {/* Skills */}
                <div className="editor-section">
                    <h2>Skills</h2>
                    <p>Enter skills separated by commas.</p>
                    <textarea value={data.skills.join(', ')} onChange={handleSkillsChange} />
                </div>
                
                <button className="button" onClick={generateJson} style={{width: '100%', padding: '1rem'}}>Generate Configuration</button>

                {generatedJson && (
                    <div className="editor-section">
                        <div className="generated-json-header">
                            <h2>Generated Configuration</h2>
                            <button className="button" onClick={handleCopyJson}>{copyButtonText}</button>
                        </div>
                        <p>Copy the content below and replace the entire content of your <code>portfolioData.json</code> file.</p>
                        <pre className="generated-json"><code>{generatedJson}</code></pre>
                    </div>
                )}
                
                <div className="editor-section">
                    <h2>Local Testing</h2>
                    <p>To see your changes before you deploy them, you need to run a local web server. This is a standard security requirement for modern web apps.</p>
                    <p>We've created a <code>README.md</code> file with simple, step-by-step instructions on how to do this. Please refer to it for guidance.</p>
                </div>
                
                <div className="editor-section">
                    <h2>GitHub Actions Deployment</h2>
                    <p>To automatically deploy your portfolio, a <code>deploy.yml</code> file has been generated for you. Move this file to the <code>.github/workflows/</code> directory in your repository.</p>
                    <p>After adding this file, go to your repository's settings, find the "Pages" section, and set the "Source" to "GitHub Actions".</p>
                </div>
            </div>
        </React.Fragment>
    );
};

export default EditorView;